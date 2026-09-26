'use client';
import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignupPage() {
    const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); const [error, setError] = useState('');
    async function submit(e: FormEvent) { e.preventDefault(); setError(''); const { error } = await createSupabaseBrowserClient().auth.signUp({ email, password, options: { data: { full_name: name } } }); if (error) setError(error.message); else setMessage('Check your email to confirm your account.'); }
    return <main className="mx-auto flex min-h-screen max-w-md items-center px-6"><form onSubmit={submit} className="w-full space-y-5 rounded-lg border bg-card p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-semibold">Create your account</h1>
        <label className="block text-sm">Full name<input required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded border p-2" /></label>
        <label className="block text-sm">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded border p-2" /></label>
        <label className="block text-sm">Password<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded border p-2" /></label>
        {error && <p className="text-sm text-destructive">{error}</p>}{message && <p className="text-sm text-green-700">{message}</p>}<button className="w-full rounded bg-primary p-2 text-primary-foreground">Create account</button>
        <p className="text-sm">Already registered? <Link className="underline" href="/auth/login">Sign in</Link></p>
    </form></main>;
}
