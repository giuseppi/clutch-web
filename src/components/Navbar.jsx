import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ChartBarIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { FaBasketballBall } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/useTheme';
import { auth } from '../firebase';
import ThemeToggle from './ThemeToggle';

// Reusable style objects
const styles = {
  nav: {
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
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    width: '100%',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: '24px',
  },
  navLink: {
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  dropdownContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdownButton: {
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
  },
  dropdownMenu: {
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
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
  },
  dropdownIcon: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    color: 'var(--text-secondary)',
  },
  separator: {
    height: '1px',
    backgroundColor: 'var(--border)',
    margin: '4px 0',
  },
  signOutButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    padding: '8px 16px',
    color: 'var(--error)',
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  authButton: {
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
  },
  mobileMenuButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderTop: 'none',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0 10px 25px var(--shadow)',
    zIndex: 1000,
    padding: '16px',
  },
  mobileMenuItem: {
    display: 'block',
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    textDecoration: 'none',
    borderBottom: '1px solid var(--border)',
    transition: 'background-color 0.2s ease',
  },
};

// Reusable components
const NavLink = ({ to, children, isActive }) => (
  <Link
    to={to}
    className={`nav-link ${isActive ? 'active' : ''}`}
    style={styles.navLink}
  >
    {children}
  </Link>
);

const DropdownItem = (
  { to, icon: Icon, children, active } // eslint-disable-line no-unused-vars
) => (
  <Link
    to={to}
    style={{
      ...styles.dropdownItem,
      backgroundColor: active ? 'var(--bg-tertiary)' : 'transparent',
    }}
  >
    <Icon style={styles.dropdownIcon} />
    {children}
  </Link>
);

const SignOutButton = ({ active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.signOutButton,
      backgroundColor: active ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
    }}
  >
    Sign Out
  </button>
);

const AuthButton = ({ to, children }) => (
  <Link
    to={to}
    style={styles.authButton}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = 'var(--bg-secondary)';
      e.target.style.transform = 'translateY(-1px)';
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'var(--bg-tertiary)';
      e.target.style.transform = 'translateY(0)';
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(auth.currentUser);
  const buttonRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        // Focus will be handled by Headless UI
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <Link
          to="/"
          className="navbar-logo"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaBasketballBall style={{ color: theme === 'dark' ? '#667eea' : '#60a5fa', fontSize: 32, verticalAlign: 'middle' }} />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={styles.navLinks}>
            <NavLink
              to="/"
              isActive={isActive('/')}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              isActive={isActive('/about')}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              isActive={isActive('/contact')}
            >
              Contact
            </NavLink>
          </div>
        )}

        {/* Right Side - User Actions & Theme Toggle */}
        <div style={styles.rightSection}>
          {user ? (
            <>
              {/* Desktop User Menu */}
              {!isMobile && (
                <Menu
                  as="div"
                  style={styles.dropdownContainer}
                >
                  <div>
                    <Menu.Button
                      ref={buttonRef}
                      className="dropdown-button"
                      style={styles.dropdownButton}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
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
                    <Menu.Items style={styles.dropdownMenu}>
                      <div>
                        <Menu.Item>
                          {({ active }) => (
                            <DropdownItem
                              to="/account"
                              icon={UserIcon}
                              active={active}
                            >
                              Account Settings
                            </DropdownItem>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <DropdownItem
                              to="/account?tab=stats"
                              icon={ChartBarIcon}
                              active={active}
                            >
                              Stats
                            </DropdownItem>
                          )}
                        </Menu.Item>
                        <div style={styles.separator}></div>
                        <Menu.Item>
                          {({ active }) => (
                            <SignOutButton
                              active={active}
                              onClick={handleSignOut}
                            />
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={toggleMobileMenu}
                  style={styles.mobileMenuButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--bg-secondary)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--bg-tertiary)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <Bars3Icon style={{ width: '20px', height: '20px' }} />
                  )}
                </button>
              )}
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <AuthButton to="/login">Login</AuthButton>
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

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border)',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  fontWeight: '500',
                }}
              >
                Navigation
              </span>
            </div>
            <Link
              to="/"
              style={{
                ...styles.mobileMenuItem,
                backgroundColor: isActive('/') ? 'var(--bg-tertiary)' : 'transparent',
              }}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                ...styles.mobileMenuItem,
                backgroundColor: isActive('/about') ? 'var(--bg-tertiary)' : 'transparent',
              }}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={{
                ...styles.mobileMenuItem,
                backgroundColor: isActive('/contact') ? 'var(--bg-tertiary)' : 'transparent',
              }}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </div>

          {user && (
            <div>
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    fontWeight: '500',
                  }}
                >
                  Account
                </span>
              </div>
              <div
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '8px',
                }}
              >
                {user.displayName || user.email}
              </div>
              <Link
                to="/account"
                style={styles.mobileMenuItem}
                onClick={closeMobileMenu}
              >
                Account Settings
              </Link>
              <Link
                to="/account?tab=stats"
                style={styles.mobileMenuItem}
                onClick={closeMobileMenu}
              >
                Stats
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  closeMobileMenu();
                }}
                style={{
                  ...styles.mobileMenuItem,
                  width: '100%',
                  textAlign: 'left',
                  color: 'var(--error)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
