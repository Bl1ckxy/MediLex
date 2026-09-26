// ✓ FILE COMPLETE — status-badge.tsx
import { cn } from '@/lib/utils';
import { CASE_STATUS_LABELS, type CaseStatus } from '@/types/legal';

const styles: Record<string, string> = {
    intake: 'bg-slate-100 text-slate-700',
    investigation: 'bg-blue-50 text-blue-700',
    analysis: 'bg-gold-50 text-gold-600',
    filed: 'bg-emerald-50 text-emerald-700',
    closed: 'bg-slate-100 text-slate-500',
    pending: 'bg-gold-50 text-gold-600',
    processing: 'bg-blue-50 text-blue-700',
    completed: 'bg-emerald-50 text-emerald-700',
    failed: 'bg-crimson-50 text-crimson-600',
};

export function StatusBadge({ status, label }: { status?: string | null; label?: string }) {
    const value = status ?? 'pending';
    const display = label ?? (value in CASE_STATUS_LABELS ? CASE_STATUS_LABELS[value as CaseStatus] : value.replace(/_/g, ' '));
    return (
        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize', styles[value] ?? 'bg-slate-100 text-slate-600')}>
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {display}
        </span>
    );
}
