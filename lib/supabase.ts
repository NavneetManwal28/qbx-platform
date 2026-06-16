import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  territory: string;
  role: 'partner' | 'admin';
  created_at: string;
};

export type Upload = {
  id: string;
  partner_id: string;
  image_url: string;
  cloudinary_id: string;
  campaign_name: string;
  location: string;
  photo_date: string;
  notes: string;
  created_at: string;
  profiles?: Profile;
};
