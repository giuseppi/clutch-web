import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';

const GoogleLoginButton = () => {
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="button google-button"
      style={{
        width: '100%',
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
      }}
    >
      <img
        src="/google_icon.png"
        alt="Google"
        style={{
          width: '20px',
          height: '20px'
        }}
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
