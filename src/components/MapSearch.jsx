import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const MapSearch = ({ onPlaceSelect }) => {
  const map = useMap();
  const places = useMapsLibrary('places');
  const { isDark } = useTheme();

  const [sessionToken, setSessionToken] = useState(null);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [predictionResults, setPredictionResults] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event) => {
      const value = event.target.value;
      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId) => {
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '300px'
    }}>
      <input
        value={inputValue}
        onChange={onInputChange}
        placeholder="Search for a place"
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px var(--shadow)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border)';
          e.target.style.boxShadow = '0 2px 8px var(--shadow)';
        }}
      />
      {predictionResults.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          margin: '4px 0 0 0',
          padding: 0,
          listStyle: 'none',
          zIndex: 1000,
          maxHeight: '200px',
          overflowY: 'auto',
          boxShadow: '0 4px 12px var(--shadow)',
          transition: 'all 0.3s ease'
        }}>
          {predictionResults.map(({ place_id, description }) => (
            <li
              key={place_id}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleSuggestionClick(place_id)}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--bg-tertiary)';
                e.target.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--bg-secondary)';
                e.target.style.color = 'var(--text-primary)';
              }}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;
