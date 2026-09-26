// --------------------------------------------------------------------------
// MediLex â€” Domain Enums & Types for Medical Negligence Litigation
// --------------------------------------------------------------------------

/** Role within the law firm hierarchy */
export type UserRole = 'firm_admin' | 'senior_partner' | 'associate' | 'paralegal';
export const USER_ROLES = ['firm_admin', 'senior_partner', 'associate', 'paralegal'] as const;

/** Lifecycle status of a case */
export type CaseStatus = 'intake' | 'investigation' | 'analysis' | 'filed' | 'closed';
export const CASE_STATUSES = [
    'intake',
    'investigation',
    'analysis',
    'filed',
    'closed',
] as const;

/** Classification of healthcare facility */
export type HospitalType = 'govt' | 'private' | 'trust' | 'clinic';
export const HOSPITAL_TYPES = ['govt', 'private', 'trust', 'clinic'] as const;

/** Category of medical negligence */
export type NegligenceType =
    | 'misdiagnosis'
    | 'surgical_error'
    | 'delayed_treatment'
    | 'medication_error'
    | 'birth_injury'
    | 'anesthesia_error'
    | 'informed_consent_failure'
    | 'hospital_infection'
    | 'wrong_site_surgery'
    | 'equipment_failure'
    | 'other';
export const NEGLIGENCE_TYPES = [
    'misdiagnosis',
    'surgical_error',
    'delayed_treatment',
    'medication_error',
    'birth_injury',
    'anesthesia_error',
    'informed_consent_failure',
    'hospital_infection',
    'wrong_site_surgery',
    'equipment_failure',
    'other',
] as const;

/** Severity of harm to the patient */
export type SeverityLevel =
    | 'death'
    | 'permanent_disability'
    | 'temporary_disability'
    | 'prolonged_suffering';
export const SEVERITY_LEVELS = [
    'death',
    'permanent_disability',
    'temporary_disability',
    'prolonged_suffering',
] as const;

/** Legal forum for filing under the Consumer Protection Act 2019 */
export type ForumType =
    | 'district_commission'
    | 'state_commission'
    | 'ncdrc'
    | 'high_court'
    | 'civil_court';
export const FORUM_TYPES = [
    'district_commission',
    'state_commission',
    'ncdrc',
    'high_court',
    'civil_court',
] as const;

/** Category of uploaded medical/legal document */
export type DocumentCategory =
    | 'discharge_summary'
    | 'prescription'
    | 'lab_report'
    | 'radiology_report'
    | 'ot_notes'
    | 'consent_form'
    | 'death_certificate'
    | 'billing_record'
    | 'nursing_notes'
    | 'medico_legal_certificate'
    | 'expert_opinion'
    | 'police_report'
    | 'correspondence'
    | 'other';
export const DOCUMENT_CATEGORIES = [
    'discharge_summary',
    'prescription',
    'lab_report',
    'radiology_report',
    'ot_notes',
    'consent_form',
    'death_certificate',
    'billing_record',
    'nursing_notes',
    'medico_legal_certificate',
    'expert_opinion',
    'police_report',
    'correspondence',
    'other',
] as const;

/** OCR processing pipeline status */
export type OcrStatus = 'pending' | 'processing' | 'completed' | 'failed';
export const OCR_STATUSES = ['pending', 'processing', 'completed', 'failed'] as const;

/** Embedding generation status */
export type EmbeddingStatus = 'pending' | 'completed' | 'failed';
export const EMBEDDING_STATUSES = ['pending', 'completed', 'failed'] as const;

/** Type of AI analysis that can be performed on a case */
export type AnalysisType =
    | 'case_strength'
    | 'compensation_estimate'
    | 'precedent_search'
    | 'demand_notice_draft'
    | 'complaint_draft';
export const ANALYSIS_TYPES = [
    'case_strength',
    'compensation_estimate',
    'precedent_search',
    'demand_notice_draft',
    'complaint_draft',
] as const;

// --------------------------------------------------------------------------
// Display label mappings for UI rendering
// --------------------------------------------------------------------------

export const CASE_STATUS_LABELS: Record<CaseStatus, string> = {
    intake: 'Intake',
    investigation: 'Investigation',
    analysis: 'Analysis',
    filed: 'Filed',
    closed: 'Closed',
};

export const NEGLIGENCE_TYPE_LABELS: Record<NegligenceType, string> = {
    misdiagnosis: 'Misdiagnosis',
    surgical_error: 'Surgical error',
    delayed_treatment: 'Delayed treatment',
    medication_error: 'Medication error',
    birth_injury: 'Birth injury',
    anesthesia_error: 'Anaesthesia error',
    informed_consent_failure: 'Informed consent failure',
    hospital_infection: 'Hospital-acquired infection',
    wrong_site_surgery: 'Wrong-site surgery',
    equipment_failure: 'Equipment failure',
    other: 'Other',
};

export const SEVERITY_LEVEL_LABELS: Record<SeverityLevel, string> = {
    death: 'Death',
    permanent_disability: 'Permanent disability',
    temporary_disability: 'Temporary disability',
    prolonged_suffering: 'Prolonged suffering',
};

export const FORUM_TYPE_LABELS: Record<ForumType, string> = {
    district_commission: 'District commission',
    state_commission: 'State commission',
    ncdrc: 'NCDRC',
    high_court: 'High court',
    civil_court: 'Civil court',
};

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
    discharge_summary: 'Discharge summary',
    prescription: 'Prescription',
    lab_report: 'Lab report',
    radiology_report: 'Radiology report',
    ot_notes: 'OT notes',
    consent_form: 'Consent form',
    death_certificate: 'Death certificate',
    billing_record: 'Billing record',
    nursing_notes: 'Nursing notes',
    medico_legal_certificate: 'Medico-legal certificate',
    expert_opinion: 'Expert opinion',
    police_report: 'Police report',
    correspondence: 'Correspondence',
    other: 'Other',
};

export const ANALYSIS_TYPE_LABELS: Record<AnalysisType, string> = {
    case_strength: 'Case strength assessment',
    compensation_estimate: 'Compensation estimate',
    precedent_search: 'Precedent search',
    demand_notice_draft: 'Demand notice draft',
    complaint_draft: 'Complaint draft',
};
// âœ“ FILE COMPLETE â€” src/types/legal.ts