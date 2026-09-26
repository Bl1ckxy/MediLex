// ✓ FILE COMPLETE — lawyer-review-panel.tsx
'use client';

import { useState } from 'react';
import { CheckCircle2, FileSearch, Loader2, MessageSquareText } from 'lucide-react';
import { Panel, Button } from '@/components/shared/ui';

function titleize(value: string) {
    return value.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^./, (character) => character.toUpperCase());
}

function ReviewValue({ value }: { value: unknown }) {
    if (Array.isArray(value)) return <ul className="space-y-2">{value.map((item, index) => <li key={`${String(item)}-${index}`} className="flex gap-2 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>)}</ul>;
    if (value && typeof value === 'object') return <pre className="overflow-x-auto rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600">{JSON.stringify(value, null, 2)}</pre>;
    return <p className="text-sm leading-6 text-slate-600">{String(value ?? '—')}</p>;
}

export function LawyerReviewPanel({ caseId }: { caseId: string }) {
    const [focus, setFocus] = useState('');
    const [review, setReview] = useState<Record<string, unknown> | null>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function requestReview() {
        setBusy(true); setError('');
        try {
            const response = await fetch('/api/lawyer-review', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ caseId, focus: focus.trim() || undefined }) });
            const body = await response.json();
            if (!response.ok) throw new Error(body.error?.message ?? 'Unable to prepare review');
            setReview(body.data as Record<string, unknown>);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Unable to prepare review');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="space-y-6">
            <Panel title="Counsel review" description="Ask for a structured second pass over the case material before deciding the next legal step.">
                <div className="p-5"><label className="block text-sm font-medium text-navy" htmlFor="review-focus">What should counsel focus on? <span className="font-normal text-slate-400">(optional)</span></label><textarea id="review-focus" value={focus} onChange={(event) => setFocus(event.target.value)} rows={4} maxLength={2000} className="mt-2 w-full resize-y rounded-md border border-slate-200 bg-white p-3 text-sm text-navy outline-none placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="For example: check whether the records support breach and whether limitation or forum issues need attention." /><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-xs text-slate-500"><MessageSquareText className="h-4 w-4 text-gold-600" />The review will use the case record and ingested evidence.</p><Button onClick={() => void requestReview()} loading={busy}><FileSearch className="h-4 w-4" />{review ? 'Refresh counsel review' : 'Prepare review'}</Button></div></div>
                {error && <p className="border-t border-crimson-100 bg-crimson-50 px-5 py-3 text-sm text-crimson">{error}</p>}
            </Panel>
            {busy && <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" />Preparing a structured review…</div>}
            {review && <Panel title="Review notes" description="Generated from the available record. Validate every conclusion against primary evidence."><div className="grid gap-5 p-5 md:grid-cols-2">{Object.entries(review).map(([key, value]) => <div key={key} className="rounded-md border border-slate-100 p-4"><h3 className="mb-3 text-sm font-semibold capitalize text-navy">{titleize(key)}</h3><ReviewValue value={value} /></div>)}</div></Panel>}
            <div className="rounded-lg border border-gold-100 bg-gold-50/60 p-4 text-xs leading-5 text-gold-600">Counsel review is a drafting aid, not a substitute for professional judgment. Do not share privileged or sensitive material outside your firm’s approved workspace.</div>
        </div>
    );
}
