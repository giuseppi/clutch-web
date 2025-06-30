import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiBasketballBasket } from 'react-icons/gi';
import { MdVerified } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleButton.jsx';
import { useTheme } from '../contexts/useTheme';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-content">
            <h1 className="auth-form-title">Welcome back</h1>
            <p className="auth-form-subtitle">Sign in to your account</p>

            <form
              onSubmit={handleSubmit}
              className="auth-form"
            >
              <div className="auth-form-group">
                <label className="auth-form-label">Email</label>
                <input
                  type="email"
                  className="auth-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Password</label>
                <input
                  type="password"
                  className="auth-form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && <div className="auth-error-message">{error}</div>}

              <button
                type="submit"
                className="auth-form-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">or</span>
              <div className="auth-divider-line"></div>
            </div>

            {/* Google Login Button */}
            <GoogleLoginButton />

            <div className="auth-footer">
              <p className="auth-footer-text">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="auth-footer-link"
                >
                  Sign Up Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="auth-content-section">
          <div className="auth-content">
            <h2 className="auth-content-title">
              Join the
              <br />
              <span className="gradient-text">Basketball Revolution.</span>
            </h2>
            <p className="auth-content-subtitle">
              Connect with courts and players in your area. Find verified locations, join pickup games, and never wait for a court again.
            </p>
            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <GiBasketballBasket
                    style={{
                      color: theme === 'dark' ? 'var(--text-secondary)' : '#334155',
                      width: 24,
                      height: 24,
                      display: 'block',
                    }}
                  />
                </div>
                <div className="auth-feature-text">Find courts instantly</div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <FaPeopleGroup
                    style={{
                      color: theme === 'dark' ? 'white' : '#000',
                      width: 24,
                      height: 24,
                      display: 'block',
                    }}
                  />
                </div>
                <div className="auth-feature-text">Join game queues</div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <MdVerified
                    style={{
                      color: '#22c55e',
                      width: 24,
                      height: 24,
                      display: 'block',
                    }}
                  />
                </div>
                <div className="auth-feature-text">Verified locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
