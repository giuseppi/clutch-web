import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';

const GoogleLoginButton = ({ style }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // User successfully signed in with Google
        navigate('/home');
        console.log('Google Login Successful:', result.user);
      })
      .catch((error) => {
        console.error('Error during Google Login:', error.message);
      });
  };

  return (
    <button
      style={{
        ...style,
        ...defaultStyles.googleButton,
      }}
      onClick={handleGoogleLogin}
    >
      Login with Google
      <img
        src="/google_icon.png"
        alt="Google Icon"
        style={defaultStyles.icon}
      />
    </button>
  );
};

export default GoogleLoginButton;

const defaultStyles = {
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#444444', // Muted dark background
    color: 'white',
    gap: '10px', // Space between icon and text
  },
  icon: {
    height: '30px',
    width: '30px',
  },
};
