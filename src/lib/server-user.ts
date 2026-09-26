import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getProfile() {
    const supabase = createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return { supabase, authUser: null, profile: null };
    const users = (supabase as any).from('users');
    const { data: profile, error: profileError } = await users
        .select('*')
        .eq('auth_id', user.id)
        .maybeSingle();

    if (profile) return { supabase, authUser: user, profile };
    if (profileError && profileError.code !== 'PGRST116') {
        return { supabase, authUser: user, profile: null };
    }

    const email = user.email;
    if (!email) return { supabase, authUser: user, profile: null };

    const metadata = user.user_metadata as { full_name?: string; name?: string } | undefined;
    const fullName = metadata?.full_name?.trim() || metadata?.name?.trim() || email.split('@')[0];
    const { data: createdProfile, error: createError } = await users
        .insert({ auth_id: user.id, email, full_name: fullName })
        .select('*')
        .single();

    if (!createError && createdProfile) {
        return { supabase, authUser: user, profile: createdProfile };
    }

    const { data: existingProfile } = await users
        .select('*')
        .eq('auth_id', user.id)
        .maybeSingle();
    return { supabase, authUser: user, profile: existingProfile ?? null };
}
