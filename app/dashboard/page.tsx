'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile, type Upload } from '@/lib/supabase';
import { uploadToCloudinary } from '@/lib/cloudinary';
import Navbar from '@/components/Navbar';
import imageCompression from 'browser-image-compression';
import {
  Upload as UploadIcon, X, CheckCircle2, AlertCircle, Loader2,
  ImagePlus, Calendar, MapPin, FolderOpen, FileText, Camera,
} from 'lucide-react';

type FileState = {
  file: File;
  preview: string;
  status: 'pending' | 'compressing' | 'uploading' | 'done' | 'error';
  progress: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload form state
  const [files, setFiles] = useState<FileState[]>([]);
  const [campaign, setCampaign] = useState('');
  const [location, setLocation] = useState('');
  const [photoMonth, setPhotoMonth] = useState('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: number; failed: number } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }

    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (!prof || prof.role !== 'partner') { router.push('/login'); return; }

    setProfile(prof);
    fetchUploads(user.id);
    setLoading(false);
  };

  const fetchUploads = async (userId: string) => {
    const { data } = await supabase
      .from('uploads')
      .select('*')
      .eq('partner_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    setUploads(data || []);
  };

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles: FileState[] = Array.from(incoming)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
        status: 'pending' as const,
        progress: `${(f.size / 1024).toFixed(0)} KB`,
      }));
    setFiles((prev) => [...prev, ...newFiles]);
    setUploadResult(null);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length || !profile) return;

    // Only upload pending files (not already uploaded ones)
    const pendingIndexes = files.map((f, i) => f.status === 'pending' ? i : -1).filter(i => i >= 0);
    if (pendingIndexes.length === 0) return;

    setUploading(true);
    let success = 0;
    let failed = 0;

    for (const i of pendingIndexes) {
      try {
        // Compress — keep quality high, target ~800KB for good quality
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'compressing', progress: 'Compressing…' } : f))
        );

        const compressed = await imageCompression(files[i].file, {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 2048,
          useWebWorker: true,
          initialQuality: 0.85,
        });

        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i
              ? { ...f, status: 'uploading', progress: `${(compressed.size / 1024).toFixed(0)} KB → Uploading…` }
              : f
          )
        );

        // Upload to Cloudinary
        const { url, publicId } = await uploadToCloudinary(compressed);

        // Save to Supabase
        await supabase.from('uploads').insert({
          partner_id: profile.id,
          image_url: url,
          cloudinary_id: publicId,
          campaign_name: campaign,
          location,
          photo_date: photoMonth + '-01',
          notes,
        });

        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'done', progress: 'Uploaded' } : f))
        );
        success++;
      } catch {
        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, status: 'error', progress: 'Failed' } : f))
        );
        failed++;
      }
    }

    setUploadResult({ success, failed });
    setUploading(false);
    if (success > 0) fetchUploads(profile.id);
  };

  const resetForm = () => {
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setCampaign('');
    setLocation('');
    setPhotoMonth('');
    setNotes('');
    setUploadResult(null);
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-qbx-light">
        <Loader2 className="animate-spin text-qbx-blue" size={32} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-qbx-light">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Welcome, {profile?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-1">
            {profile?.company} · {profile?.territory}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Upload form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                <Camera size={20} className="text-qbx-blue" />
                Upload Campaign Photos
              </h2>

              <form onSubmit={handleUpload} className="mt-6 space-y-5">
                {/* Drop zone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-qbx-sky/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <ImagePlus size={36} className="mx-auto text-gray-300" />
                  <p className="mt-3 text-sm font-medium text-gray-600">
                    Drag photos here or tap to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Select multiple images at once for bulk upload
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </div>

                {/* File previews */}
                {files.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {files.map((f, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-50">
                        <img src={f.preview} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
                          {f.status === 'pending' && (
                            <span className="text-xs text-white font-medium">{f.progress}</span>
                          )}
                          {(f.status === 'compressing' || f.status === 'uploading') && (
                            <>
                              <Loader2 size={20} className="text-white animate-spin" />
                              <span className="text-[10px] text-white/80">{f.status === 'compressing' ? 'Compressing' : 'Uploading'}</span>
                            </>
                          )}
                          {f.status === 'done' && <CheckCircle2 size={22} className="text-green-400" />}
                          {f.status === 'error' && <AlertCircle size={22} className="text-red-400" />}
                        </div>
                        {f.status === 'pending' && !uploading && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                            className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Campaign details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FolderOpen size={14} className="inline mr-1" /> Campaign name
                    </label>
                    <input
                      required
                      value={campaign}
                      onChange={(e) => setCampaign(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none text-sm"
                      placeholder="e.g. Summer Activation 2026"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin size={14} className="inline mr-1" /> Location
                    </label>
                    <input
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none text-sm"
                      placeholder="e.g. Delhi NCR"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar size={14} className="inline mr-1" /> Photo month
                    </label>
                    <input
                      required
                      type="month"
                      value={photoMonth}
                      onChange={(e) => setPhotoMonth(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FileText size={14} className="inline mr-1" /> Notes
                    </label>
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none text-sm"
                      placeholder="Optional notes"
                    />
                  </div>
                </div>

                {uploadResult && (
                  <div className={`text-sm rounded-xl px-4 py-3 ${uploadResult.failed ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                    {uploadResult.success} uploaded{uploadResult.failed ? `, ${uploadResult.failed} failed` : ''}.
                    <button type="button" onClick={resetForm} className="ml-2 underline font-medium">
                      Upload more
                    </button>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={uploading || pendingCount === 0}
                    className="flex-1 flex items-center justify-center gap-2 bg-qbx-navy text-white font-medium py-3 rounded-xl hover:bg-qbx-blue disabled:opacity-50 transition-colors"
                  >
                    {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadIcon size={18} />}
                    {uploading
                      ? `Uploading (${files.filter((f) => f.status === 'done').length}/${pendingCount})…`
                      : pendingCount > 0
                        ? `Upload ${pendingCount} photo${pendingCount !== 1 ? 's' : ''}`
                        : 'Add photos to upload'
                    }
                  </button>
                  {files.length > 0 && !uploading && (
                    <button type="button" onClick={resetForm} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium">
                      Clear
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Recent uploads sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-display text-lg font-semibold mb-4">Recent uploads</h2>
              {uploads.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">No uploads yet. Start by uploading campaign photos.</p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {uploads.map((u) => (
                    <div key={u.id} className="flex gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <img
                        src={u.image_url}
                        alt=""
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{u.campaign_name}</p>
                        <p className="text-xs text-gray-400 truncate">{u.location} · {u.photo_date?.substring(0, 7)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
