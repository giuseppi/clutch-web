import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

const MapHooks = ({ onLocationUpdate, onMapReady }) => {
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
        onLocationUpdate({ lat: latitude, lng: longitude }); // Pass data to parent component
      },
      (error) => {
        console.error('Geolocation error:', error);
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
