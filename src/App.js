import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './auth/Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import About from './components/About';
import Contact from './components/Contact';
import GoogleLoginButton from './components/GoogleButton';
import Navbar from './components/Navbar';
import { auth } from './firebase'; // Import your Firebase auth instance

import './App.css'; // Import the CSS file

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // For showing a loading state

  useEffect(() => {
    // Firebase listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false); // Stop loading once the state is determined
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (loading) {
    return (
      <div className="main-container">
        <p className="text">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      {/* Tailwind Navbar */}
      <Navbar />
      {/* Main Container */}
      <div className="main-container">
        <section className="content-section wide-content">
          <Routes>
            {/* Redirect to Home if authenticated */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate
                    to="/home"
                    replace
                  />
                ) : (
                  <div>
                    <h1 className="header">Welcome to Midpoint</h1>
                    <p className="text">Plan your meet-ups effortlessly. Sign up or log in to get started!</p>
                    <div className="button-group">
                      <button
                        onClick={() => (window.location.href = '/signup')}
                        className="button signup-button"
                      >
                        Sign Up
                      </button>
                      <button
                        onClick={() => (window.location.href = '/login')}
                        className="button login-button"
                      >
                        Log In
                      </button>
                      <GoogleLoginButton className="button google-button" />
                    </div>
                  </div>
                )
              }
            />
            {/* Home route */}
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate
                    to="/"
                    replace
                  />
                )
              }
            />
            {/* Signup route */}
            <Route
              path="/signup"
              element={<Signup />}
            />
            {/* Login route */}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
