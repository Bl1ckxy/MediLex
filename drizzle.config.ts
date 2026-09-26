import type { Config } from 'drizzle-kit';

export default {
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        url: process.env.SUPABASE_DATABASE_URL ?? process.env.DATABASE_URL!,
    },
} satisfies Config;
// âœ“ FILE COMPLETE â€” drizzle.config.ts