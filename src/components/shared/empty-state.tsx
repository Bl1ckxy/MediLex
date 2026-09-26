// ✓ FILE COMPLETE — empty-state.tsx
import type { ReactNode } from 'react';
import { FolderOpen } from 'lucide-react';

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 rounded-full bg-ivory-100 p-4 text-gold-600">
                <FolderOpen className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}
