import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { env } from '@/env';
import type { Database } from '@/types/supabase';

type SupabaseCookie = {
    name: string;
    value: string;
    options: Parameters<ReturnType<typeof cookies>['set']>[2];
};

export function createSupabaseServerClient() {
    const cookieStore = cookies();

    return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet: SupabaseCookie[]) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options),
                    );
                } catch {
                    // Server Components cannot always write cookies. Route handlers and
                    // middleware can persist refreshed sessions through the same client.
                }
            },
        },
    });
}
