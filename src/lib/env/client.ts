import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_OPEN_METEO_URL: z.url({ error: 'Must be a valid URL' }),
  },
  runtimeEnv: {
    NEXT_PUBLIC_OPEN_METEO_URL: process.env.NEXT_PUBLIC_OPEN_METEO_URL,
  },
});
