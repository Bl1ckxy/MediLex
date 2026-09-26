import { createClient } from '@supabase/supabase-js';

import { env } from '@/env';
import type { Database } from '@/types/supabase';

export function createSupabaseAdminClient() {
    return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}
