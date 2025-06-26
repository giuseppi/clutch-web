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
import { ThemeProvider } from './contexts/ThemeContext';
import { auth } from './firebase';

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
            element={<Account />}
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
