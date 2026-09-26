// ✓ FILE COMPLETE — case-queues.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, FileText, Gavel, Loader2 } from 'lucide-react';
import { useCases } from '@/hooks/use-cases';
import { PageHeader } from '@/components/shared/page-header';
import { Panel } from '@/components/shared/ui';
import { EmptyState } from '@/components/shared/empty-state';
import { StatusBadge } from '@/components/shared/status-badge';

type QueueCase = Record<string, unknown> & { id: string };

export function CaseQueue({ mode }: { mode: 'evidence' | 'odr' }) {
    const { cases, loading, error } = useCases();
    const title = mode === 'evidence' ? 'Evidence vault' : 'ODR & filings';
    const description = mode === 'evidence' ? 'Jump into a matter to upload, verify and organise its medical records.' : 'Keep filing readiness, forum and limitation checks visible across your matters.';
    const Icon = mode === 'evidence' ? FileText : Gavel;
    return (
        <div className="space-y-8">
            <PageHeader eyebrow="Firm workspace" title={title} description={description} />
            <Panel>
                {error && <p className="border-b border-crimson-100 bg-crimson-50 px-5 py-3 text-sm text-crimson">{error}</p>}
                {loading ? <div className="flex items-center justify-center gap-2 p-16 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" />Loading matters…</div> : cases.length === 0 ? <EmptyState title="No matters to review" description="Open a case first, then return here to manage its evidence and filing workflow." action={<Link href="/dashboard/cases/new" className="inline-flex h-9 items-center rounded-md bg-navy px-3 text-xs font-semibold text-white">Open a case</Link>} /> : <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">{(cases as unknown as QueueCase[]).map((item) => <Link key={item.id} href={`/dashboard/cases/${item.id}`} className="group rounded-lg border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-gold-200 hover:shadow-sm"><div className="flex items-start justify-between gap-3"><span className="rounded-md bg-navy-50 p-2 text-navy"><Icon className="h-4 w-4" /></span><ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:text-gold-600" /></div><p className="mt-4 font-medium text-navy">{String(item.patient_name ?? item.patientName ?? 'Unnamed patient')}</p><p className="mt-1 text-xs text-slate-500">{String(item.case_number ?? item.caseNumber ?? 'Matter')}</p><div className="mt-4 flex items-center justify-between"><StatusBadge status={String(item.status ?? 'intake')} /><span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">{mode === 'evidence' ? 'Open evidence' : 'Open filing checks'} <BriefcaseBusiness className="h-3.5 w-3.5" /></span></div></Link>)}</div>}
            </Panel>
        </div>
    );
}
