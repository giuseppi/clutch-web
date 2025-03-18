import { APIProvider, Map } from '@vis.gl/react-google-maps';
import React, { useCallback, useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import MapHooks from './MapHooks';
import MapSearch from './MapSearch';

const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapComponent = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  // Wrap `setUserPosition` in useCallback to prevent re-creation on re-renders
  const handleLocationUpdate = useCallback((position) => {
    setUserPosition(position);
  }, []);

  return (
    <APIProvider apiKey={googleMapsKey}>
      <div style={{ position: 'relative', height: '90vh', width: '100%' }}>
        <MapHooks onLocationUpdate={handleLocationUpdate} />
        {/* <Autocomplete
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          options={{
            types: ['establishment'],
            componentRestrictions: { country: 'us' },
          }}
          style={{
            position: 'absolute',
            top: '1vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '250px',
            padding: '12px',
            fontSize: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'white',
            zIndex: 1000,
            boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
            color: 'black',
          }}
        /> */}
        <MapSearch
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #444', // Darker border for dark mode
            borderRadius: '5px',
            backgroundColor: '#2c2c2e', // Darker background for input field
            color: '#d1d1d1', // Light text color
            outline: 'none',
          }}
        />
        <Map
          key={userPosition ? `${userPosition.lat}-${userPosition.lng}` : 'default'}
          style={{ height: '100%', width: '100%' }}
          defaultCenter={userPosition || { lat: 33.6846, lng: -117.8265 }} // Use user location only if available, otherwise default to Irvine
          defaultZoom={12}
          options={{ styles: darkModeStyles }}
        />
      </div>
    </APIProvider>
  );
};

export default MapComponent;

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
];
