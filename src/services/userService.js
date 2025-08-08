import { supabase } from '../config/supabase';

/**
 * Create user profile in Supabase after Firebase authentication
 * @param {Object} firebaseUser - Firebase user object
 * @returns {Promise<Object>} User profile data or error
 */
export const createUserProfile = async (firebaseUser) => {
  console.log('🔍 Starting createUserProfile for user:', firebaseUser.uid);
  console.log('📧 User email:', firebaseUser.email);
  console.log('👤 User display name:', firebaseUser.displayName);

  try {
    console.log('🔗 Using regular Supabase client...');

    // Check if user profile already exists
    console.log('🔍 Checking if profile already exists...');
    const { data: existingProfile, error: checkError } = await supabase.from('profiles').select('*').eq('user_id', firebaseUser.uid).single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new users
      console.error('❌ Error checking existing profile:', checkError);
      return { error: checkError };
    }

    // If profile already exists, return success
    if (existingProfile) {
      console.log('✅ User profile already exists:', existingProfile);
      return { data: existingProfile };
    }

    console.log('📝 Creating new user profile...');
    // Create new user profile
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        user_id: firebaseUser.uid,
        email: firebaseUser.email,
        display_name: firebaseUser.displayName || null,
        avatar_url: firebaseUser.photoURL || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Error creating user profile:', createError);
      console.error('🔍 Error details:', {
        code: createError.code,
        message: createError.message,
        details: createError.details,
        hint: createError.hint,
      });
      return { error: createError };
    }

    console.log('✅ User profile created successfully:', newProfile);
    return { data: newProfile };
  } catch (error) {
    console.error('❌ Error in createUserProfile:', error);
    return { error };
  }
};

/**
 * Get user profile from Supabase
 * @param {string} userId - Supabase user ID
 * @returns {Promise<Object>} User profile data or error
 */
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId).single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return { error };
  }
};

/**
 * Update user profile in Supabase
 * @param {string} userId - Supabase user ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated user data or error
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return { error };
  }
};

/**
 * Log session activity (login/logout)
 * @param {string} userId - Supabase user ID
 * @param {string} sessionType - Type of session activity (login/logout)
 * @param {string} ipAddress - IP address of the session
 * @param {string} userAgent - User agent of the session
 * @returns {Promise<Object>} Result of the operation or error
 */
export const logSessionActivity = async (userId, sessionType, ipAddress = null, userAgent = null) => {
  try {
    console.log(`📊 Logging ${sessionType} for user:`, userId);

    const { data, error } = await supabase.rpc('log_session_activity', {
      p_user_id: userId,
      p_session_type: sessionType,
      p_ip_address: ipAddress,
      p_user_agent: userAgent,
    });

    if (error) {
      console.error('Error logging session activity:', error);
      return { error };
    }

    console.log(`✅ Session ${sessionType} logged successfully`);
    return { data };
  } catch (error) {
    console.error('Error in logSessionActivity:', error);
    return { error };
  }
};

/**
 * Get active sessions (users logged in within last 24 hours)
 * @returns {Promise<Object>} List of active sessions or error
 */
export const getActiveSessions = async () => {
  try {
    const { data, error } = await supabase.from('active_sessions').select('*').order('last_activity', { ascending: false });

    if (error) {
      console.error('Error fetching active sessions:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getActiveSessions:', error);
    return { error };
  }
};

/**
 * Get user session history
 * @param {string} userId - Supabase user ID
 * @param {number} limit - Number of sessions to fetch
 * @returns {Promise<Object>} List of user session history or error
 */
export const getUserSessionHistory = async (userId, limit = 10) => {
  try {
    const { data, error } = await supabase.from('sessions').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(limit);

    if (error) {
      console.error('Error fetching user session history:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Error in getUserSessionHistory:', error);
    return { error };
  }
};
