import { createClient } from '@supabase/supabase-js';
import { auth } from '../firebase.jsx';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables:');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.warn('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  console.warn('Supabase features will be disabled. Please check your .env.local file.');
}

// Create Supabase client with Firebase Auth integration
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            'X-Client-Info': 'clutch-web',
          },
        },
      })
    : {
        from: () => ({
          select: () => Promise.resolve({ data: [], error: null }),
          upsert: () => Promise.resolve({ error: null }),
          gte: () => ({ lte: () => ({ gte: () => ({ lte: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }) }) }),
        }),
      };

// Function to get Supabase client with Firebase auth token
export const getSupabaseWithAuth = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabase; // Return dummy client if env vars missing
  }

  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log('No Firebase user authenticated, using anonymous Supabase client');
      return supabase;
    }

    const idToken = await currentUser.getIdToken(false);
    if (!idToken) {
      console.log('Could not get Firebase ID token, using anonymous Supabase client');
      return supabase;
    }

    // Create a new Supabase client with the Firebase token
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'X-Firebase-UID': currentUser.uid, // Add Firebase UID header
          'X-Client-Info': 'clutch-web',
        },
      },
    });
  } catch (error) {
    console.error('Error getting Firebase token for Supabase:', error);
    return supabase; // Fallback to anonymous client
  }
};

export default supabase;
