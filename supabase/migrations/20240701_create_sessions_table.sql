-- Create sessions table to track user login/logout activity
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    session_type TEXT NOT NULL CHECK (session_type IN ('login', 'logout')),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON public.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON public.sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_sessions_type ON public.sessions(session_type);

-- Drop the function if it exists to avoid schema cache issues
DROP FUNCTION IF EXISTS log_session_activity(TEXT, TEXT, TEXT, TEXT);

-- Create a function to log session activity
CREATE OR REPLACE FUNCTION log_session_activity(
    p_user_id TEXT,
    p_session_type TEXT,
    p_ip_address TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    session_id UUID;
BEGIN
    INSERT INTO public.sessions (user_id, session_type, ip_address, user_agent)
    VALUES (p_user_id, p_session_type, p_ip_address, p_user_agent)
    RETURNING id INTO session_id;

    RETURN session_id;
END;
$$ LANGUAGE plpgsql;

-- Create a view for active sessions (last login within 24 hours)
CREATE OR REPLACE VIEW active_sessions AS
SELECT
    s.user_id,
    p.email,
    p.display_name,
    s.created_at as last_activity,
    EXTRACT(EPOCH FROM (NOW() - s.created_at))/3600 as hours_since_activity
FROM public.sessions s
JOIN public.profiles p ON s.user_id = p.user_id
WHERE s.session_type = 'login'
AND s.created_at > NOW() - INTERVAL '24 hours'
ORDER BY s.created_at DESC;