'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCases } from '@/hooks/use-cases';
import { HOSPITAL_TYPES, NEGLIGENCE_TYPES, SEVERITY_LEVELS } from '@/types/legal';

export default function NewCasePage() {
    const router = useRouter();
    const { createCase } = useCases({ autoFetch: false });
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [severity, setSeverity] = useState('');
    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setBusy(true);
        setError('');
        const form = new FormData(event.currentTarget);
        const incidentDate = String(form.get('incidentDate') ?? '');
        if (!incidentDate || new Date(`${incidentDate}T00:00:00`) >= new Date()) {
            const message = 'Incident date must be in the past';
            setError(message);
            toast.error(message);
            setBusy(false);
            return;
        }

        try {
            const created = await createCase({
                patientName: String(form.get('patientName') ?? ''),
                patientAge: Number(form.get('patientAge')),
                patientGender: form.get('patientGender') as 'male' | 'female' | 'other',
                nextOfKin: String(form.get('nextOfKin') ?? '') || undefined,
                nextOfKinRelation: String(form.get('nextOfKinRelation') ?? '') || undefined,
                hospitalName: String(form.get('hospitalName') ?? ''),
                hospitalType: form.get('hospitalType') as (typeof HOSPITAL_TYPES)[number],
                hospitalCity: String(form.get('hospitalCity') ?? ''),
                hospitalState: String(form.get('hospitalState') ?? ''),
                negligenceType: form.get('negligenceType') as (typeof NEGLIGENCE_TYPES)[number],
                severity: form.get('severity') as (typeof SEVERITY_LEVELS)[number],
                incidentDate: new Date(`${incidentDate}T00:00:00`).toISOString(),
                incidentDescription: String(form.get('incidentDescription') ?? ''),
                claimAmount: Number(form.get('claimAmount')),
                treatingDoctorName: String(form.get('treatingDoctorName') ?? '') || undefined,
                treatingDoctorRegistration: String(form.get('treatingDoctorRegistration') ?? '') || undefined,
            });
            toast.success(`Case initialized: ${created.caseNumber ?? created.id}`);
            router.push(`/dashboard/cases/${created.id}`);
        } catch (err) {
            const typedError = err as Error & { code?: string };
            const message = typedError.message || 'Unable to create case';
            setError(message);
            toast.error(message);
            if (typedError.code === 'UNAUTHORIZED') {
                router.push('/auth/login?returnTo=/dashboard/cases/new');
            }
            setBusy(false);
        }
    }

    const input = (name: string, label: string, type = 'text', required = true, extra: Record<string, string> = {}) => (
        <label className="block text-sm">{label}<input name={name} required={required} type={type} {...extra} className="mt-1 w-full rounded border p-2" /></label>
    );

    return <main className="mx-auto max-w-3xl px-6 py-10"><h1 className="mb-8 font-serif text-4xl font-semibold">Open a new case</h1><form onSubmit={submit} className="space-y-6 rounded-lg border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
            {input('patientName', 'Patient name')}{input('patientAge', 'Patient age', 'number')}{input('nextOfKin', 'Next of kin', 'text', severity === 'death')}{input('nextOfKinRelation', 'Relationship to patient', 'text', severity === 'death')}
            <label className="block text-sm">Gender<select name="patientGender" className="mt-1 w-full rounded border p-2"><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label>
            {input('hospitalName', 'Hospital name')}{input('hospitalCity', 'Hospital city')}{input('hospitalState', 'Hospital state')}
            <label className="block text-sm">Hospital type<select name="hospitalType" className="mt-1 w-full rounded border p-2">{HOSPITAL_TYPES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="block text-sm">Negligence type<select name="negligenceType" className="mt-1 w-full rounded border p-2">{NEGLIGENCE_TYPES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="block text-sm">Severity<select name="severity" value={severity} onChange={(event) => setSeverity(event.target.value)} className={`mt-1 w-full rounded border p-2 ${severity === 'death' ? 'border-crimson ring-2 ring-crimson/20' : ''}`} required><option value="" disabled>Select severity</option>{SEVERITY_LEVELS.map((item) => <option key={item}>{item}</option>)}</select></label>
            {input('incidentDate', 'Incident date', 'date', true, { max: today })}{input('claimAmount', 'Claim amount (₹)', 'number')}{input('treatingDoctorName', 'Treating doctor', 'text', false)}{input('treatingDoctorRegistration', 'Doctor registration', 'text', false)}
        </div>
        <label className="block text-sm">Incident description<textarea name="incidentDescription" required minLength={10} rows={6} className="mt-1 w-full rounded border p-2" /></label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60">{busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}{busy ? 'Creating…' : 'Create case'}</button>
    </form></main>;
}
