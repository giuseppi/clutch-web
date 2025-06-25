import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Home = () => {
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="content-section home-main-content">
        <h1 className="header">Welcome to Clutch</h1>
        <p className="text">
          Your ultimate destination for finding and booking basketball courts.
          Whether you're looking for a quick pickup game or planning a tournament,
          we've got you covered with the best courts in your area.
        </p>

        {user ? (
          <div className="button-group">
            <Link to="/map" className="button signup-button">
              Find Courts
            </Link>
            <button onClick={handleSignOut} className="button login-button">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="button-group">
            <Link to="/signup" className="button signup-button">
              Get Started
            </Link>
            <Link to="/login" className="button login-button">
              Sign In
            </Link>
          </div>
        )}

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: 'var(--bg-tertiary)',
          borderRadius: '15px',
          border: '1px solid var(--border)',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '15px',
            color: 'var(--text-primary)',
            fontWeight: '600',
            transition: 'color 0.3s ease'
          }}>
            Why Choose Clutch?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{
                color: 'var(--success)',
                marginBottom: '8px',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}>
                🏀 Easy Booking
              </h4>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}>
                Book courts instantly with our streamlined reservation system
              </p>
            </div>
            <div>
              <h4 style={{
                color: 'var(--success)',
                marginBottom: '8px',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}>
                📍 Find Nearby
              </h4>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}>
                Discover courts in your neighborhood with our location-based search
              </p>
            </div>
            <div>
              <h4 style={{
                color: 'var(--success)',
                marginBottom: '8px',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease'
              }}>
                ⭐ Verified Quality
              </h4>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                transition: 'color 0.3s ease'
              }}>
                All courts are verified and rated by the community
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
