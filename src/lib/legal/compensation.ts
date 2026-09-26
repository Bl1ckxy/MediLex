import type { SeverityLevel } from '@/types/legal';

export interface CompensationInput {
    severity: SeverityLevel;
    age: number;
    annualIncome?: number;
    medicalExpenses?: number;
    futureCareCosts?: number;
}

export interface CompensationBreakdown {
    treatmentCost: number;
    futureMedicalCost: number;
    lostEarnings: number;
    lossOfDependency: number;
    painAndSuffering: number;
    mentalAgony: number;
    deficiencyInService: number;
    total: number;
    citations: Record<keyof Omit<CompensationBreakdown, 'total' | 'citations'>, string>;
}

const multiplierForAge = (age: number): number => {
    if (age <= 15) return 20;
    if (age <= 20) return 18;
    if (age <= 25) return 18;
    if (age <= 30) return 17;
    if (age <= 35) return 16;
    if (age <= 40) return 15;
    if (age <= 45) return 14;
    if (age <= 50) return 13;
    if (age <= 55) return 11;
    if (age <= 60) return 9;
    if (age <= 65) return 7;
    return 5;
};

export function calculateCompensation(
    patientAge: number,
    severity: SeverityLevel,
    treatmentCost: number,
    lostIncomeMonthly: number,
    dependents: number,
): CompensationBreakdown {
    const normalizedAge = Math.max(0, Math.floor(patientAge));
    const normalizedDependents = Math.max(0, Math.floor(dependents));
    const treatment = Math.max(0, treatmentCost);
    const futureMedicalCost = treatment * 1.5;
    const monthlyIncome = Math.max(0, lostIncomeMonthly);
    const lostEarnings = monthlyIncome * 12 * multiplierForAge(normalizedAge) * 0.5;
    const lossOfDependency = severity === 'death' ? monthlyIncome * 12 * multiplierForAge(normalizedAge) * Math.max(1, normalizedDependents) : 0;
    const painAndSuffering = severity === 'death' ? 500000 : severity === 'permanent_disability' ? 300000 : severity === 'temporary_disability' ? 150000 : 100000;
    const mentalAgony = severity === 'death' || severity === 'permanent_disability' ? 300000 : 100000;
    const deficiencyInService = severity === 'death' ? 200000 : 50000;
    const total = treatment + futureMedicalCost + lostEarnings + lossOfDependency + painAndSuffering + mentalAgony + deficiencyInService;
    return {
        treatmentCost: treatment,
        futureMedicalCost,
        lostEarnings,
        lossOfDependency,
        painAndSuffering,
        mentalAgony,
        deficiencyInService,
        total,
        citations: {
            treatmentCost: 'Actual medical expenses',
            futureMedicalCost: 'Kunal Saha v. AMRI (2013) 8 SCC 131',
            lostEarnings: 'Sarla Verma v. DTC (2009) 6 SCC 121',
            lossOfDependency: 'Sarla Verma v. DTC (2009) 6 SCC 121',
            painAndSuffering: 'Kunal Saha v. AMRI (2013) 8 SCC 131',
            mentalAgony: 'Consumer Protection Act, 2019',
            deficiencyInService: 'Consumer Protection Act, 2019',
        },
    };
}

/** Conservative, transparent intake estimate; final damages require legal review. */
export function estimateCompensation(input: CompensationInput): number {
    const income = Math.max(0, input.annualIncome ?? 0);
    const age = Math.max(0, Math.floor(input.age));
    const multiplier = multiplierForAge(age);
    const disabilityFactor = input.severity === 'death' ? 1 : input.severity === 'permanent_disability' ? 0.8 : input.severity === 'temporary_disability' ? 0.35 : 0.2;
    return Math.round((income * multiplier * disabilityFactor) + Math.max(0, input.medicalExpenses ?? 0) + Math.max(0, input.futureCareCosts ?? 0));
}
