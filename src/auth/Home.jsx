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
          Your ultimate destination for finding and booking basketball courts. Whether you're looking for a quick pickup game or planning a
          tournament, we've got you covered with the best courts in your area.
        </p>

        {user ? (
          <div className="button-group">
            <Link
              to="/map"
              className="button signup-button"
            >
              Find Courts
            </Link>
            <button
              onClick={handleSignOut}
              className="button login-button"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="button-group">
            <Link
              to="/signup"
              className="button signup-button"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="button login-button"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="features-section">
          <h3 className="features-title">Why Choose Clutch?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <h4 className="feature-title">🏀 Easy Booking</h4>
              <p className="feature-description">Book courts instantly with our streamlined reservation system.</p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">📍 Find Nearby</h4>
              <p className="feature-description">Discover courts in your neighborhood with our location-based search.</p>
            </div>
            <div className="feature-item">
              <h4 className="feature-title">⭐ Verified Quality</h4>
              <p className="feature-description">All courts are verified and rated by the community.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
