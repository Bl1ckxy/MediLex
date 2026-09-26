import { relations } from 'drizzle-orm';
import {
    boolean,
    customType,
    index,
    integer,
    jsonb,
    numeric,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

// --------------------------------------------------------------------------
// Custom pgvector type
// --------------------------------------------------------------------------

const vector = customType<{ data: number[]; driverData: string; config: { dimensions: number } }>({
    dataType(config) {
        return `vector(${config?.dimensions ?? 768})`;
    },
    toDriver(value: number[]): string {
        return `[${value.join(',')}]`;
    },
    fromDriver(value: string): number[] {
        return value
            .slice(1, -1)
            .split(',')
            .map(Number);
    },
});

// --------------------------------------------------------------------------
// Enums
// --------------------------------------------------------------------------

export const userRoleEnum = pgEnum('user_role', [
    'firm_admin',
    'senior_partner',
    'associate',
    'paralegal',
]);

export const caseStatusEnum = pgEnum('case_status', [
    'intake',
    'investigation',
    'analysis',
    'filed',
    'closed',
]);

export const hospitalTypeEnum = pgEnum('hospital_type', [
    'govt',
    'private',
    'trust',
    'clinic',
]);

export const negligenceTypeEnum = pgEnum('negligence_type', [
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
]);

export const severityLevelEnum = pgEnum('severity_level', [
    'death',
    'permanent_disability',
    'temporary_disability',
    'prolonged_suffering',
]);

export const forumTypeEnum = pgEnum('forum_type', [
    'district_commission',
    'state_commission',
    'ncdrc',
    'high_court',
    'civil_court',
]);

export const documentCategoryEnum = pgEnum('document_category', [
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
]);

export const ocrStatusEnum = pgEnum('ocr_status', [
    'pending',
    'processing',
    'completed',
    'failed',
]);

export const embeddingStatusEnum = pgEnum('embedding_status', [
    'pending',
    'completed',
    'failed',
]);

export const analysisTypeEnum = pgEnum('analysis_type', [
    'case_strength',
    'compensation_estimate',
    'precedent_search',
    'demand_notice_draft',
    'complaint_draft',
]);

export const patientGenderEnum = pgEnum('patient_gender', ['male', 'female', 'other']);

export const demandNoticeStatusEnum = pgEnum('demand_notice_status', [
    'draft',
    'sent',
    'acknowledged',
    'expired',
]);

// --------------------------------------------------------------------------
// Tables
// --------------------------------------------------------------------------

export const users = pgTable(
    'users',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        authId: uuid('auth_id').notNull().unique(),
        email: varchar('email', { length: 320 }).notNull().unique(),
        fullName: varchar('full_name', { length: 200 }).notNull(),
        role: userRoleEnum('role').notNull().default('associate'),
        firmId: uuid('firm_id'),
        avatarUrl: text('avatar_url'),
        isActive: boolean('is_active').notNull().default(true),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        authIdIdx: index('users_auth_id_idx').on(table.authId),
        emailIdx: index('users_email_idx').on(table.email),
        firmIdIdx: index('users_firm_id_idx').on(table.firmId),
    }),
);

export const cases = pgTable(
    'cases',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        caseNumber: varchar('case_number', { length: 20 }).notNull().unique(),
        status: caseStatusEnum('status').notNull().default('intake'),
        createdBy: uuid('created_by')
            .notNull()
            .references(() => users.id),
        assignedTo: uuid('assigned_to').references(() => users.id),
        firmId: uuid('firm_id'),

        // Patient details
        patientName: varchar('patient_name', { length: 200 }).notNull(),
        patientAge: integer('patient_age').notNull(),
        patientGender: patientGenderEnum('patient_gender').notNull(),
        nextOfKin: varchar('next_of_kin', { length: 200 }),
        nextOfKinRelation: varchar('next_of_kin_relation', { length: 100 }),

        // Hospital details
        hospitalName: varchar('hospital_name', { length: 300 }).notNull(),
        hospitalType: hospitalTypeEnum('hospital_type').notNull(),
        hospitalCity: varchar('hospital_city', { length: 100 }).notNull(),
        hospitalState: varchar('hospital_state', { length: 100 }).notNull(),

        // Case details
        negligenceType: negligenceTypeEnum('negligence_type').notNull(),
        severity: severityLevelEnum('severity').notNull(),
        incidentDate: timestamp('incident_date', { withTimezone: true }).notNull(),
        incidentDescription: text('incident_description').notNull(),
        claimAmount: numeric('claim_amount', { precision: 15, scale: 2 }).notNull(),
        recommendedForum: forumTypeEnum('recommended_forum'),
        filedForum: forumTypeEnum('filed_forum'),
        complaintNumber: varchar('complaint_number', { length: 100 }),
        limitationDeadline: timestamp('limitation_deadline', { withTimezone: true }),

        // Doctor details
        treatingDoctorName: varchar('treating_doctor_name', { length: 200 }),
        treatingDoctorRegistration: varchar('treating_doctor_registration', { length: 100 }),

        // AI analysis summary
        aiStrengthScore: numeric('ai_strength_score', { precision: 5, scale: 2 }),
        aiCompensationEstimate: numeric('ai_compensation_estimate', { precision: 15, scale: 2 }),

        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        statusIdx: index('cases_status_idx').on(table.status),
        createdByIdx: index('cases_created_by_idx').on(table.createdBy),
        assignedToIdx: index('cases_assigned_to_idx').on(table.assignedTo),
        firmIdIdx: index('cases_firm_id_idx').on(table.firmId),
        caseNumberIdx: index('cases_case_number_idx').on(table.caseNumber),
        incidentDateIdx: index('cases_incident_date_idx').on(table.incidentDate),
        negligenceTypeIdx: index('cases_negligence_type_idx').on(table.negligenceType),
    }),
);

export const documents = pgTable(
    'documents',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        caseId: uuid('case_id')
            .notNull()
            .references(() => cases.id, { onDelete: 'cascade' }),
        uploadedBy: uuid('uploaded_by')
            .notNull()
            .references(() => users.id),
        category: documentCategoryEnum('category').notNull(),
        fileName: varchar('file_name', { length: 500 }).notNull(),
        fileSize: integer('file_size').notNull(),
        mimeType: varchar('mime_type', { length: 100 }).notNull(),
        storagePath: text('storage_path').notNull(),
        clientHash: varchar('client_hash', { length: 64 }).notNull(),
        serverHash: varchar('server_hash', { length: 64 }),
        pageCount: integer('page_count'),
        ocrStatus: ocrStatusEnum('ocr_status').notNull().default('pending'),
        ocrText: text('ocr_text'),
        ocrError: text('ocr_error'),
        embeddingStatus: embeddingStatusEnum('embedding_status').notNull().default('pending'),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        caseIdIdx: index('documents_case_id_idx').on(table.caseId),
        uploadedByIdx: index('documents_uploaded_by_idx').on(table.uploadedBy),
        categoryIdx: index('documents_category_idx').on(table.category),
        ocrStatusIdx: index('documents_ocr_status_idx').on(table.ocrStatus),
    }),
);

export const documentChunks = pgTable(
    'document_chunks',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        documentId: uuid('document_id')
            .notNull()
            .references(() => documents.id, { onDelete: 'cascade' }),
        caseId: uuid('case_id')
            .notNull()
            .references(() => cases.id, { onDelete: 'cascade' }),
        chunkIndex: integer('chunk_index').notNull(),
        chunkContent: text('chunk_content').notNull(),
        tokenCount: integer('token_count').notNull(),
        embedding: vector('embedding', { dimensions: 768 }),
        metadata: jsonb('metadata').$type<{
            page?: number;
            category?: string;
            fileName?: string;
        }>(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        documentIdIdx: index('document_chunks_document_id_idx').on(table.documentId),
        caseIdIdx: index('document_chunks_case_id_idx').on(table.caseId),
    }),
);

export const aiAnalyses = pgTable(
    'ai_analyses',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        caseId: uuid('case_id')
            .notNull()
            .references(() => cases.id, { onDelete: 'cascade' }),
        analysisType: analysisTypeEnum('analysis_type').notNull(),
        modelUsed: varchar('model_used', { length: 100 }).notNull(),
        promptTokens: integer('prompt_tokens'),
        completionTokens: integer('completion_tokens'),
        result: jsonb('result').notNull(),
        confidence: numeric('confidence', { precision: 5, scale: 2 }),
        createdBy: uuid('created_by')
            .notNull()
            .references(() => users.id),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        caseIdIdx: index('ai_analyses_case_id_idx').on(table.caseId),
        analysisTypeIdx: index('ai_analyses_analysis_type_idx').on(table.analysisType),
        createdAtIdx: index('ai_analyses_created_at_idx').on(table.createdAt),
    }),
);

export const caseHearings = pgTable(
    'case_hearings',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        caseId: uuid('case_id')
            .notNull()
            .references(() => cases.id, { onDelete: 'cascade' }),
        hearingDate: timestamp('hearing_date', { withTimezone: true }).notNull(),
        forum: forumTypeEnum('forum').notNull(),
        purpose: text('purpose').notNull(),
        notes: text('notes'),
        outcome: text('outcome'),
        nextHearingDate: timestamp('next_hearing_date', { withTimezone: true }),
        createdBy: uuid('created_by')
            .notNull()
            .references(() => users.id),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        caseIdIdx: index('case_hearings_case_id_idx').on(table.caseId),
        hearingDateIdx: index('case_hearings_hearing_date_idx').on(table.hearingDate),
    }),
);

export const demandNotices = pgTable(
    'demand_notices',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        caseId: uuid('case_id')
            .notNull()
            .references(() => cases.id, { onDelete: 'cascade' }),
        version: integer('version').notNull().default(1),
        content: text('content').notNull(),
        status: demandNoticeStatusEnum('status').notNull().default('draft'),
        sentDate: timestamp('sent_date', { withTimezone: true }),
        acknowledgedDate: timestamp('acknowledged_date', { withTimezone: true }),
        recipientName: varchar('recipient_name', { length: 300 }),
        recipientAddress: text('recipient_address'),
        generatedByAi: boolean('generated_by_ai').notNull().default(false),
        createdBy: uuid('created_by')
            .notNull()
            .references(() => users.id),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    },
    (table) => ({
        caseIdIdx: index('demand_notices_case_id_idx').on(table.caseId),
        statusIdx: index('demand_notices_status_idx').on(table.status),
    }),
);

// --------------------------------------------------------------------------
// Relations
// --------------------------------------------------------------------------

export const usersRelations = relations(users, ({ many }) => ({
    createdCases: many(cases, { relationName: 'createdBy' }),
    assignedCases: many(cases, { relationName: 'assignedTo' }),
    uploadedDocuments: many(documents),
    aiAnalyses: many(aiAnalyses),
    caseHearings: many(caseHearings),
    demandNotices: many(demandNotices),
}));

export const casesRelations = relations(cases, ({ one, many }) => ({
    creator: one(users, {
        fields: [cases.createdBy],
        references: [users.id],
        relationName: 'createdBy',
    }),
    assignee: one(users, {
        fields: [cases.assignedTo],
        references: [users.id],
        relationName: 'assignedTo',
    }),
    documents: many(documents),
    documentChunks: many(documentChunks),
    aiAnalyses: many(aiAnalyses),
    hearings: many(caseHearings),
    demandNotices: many(demandNotices),
}));

export const documentsRelations = relations(documents, ({ one, many }) => ({
    case: one(cases, {
        fields: [documents.caseId],
        references: [cases.id],
    }),
    uploader: one(users, {
        fields: [documents.uploadedBy],
        references: [users.id],
    }),
    chunks: many(documentChunks),
}));

export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
    document: one(documents, {
        fields: [documentChunks.documentId],
        references: [documents.id],
    }),
    case: one(cases, {
        fields: [documentChunks.caseId],
        references: [cases.id],
    }),
}));

export const aiAnalysesRelations = relations(aiAnalyses, ({ one }) => ({
    case: one(cases, {
        fields: [aiAnalyses.caseId],
        references: [cases.id],
    }),
    creator: one(users, {
        fields: [aiAnalyses.createdBy],
        references: [users.id],
    }),
}));

export const caseHearingsRelations = relations(caseHearings, ({ one }) => ({
    case: one(cases, {
        fields: [caseHearings.caseId],
        references: [cases.id],
    }),
    creator: one(users, {
        fields: [caseHearings.createdBy],
        references: [users.id],
    }),
}));

export const demandNoticesRelations = relations(demandNotices, ({ one }) => ({
    case: one(cases, {
        fields: [demandNotices.caseId],
        references: [cases.id],
    }),
    creator: one(users, {
        fields: [demandNotices.createdBy],
        references: [users.id],
    }),
}));

// --------------------------------------------------------------------------
// Inferred types
// --------------------------------------------------------------------------

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type DocumentChunk = typeof documentChunks.$inferSelect;
export type NewDocumentChunk = typeof documentChunks.$inferInsert;

export type AiAnalysis = typeof aiAnalyses.$inferSelect;
export type NewAiAnalysis = typeof aiAnalyses.$inferInsert;

export type CaseHearing = typeof caseHearings.$inferSelect;
export type NewCaseHearing = typeof caseHearings.$inferInsert;

export type DemandNotice = typeof demandNotices.$inferSelect;
export type NewDemandNotice = typeof demandNotices.$inferInsert;
// âœ“ FILE COMPLETE â€” src/db/schema.ts