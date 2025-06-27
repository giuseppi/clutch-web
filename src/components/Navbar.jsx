import { Menu, Transition } from '@headlessui/react';
import { ChartBarIcon, UserIcon } from '@heroicons/react/24/outline';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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
              <Menu
                as="div"
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <div>
                  <Menu.Button
                    className="dropdown-button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '6px 12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: '500',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      WebkitTouchCallout: 'none',
                      WebkitTapHighlightColor: 'transparent',
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
                    <span>{user.displayName || user.email}</span>
                  </Menu.Button>
                </div>

                <Transition
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 scale-95 -translate-y-1"
                  enterTo="opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 scale-100 translate-y-0"
                  leaveTo="opacity-0 scale-95 -translate-y-1"
                >
                  <Menu.Items
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      zIndex: 10,
                      marginTop: '4px',
                      width: '200px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px var(--shadow)',
                      padding: '8px 0',
                      transformOrigin: 'top right',
                      outline: 'none',
                    }}
                  >
                    <div>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px 16px',
                              color: 'var(--text-primary)',
                              fontSize: '13px',
                              fontWeight: '500',
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              textDecoration: 'none',
                              backgroundColor: active ? 'var(--bg-tertiary)' : 'transparent',
                              transition: 'background-color 0.2s ease',
                            }}
                          >
                            <UserIcon style={{ width: '16px', height: '16px', marginRight: '8px', color: 'var(--text-secondary)' }} />
                            Account Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account?tab=stats"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px 16px',
                              color: 'var(--text-primary)',
                              fontSize: '13px',
                              fontWeight: '500',
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              textDecoration: 'none',
                              backgroundColor: active ? 'var(--bg-tertiary)' : 'transparent',
                              transition: 'background-color 0.2s ease',
                            }}
                          >
                            <ChartBarIcon style={{ width: '16px', height: '16px', marginRight: '8px', color: 'var(--text-secondary)' }} />
                            Stats
                          </Link>
                        )}
                      </Menu.Item>
                      <div
                        style={{
                          height: '1px',
                          backgroundColor: 'var(--border)',
                          margin: '4px 0',
                        }}
                      ></div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            style={{
                              display: 'block',
                              width: '100%',
                              textAlign: 'left',
                              padding: '8px 16px',
                              color: 'var(--error)',
                              fontSize: '13px',
                              fontWeight: '500',
                              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              backgroundColor: active ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s ease',
                            }}
                          >
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
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
                className="navbar-signup-button"
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
