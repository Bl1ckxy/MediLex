'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Document } from '@/types/database';
export function useDocuments(caseId?: string) {
    const [documents, setDocuments] = useState<Document[]>([]); const [loading, setLoading] = useState(Boolean(caseId));
    const refresh = useCallback(async () => { if (!caseId) return; setLoading(true); const response = await fetch(`/api/documents?caseId=${encodeURIComponent(caseId)}`); const body = await response.json(); if (response.ok) setDocuments(body.data); setLoading(false); }, [caseId]);
    useEffect(() => { void refresh(); }, [refresh]);
    return { documents, loading, refresh };
}
