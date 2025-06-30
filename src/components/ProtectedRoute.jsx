import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div
          className="loading-spinner"
          style={{ width: '40px', height: '40px' }}
        ></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
