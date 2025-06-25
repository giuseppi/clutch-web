import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.jsx'; // Import your Firebase auth instance

const HomeButton = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Update the state based on user presence
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to /home if authenticated
    } else {
      navigate('/'); // Redirect to / if not authenticated
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={handleNavigation}
    >
      <img
        src="/clutch_temp_logo.png"
        alt="Logo"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '4px'
        }}
      />
    </div>
  );
};

export default HomeButton;