import { supabase } from '../config/supabase';

/**
 * Sync Firebase user data to Supabase users table
 * @param {Object} firebaseUser - Firebase user object
 * @returns {Promise<Object>} Supabase response data
 */
export async function syncUserToSupabase(firebaseUser) {
  try {
    const { uid, email, displayName, photoURL } = firebaseUser;

    const { data, error } = await supabase.from('users').upsert(
      {
        firebase_uid: uid,
        email,
        display_name: displayName,
        avatar_url: photoURL,
        last_synced: new Date().toISOString(),
      },
      {
        onConflict: 'firebase_uid',
      }
    );

    if (error) {
      console.error('Error syncing user to Supabase:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to sync user to Supabase:', error);
    throw error;
  }
}

/**
 * Get user data from Supabase by Firebase UID
 * @param {string} firebaseUid - Firebase user UID
 * @returns {Promise<Object|null>} User data or null if not found
 */
export async function getUserFromSupabase(firebaseUid) {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('firebase_uid', firebaseUid).single();

    if (error) {
      if (error.code === 'PGRST116') {
        // User not found
        return null;
      }
      console.error('Error fetching user from Supabase:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to get user from Supabase:', error);
    throw error;
  }
}

/**
 * Update user profile in Supabase
 * @param {string} firebaseUid - Firebase user UID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated user data
 */
export async function updateUserProfile(firebaseUid, updates) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('firebase_uid', firebaseUid)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
}
