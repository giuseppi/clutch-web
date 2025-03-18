import { Button, Navbar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import HomeButton from './HomeButton';

const MidpointNavbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check the user's authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Update state based on user presence
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase logout
      navigate('/'); // Redirect to home or login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="bg-gray-800 bg-opacity-80 backdrop-blur-sm dark:text-white shadow-md"
    >
      <Navbar.Brand href="/">
        <div className="flex items-center space-x-3">
          <HomeButton />
          <span className="whitespace-nowrap text-xl font-semibold dark:text-white">Midpoint</span>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle className="text-gray-400 hover:text-gray-400 hover:bg-gray-800 transition duration-300" />
      <Navbar.Collapse className="lg:flex lg:items-center lg:space-x-4 space-y-2">
        <Navbar.Link
          href="/"
          active={pathname === '/'}
          className="hover:text-gray-300 hover:bg-gray-700 font-bold px-3 py-2 rounded-md transition duration-300"
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/about"
          active={pathname === '/about'}
          className="hover:text-gray-300 hover:bg-gray-700 font-bold px-3 py-2 rounded-md transition duration-300"
        >
          About
        </Navbar.Link>
        <Navbar.Link
          href="/contact"
          active={pathname === '/contact'}
          className="hover:text-gray-300 hover:bg-gray-700 font-bold px-3 py-2 rounded-md transition duration-300 mr-2"
        >
          Contact
        </Navbar.Link>
        {isAuthenticated && (
          <Button
            onClick={handleLogout}
            className=" bg-gray-900 hover:bg-red-950 text-white font-bold rounded-md transition duration-300"
          >
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MidpointNavbar;
