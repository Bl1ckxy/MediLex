import { type ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx for conditional class names.
 * Uses tailwind-merge to resolve conflicting utility classes.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupees with the Indian numbering system.
 * Uses lakhs (1,00,000) and crores (1,00,00,000) grouping.
 *
 * @example
 * formatCurrency(12345678) // "₹1,23,45,678"
 * formatCurrency(50000)    // "₹50,000"
 * formatCurrency(1000)     // "₹1,000"
 */
export function formatCurrency(amount: number): string {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const fixed = absAmount.toFixed(2);
    const [integerPart, decimalPart] = fixed.split('.') as [string, string];

    // Indian numbering: last 3 digits, then groups of 2
    let formatted: string;
    if (integerPart.length <= 3) {
        formatted = integerPart;
    } else {
        const lastThree = integerPart.slice(-3);
        const remaining = integerPart.slice(0, -3);
        const groups: string[] = [];

        let i = remaining.length;
        while (i > 0) {
            const start = Math.max(0, i - 2);
            groups.unshift(remaining.slice(start, i));
            i = start;
        }

        formatted = groups.join(',') + ',' + lastThree;
    }

    // Drop decimal if .00
    const result = decimalPart === '00' ? formatted : `${formatted}.${decimalPart}`;
    return `${isNegative ? '-' : ''}₹${result}`;
}

/**
 * Format a date as "15 Jan 2025".
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'd MMM yyyy');
}

/**
 * Format a date-time as "15 Jan 2025, 2:30 PM IST".
 */
export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, "d MMM yyyy, h:mm a") + ' IST';
}

/**
 * Truncate text to a maximum length, appending "…" if truncated.
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength - 1).trimEnd() + '…';
}

/**
 * Sanitize a file name by removing special characters.
 * Keeps alphanumeric characters, hyphens, underscores, and dots.
 */
export function sanitizeFileName(name: string): string {
    return name
        .replace(/[^a-zA-Z0-9\-_.]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

/**
 * Generate a case number in the format NS/YYYY/NNNN.
 * Note: In production, this is handled by the database trigger.
 * This utility is for client-side preview/display only.
 */
export function generateCaseNumber(): string {
    const year = new Date().getFullYear();
    const seq = Math.floor(Math.random() * 9999) + 1;
    return `NS/${year}/${seq.toString().padStart(4, '0')}`;
}
// âœ“ FILE COMPLETE â€” src/lib/utils.ts