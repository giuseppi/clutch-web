import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { FaBoltLightning, FaTrophy } from 'react-icons/fa6';
import { GiBasketballBasket } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleButton.jsx';
import { useTheme } from '../contexts/useTheme';
import { auth } from '../firebase';
import { createUserProfile, logSessionActivity } from '../services/userService.js';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Supabase
      const { error: profileError } = await createUserProfile(user);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Don't fail the signup if profile creation fails, but log it
        // The user can still use the app, and we can retry profile creation later
      }

      // Log login activity (signup counts as first login)
      await logSessionActivity(user.uid, 'login');

      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError('Failed to create account. Please try again.');
      }
      console.error('Signup error:', error);
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
            <h1 className="auth-form-title">Join Clutch</h1>
            <p className="auth-form-subtitle">Create your account to get started</p>

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
                  placeholder="Create a password (min 6 characters)"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-form-label">Confirm Password</label>
                <input
                  type="password"
                  className="auth-form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
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
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
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
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="auth-footer-link"
                >
                  Sign In Now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="auth-content-section">
          <div className="auth-content">
            <h2 className="auth-content-title">
              Find Your <span className="gradient-text">Court.</span>
              <br />
              Find Your <span className="gradient-text">Game.</span>
            </h2>
            <p className="auth-content-subtitle">
              Join thousands of basketball players discovering courts, joining games, and building communities. Start your basketball journey today.
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
                <div className="auth-feature-text">Discover nearby courts</div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <FaBoltLightning
                    style={{
                      color: '#87CEEB', // Lighter, brighter Thor-like blue
                      width: 24,
                      height: 24,
                      display: 'block',
                    }}
                  />
                </div>
                <div className="auth-feature-text">Instant game matching</div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <FaTrophy
                    style={{
                      color: '#ffd700', // gold
                      width: 24,
                      height: 24,
                      display: 'block',
                    }}
                  />
                </div>
                <div className="auth-feature-text">Join tournaments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
