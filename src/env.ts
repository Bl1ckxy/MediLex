import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
        SUPABASE_DATABASE_URL: z
            .string()
            .url('SUPABASE_DATABASE_URL must be a valid PostgreSQL connection URL'),
        GROQ_API_KEY: z.string().min(1, 'GROQ_API_KEY is required'),
        GOOGLE_AI_API_KEY: z.string().min(1, 'GOOGLE_AI_API_KEY is required'),
        COHERE_API_KEY: z.string().min(1, 'COHERE_API_KEY is required'),
        GOOGLE_AI_MODEL: z.string().min(1).default('gemini-3.6-flash'),
        GROQ_MODEL: z.string().min(1).default('openai/gpt-oss-20b'),
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
    },
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z
            .string()
            .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
        NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
    },
    runtimeEnv: {
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL ?? process.env.DATABASE_URL,
        GROQ_API_KEY: process.env.GROQ_API_KEY,
        GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
        COHERE_API_KEY: process.env.COHERE_API_KEY,
        GOOGLE_AI_MODEL: process.env.GOOGLE_AI_MODEL,
        GROQ_MODEL: process.env.GROQ_MODEL,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
// âœ“ FILE COMPLETE â€” src/env.ts