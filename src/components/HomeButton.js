import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import your Firebase auth instance

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
      className="flex items-center justify-center cursor-pointer"
      onClick={handleNavigation}
    >
      <img
        src="/midpoint_logo.png"
        alt="Logo"
        className="w-8 h-8 rounded"
      />
    </div>
  );
};

export default HomeButton;
