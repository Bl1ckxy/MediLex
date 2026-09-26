// ✓ FILE COMPLETE — cases-list.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, BriefcaseBusiness, Filter, Plus, RefreshCw, Search, SlidersHorizontal } from 'lucide-react';
import { useCases } from '@/hooks/use-cases';
import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { Panel, Button, Skeleton } from '@/components/shared/ui';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CASE_STATUS_LABELS, CASE_STATUSES, NEGLIGENCE_TYPE_LABELS, type CaseStatus, type NegligenceType } from '@/types/legal';

type CaseRecord = Record<string, unknown> & { id: string };

function dateLabel(value: unknown) {
    if (!value) return '—';
    try {
        return formatDate(String(value));
    } catch {
        return '—';
    }
}

export function CasesList() {
    const { cases, loading, error, refresh } = useCases();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<'all' | CaseStatus>('all');
    const [showFilters, setShowFilters] = useState(false);
    const filtered = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        return (cases as unknown as CaseRecord[]).filter((item) => {
            const matchesQuery = !normalized || [item.patient_name, item.patientName, item.case_number, item.caseNumber, item.hospital_name, item.hospitalName].some((value) => String(value ?? '').toLowerCase().includes(normalized));
            return matchesQuery && (status === 'all' || item.status === status);
        });
    }, [cases, query, status]);

    return (
        <div className="space-y-8">
            <PageHeader eyebrow="Matter management" title="Cases" description="A single source of truth for your firm’s medical negligence matters." action={<Link href="/dashboard/cases/new" className="inline-flex h-10 items-center gap-2 rounded-md bg-navy px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-700"><Plus className="h-4 w-4" />New case</Link>} />
            <Panel className="overflow-hidden">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="Search patient, case number or hospital" aria-label="Search cases" /></div>
                    <div className="flex items-center gap-2"><button onClick={() => setShowFilters((value) => !value)} className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50"><SlidersHorizontal className="h-4 w-4" />Filters {status !== 'all' && <span className="rounded-full bg-gold-100 px-1.5 text-xs text-gold-600">1</span>}</button><Button variant="ghost" size="sm" onClick={() => void refresh()}><RefreshCw className="h-4 w-4" />Refresh</Button></div>
                </div>
                {showFilters && <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-3"><Filter className="h-4 w-4 text-slate-400" /><span className="mr-1 text-xs font-semibold text-slate-500">Stage</span><button onClick={() => setStatus('all')} className={`rounded-full px-3 py-1 text-xs font-medium ${status === 'all' ? 'bg-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>All</button>{CASE_STATUSES.map((item) => <button key={item} onClick={() => setStatus(item)} className={`rounded-full px-3 py-1 text-xs font-medium ${status === item ? 'bg-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{CASE_STATUS_LABELS[item]}</button>)}</div>}
                {error && <div className="border-b border-crimson-100 bg-crimson-50 px-5 py-3 text-sm text-crimson">{error}</div>}
                {loading ? <div className="space-y-4 p-5">{[1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-16 w-full" />)}</div> : filtered.length === 0 ? <EmptyState title={query || status !== 'all' ? 'No matching cases' : 'Your case list is empty'} description={query || status !== 'all' ? 'Try a different search or clear the filters.' : 'Open your first case to bring the facts, evidence and legal analysis together.'} action={!query && status === 'all' ? <Link href="/dashboard/cases/new" className="inline-flex h-9 items-center gap-2 rounded-md bg-navy px-3 text-xs font-semibold text-white"><Plus className="h-3.5 w-3.5" />Open a case</Link> : undefined} /> : <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3 font-semibold">Matter</th><th className="px-5 py-3 font-semibold">Negligence</th><th className="px-5 py-3 font-semibold">Stage</th><th className="px-5 py-3 font-semibold">Claim value</th><th className="px-5 py-3 font-semibold">Opened</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-slate-100">{filtered.map((item) => { const name = String(item.patient_name ?? item.patientName ?? 'Unnamed patient'); const negligence = String(item.negligence_type ?? item.negligenceType ?? 'other') as NegligenceType; return <tr key={item.id} className="group transition hover:bg-slate-50"><td className="px-5 py-4"><Link href={`/dashboard/cases/${item.id}`} className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50 text-navy"><BriefcaseBusiness className="h-4 w-4" /></span><span><span className="block font-medium text-navy hover:text-gold-600">{name}</span><span className="mt-1 block text-xs text-slate-500">{String(item.case_number ?? item.caseNumber ?? 'Matter')} · {String(item.hospital_name ?? item.hospitalName ?? 'Hospital not recorded')}</span></span></Link></td><td className="px-5 py-4 text-slate-600">{NEGLIGENCE_TYPE_LABELS[negligence] ?? negligence.replace(/_/g, ' ')}</td><td className="px-5 py-4"><StatusBadge status={String(item.status ?? 'intake')} /></td><td className="px-5 py-4 font-medium text-navy">{formatCurrency(Number(item.claim_amount ?? item.claimAmount ?? 0))}</td><td className="px-5 py-4 text-slate-500">{dateLabel(item.created_at ?? item.createdAt)}</td><td className="px-5 py-4 text-right"><Link href={`/dashboard/cases/${item.id}`} className="inline-flex rounded p-2 text-slate-400 opacity-0 transition hover:bg-white hover:text-navy group-hover:opacity-100" aria-label={`Open ${name}`}><ArrowRight className="h-4 w-4" /></Link></td></tr>; })}</tbody></table></div>}
            </Panel>
            {!loading && <p className="text-xs text-slate-500">Showing {filtered.length} of {cases.length} {cases.length === 1 ? 'matter' : 'matters'}</p>}
        </div>
    );
}
