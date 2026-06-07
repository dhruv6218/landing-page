import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Defensive check to prevent app crash if Supabase is not yet configured.
 */
const isValidSupabaseConfig = (url, key) => {
  try {
    if (!url || !key) return false;
    // Check for placeholder values
    if (url.includes('YOUR_API_KEY') || url.includes('your-project.supabase.co')) return false;
    if (key.includes('YOUR_API_KEY') || key.includes('your-anon-key')) return false;
    // Basic URL validation
    return url.startsWith('http://') || url.startsWith('https://');
  } catch (e) {
    return false;
  }
};

export const supabase = isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Schema Suggestion for 'early_access_leads':
 * 
 * create table early_access_leads (
 *   id uuid default uuid_generate_v4() primary key,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *   email text not null,
 *   role text,
 *   company text,
 *   selected_offer text check (selected_offer in ('waitlist', 'founding_access', 'founder_call')),
 *   payment_status text default 'not_required' check (payment_status in ('pending', 'paid', 'failed', 'not_required')),
 *   notes text
 * );
 */
