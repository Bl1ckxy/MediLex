'use client';
import { useCallback, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const client = createSupabaseBrowserClient();
        void client.auth.getUser()
            .then(({ data }) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
        const { data: subscription } = client.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
        return () => subscription.subscription.unsubscribe();
    }, []);
    const signOut = useCallback(async () => { await createSupabaseBrowserClient().auth.signOut(); setUser(null); }, []);
    return { user, loading, isLoading: loading, signOut, isAuthenticated: Boolean(user) };
}
