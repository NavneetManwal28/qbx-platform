# QBX Marketing Agency Platform

Full-stack marketing agency platform built with Next.js 14, Tailwind CSS, Supabase, and Cloudinary.

## Features

- **Landing page** with services showcase, stats, and partner CTA
- **Partner signup** — instant access, no approval required
- **Admin signup** — protected with secret code
- **Partner dashboard** — bulk photo upload with client-side compression (~300KB), campaign metadata
- **Admin panel** — view all uploads, filter by partner/date/campaign, download images, partner list
- **Mobile-first** responsive design

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Supabase (Auth + PostgreSQL)
- Cloudinary (Image hosting)
- browser-image-compression (Client-side compression)

## Setup

### 1. Supabase

1. Go to your Supabase project SQL Editor
2. Run the contents of `supabase-setup.sql` to create tables and RLS policies
3. In **Authentication → Settings**, make sure email/password signup is enabled

### 2. Cloudinary

1. Go to Cloudinary Settings → Upload
2. Create an **unsigned upload preset** named `qbx_unsigned`
3. Set the preset folder to `qbx-uploads`

### 3. Environment Variables

Copy `.env.local` and fill in any missing values:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
NEXT_PUBLIC_ADMIN_SECRET_CODE=QBX_ADMIN_2024
```

### 4. Install & Run

```bash
npm install
npm run dev
```

### 5. Deploy to Vercel

```bash
npx vercel
```

Add the same environment variables in Vercel → Settings → Environment Variables.

## Project Structure

```
app/
  page.tsx          — Landing page
  login/page.tsx    — Login
  signup/page.tsx   — Partner/Admin signup
  dashboard/page.tsx — Partner dashboard
  admin/page.tsx    — Admin panel
components/
  Navbar.tsx        — Shared navigation
lib/
  supabase.ts       — Supabase client + types
  cloudinary.ts     — Cloudinary upload helper
```
