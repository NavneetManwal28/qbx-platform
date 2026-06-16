'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Menu, X, LogOut, Upload, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }) => setRole(profile?.role ?? null));
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-qbx-navy">
            QBX
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#services" className="text-sm font-medium text-gray-600 hover:text-qbx-navy transition-colors">
              Services
            </Link>

            {user && role === 'partner' && (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm font-medium text-qbx-blue hover:text-qbx-navy transition-colors"
              >
                <Upload size={15} /> Upload Photos
              </Link>
            )}

            {user && role === 'admin' && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm font-medium text-qbx-blue hover:text-qbx-navy transition-colors"
              >
                <ShieldCheck size={15} /> Admin Panel
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut size={15} /> Sign out
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-qbx-navy transition-colors">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium bg-qbx-navy text-white px-5 py-2 rounded-lg hover:bg-qbx-blue transition-colors"
                >
                  Become a Partner
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-qbx-navy">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-2">
          <Link href="/#services" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-gray-600">
            Services
          </Link>
          {user && role === 'partner' && (
            <Link href="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium text-qbx-blue">
              <Upload size={15} /> Upload Photos
            </Link>
          )}
          {user && role === 'admin' && (
            <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-sm font-medium text-qbx-blue">
              <ShieldCheck size={15} /> Admin Panel
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-sm font-medium text-red-600">
              <LogOut size={15} /> Sign out
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-gray-600">
                Log in
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-qbx-navy">
                Become a Partner
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
