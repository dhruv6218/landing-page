import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidSupabaseConfig = (url, key) => {
  try {
    if (!url || !key) return false;
    if (url.includes('YOUR_API_KEY') || url.includes('your-project.supabase.co')) return false;
    if (key.includes('YOUR_API_KEY') || key.includes('your-anon-key')) return false;
    return url.startsWith('http://') || url.startsWith('https://');
  } catch (e) {
    return false;
  }
};

export const supabase = isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
