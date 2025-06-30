import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiBasketballBasket } from 'react-icons/gi';
import { MdVerified } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/useTheme';
import { auth } from '../firebase';

const Home = () => {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const features = [
    {
      title: 'Find Courts Instantly',
      description: 'Discover basketball courts near you with real-time availability and ratings.',
      icon: (
        <GiBasketballBasket
          style={{
            color: theme === 'dark' ? 'var(--text-secondary)' : '#334155',
            width: 40,
            height: 40,
            margin: '0 auto 20px',
            display: 'block',
          }}
        />
      ),
    },
    {
      title: 'Join Game Queues',
      description: 'Queue up for pickup games and tournaments with players in your area.',
      icon: (
        <FaPeopleGroup
          style={{
            color: theme === 'dark' ? 'white' : '#000',
            width: 40,
            height: 40,
            margin: '0 auto 20px',
            display: 'block',
          }}
        />
      ),
    },
    {
      title: 'Verified Locations',
      description: 'All courts are verified and rated by the basketball community.',
      icon: <MdVerified style={{ color: '#22c55e', width: 40, height: 40, margin: '0 auto 20px', display: 'block' }} />,
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
              {feature.icon}
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
