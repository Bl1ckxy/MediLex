import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
    const url = new URL(request.url); const code = url.searchParams.get('code');
    if (code) await (await createSupabaseServerClient()).auth.exchangeCodeForSession(code);
    const returnTo = url.searchParams.get('returnTo');
    const destination = returnTo?.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/dashboard';
    return NextResponse.redirect(new URL(destination, url.origin));
}
