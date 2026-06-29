'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    company: '',
    phone: '',
    territory: '',
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const username = form.username.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      setError('Username must be 3–30 characters: letters, numbers, or underscores only.');
      setLoading(false);
      return;
    }

    const fakeEmail = `${username}@qbx.local`;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: fakeEmail,
        password: form.password,
        options: { data: { display_name: form.name } },
      });

      if (authError) {
        if (authError.message?.includes('already registered')) {
          throw new Error('This username is already taken. Try another.');
        }
        throw authError;
      }
      if (!authData.user) throw new Error('Signup failed');

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        username,
        email: fakeEmail,
        name: form.name,
        company: form.company,
        phone: form.phone,
        territory: form.territory,
      
      role: 'partner',
platform: 'qbx',
      });

      if (profileError) throw profileError;

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-qbx-light flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8">
        <Image
          src="/logo-light.png"
          alt="QBX Service"
          width={160}
          height={46}
          className="h-12 w-auto object-contain mix-blend-multiply"
          priority
        />
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="font-display text-2xl font-bold text-center">Become a QBX Partner</h1>
        <p className="text-center text-sm text-gray-500 mt-1">Sign up to start uploading campaign assets</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => update('username', e.target.value.replace(/\s/g, ''))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm"
              placeholder="e.g. jane_smith"
            />
            <p className="text-xs text-gray-400 mt-1">Letters, numbers, underscores only</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                minLength={6}
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm pr-10"
                placeholder="Min. 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              required
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm"
              placeholder="Company name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm"
                placeholder="+91 98765..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Territory</label>
              <input
                required
                value={form.territory}
                onChange={(e) => update('territory', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm"
                placeholder="e.g. North India"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-qbx-navy text-white font-medium py-3 rounded-xl hover:bg-qbx-blue disabled:opacity-60 transition-colors"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Creating account…' : 'Create Partner Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-qbx-blue font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
