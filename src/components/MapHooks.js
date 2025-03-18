import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const MapHooks = ({ onLocationUpdate, onMapReady }) => {
  const [userPosition, setUserPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);

  const map = useMap(); // Get access to the Google Map instance

  // Ensures map's instance is ready before calling onMapReady
  useEffect(() => {
    if (map && typeof onMapReady === 'function') {
      // Ensure it's a function before calling
      console.log('Map instance loaded:', map);
      onMapReady(map);
    }
  }, [map, onMapReady]);

  // Get user's geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      setGeoError('Geolocation is not supported');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000, // Increased timeout to reduce timeouts
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('User location:', latitude, longitude);
        setUserPosition({ lat: latitude, lng: longitude });
        onLocationUpdate({ lat: latitude, lng: longitude }); // Pass data to parent component
      },
      (error) => {
        console.error('Geolocation error:', error);
        setGeoError(error.message);
      },
      options
    );
  }, [onLocationUpdate]);

  // Ensure useMap() runs only when map is available
  useEffect(() => {
    if (!map) {
      console.warn('Map instance is not available yet.');
      return;
    }
    console.log('Map instance loaded', map);
  }, [map]); // Runs when `map` becomes available

  return null; // No UI, just logic
};

export default MapHooks;
