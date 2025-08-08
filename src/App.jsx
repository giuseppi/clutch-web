import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './auth/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import About from './components/About';
import Account from './components/Account';
import Contact from './components/Contact';
import MapComponent from './components/MapComponent';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SessionTracker from './components/SessionTracker';
import { ThemeProvider } from './contexts/ThemeContext';
import { auth } from './firebase';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Page transition wrapper component
const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [children]);

  return <div className={`page-transition ${isVisible ? 'visible' : ''}`}>{children}</div>;
};

// Main app content
const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div
          className="loading-spinner"
          style={{ width: '40px', height: '40px' }}
        ></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/map"
            element={<MapComponent />}
          />
          <Route
            path="/sessions"
            element={
              <ProtectedRoute>
                <SessionTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </PageTransition>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
          }}
        >
          <h1>Something went wrong</h1>
          <p>Please refresh the page or contact support.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              margin: '10px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
          {import.meta.env.DEV && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Error Details (Development)</summary>
              <pre
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '10px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxWidth: '100%',
                }}
              >
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

export default App;
