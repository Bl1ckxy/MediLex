'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Case } from '@/types/database';

export function useCase(caseId?: string) {
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [loading, setLoading] = useState(Boolean(caseId));
    const [error, setError] = useState('');
    const refresh = useCallback(async () => {
        if (!caseId) return;
        setLoading(true);
        const response = await fetch(`/api/cases/${caseId}`);
        const body = await response.json();
        if (response.ok) setCaseData(body.data); else setError(body.error?.message ?? 'Unable to load case');
        setLoading(false);
    }, [caseId]);
    useEffect(() => { void refresh(); }, [refresh]);
    return { caseData, loading, error, refresh };
}
