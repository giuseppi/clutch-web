import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const GoogleLoginButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSignupPage = location.pathname === '/signup';
  const buttonText = isSignupPage ? 'Sign up with Google' : 'Login with Google';

  const signInWithGoogle = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful:', result.user);

      // Navigate to home page after successful login
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);

      // Provide user-friendly error messages
      let errorMessage = 'Failed to sign in with Google.';

      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Pop-up was blocked. Please allow pop-ups for this site.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/unauthorized-domain':
          errorMessage = 'This domain is not authorized for Google sign-in.';
          break;
        default:
          errorMessage = `Sign-in failed: ${error.message}`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={signInWithGoogle}
        disabled={loading}
        className="google-button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: 'var(--google-button-bg)',
          border: '2px solid var(--google-button-border)',
          color: 'var(--google-button-text)',
          fontWeight: '600',
          fontSize: '16px',
          padding: '15px 30px',
          borderRadius: '10px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            e.target.style.borderColor = 'var(--google-button-border-hover)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            e.target.style.borderColor = 'var(--google-button-border)';
          }
        }}
      >
        {loading ? (
          <>
            <span
              className="loading-spinner"
              style={{ width: '16px', height: '16px' }}
            ></span>
            Signing in...
          </>
        ) : (
          <>
            <img
              src="/google_icon.png"
              alt="Google"
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            {buttonText}
          </>
        )}
      </button>

      {error && (
        <div
          style={{
            color: '#ef4444',
            fontSize: '14px',
            marginTop: '8px',
            textAlign: 'center',
            padding: '8px',
            borderRadius: '6px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
