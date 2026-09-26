import { NextRequest } from 'next/server';
import { apiError } from '@/lib/api';
import { getProfile } from '@/lib/server-user';
import { POST as lawyerReview } from '@/app/api/lawyer-review/route';

export async function POST(
    request: NextRequest,
    { params }: { params: { analysisId: string } },
) {
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    let caseId = typeof body?.caseId === 'string' ? body.caseId : undefined;

    if (!caseId) {
        const { supabase, authUser, profile } = await getProfile();
        if (!authUser || !profile) return apiError(401, 'UNAUTHORIZED', 'Authentication required');
        const { data: analysis } = await (supabase as any)
            .from('ai_analyses')
            .select('case_id,cases!inner(firm_id)')
            .eq('id', params.analysisId)
            .eq('cases.firm_id', profile.firm_id ?? profile.id)
            .maybeSingle();
        caseId = typeof analysis?.case_id === 'string' ? analysis.case_id : undefined;
    }

    if (!caseId) return apiError(404, 'NOT_FOUND', 'Analysis not found');
    const delegatedRequest = new NextRequest(request.url, {
        method: 'POST',
        headers: request.headers,
        body: JSON.stringify({ ...(body ?? {}), caseId }),
    });
    return lawyerReview(delegatedRequest);
}
