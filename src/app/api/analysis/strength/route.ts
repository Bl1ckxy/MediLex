import type { NextRequest } from 'next/server';
import { apiError, apiSuccess } from '@/lib/api';
import { getProfile } from '@/lib/server-user';
import { getCaseMaterial } from '@/lib/legal/day4-case';
import { strengthPrompt } from '@/lib/ai/prompts/day4';
import { generateJson } from '@/lib/ai/json';
import { StrengthResultSchema, type StrengthResult } from '@/lib/legal/day4';
import { env } from '@/env';

export async function POST(request: NextRequest) {
    const { supabase, authUser, profile } = await getProfile();
    if (!authUser || !profile) return apiError(401, 'UNAUTHORIZED', 'Authentication required');
    const body = await request.json().catch(() => null);
    const caseId = typeof body?.caseId === 'string' ? body.caseId : '';
    if (!caseId) return apiError(422, 'VALIDATION_ERROR', 'caseId is required');
    const material = await getCaseMaterial(supabase, caseId, profile.firm_id ?? profile.id);
    if (!material) return apiError(404, 'NOT_FOUND', 'Case not found');

    let result: StrengthResult;
    try {
        result = StrengthResultSchema.parse(await generateJson(strengthPrompt(material)));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Analysis failed';
        console.error('[ANALYSIS/STRENGTH] LLM error:', message);
        return apiError(503, 'LLM_UNAVAILABLE', 'Case strength analysis unavailable', { reason: message });
    }

    const { error: analysisError } = await (supabase as any).from('ai_analyses').insert({
        case_id: caseId, analysis_type: 'case_strength', model_used: env.GROQ_MODEL ?? 'openai/gpt-oss-20b',
        result, confidence: result.confidence * 100, created_by: profile.id,
    });
    if (analysisError) return apiError(500, 'INTERNAL_ERROR', analysisError.message);
    const { error: caseError } = await (supabase as any).from('cases').update({ ai_strength_score: result.score, status: 'analysis' }).eq('id', caseId).eq('firm_id', profile.firm_id ?? profile.id);
    if (caseError) return apiError(500, 'INTERNAL_ERROR', caseError.message);
    return apiSuccess(result);
}
