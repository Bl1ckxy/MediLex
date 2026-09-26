'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Case } from '@/types/database';
import type { CreateCaseInput } from '@/types/api';

export function useCases(options: { autoFetch?: boolean } = {}) {
    const { autoFetch = true } = options;
    const [cases, setCases] = useState<Case[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
    const refresh = useCallback(async () => { setLoading(true); const response = await fetch('/api/cases'); const body = await response.json(); if (!response.ok) setError(body.error?.message ?? 'Unable to load cases'); else setCases(body.data.items); setLoading(false); }, []);
    useEffect(() => {
        if (autoFetch) void refresh();
    }, [autoFetch, refresh]);
    const createCase = useCallback(async (input: CreateCaseInput) => {
        const response = await fetch('/api/cases', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) });
        const body = await response.json();
        if (!response.ok) {
            const error = new Error(body.error?.message ?? 'Unable to create case') as Error & { code?: string };
            error.code = body.error?.code;
            throw error;
        }
        await refresh();
        return body.data as Case;
    }, [refresh]);
    return { cases, loading, error, refresh, createCase };
}
