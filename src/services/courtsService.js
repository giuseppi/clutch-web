import { supabase } from '../config/supabase';

// Google Places API service for finding basketball courts
export class CourtsService {
  // Fetch courts from Google Places API within 10-mile radius
  static async fetchNearbyCourts(lat, lng, radius = 16093) { // 10 miles = 16093 meters
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=basketball_court&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();

      if (data.status === 'OK') {
        // Store courts in Supabase for caching
        await this.storeCourtsInSupabase(data.results, lat, lng);
        return data.results;
      } else {
        console.error('Google Places API error:', data.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching nearby courts:', error);
      // Fallback to cached data from Supabase
      return await this.getCachedCourts(lat, lng);
    }
  }

  // Store courts data in Supabase
  static async storeCourtsInSupabase(courts, searchLat, searchLng) {
    try {
      const courtsToInsert = courts.map(court => ({
        place_id: court.place_id,
        name: court.name,
        address: court.vicinity,
        latitude: court.geometry.location.lat,
        longitude: court.geometry.location.lng,
        rating: court.rating || null,
        user_ratings_total: court.user_ratings_total || 0,
        search_latitude: searchLat,
        search_longitude: searchLng,
        last_updated: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('courts')
        .upsert(courtsToInsert, { onConflict: 'place_id' });

      if (error) {
        console.error('Error storing courts in Supabase:', error);
      }
    } catch (error) {
      console.error('Error in storeCourtsInSupabase:', error);
    }
  }

  // Get cached courts from Supabase
  static async getCachedCourts(lat, lng, radius = 16093) {
    try {
      // Calculate bounding box for 10-mile radius
      const latDelta = radius / 111320; // meters to degrees
      const lngDelta = radius / (111320 * Math.cos(lat * Math.PI / 180));

      const { data, error } = await supabase
        .from('courts')
        .select('*')
        .gte('latitude', lat - latDelta)
        .lte('latitude', lat + latDelta)
        .gte('longitude', lng - lngDelta)
        .lte('longitude', lng + lngDelta)
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching cached courts:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getCachedCourts:', error);
      return [];
    }
  }

  // Get court details from Google Places API
  static async getCourtDetails(placeId) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,rating,user_ratings_total,opening_hours,photos&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();

      if (data.status === 'OK') {
        return data.result;
      } else {
        console.error('Error fetching court details:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Error in getCourtDetails:', error);
      return null;
    }
  }

  // Get courts with active games
  static async getCourtsWithGames() {
    try {
      const { data, error } = await supabase
        .from('courts')
        .select(`
          *,
          games!inner(*)
        `)
        .eq('games.status', 'open');

      if (error) {
        console.error('Error fetching courts with games:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getCourtsWithGames:', error);
      return [];
    }
  }
}