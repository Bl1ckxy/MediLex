// ✓ FILE COMPLETE — ui.tsx
'use client';

import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    disabled,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
}) {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-50',
                {
                    'bg-navy text-white hover:bg-navy-700': variant === 'primary',
                    'bg-gold text-navy hover:bg-gold-500': variant === 'secondary',
                    'border border-slate-200 bg-white text-navy hover:bg-slate-50': variant === 'outline',
                    'text-slate-600 hover:bg-slate-50 hover:text-navy': variant === 'ghost',
                    'bg-crimson text-white hover:bg-crimson-500': variant === 'danger',
                    'h-8 px-3 text-xs': size === 'sm',
                    'h-10 px-4 text-sm': size === 'md',
                    'h-11 px-5 text-sm': size === 'lg',
                },
                className,
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {children}
        </button>
    );
}

export function TextInput({
    label,
    hint,
    error,
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hint?: string;
    error?: string;
}) {
    return (
        <label className="block space-y-1.5">
            {label && <span className="text-sm font-medium text-navy">{label}</span>}
            <input
                {...props}
                className={cn(
                    'h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20',
                    error && 'border-crimson focus:border-crimson focus:ring-crimson/20',
                    className,
                )}
            />
            {error ? (
                <span className="text-xs text-crimson">{error}</span>
            ) : hint ? (
                <span className="text-xs text-slate-500">{hint}</span>
            ) : null}
        </label>
    );
}

export function Panel({
    title,
    description,
    action,
    children,
    className,
}: {
    title?: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section className={cn('rounded-lg border border-slate-200 bg-white shadow-sm', className)}>
            {(title || description || action) && (
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div>
                        {title && <h2 className="font-serif text-lg font-semibold text-navy">{title}</h2>}
                        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </section>
    );
}

export function Skeleton({ className }: { className?: string }) {
    return <div className={cn('animate-pulse rounded bg-slate-100', className)} aria-hidden="true" />;
}
