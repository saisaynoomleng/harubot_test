import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    OPENAI_API_KEY: z.string().min(1, { error: 'OpenAI API key is required' }),
    AGENT_MODEL: z.enum(['gpt-5-mini', 'gpt-4o']),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AGENT_MODEL: process.env.AGENT_MODEL,
  },
  skipValidation: !!process.env.SKIP_VALIDATION,
});
