// ✓ FILE COMPLETE — page-header.tsx
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageHeader({
    eyebrow,
    title,
    description,
    action,
    className,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}) {
    return (
        <header className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
            <div>
                {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">{eyebrow}</p>}
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </header>
    );
}
