import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    OPEN_AI_API_KEY: z.string().min(1, { error: 'OpenAI API key is required' }),
  },
  runtimeEnv: {
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  },
});
