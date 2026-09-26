import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/env';
import type { Database } from '@/types/supabase';

export async function getServerProfile() {
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (values: { name: string; value: string; options?: any }[]) => values.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, profile: null as any };

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', user.id)
    .maybeSingle();

  return { supabase, user, profile };
}

export function requireAuth(profile: { role: string } | null) {
  if (!profile) throw new Error('UNAUTHORIZED');
  return profile;
}

export function requireAdmin(profile: { role: string } | null) {
  requireAuth(profile);
  if (profile?.role !== 'firm_admin') throw new Error('FORBIDDEN');
  return profile;
}

export function requireRole(profile: { role: string } | null, allowedRoles: string[]) {
  requireAuth(profile);
  if (!profile || !allowedRoles.includes(profile.role)) throw new Error('FORBIDDEN');
  return profile;
}

export function getFirmId(profile: { firm_id: string | null; id: string } | null) {
  return profile?.firm_id ?? profile?.id ?? null;
}