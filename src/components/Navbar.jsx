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
    <nav
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px var(--shadow)',
        transition: 'all 0.3s ease',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          width: '100%',
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '20px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--success) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transition: 'all 0.3s ease',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.025em',
          }}
          className="navbar-logo"
        >
          Clutch
        </Link>

        {/* Center Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: '24px',
          }}
        >
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            style={{
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            style={{
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            style={{
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Contact
          </Link>
        </div>

        {/* Right Side - User Actions & Theme Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {user ? (
            <>
              <span
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  fontWeight: '500',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {user.displayName || user.email}
              </span>
              <Link
                to="/account"
                className={`nav-link ${isActive('/account') ? 'active' : ''}`}
                style={{
                  fontSize: '13px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                Account
              </Link>
              <button
                onClick={handleSignOut}
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--error)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <Link
                to="/login"
                style={{
                  padding: '6px 12px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                  padding: '6px 12px',
                  background: 'linear-gradient(45deg, var(--accent), var(--accent-hover))',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

          {/* Theme Toggle - Far Right */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
