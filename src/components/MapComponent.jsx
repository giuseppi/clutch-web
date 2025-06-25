import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { CourtsService } from '../services/courtsService';
import MapHooks from './MapHooks.jsx';
import MapSearch from './MapSearch.jsx';

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [nearbyCourts, setNearbyCourts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { isDark } = useTheme();

  // Check if Google Maps API key is available
  if (!googleMapsKey) {
    return (
      <div style={{
        height: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Google Maps API Key Missing</h2>
          <p>Please set the VITE_GOOGLE_MAPS_API_KEY environment variable to use the map feature.</p>
        </div>
      </div>
    );
  }

  // Wrap `setUserPosition` in useCallback to prevent re-creation on re-renders
  const handleLocationUpdate = useCallback((position) => {
    setUserPosition(position);
  }, []);

  // Handle place selection from search
  const handlePlaceSelect = useCallback((place) => {
    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setSelectedPlace({ lat, lng });
      setUserPosition({ lat, lng });
    }
  }, []);

  // Fetch nearby courts when user position changes
  useEffect(() => {
    if (userPosition) {
      setLoading(true);
      fetchNearbyCourts();
    }
  }, [userPosition]);

  const fetchNearbyCourts = async () => {
    try {
      const courts = await CourtsService.fetchNearbyCourts(
        userPosition.lat,
        userPosition.lng,
        16093 // 10 miles in meters
      );
      setNearbyCourts(courts);
    } catch (error) {
      console.error('Error fetching courts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <APIProvider apiKey={googleMapsKey}>
      <div style={{
        position: 'relative',
        height: '90vh',
        width: '100%',
        background: 'var(--bg-primary)',
        transition: 'background-color 0.3s ease'
      }}>
        {/* Search Bar */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'var(--bg-secondary)',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 20px var(--shadow)',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{
            margin: '0 0 12px 0',
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            transition: 'color 0.3s ease'
          }}>
            Find Courts
          </h3>
          <MapSearch onPlaceSelect={handlePlaceSelect} />
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 12px var(--shadow)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div className="loading-spinner" style={{ width: '16px', height: '16px' }}></div>
            Finding nearby courts...
          </div>
        )}

        {/* Court Count */}
        {nearbyCourts.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 1000,
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 12px var(--shadow)',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}>
            Found {nearbyCourts.length} court{nearbyCourts.length !== 1 ? 's' : ''} nearby
          </div>
        )}

        <MapHooks onLocationUpdate={handleLocationUpdate} />

        <Map
          key={`${userPosition ? `${userPosition.lat}-${userPosition.lng}` : 'default'}-${isDark ? 'dark' : 'light'}`}
          style={{ height: '100%', width: '100%' }}
          defaultCenter={userPosition || { lat: 33.6846, lng: -117.8265 }} // Default to Irvine
          defaultZoom={12}
          options={{
            styles: isDark ? darkModeStyles : lightModeStyles,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true
          }}
        >
          {/* User's location marker */}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="${isDark ? '#60a5fa' : '#3b82f6'}" stroke="${isDark ? '#1e293b' : '#ffffff'}" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="${isDark ? '#1e293b' : '#ffffff'}"/>
                  </svg>
                `),
                scaledSize: { width: 24, height: 24 }
              }}
            />
          )}

          {/* Court markers */}
          {nearbyCourts.map((court, index) => (
            <Marker
              key={court.place_id || index}
              position={{
                lat: court.geometry?.location?.lat || court.latitude,
                lng: court.geometry?.location?.lng || court.longitude,
              }}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="24" height="24" rx="4" fill="${isDark ? '#f87171' : '#ef4444'}" stroke="${isDark ? '#1e293b' : '#ffffff'}" stroke-width="2"/>
                    <circle cx="16" cy="16" r="6" fill="${isDark ? '#1e293b' : '#ffffff'}"/>
                    <circle cx="16" cy="16" r="3" fill="${isDark ? '#f87171' : '#ef4444'}"/>
                  </svg>
                `),
                scaledSize: { width: 32, height: 32 }
              }}
              title={court.name}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapComponent;

// Dark mode styles
const darkModeStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242526' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#d1d1d1' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1c1c1e' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#1a2833' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#3a3a3c' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#48484a' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#505053' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#636366' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#b8b8b8' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2e2e30' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#2a2a2c' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#2a2a2c' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry', stylers: [{ color: '#2a2a2c' }] },
];

// Light mode styles
const lightModeStyles = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#1e293b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e3f2fd' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#e2e8f0' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#cbd5e1' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f1f5f9' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#f0f9ff' }] },
  { featureType: 'landscape.man_made', elementType: 'geometry', stylers: [{ color: '#f8fafc' }] },
];
