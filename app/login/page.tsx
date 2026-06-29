'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanUsername = username.trim().toLowerCase();
    const fakeEmail = `${cleanUsername}@qbx.local`;

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password,
      });

      if (authError) throw new Error('Invalid username or password');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      router.push(profile?.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
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
        <h1 className="font-display text-2xl font-bold text-center">Welcome back</h1>
        <p className="text-center text-sm text-gray-500 mt-1">Sign in to your QBX account</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              required
              value={username}
              onChange={(e) => { setUsername(e.target.value.replace(/\s/g, '')); setError(''); }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm"
              placeholder="Your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm pr-10"
                placeholder="Your password"
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

          {error && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-qbx-navy text-white font-medium py-3 rounded-xl hover:bg-qbx-blue disabled:opacity-60 transition-colors"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-qbx-blue font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
