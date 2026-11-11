import { getLocation } from '@/lib/helper';
import { tool } from 'ai';
import * as z from 'zod';

export const getDateTime = tool({
  description:
    'Get the current date and time for a specific city or zip. And output as US Date Time.',
  inputSchema: z.object({
    city: z.string().optional().describe('City name for date & time look up.'),
    country: z
      .string()
      .optional()
      .describe('country name for date & time look up.'),
  }),
  execute: async ({ city, country }) => {
    const location = city
      ? await getLocation(city)
      : country
        ? await getLocation(country)
        : await getLocation('cleveland');

    const formatDate = (timezone: string) => {
      const today = new Date();
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      }).format(today);
    };

    return {
      city: location.city,
      country: location.country,
      timezone: location.timezone,
      latitude: location.latitude,
      longitude: location.longitude,
      currentTime: formatDate(location.timezone),
    };
  },
});
