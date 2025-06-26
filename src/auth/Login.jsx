import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleButton.jsx';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="main-container">
      <div className="form-container">
        <h2
          className="header"
          style={{ fontSize: '2.5rem', marginBottom: '30px' }}
        >
          Welcome Back!
        </h2>
        <p
          className="text"
          style={{ marginBottom: '30px' }}
        >
          Sign in to your account to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="form-button"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '30px 0',
            color: 'var(--text-secondary)',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'var(--border)',
            }}
          ></div>
          <span
            style={{
              padding: '0 15px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            or
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'var(--border)',
            }}
          ></div>
        </div>

        {/* Google Login Button */}
        <GoogleLoginButton />

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>Don't have an account?</p>
          <Link
            to="/signup"
            className="link"
          >
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
