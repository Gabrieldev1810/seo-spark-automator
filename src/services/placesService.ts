const GOOGLE_PLACES_API_KEY = 'AIzaSyBjpT6BYfeCJgwMjzlrQ8CrA5CwmVSYAjg';
const GOOGLE_PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

export interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

export interface PlaceDetails {
  name: string;
  formatted_address: string;
  website?: string;
  url?: string;
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
}

export async function searchPlaces(query: string): Promise<PlacePrediction[]> {
  try {
    const response = await fetch(
      `${GOOGLE_PLACES_API_BASE}/autocomplete/json?input=${encodeURIComponent(
        query
      )}&types=establishment&key=${GOOGLE_PLACES_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch places');
    }

    const data = await response.json();
    return data.predictions || [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  try {
    const response = await fetch(
      `${GOOGLE_PLACES_API_BASE}/details/json?place_id=${placeId}&fields=name,formatted_address,website,url,rating,user_ratings_total,photos&key=${GOOGLE_PLACES_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch place details');
    }

    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}

export function getPlacePhotoUrl(photoReference: string, maxWidth: number = 400): string {
  return `${GOOGLE_PLACES_API_BASE}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
} 