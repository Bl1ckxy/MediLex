// ✓ FILE COMPLETE — odr-workspace.tsx
'use client';

import { useMemo, useState } from 'react';
import { CalendarClock, Check, Circle, FileCheck2, Gavel, MapPin, ShieldCheck } from 'lucide-react';
import { Panel } from '@/components/shared/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { computeForum } from '@/lib/legal/forum';

type CaseLike = Record<string, unknown>;

export function OdrWorkspace({ caseData }: { caseData: CaseLike }) {
    const [completed, setCompleted] = useState<string[]>([]);
    const amount = Number(caseData.claim_amount ?? caseData.claimAmount ?? 0);
    const forum = String(caseData.recommended_forum ?? caseData.recommendedForum ?? '');
    const forumResult = useMemo(() => amount > 0 ? computeForum(amount) : null, [amount]);
    const deadline = caseData.limitation_deadline ?? caseData.limitationDeadline;
    const tasks = [
        { id: 'facts', label: 'Verify intake facts and client chronology', detail: 'Confirm names, incident dates and the treatment timeline.' },
        { id: 'records', label: 'Complete the evidence bundle', detail: 'Ensure records, bills and expert material are indexed.' },
        { id: 'notice', label: 'Prepare pre-litigation notice', detail: 'Review the demand notice and recipient details before sending.' },
        { id: 'filing', label: 'Confirm forum and filing requirements', detail: 'Check pecuniary jurisdiction, limitation and local procedure.' },
    ];
    function toggle(id: string) { setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3"><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><Gavel className="h-4 w-4 text-gold-600" />Recommended forum</div><p className="mt-3 font-serif text-lg font-semibold text-navy">{forumResult?.displayName ?? (forum.replace(/_/g, ' ') || 'To be assessed')}</p><p className="mt-1 text-xs text-slate-500">{forumResult?.jurisdiction ?? 'Add a claim value to calculate jurisdiction'}</p></div><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><CalendarClock className="h-4 w-4 text-crimson" />Limitation date</div><p className="mt-3 font-serif text-lg font-semibold text-navy">{deadline ? formatDate(String(deadline)) : 'Not calculated'}</p><p className="mt-1 text-xs text-slate-500">Confirm the applicable cause of action and exclusions.</p></div><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500"><MapPin className="h-4 w-4 text-navy" />Claim value</div><p className="mt-3 font-serif text-lg font-semibold text-navy">{formatCurrency(amount)}</p><p className="mt-1 text-xs text-slate-500">Use the legal helpers as an initial indication.</p></div></div>
            <Panel title="ODR readiness" description="A practical checklist for taking this matter from intake to filing."><div className="divide-y divide-slate-100">{tasks.map((task) => { const done = completed.includes(task.id); return <button key={task.id} onClick={() => toggle(task.id)} className="flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-slate-50"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${done ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 text-transparent'}`}>{done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}</span><span><span className={`block text-sm font-medium ${done ? 'text-slate-500 line-through' : 'text-navy'}`}>{task.label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{task.detail}</span></span></button>; })}</div><div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600" />{completed.length} of {tasks.length} readiness checks complete</div></Panel>
            <Panel title="Filing pack" description="Keep the core outputs together as you prepare the matter."><div className="grid gap-3 p-5 sm:grid-cols-3"><div className="rounded-md border border-slate-200 p-4"><FileCheck2 className="h-5 w-5 text-gold-600" /><p className="mt-3 text-sm font-medium text-navy">Evidence index</p><p className="mt-1 text-xs leading-5 text-slate-500">Documents and OCR status for this matter.</p></div><div className="rounded-md border border-slate-200 p-4"><Gavel className="h-5 w-5 text-gold-600" /><p className="mt-3 text-sm font-medium text-navy">Forum note</p><p className="mt-1 text-xs leading-5 text-slate-500">Jurisdiction indication from the claim amount.</p></div><div className="rounded-md border border-slate-200 p-4"><CalendarClock className="h-5 w-5 text-gold-600" /><p className="mt-3 text-sm font-medium text-navy">Deadline review</p><p className="mt-1 text-xs leading-5 text-slate-500">Validate limitation before any filing.</p></div></div></Panel>
            <div className="rounded-lg border border-gold-100 bg-gold-50/60 p-4 text-xs leading-5 text-gold-600">Forum and limitation information is an initial workflow aid. Always check the current statute, rules, notifications and case-specific facts before filing.</div>
        </div>
    );
}
