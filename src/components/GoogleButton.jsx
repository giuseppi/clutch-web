import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

// Encapsulate Google login logic in a class for OOP clarity
class GoogleAuthHandler {
  constructor(auth, provider) {
    this.auth = auth;
    this.provider = provider;
  }

  async signIn() {
    return await signInWithPopup(this.auth, this.provider);
  }
}

const GoogleLoginButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const isSignupPage = location.pathname === '/signup';
  const buttonText = isSignupPage ? 'Sign up with Google' : 'Login with Google';

  // Modularized Google login logic
  async function handleGoogleLogin() {
    setIsLoading(true);
    setErrorMessage('');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const googleHandler = new GoogleAuthHandler(auth, provider);

    try {
      await googleHandler.signIn();
      // If you have syncUserToSupabase, call it here
      // await syncUserToSupabase(user);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Login was canceled. Please try again.');
      } else {
        setErrorMessage('Login failed. Please try again.');
        console.error('Unexpected login error:', error);
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
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
          position: 'relative',
          minHeight: '50px', // ensures consistent height
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
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            <span
              className="loading-spinner"
              style={{ width: '18px', height: '18px' }}
            ></span>
            Signing in...
          </span>
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
