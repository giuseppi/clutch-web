import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const GoogleLoginButton = () => {
  const location = useLocation();
  const isSignupPage = location.pathname === '/signup';
  const buttonText = isSignupPage ? 'Sign up with Google' : 'Login with Google';

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
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
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        e.target.style.borderColor = 'var(--google-button-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        e.target.style.borderColor = 'var(--google-button-border)';
      }}
    >
      <img
        src="/google_icon.png"
        alt="Google"
        style={{
          width: '20px',
          height: '20px',
        }}
      />
      {buttonText}
    </button>
  );
};

export default GoogleLoginButton;
