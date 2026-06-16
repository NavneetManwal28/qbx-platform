-- ============================================
-- QBX Platform — Supabase Database Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  company text not null default '',
  phone text not null default '',
  territory text not null default '',
  role text not null default 'partner' check (role in ('partner', 'admin')),
  created_at timestamptz not null default now()
);

-- 2. Uploads table
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.profiles(id) on delete cascade,
  image_url text not null,
  cloudinary_id text not null default '',
  campaign_name text not null,
  location text not null default '',
  photo_date date not null default current_date,
  notes text default '',
  created_at timestamptz not null default now()
);

-- 3. Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.uploads enable row level security;

-- 4. Profiles policies
-- Everyone can insert their own profile on signup
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Admins can read all profiles
create policy "Admins can read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 5. Uploads policies
-- Partners can insert their own uploads
create policy "Partners can insert own uploads"
  on public.uploads for insert
  with check (auth.uid() = partner_id);

-- Partners can read their own uploads
create policy "Partners can read own uploads"
  on public.uploads for select
  using (auth.uid() = partner_id);

-- Admins can read all uploads
create policy "Admins can read all uploads"
  on public.uploads for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 6. Indexes for performance
create index if not exists idx_uploads_partner_id on public.uploads(partner_id);
create index if not exists idx_uploads_campaign on public.uploads(campaign_name);
create index if not exists idx_uploads_photo_date on public.uploads(photo_date);
create index if not exists idx_profiles_role on public.profiles(role);
