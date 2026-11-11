import { env } from './env/client';
import { type GeoLocation } from './types';

export const getLocation = async (input: string): Promise<GeoLocation> => {
  try {
    const params = new URLSearchParams({
      name: input,
      count: '1',
      language: 'en',
      format: 'json',
    });

    const response = await fetch(`${env.NEXT_PUBLIC_OPEN_METEO_URL}${params}`);

    if (!response.ok) {
      console.error(`Cannot get location ${input}`);
    }

    const data = await response.json();
    const result = data.results?.[0];

    return {
      city: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone,
      country: result.country,
    };
  } catch (error) {
    console.error('getLocation error', error);

    return {
      city: '',
      latitude: '',
      longitude: '',
      timezone: '',
      country: '',
    };
  }
};
