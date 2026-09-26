import type { SeverityLevel } from '@/types/legal';

export interface CaseScoreInput {
    severity?: SeverityLevel;
    hasMedicalRecords?: boolean;
    hasExpertOpinion?: boolean;
    hasCausationEvidence?: boolean;
    limitationDaysRemaining?: number;
}

/** Deterministic intake score used before AI analysis is available. */
export function calculateCaseStrength(input: CaseScoreInput): number {
    let score = 35;
    score += input.hasMedicalRecords ? 20 : 0;
    score += input.hasExpertOpinion ? 20 : 0;
    score += input.hasCausationEvidence ? 15 : 0;
    score += input.severity === 'death' || input.severity === 'permanent_disability' ? 10 : 0;
    score -= input.limitationDaysRemaining !== undefined && input.limitationDaysRemaining < 0 ? 25 : 0;
    return Math.max(0, Math.min(100, score));
}

export interface CasePillars {
    evidence: number;
    breach: number;
    causation: number;
    damages: number;
    procedure: number;
}

export type CaseStrengthLabel = 'Weak' | 'Moderate' | 'Strong' | 'Very Strong';

export function scoreCase(pillars: CasePillars): { score: number; label: CaseStrengthLabel } {
    const score = Math.round(
        pillars.evidence * 0.3 +
        pillars.breach * 0.25 +
        pillars.causation * 0.2 +
        pillars.damages * 0.15 +
        pillars.procedure * 0.1,
    );
    const bounded = Math.max(0, Math.min(100, score));
    const label: CaseStrengthLabel =
        bounded <= 40 ? 'Weak' : bounded <= 65 ? 'Moderate' : bounded <= 80 ? 'Strong' : 'Very Strong';
    return { score: bounded, label };
}
