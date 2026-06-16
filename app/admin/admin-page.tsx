'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type Profile, type Upload } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import {
  Loader2, Search, Download, Users, Image as ImageIcon,
  Calendar, MapPin, Filter, ChevronDown, ExternalLink,
  BarChart3, FolderOpen, Package,
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [partners, setPartners] = useState<Profile[]>([]);
  const [tab, setTab] = useState<'dashboard' | 'uploads' | 'partners'>('dashboard');

  // Filters
  const [filterPartner, setFilterPartner] = useState('');
  const [filterCampaign, setFilterCampaign] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [downloading, setDownloading] = useState(false);

  useEffect(() => { checkAuth(); }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/login'); return; }
    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (!prof || prof.role !== 'admin') { router.push('/login'); return; }
    setProfile(prof);
    fetchData();
    setLoading(false);
  };

  const fetchData = async () => {
    const [uploadsRes, partnersRes] = await Promise.all([
      supabase.from('uploads').select('*, profiles(name, username, company, territory)').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').eq('role', 'partner').order('created_at', { ascending: false }),
    ]);
    setUploads(uploadsRes.data || []);
    setPartners(partnersRes.data || []);
  };

  const filteredUploads = uploads.filter((u: any) => {
    if (filterPartner && u.partner_id !== filterPartner) return false;
    if (filterCampaign && u.campaign_name !== filterCampaign) return false;
    if (filterLocation && u.location !== filterLocation) return false;
    if (filterDateFrom && u.photo_date < filterDateFrom) return false;
    if (filterDateTo && u.photo_date > filterDateTo + '-31') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = [u.profiles?.name, u.campaign_name, u.location, u.notes]
        .some(v => v?.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const uniqueCampaigns = Array.from(new Set(uploads.map((u) => u.campaign_name)));
  const uniqueLocations = Array.from(new Set(uploads.map((u) => u.location).filter(Boolean)));

  // Dashboard stats
  const partnerStats = partners.map(p => {
    const pUploads = uploads.filter(u => u.partner_id === p.id);
    const campaigns = new Set(pUploads.map(u => u.campaign_name));
    return { ...p, uploadCount: pUploads.length, campaignCount: campaigns.size };
  }).sort((a, b) => b.uploadCount - a.uploadCount);

  const toggleSelect = (id: string) => {
    setSelectedImages(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedImages.size === filteredUploads.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(filteredUploads.map(u => u.id)));
    }
  };

  const downloadImage = async (url: string, name: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(url, '_blank');
    }
  };

  const bulkDownload = async () => {
    setDownloading(true);
    const selected = filteredUploads.filter(u => selectedImages.has(u.id));
    for (let i = 0; i < selected.length; i++) {
      const u = selected[i];
      await downloadImage(u.image_url, `${u.campaign_name}-${u.location}-${i + 1}.jpg`);
      // Small delay to avoid browser blocking
      await new Promise(r => setTimeout(r, 300));
    }
    setDownloading(false);
  };

  const clearFilters = () => {
    setFilterPartner('');
    setFilterCampaign('');
    setFilterLocation('');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSearchQuery('');
  };

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

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Manage partners, uploads, and campaigns</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 text-center">
              <div className="font-display text-xl font-bold text-qbx-navy">{partners.length}</div>
              <div className="text-xs text-gray-400">Partners</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 text-center">
              <div className="font-display text-xl font-bold text-qbx-blue">{uploads.length}</div>
              <div className="text-xs text-gray-400">Photos</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 text-center">
              <div className="font-display text-xl font-bold text-qbx-gold">{uniqueCampaigns.length}</div>
              <div className="text-xs text-gray-400">Campaigns</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 mb-6 w-fit">
          {([
            ['dashboard', BarChart3, 'Dashboard'] as const,
            ['uploads', ImageIcon, 'All Photos'] as const,
            ['partners', Users, 'Partners'] as const,
          ]).map(([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                tab === key ? 'bg-qbx-navy text-white' : 'text-gray-500 hover:text-qbx-navy'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* ============ DASHBOARD TAB ============ */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            {/* Partner-wise breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
                <Users size={18} className="text-qbx-blue" /> Partner-wise Overview
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="pb-3 font-medium text-gray-500">Partner</th>
                      <th className="pb-3 font-medium text-gray-500">Company</th>
                      <th className="pb-3 font-medium text-gray-500">Territory</th>
                      <th className="pb-3 font-medium text-gray-500 text-center">Photos</th>
                      <th className="pb-3 font-medium text-gray-500 text-center">Campaigns</th>
                      <th className="pb-3 font-medium text-gray-500">Last Upload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerStats.map((p) => {
                      const lastUpload = uploads.find(u => u.partner_id === p.id);
                      return (
                        <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="py-3">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-gray-400">@{p.username}</div>
                          </td>
                          <td className="py-3 text-gray-600">{p.company}</td>
                          <td className="py-3">
                            <span className="bg-qbx-blue/10 text-qbx-blue px-2.5 py-1 rounded-full text-xs font-medium">
                              {p.territory}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <span className="font-display font-bold text-lg">{p.uploadCount}</span>
                          </td>
                          <td className="py-3 text-center">
                            <span className="font-display font-bold">{p.campaignCount}</span>
                          </td>
                          <td className="py-3 text-gray-400 text-xs">
                            {lastUpload ? new Date(lastUpload.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                          </td>
                        </tr>
                      );
                    })}
                    {partnerStats.length === 0 && (
                      <tr><td colSpan={6} className="py-8 text-center text-gray-400">No partners yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <FolderOpen size={18} className="text-qbx-blue" /> By Campaign
                </h3>
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {uniqueCampaigns.map(c => {
                    const count = uploads.filter(u => u.campaign_name === c).length;
                    const pct = Math.round((count / Math.max(uploads.length, 1)) * 100);
                    return (
                      <div key={c}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium truncate mr-2">{c}</span>
                          <span className="text-gray-400 flex-shrink-0">{count} photos</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-qbx-blue rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                  {uniqueCampaigns.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No campaigns yet</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-qbx-blue" /> By Location
                </h3>
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {uniqueLocations.map(loc => {
                    const count = uploads.filter(u => u.location === loc).length;
                    const pct = Math.round((count / Math.max(uploads.length, 1)) * 100);
                    return (
                      <div key={loc}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium truncate mr-2">{loc}</span>
                          <span className="text-gray-400 flex-shrink-0">{count} photos</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-qbx-gold rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                  {uniqueLocations.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No locations yet</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ UPLOADS TAB ============ */}
        {tab === 'uploads' && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <Filter size={16} /> Filters
                </div>
                <button onClick={clearFilters} className="text-xs text-qbx-blue hover:underline font-medium">Clear all</button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="relative lg:col-span-2">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none text-sm"
                    placeholder="Search…"
                  />
                </div>
                <div className="relative">
                  <select value={filterPartner} onChange={(e) => setFilterPartner(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue outline-none text-sm bg-white pr-8">
                    <option value="">All partners</option>
                    {partners.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select value={filterCampaign} onChange={(e) => setFilterCampaign(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue outline-none text-sm bg-white pr-8">
                    <option value="">All campaigns</option>
                    {uniqueCampaigns.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue outline-none text-sm bg-white pr-8">
                    <option value="">All locations</option>
                    {uniqueLocations.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div>
                  <input type="month" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue outline-none text-sm"
                    placeholder="From month" />
                </div>
              </div>
            </div>

            {/* Bulk actions bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">
                  {filteredUploads.length} photos
                  {selectedImages.size > 0 && <span className="text-qbx-blue font-medium"> · {selectedImages.size} selected</span>}
                </p>
                <button onClick={selectAll} className="text-xs text-qbx-blue hover:underline font-medium">
                  {selectedImages.size === filteredUploads.length ? 'Deselect all' : 'Select all'}
                </button>
              </div>
              {selectedImages.size > 0 && (
                <button
                  onClick={bulkDownload}
                  disabled={downloading}
                  className="flex items-center gap-2 bg-qbx-navy text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-qbx-blue disabled:opacity-50 transition-colors"
                >
                  {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  {downloading ? 'Downloading…' : `Download ${selectedImages.size} photos`}
                </button>
              )}
            </div>

            {/* Photo grid */}
            {filteredUploads.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <ImageIcon size={40} className="mx-auto text-gray-200" />
                <p className="text-gray-400 mt-3">No photos match your filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredUploads.map((u: any) => (
                  <div key={u.id} className={`bg-white rounded-2xl border overflow-hidden group transition-all ${
                    selectedImages.has(u.id) ? 'border-qbx-blue ring-2 ring-qbx-blue/20' : 'border-gray-100'
                  }`}>
                    <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => toggleSelect(u.id)}>
                      <img src={u.image_url} alt={u.campaign_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {/* Selection checkbox */}
                      <div className={`absolute top-2 left-2 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        selectedImages.has(u.id) ? 'bg-qbx-blue border-qbx-blue' : 'border-white/80 bg-black/20'
                      }`}>
                        {selectedImages.has(u.id) && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      {/* Hover actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 gap-2">
                        <button onClick={(e) => { e.stopPropagation(); downloadImage(u.image_url, `${u.campaign_name}-${u.id}.jpg`); }}
                          className="bg-white/90 text-qbx-navy rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1 hover:bg-white">
                          <Download size={13} /> Download
                        </button>
                        <a href={u.image_url} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}
                          className="bg-white/90 text-qbx-navy rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1 hover:bg-white">
                          <ExternalLink size={13} /> Open
                        </a>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold truncate">{u.campaign_name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">@{u.profiles?.username} · {u.profiles?.company}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {u.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {u.photo_date?.substring(0, 7)}</span>
                      </div>
                      {u.notes && <p className="mt-2 text-xs text-gray-500 truncate">{u.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ============ PARTNERS TAB ============ */}
        {tab === 'partners' && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-6 py-4 font-medium text-gray-500">Partner</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Company</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Phone</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Territory</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-center">Photos</th>
                    <th className="px-6 py-4 font-medium text-gray-500 text-center">Campaigns</th>
                    <th className="px-6 py-4 font-medium text-gray-500">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerStats.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-gray-400">@{p.username}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{p.company}</td>
                      <td className="px-6 py-4 text-gray-500">{p.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-qbx-blue/10 text-qbx-blue px-2.5 py-1 rounded-full text-xs font-medium">
                          {p.territory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-display font-bold text-lg">{p.uploadCount}</td>
                      <td className="px-6 py-4 text-center font-display font-bold">{p.campaignCount}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {partners.length === 0 && (
                <div className="py-12 text-center text-gray-400">No partners registered yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
