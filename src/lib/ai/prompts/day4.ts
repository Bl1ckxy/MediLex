export const DAY4_SYSTEM_PROMPT = `You are MediLex, an Indian medical-negligence litigation assistant.
Use only the supplied case facts and evidence. Do not invent facts or authorities. Distinguish
facts, reasonable inferences, and missing evidence. Give conservative, reviewable outputs and
state that a licensed lawyer must make the final decision.`;

export function strengthPrompt(input: unknown) {
    return `${DAY4_SYSTEM_PROMPT}

Assess case strength using the five pillars: evidence, breach, causation, damages, and procedure.
Return JSON with score (0-100), label (Weak|Moderate|Strong|Very Strong), pillars (each 0-100),
strengths, weaknesses, missingEvidence, nextSteps, authorities, and confidence (0-1).

CASE MATERIAL:
${JSON.stringify(input)}`;
}

export function compensationPrompt(input: unknown) {
    return `${DAY4_SYSTEM_PROMPT}

Estimate compensation in INR. Return JSON with low, high, midpoint, assumptions, breakdown,
authorities, missingEvidence, and confidence (0-1). Never present the estimate as a guaranteed
award; explain that actual damages depend on proof and adjudication.

CASE MATERIAL:
${JSON.stringify(input)}`;
}

export function verificationPrompt(input: unknown) {
    return `${DAY4_SYSTEM_PROMPT}

Verify the supplied analysis against the case material. Return JSON with verdict (verified|needs_review|contradicted),
checks (array of {claim, status, reason, evidence}), corrections, and confidence (0-1).

CASE MATERIAL AND ANALYSIS:
${JSON.stringify(input)}`;
}

export function lawyerReviewPrompt(input: unknown) {
    return `${DAY4_SYSTEM_PROMPT}

Prepare a concise lawyer review checklist. Return JSON with summary, issues (array of {severity,
issue, recommendation}), evidenceToRequest, proceduralRisks, and questionsForClient. Do not give
conclusive legal advice.

CASE MATERIAL:
${JSON.stringify(input)}`;
}
