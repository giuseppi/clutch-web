import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Home = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const features = [
    {
      title: 'Find Courts Instantly',
      description: 'Discover basketball courts near you with real-time availability and ratings.',
      gradient: 'from-blue-500 to-green-500',
    },
    {
      title: 'Join Game Queues',
      description: 'Queue up for pickup games and tournaments with players in your area.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Verified Locations',
      description: 'All courts are verified and rated by the basketball community.',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const courtTypes = ['Indoor Courts', 'Outdoor Courts', 'College Gyms', 'Community Centers', 'Private Facilities', 'Street Courts'];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find courts in minutes.
            <br />
            <span className="gradient-text">Play anywhere.</span>
          </h1>
          <p className="hero-subtitle">
            Clutch connects basketball players with courts and games. Find nearby courts, join pickup games, and never wait for a court again.
          </p>
          <div className="hero-buttons">
            {user ? (
              <>
                <Link
                  to="/map"
                  className="hero-button primary"
                >
                  Find Courts
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hero-button secondary"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="hero-button primary"
                >
                  Start Playing
                </Link>
                <Link
                  to="/login"
                  className="hero-button secondary"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Court Types Section */}
      <section className="trusted-section">
        <p className="trusted-text">Find courts of all types</p>
        <div className="trusted-logos-container">
          <div className="trusted-logos-scroll">
            {courtTypes.map((type, index) => (
              <div
                key={index}
                className="trusted-logo"
              >
                {type}
              </div>
            ))}
            {courtTypes.map((type, index) => (
              <div
                key={`duplicate-${index}`}
                className="trusted-logo"
              >
                {type}
              </div>
            ))}
            {courtTypes.map((type, index) => (
              <div
                key={`triplicate-${index}`}
                className="trusted-logo"
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
            >
              <div className={`feature-icon ${feature.gradient}`}></div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Ready to play?</h2>
        <p className="cta-subtitle">Be among the first to experience the future of basketball court discovery.</p>
        <Link
          to={user ? '/map' : '/signup'}
          className="cta-button"
        >
          {user ? 'Find Your Court' : 'Get Started'}
        </Link>
      </section>
    </div>
  );
};

export default Home;
