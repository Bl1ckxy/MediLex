// ✓ FILE COMPLETE — stat-card.tsx
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatCard({
    label,
    value,
    detail,
    icon: Icon,
    trend,
    tone = 'navy',
}: {
    label: string;
    value: string;
    detail?: string;
    icon: LucideIcon;
    trend?: { value: string; positive?: boolean };
    tone?: 'navy' | 'gold' | 'crimson' | 'green';
}) {
    const iconTone = {
        navy: 'bg-navy-50 text-navy',
        gold: 'bg-gold-50 text-gold-600',
        crimson: 'bg-crimson-50 text-crimson',
        green: 'bg-emerald-50 text-emerald-700',
    }[tone];
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-3 font-serif text-2xl font-semibold text-navy">{value}</p>
                </div>
                <div className={cn('rounded-md p-2.5', iconTone)}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
            </div>
            {(detail || trend) && (
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    {trend && (
                        <span className={cn('inline-flex items-center font-semibold', trend.positive === false ? 'text-crimson' : 'text-emerald-700')}>
                            {trend.positive === false ? <ArrowDownRight className="mr-0.5 h-3.5 w-3.5" /> : <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />}
                            {trend.value}
                        </span>
                    )}
                    {detail}
                </div>
            )}
        </div>
    );
}
