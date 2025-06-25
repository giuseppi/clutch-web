import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables:');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.warn('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  console.warn('Supabase features will be disabled. Please check your .env.local file.');
}

// Create a dummy client if environment variables are missing
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        upsert: () => Promise.resolve({ error: null }),
        gte: () => ({ lte: () => ({ gte: () => ({ lte: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }) }) })
      })
    };

export default supabase;