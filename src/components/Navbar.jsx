import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '15px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px var(--shadow)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: 'var(--text-primary)',
          fontSize: '24px',
          fontWeight: '700',
          background: 'linear-gradient(45deg, var(--accent), var(--success))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'all 0.3s ease'
        }}>
          Clutch
        </Link>

        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>

          <ThemeToggle />

          {user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <span style={{
                color: 'var(--text-secondary)',
                fontSize: '14px'
              }}>
                Welcome, {user.email}
              </span>
              <button
                onClick={handleSignOut}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: 'var(--error)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--bg-secondary)';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'var(--bg-tertiary)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(45deg, var(--accent), var(--accent-hover))',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
