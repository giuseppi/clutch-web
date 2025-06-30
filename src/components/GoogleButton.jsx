import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const GoogleLoginButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSignupPage = location.pathname === '/signup';
  const buttonText = isSignupPage ? 'Sign up with Google' : 'Login with Google';

  async function handleGoogleLogin() {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      // If you have syncUserToSupabase, call it here
      // await syncUserToSupabase(result.user);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn('User closed the login popup.');
        setErrorMessage('Login was canceled. Please try again.');
      } else {
        console.error('Unexpected login error:', error);
        setErrorMessage('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
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
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          opacity: isLoading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            e.target.style.borderColor = 'var(--google-button-border-hover)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            e.target.style.borderColor = 'var(--google-button-border)';
          }
        }}
      >
        {isLoading ? (
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

      {errorMessage && (
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
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
