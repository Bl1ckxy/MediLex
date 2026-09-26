This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  db/
    schema.ts
  lib/
    utils.ts
  types/
    api.ts
    database.ts
    legal.ts
  env.ts
supabase/
  functions.sql
  rls_policies.sql
  schema.sql
  storage.sql
.env.example
.eslintrc.json
.gitignore
.prettierrc
components.json
drizzle.config.ts
next.config.ts
package.json
postcss.config.js
tailwind.config.ts
tsconfig.json
```

# Files

## File: src/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ======================================================================== */
/* MediLex — Brand CSS Custom Properties                                  */
/* ======================================================================== */

@layer base {
    :root {
        /* Brand palette */
        --navy: 219 56% 13%;        /* #0F1B35 */
        --ivory: 36 43% 93%;        /* #F5F0E8 */
        --gold: 38 54% 50%;         /* #C49A3C */
        --crimson: 6 63% 46%;       /* #C0392B */
        --slate-brand: 220 38% 93%; /* #E8EDF5 */

        /* shadcn/ui semantic tokens mapped to MediLex palette */
        --background: 36 43% 93%;         /* ivory */
        --foreground: 219 56% 13%;        /* navy */

        --card: 0 0% 100%;
        --card-foreground: 219 56% 13%;

        --popover: 0 0% 100%;
        --popover-foreground: 219 56% 13%;

        --primary: 219 56% 13%;           /* navy */
        --primary-foreground: 36 43% 93%; /* ivory */

        --secondary: 220 38% 93%;        /* slate */
        --secondary-foreground: 219 56% 13%;

        --muted: 220 38% 93%;
        --muted-foreground: 219 20% 46%;

        --accent: 38 54% 50%;             /* gold */
        --accent-foreground: 219 56% 13%;

        --destructive: 6 63% 46%;        /* crimson */
        --destructive-foreground: 0 0% 100%;

        --border: 220 20% 82%;
        --input: 220 20% 82%;
        --ring: 38 54% 50%;               /* gold ring */

        --radius: 0.5rem; /* 8px max corners */
    }

    /* Dark mode — reserved for future use */
    .dark {
        --background: 219 56% 13%;
        --foreground: 36 43% 93%;

        --card: 219 50% 18%;
        --card-foreground: 36 43% 93%;

        --popover: 219 50% 18%;
        --popover-foreground: 36 43% 93%;

        --primary: 38 54% 50%;
        --primary-foreground: 219 56% 13%;

        --secondary: 219 40% 22%;
        --secondary-foreground: 36 43% 93%;

        --muted: 219 40% 22%;
        --muted-foreground: 220 20% 65%;

        --accent: 38 54% 50%;
        --accent-foreground: 219 56% 13%;

        --destructive: 6 63% 46%;
        --destructive-foreground: 0 0% 100%;

        --border: 219 40% 28%;
        --input: 219 40% 28%;
        --ring: 38 54% 50%;
    }
}

/* ======================================================================== */
/* Font imports (self-hosted via @fontsource)                               */
/* ======================================================================== */

/* Inter — UI font */
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';

/* Lora — Legal prose font */
@import '@fontsource/lora/400.css';
@import '@fontsource/lora/500.css';
@import '@fontsource/lora/600.css';
@import '@fontsource/lora/700.css';
@import '@fontsource/lora/400-italic.css';

/* ======================================================================== */
/* Base styles                                                              */
/* ======================================================================== */

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground font-sans antialiased;
        font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: hsl(var(--muted));
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: hsl(var(--muted-foreground) / 0.3);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--muted-foreground) / 0.5);
    }

    /* Selection highlight */
    ::selection {
        background: hsl(var(--gold) / 0.3);
        color: hsl(var(--foreground));
    }
}

/* ======================================================================== */
/* Legal document preview styles                                            */
/* ======================================================================== */

@layer components {
    .legal-prose {
        font-family: 'Lora', serif;
        line-height: 1.8;
        font-size: 1rem;
        color: hsl(var(--foreground));
    }

    .legal-prose h1,
    .legal-prose h2,
    .legal-prose h3 {
        font-family: 'Lora', serif;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }

    .legal-prose h1 {
        font-size: 1.5rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .legal-prose h2 {
        font-size: 1.25rem;
        border-bottom: 1px solid hsl(var(--border));
        padding-bottom: 0.25em;
    }

    .legal-prose h3 {
        font-size: 1.125rem;
    }

    .legal-prose p {
        margin-bottom: 1em;
        text-align: justify;
    }

    .legal-prose blockquote {
        border-left: 3px solid hsl(var(--gold));
        padding-left: 1em;
        margin: 1em 0;
        font-style: italic;
        color: hsl(var(--muted-foreground));
    }

    .legal-prose ol {
        list-style-type: lower-roman;
        padding-left: 2em;
        margin-bottom: 1em;
    }

    .legal-prose ul {
        list-style-type: disc;
        padding-left: 2em;
        margin-bottom: 1em;
    }

    .legal-prose table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
    }

    .legal-prose th,
    .legal-prose td {
        border: 1px solid hsl(var(--border));
        padding: 0.5em 0.75em;
        text-align: left;
    }

    .legal-prose th {
        background: hsl(var(--muted));
        font-weight: 600;
    }

    /* Emphasis for case citations */
    .legal-prose .case-citation {
        font-style: italic;
        text-decoration: underline;
        text-decoration-color: hsl(var(--gold));
        text-underline-offset: 3px;
    }

    /* Section numbering for legal documents */
    .legal-prose .section-number {
        font-weight: 700;
        margin-right: 0.5em;
    }
}
/* ✓ FILE COMPLETE — src/app/globals.css */
```

## File: src/app/layout.tsx
```typescript
import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
    title: 'MediLex — AI-powered medical negligence litigation',
    description:
        'MediLex (MediLex) is an AI-powered platform for Indian law firms to manage medical negligence cases, from intake through filing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
```

## File: src/app/page.tsx
```typescript
export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="max-w-2xl text-center">
                <h1 className="font-serif text-4xl font-bold text-navy">
                    MediLex
                </h1>
                <p className="mt-2 text-lg text-navy/70">MediLex</p>
                <p className="mt-6 text-muted-foreground">
                    AI-powered medical negligence litigation platform for Indian law firms.
                </p>
                <div className="mt-8 inline-flex items-center rounded-md border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold-600">
                    Platform setup complete — ready for development
                </div>
            </div>
        </main>
    );
}
```

## File: src/db/schema.ts
```typescript
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
// ✓ FILE COMPLETE — src/db/schema.ts
```

## File: src/lib/utils.ts
```typescript
import { type ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx for conditional class names.
 * Uses tailwind-merge to resolve conflicting utility classes.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupees with the Indian numbering system.
 * Uses lakhs (1,00,000) and crores (1,00,00,000) grouping.
 *
 * @example
 * formatCurrency(12345678) // "₹1,23,45,678"
 * formatCurrency(50000)    // "₹50,000"
 * formatCurrency(1000)     // "₹1,000"
 */
export function formatCurrency(amount: number): string {
    const isNegative = amount < 0;
    const absAmount = Math.abs(amount);
    const fixed = absAmount.toFixed(2);
    const [integerPart, decimalPart] = fixed.split('.') as [string, string];

    // Indian numbering: last 3 digits, then groups of 2
    let formatted: string;
    if (integerPart.length <= 3) {
        formatted = integerPart;
    } else {
        const lastThree = integerPart.slice(-3);
        const remaining = integerPart.slice(0, -3);
        const groups: string[] = [];

        let i = remaining.length;
        while (i > 0) {
            const start = Math.max(0, i - 2);
            groups.unshift(remaining.slice(start, i));
            i = start;
        }

        formatted = groups.join(',') + ',' + lastThree;
    }

    // Drop decimal if .00
    const result = decimalPart === '00' ? formatted : `${formatted}.${decimalPart}`;
    return `${isNegative ? '-' : ''}₹${result}`;
}

/**
 * Format a date as "15 Jan 2025".
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'd MMM yyyy');
}

/**
 * Format a date-time as "15 Jan 2025, 2:30 PM IST".
 */
export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, "d MMM yyyy, h:mm a") + ' IST';
}

/**
 * Truncate text to a maximum length, appending "…" if truncated.
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength - 1).trimEnd() + '…';
}

/**
 * Sanitize a file name by removing special characters.
 * Keeps alphanumeric characters, hyphens, underscores, and dots.
 */
export function sanitizeFileName(name: string): string {
    return name
        .replace(/[^a-zA-Z0-9\-_.]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

/**
 * Generate a case number in the format NS/YYYY/NNNN.
 * Note: In production, this is handled by the database trigger.
 * This utility is for client-side preview/display only.
 */
export function generateCaseNumber(): string {
    const year = new Date().getFullYear();
    const seq = Math.floor(Math.random() * 9999) + 1;
    return `NS/${year}/${seq.toString().padStart(4, '0')}`;
}
// ✓ FILE COMPLETE — src/lib/utils.ts
```

## File: src/types/api.ts
```typescript
import { z } from 'zod';
import {
    CASE_STATUSES,
    DOCUMENT_CATEGORIES,
    FORUM_TYPES,
    HOSPITAL_TYPES,
    NEGLIGENCE_TYPES,
    SEVERITY_LEVELS,
} from './legal';

// --------------------------------------------------------------------------
// Error codes
// --------------------------------------------------------------------------

export const ERROR_CODES = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    HASH_MISMATCH: 'HASH_MISMATCH',
    UNSUPPORTED_FORMAT: 'UNSUPPORTED_FORMAT',
    FILE_TOO_LARGE: 'FILE_TOO_LARGE',
    PAGE_COUNT_EXCEEDED: 'PAGE_COUNT_EXCEEDED',
    OCR_FAILED: 'OCR_FAILED',
    EMBEDDING_FAILED: 'EMBEDDING_FAILED',
    LLM_ERROR: 'LLM_ERROR',
    NO_DOCUMENTS: 'NO_DOCUMENTS',
    RATE_LIMITED: 'RATE_LIMITED',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// --------------------------------------------------------------------------
// Generic API response wrappers
// --------------------------------------------------------------------------

export interface ApiError {
    code: ErrorCode;
    message: string;
    details?: unknown;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ApiError;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationMeta;
}

// --------------------------------------------------------------------------
// Case schemas
// --------------------------------------------------------------------------

export const CreateCaseSchema = z
    .object({
        patientName: z
            .string()
            .min(2, 'Patient name must be at least 2 characters')
            .max(200, 'Patient name must not exceed 200 characters'),
        patientAge: z
            .number()
            .int('Age must be a whole number')
            .min(0, 'Age cannot be negative')
            .max(130, 'Age cannot exceed 130'),
        patientGender: z.enum(['male', 'female', 'other']),
        nextOfKin: z
            .string()
            .max(200, 'Next of kin name must not exceed 200 characters')
            .optional(),
        hospitalName: z
            .string()
            .min(2, 'Hospital name must be at least 2 characters')
            .max(300, 'Hospital name must not exceed 300 characters'),
        hospitalType: z.enum(HOSPITAL_TYPES),
        hospitalCity: z
            .string()
            .min(2, 'City name must be at least 2 characters')
            .max(100, 'City name must not exceed 100 characters'),
        hospitalState: z
            .string()
            .min(2, 'State name must be at least 2 characters')
            .max(100, 'State name must not exceed 100 characters'),
        negligenceType: z.enum(NEGLIGENCE_TYPES),
        severity: z.enum(SEVERITY_LEVELS),
        incidentDate: z
            .string()
            .datetime({ offset: true })
            .refine(
                (val) => new Date(val) < new Date(),
                'Incident date must be in the past',
            ),
        incidentDescription: z
            .string()
            .min(10, 'Description must be at least 10 characters')
            .max(10000, 'Description must not exceed 10,000 characters'),
        claimAmount: z.number().positive('Claim amount must be positive'),
        treatingDoctorName: z
            .string()
            .min(2, 'Doctor name must be at least 2 characters')
            .max(200, 'Doctor name must not exceed 200 characters')
            .optional(),
        treatingDoctorRegistration: z
            .string()
            .max(100, 'Registration number must not exceed 100 characters')
            .optional(),
    })
    .refine(
        (data) => {
            if (data.severity === 'death') {
                return (
                    data.nextOfKin !== undefined &&
                    data.nextOfKin !== null &&
                    data.nextOfKin.trim().length > 0
                );
            }
            return true;
        },
        {
            message: 'Next of kin is required when severity is death',
            path: ['nextOfKin'],
        },
    );

export type CreateCaseInput = z.infer<typeof CreateCaseSchema>;

export const UpdateCaseSchema = z.object({
    status: z.enum(CASE_STATUSES).optional(),
    assignedTo: z.string().uuid('Invalid user ID').optional(),
    incidentDescription: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(10000, 'Description must not exceed 10,000 characters')
        .optional(),
    filedForum: z.enum(FORUM_TYPES).optional(),
    complaintNumber: z
        .string()
        .max(100, 'Complaint number must not exceed 100 characters')
        .optional(),
});

export type UpdateCaseInput = z.infer<typeof UpdateCaseSchema>;

// --------------------------------------------------------------------------
// Document schemas
// --------------------------------------------------------------------------

export const UploadDocumentSchema = z.object({
    caseId: z.string().uuid('Invalid case ID'),
    documentCategory: z.enum(DOCUMENT_CATEGORIES),
    clientHash: z
        .string()
        .length(64, 'Client hash must be exactly 64 characters')
        .regex(/^[a-f0-9]+$/, 'Client hash must be a valid hex string'),
});

export type UploadDocumentInput = z.infer<typeof UploadDocumentSchema>;

// --------------------------------------------------------------------------
// Analysis schemas
// --------------------------------------------------------------------------

export const AnalyzeRequestSchema = z.object({
    caseId: z.string().uuid('Invalid case ID'),
});

export type AnalyzeRequestInput = z.infer<typeof AnalyzeRequestSchema>;
// ✓ FILE COMPLETE — src/types/api.ts
```

## File: src/types/database.ts
```typescript
// --------------------------------------------------------------------------
// Re-exported Drizzle inferred types for use throughout the application.
// Import from @/types/database instead of @/db/schema for cleaner imports.
// --------------------------------------------------------------------------

export type {
    User,
    NewUser,
    Case,
    NewCase,
    Document,
    NewDocument,
    DocumentChunk,
    NewDocumentChunk,
    AiAnalysis,
    NewAiAnalysis,
    CaseHearing,
    NewCaseHearing,
    DemandNotice,
    NewDemandNotice,
} from '@/db/schema';
// ✓ FILE COMPLETE — src/types/database.ts
```

## File: src/types/legal.ts
```typescript
// --------------------------------------------------------------------------
// MediLex — Domain Enums & Types for Medical Negligence Litigation
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
// ✓ FILE COMPLETE — src/types/legal.ts
```

## File: src/env.ts
```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
        SUPABASE_DATABASE_URL: z.string().min(1, 'SUPABASE_DATABASE_URL is required'),
        GROQ_API_KEY: z.string().min(1, 'GROQ_API_KEY is required'),
        GOOGLE_AI_API_KEY: z.string().min(1, 'GOOGLE_AI_API_KEY is required'),
        COHERE_API_KEY: z.string().min(1, 'COHERE_API_KEY is required'),
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
    },
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z
            .string()
            .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
        NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
    },
    runtimeEnv: {
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_DATABASE_URL: process.env.SUPABASE_DATABASE_URL,
        GROQ_API_KEY: process.env.GROQ_API_KEY,
        GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
        COHERE_API_KEY: process.env.COHERE_API_KEY,
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
// ✓ FILE COMPLETE — src/env.ts
```

## File: supabase/functions.sql
```sql
-- ============================================================================
-- MediLex — Database Functions
-- Run AFTER schema.sql
-- ============================================================================

-- --------------------------------------------------------------------------
-- match_chunks: Semantic similarity search over document chunks
--
-- Uses cosine distance (<=>) for similarity search against the HNSW index.
-- Filters by case_id to ensure search is scoped to a single case.
-- Returns chunks ordered by similarity (highest first).
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION match_chunks(
    query_embedding VECTOR(768),
    match_case_id   UUID,
    match_count     INT DEFAULT 10
)
RETURNS TABLE (
    id              UUID,
    chunk_content   TEXT,
    metadata        JSONB,
    similarity      FLOAT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
    RETURN QUERY
    SELECT
        dc.id,
        dc.chunk_content,
        dc.metadata,
        1 - (dc.embedding <=> query_embedding) AS similarity
    FROM document_chunks dc
    WHERE dc.case_id = match_case_id
      AND dc.embedding IS NOT NULL
    ORDER BY dc.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- --------------------------------------------------------------------------
-- get_case_document_stats: Returns aggregated document statistics for a case
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_case_document_stats(target_case_id UUID)
RETURNS TABLE (
    total_documents     BIGINT,
    total_pages         BIGINT,
    ocr_completed       BIGINT,
    ocr_pending         BIGINT,
    ocr_failed          BIGINT,
    embedding_completed BIGINT,
    total_chunks        BIGINT
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(d.id)                                                     AS total_documents,
        COALESCE(SUM(d.page_count), 0)                                  AS total_pages,
        COUNT(d.id) FILTER (WHERE d.ocr_status = 'completed')           AS ocr_completed,
        COUNT(d.id) FILTER (WHERE d.ocr_status IN ('pending', 'processing')) AS ocr_pending,
        COUNT(d.id) FILTER (WHERE d.ocr_status = 'failed')              AS ocr_failed,
        COUNT(d.id) FILTER (WHERE d.embedding_status = 'completed')     AS embedding_completed,
        (SELECT COUNT(*) FROM document_chunks dc WHERE dc.case_id = target_case_id) AS total_chunks
    FROM documents d
    WHERE d.case_id = target_case_id;
END;
$$;

-- --------------------------------------------------------------------------
-- get_case_timeline: Returns a chronological timeline of events for a case
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_case_timeline(target_case_id UUID)
RETURNS TABLE (
    event_date      TIMESTAMPTZ,
    event_type      TEXT,
    event_title     TEXT,
    event_detail    TEXT,
    event_source_id UUID
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
    RETURN QUERY

    -- Case creation
    SELECT
        c.created_at,
        'case_created'::TEXT,
        'Case registered'::TEXT,
        'Case ' || c.case_number || ' was created'::TEXT,
        c.id
    FROM cases c
    WHERE c.id = target_case_id

    UNION ALL

    -- Document uploads
    SELECT
        d.created_at,
        'document_uploaded'::TEXT,
        'Document uploaded'::TEXT,
        d.file_name || ' (' || d.category::TEXT || ')',
        d.id
    FROM documents d
    WHERE d.case_id = target_case_id

    UNION ALL

    -- AI analyses
    SELECT
        a.created_at,
        'ai_analysis'::TEXT,
        'AI analysis completed'::TEXT,
        a.analysis_type::TEXT || ' using ' || a.model_used,
        a.id
    FROM ai_analyses a
    WHERE a.case_id = target_case_id

    UNION ALL

    -- Hearings
    SELECT
        h.hearing_date,
        'hearing'::TEXT,
        'Hearing scheduled'::TEXT,
        h.purpose,
        h.id
    FROM case_hearings h
    WHERE h.case_id = target_case_id

    UNION ALL

    -- Demand notices
    SELECT
        dn.created_at,
        'demand_notice'::TEXT,
        'Demand notice ' || dn.status::TEXT,
        'Version ' || dn.version::TEXT || ' — ' || COALESCE(dn.recipient_name, 'No recipient'),
        dn.id
    FROM demand_notices dn
    WHERE dn.case_id = target_case_id

    ORDER BY event_date DESC;
END;
$$;

-- ✓ FILE COMPLETE — supabase/functions.sql
```

## File: supabase/rls_policies.sql
```sql
-- ============================================================================
-- MediLex — Row Level Security Policies
-- Run AFTER schema.sql
-- ============================================================================

-- --------------------------------------------------------------------------
-- Helper: check if the current user is a firm admin
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION is_firm_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users
        WHERE auth_id = auth.uid()
          AND role = 'firm_admin'
          AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- --------------------------------------------------------------------------
-- Helper: get the current user's internal id
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT id FROM users
        WHERE auth_id = auth.uid()
        LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- --------------------------------------------------------------------------
-- Helper: check if the current user has access to a case
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION has_case_access(target_case_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM cases
        WHERE id = target_case_id
          AND (
              created_by = current_user_id()
              OR assigned_to = current_user_id()
              OR is_firm_admin()
          )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ========================================================================
-- 1. USERS
-- ========================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY users_select_own ON users
    FOR SELECT
    USING (auth_id = auth.uid());

-- Firm admins can read all users in their firm
CREATE POLICY users_select_admin ON users
    FOR SELECT
    USING (is_firm_admin());

-- Users can update their own profile
CREATE POLICY users_update_own ON users
    FOR UPDATE
    USING (auth_id = auth.uid())
    WITH CHECK (auth_id = auth.uid());

-- Firm admins can update users in their firm
CREATE POLICY users_update_admin ON users
    FOR UPDATE
    USING (is_firm_admin())
    WITH CHECK (is_firm_admin());

-- Allow insert during sign-up (auth trigger)
CREATE POLICY users_insert ON users
    FOR INSERT
    WITH CHECK (auth_id = auth.uid());

-- ========================================================================
-- 2. CASES
-- ========================================================================
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Select: own cases (created or assigned) or firm admin
CREATE POLICY cases_select ON cases
    FOR SELECT
    USING (
        created_by = current_user_id()
        OR assigned_to = current_user_id()
        OR is_firm_admin()
    );

-- Insert: any authenticated user
CREATE POLICY cases_insert ON cases
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Update: creator or firm admin
CREATE POLICY cases_update ON cases
    FOR UPDATE
    USING (
        created_by = current_user_id()
        OR is_firm_admin()
    )
    WITH CHECK (
        created_by = current_user_id()
        OR is_firm_admin()
    );

-- ========================================================================
-- 3. DOCUMENTS
-- ========================================================================
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Select: users with case access
CREATE POLICY documents_select ON documents
    FOR SELECT
    USING (has_case_access(case_id));

-- Insert: users with case access
CREATE POLICY documents_insert ON documents
    FOR INSERT
    WITH CHECK (has_case_access(case_id));

-- ========================================================================
-- 4. DOCUMENT_CHUNKS — service role only
-- ========================================================================
ALTER TABLE document_chunks ENABLE ROW LEVEL SECURITY;

-- Block all direct access; only service role (which bypasses RLS) can read/write
CREATE POLICY document_chunks_deny_all ON document_chunks
    FOR ALL
    USING (FALSE);

-- ========================================================================
-- 5. AI_ANALYSES
-- ========================================================================
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- Select: users with case access
CREATE POLICY ai_analyses_select ON ai_analyses
    FOR SELECT
    USING (has_case_access(case_id));

-- Insert: users with case access (analysis runs server-side, but permission check)
CREATE POLICY ai_analyses_insert ON ai_analyses
    FOR INSERT
    WITH CHECK (has_case_access(case_id));

-- ========================================================================
-- 6. CASE_HEARINGS
-- ========================================================================
ALTER TABLE case_hearings ENABLE ROW LEVEL SECURITY;

-- Select: users with case access
CREATE POLICY case_hearings_select ON case_hearings
    FOR SELECT
    USING (has_case_access(case_id));

-- Insert: users with case access
CREATE POLICY case_hearings_insert ON case_hearings
    FOR INSERT
    WITH CHECK (has_case_access(case_id));

-- ========================================================================
-- 7. DEMAND_NOTICES
-- ========================================================================
ALTER TABLE demand_notices ENABLE ROW LEVEL SECURITY;

-- Select: users with case access
CREATE POLICY demand_notices_select ON demand_notices
    FOR SELECT
    USING (has_case_access(case_id));

-- Insert: users with case access
CREATE POLICY demand_notices_insert ON demand_notices
    FOR INSERT
    WITH CHECK (has_case_access(case_id));

-- ✓ FILE COMPLETE — supabase/rls_policies.sql
```

## File: supabase/schema.sql
```sql
-- ============================================================================
-- MediLex — Complete Database Schema (DDL)
-- Deploy via Supabase SQL Editor
-- ============================================================================

-- --------------------------------------------------------------------------
-- Extensions
-- --------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- --------------------------------------------------------------------------
-- Enums
-- --------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'firm_admin', 'senior_partner', 'associate', 'paralegal'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE case_status AS ENUM (
        'intake', 'investigation', 'analysis', 'filed', 'closed'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE hospital_type AS ENUM (
        'govt', 'private', 'trust', 'clinic'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE negligence_type AS ENUM (
        'misdiagnosis', 'surgical_error', 'delayed_treatment',
        'medication_error', 'birth_injury', 'anesthesia_error',
        'informed_consent_failure', 'hospital_infection',
        'wrong_site_surgery', 'equipment_failure', 'other'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE severity_level AS ENUM (
        'death', 'permanent_disability', 'temporary_disability', 'prolonged_suffering'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE forum_type AS ENUM (
        'district_commission', 'state_commission', 'ncdrc', 'high_court', 'civil_court'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE document_category AS ENUM (
        'discharge_summary', 'prescription', 'lab_report', 'radiology_report',
        'ot_notes', 'consent_form', 'death_certificate', 'billing_record',
        'nursing_notes', 'medico_legal_certificate', 'expert_opinion',
        'police_report', 'correspondence', 'other'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE ocr_status AS ENUM (
        'pending', 'processing', 'completed', 'failed'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE embedding_status AS ENUM (
        'pending', 'completed', 'failed'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE analysis_type AS ENUM (
        'case_strength', 'compensation_estimate', 'precedent_search',
        'demand_notice_draft', 'complaint_draft'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE patient_gender AS ENUM (
        'male', 'female', 'other'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TYPE demand_notice_status AS ENUM (
        'draft', 'sent', 'acknowledged', 'expired'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- --------------------------------------------------------------------------
-- Sequence for case numbers
-- --------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS case_seq START WITH 1 INCREMENT BY 1;

-- --------------------------------------------------------------------------
-- Tables
-- --------------------------------------------------------------------------

-- 1. Users
CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id         UUID NOT NULL UNIQUE,
    email           VARCHAR(320) NOT NULL UNIQUE,
    full_name       VARCHAR(200) NOT NULL,
    role            user_role NOT NULL DEFAULT 'associate',
    firm_id         UUID,
    avatar_url      TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_auth_id_idx ON users(auth_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_firm_id_idx ON users(firm_id);

-- 2. Cases
CREATE TABLE IF NOT EXISTS cases (
    id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number                 VARCHAR(20) NOT NULL UNIQUE,
    status                      case_status NOT NULL DEFAULT 'intake',
    created_by                  UUID NOT NULL REFERENCES users(id),
    assigned_to                 UUID REFERENCES users(id),
    firm_id                     UUID,

    -- Patient details
    patient_name                VARCHAR(200) NOT NULL,
    patient_age                 INTEGER NOT NULL CHECK (patient_age >= 0 AND patient_age <= 130),
    patient_gender              patient_gender NOT NULL,
    next_of_kin                 VARCHAR(200),

    -- Hospital details
    hospital_name               VARCHAR(300) NOT NULL,
    hospital_type               hospital_type NOT NULL,
    hospital_city               VARCHAR(100) NOT NULL,
    hospital_state              VARCHAR(100) NOT NULL,

    -- Case details
    negligence_type             negligence_type NOT NULL,
    severity                    severity_level NOT NULL,
    incident_date               TIMESTAMPTZ NOT NULL,
    incident_description        TEXT NOT NULL,
    claim_amount                NUMERIC(15,2) NOT NULL CHECK (claim_amount > 0),
    recommended_forum           forum_type,
    filed_forum                 forum_type,
    complaint_number            VARCHAR(100),
    limitation_deadline         TIMESTAMPTZ,

    -- Doctor details
    treating_doctor_name        VARCHAR(200),
    treating_doctor_registration VARCHAR(100),

    -- AI analysis summary
    ai_strength_score           NUMERIC(5,2),
    ai_compensation_estimate    NUMERIC(15,2),

    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cases_status_idx ON cases(status);
CREATE INDEX IF NOT EXISTS cases_created_by_idx ON cases(created_by);
CREATE INDEX IF NOT EXISTS cases_assigned_to_idx ON cases(assigned_to);
CREATE INDEX IF NOT EXISTS cases_firm_id_idx ON cases(firm_id);
CREATE INDEX IF NOT EXISTS cases_case_number_idx ON cases(case_number);
CREATE INDEX IF NOT EXISTS cases_incident_date_idx ON cases(incident_date);
CREATE INDEX IF NOT EXISTS cases_negligence_type_idx ON cases(negligence_type);

-- 3. Documents
CREATE TABLE IF NOT EXISTS documents (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id             UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    uploaded_by         UUID NOT NULL REFERENCES users(id),
    category            document_category NOT NULL,
    file_name           VARCHAR(500) NOT NULL,
    file_size           INTEGER NOT NULL,
    mime_type           VARCHAR(100) NOT NULL,
    storage_path        TEXT NOT NULL,
    client_hash         VARCHAR(64) NOT NULL,
    server_hash         VARCHAR(64),
    page_count          INTEGER,
    ocr_status          ocr_status NOT NULL DEFAULT 'pending',
    ocr_text            TEXT,
    ocr_error           TEXT,
    embedding_status    embedding_status NOT NULL DEFAULT 'pending',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS documents_case_id_idx ON documents(case_id);
CREATE INDEX IF NOT EXISTS documents_uploaded_by_idx ON documents(uploaded_by);
CREATE INDEX IF NOT EXISTS documents_category_idx ON documents(category);
CREATE INDEX IF NOT EXISTS documents_ocr_status_idx ON documents(ocr_status);

-- 4. Document Chunks (with pgvector embedding)
CREATE TABLE IF NOT EXISTS document_chunks (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    case_id         UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    chunk_index     INTEGER NOT NULL,
    chunk_content   TEXT NOT NULL,
    token_count     INTEGER NOT NULL,
    embedding       VECTOR(768),
    metadata        JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS document_chunks_document_id_idx ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS document_chunks_case_id_idx ON document_chunks(case_id);

-- HNSW index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx
    ON document_chunks
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- 5. AI Analyses
CREATE TABLE IF NOT EXISTS ai_analyses (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id             UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    analysis_type       analysis_type NOT NULL,
    model_used          VARCHAR(100) NOT NULL,
    prompt_tokens       INTEGER,
    completion_tokens   INTEGER,
    result              JSONB NOT NULL,
    confidence          NUMERIC(5,2),
    created_by          UUID NOT NULL REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ai_analyses_case_id_idx ON ai_analyses(case_id);
CREATE INDEX IF NOT EXISTS ai_analyses_analysis_type_idx ON ai_analyses(analysis_type);
CREATE INDEX IF NOT EXISTS ai_analyses_created_at_idx ON ai_analyses(created_at);

-- 6. Case Hearings
CREATE TABLE IF NOT EXISTS case_hearings (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id             UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    hearing_date        TIMESTAMPTZ NOT NULL,
    forum               forum_type NOT NULL,
    purpose             TEXT NOT NULL,
    notes               TEXT,
    outcome             TEXT,
    next_hearing_date   TIMESTAMPTZ,
    created_by          UUID NOT NULL REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS case_hearings_case_id_idx ON case_hearings(case_id);
CREATE INDEX IF NOT EXISTS case_hearings_hearing_date_idx ON case_hearings(hearing_date);

-- 7. Demand Notices
CREATE TABLE IF NOT EXISTS demand_notices (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id             UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    version             INTEGER NOT NULL DEFAULT 1,
    content             TEXT NOT NULL,
    status              demand_notice_status NOT NULL DEFAULT 'draft',
    sent_date           TIMESTAMPTZ,
    acknowledged_date   TIMESTAMPTZ,
    recipient_name      VARCHAR(300),
    recipient_address   TEXT,
    generated_by_ai     BOOLEAN NOT NULL DEFAULT FALSE,
    created_by          UUID NOT NULL REFERENCES users(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS demand_notices_case_id_idx ON demand_notices(case_id);
CREATE INDEX IF NOT EXISTS demand_notices_status_idx ON demand_notices(status);

-- --------------------------------------------------------------------------
-- Helper function: compute recommended forum based on CPA 2019 jurisdiction
-- ≤50 lakh → District Commission
-- ≤2 crore → State Commission
-- >2 crore → NCDRC
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION compute_recommended_forum(claim NUMERIC)
RETURNS forum_type AS $$
BEGIN
    IF claim <= 5000000 THEN          -- ≤50 lakh
        RETURN 'district_commission';
    ELSIF claim <= 20000000 THEN      -- ≤2 crore
        RETURN 'state_commission';
    ELSE                              -- >2 crore
        RETURN 'ncdrc';
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- --------------------------------------------------------------------------
-- Trigger: auto-set updated_at on users
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cases_updated_at ON cases;
CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON cases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------------------------
-- Trigger: before insert on cases
-- Auto-compute: case_number, recommended_forum, limitation_deadline
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION cases_before_insert_fn()
RETURNS TRIGGER AS $$
DECLARE
    seq_val INTEGER;
    year_str TEXT;
BEGIN
    -- Generate case number: NS/YYYY/NNNN
    seq_val := nextval('case_seq');
    year_str := EXTRACT(YEAR FROM NOW())::TEXT;
    NEW.case_number := 'NS/' || year_str || '/' || LPAD(seq_val::TEXT, 4, '0');

    -- Compute recommended forum based on claim amount
    NEW.recommended_forum := compute_recommended_forum(NEW.claim_amount);

    -- Compute limitation deadline: incident_date + 2 years (CPA limitation period)
    NEW.limitation_deadline := NEW.incident_date + INTERVAL '2 years';

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cases_before_insert ON cases;
CREATE TRIGGER cases_before_insert
    BEFORE INSERT ON cases
    FOR EACH ROW
    EXECUTE FUNCTION cases_before_insert_fn();

-- ✓ FILE COMPLETE — supabase/schema.sql
```

## File: supabase/storage.sql
```sql
-- ============================================================================
-- MediLex — Storage Bucket Configuration
-- Run AFTER schema.sql
-- ============================================================================

-- --------------------------------------------------------------------------
-- Create the private bucket for case documents
-- 50MB max file size, restricted MIME types
-- --------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'case-documents',
    'case-documents',
    FALSE,
    52428800, -- 50 MB
    ARRAY[
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ]::TEXT[]
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- --------------------------------------------------------------------------
-- Storage RLS policies
-- --------------------------------------------------------------------------

-- Authenticated users can upload to case-documents
CREATE POLICY storage_case_documents_insert
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'case-documents');

-- Authenticated users can read from case-documents
CREATE POLICY storage_case_documents_select
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'case-documents');

-- Users can delete their own uploads
CREATE POLICY storage_case_documents_delete
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'case-documents'
        AND (storage.foldername(name))[1] = auth.uid()::TEXT
    );

-- ✓ FILE COMPLETE — supabase/storage.sql
```

## File: .eslintrc.json
```json
{
    "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "rules": {
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_"
            }
        ],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                "prefer": "type-imports"
            }
        ]
    }
}
```

## File: .gitignore
```
# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# supabase
.supabase/

# drizzle
/drizzle/meta/

# IDE
.vscode/
.idea/
*.swp
*.swo
```

## File: .prettierrc
```
{
    "semi": true,
    "singleQuote": true,
    "trailingComma": "all",
    "printWidth": 100,
    "tabWidth": 4,
    "plugins": ["prettier-plugin-tailwindcss"]
}
```

## File: components.json
```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "default",
    "rsc": true,
    "tsx": true,
    "tailwind": {
        "config": "tailwind.config.ts",
        "css": "src/app/globals.css",
        "baseColor": "slate",
        "cssVariables": true,
        "prefix": ""
    },
    "aliases": {
        "components": "@/components",
        "utils": "@/lib/utils",
        "ui": "@/components/ui",
        "lib": "@/lib",
        "hooks": "@/hooks"
    }
}
```

## File: drizzle.config.ts
```typescript
import type { Config } from 'drizzle-kit';

export default {
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        url: process.env.SUPABASE_DATABASE_URL!,
    },
} satisfies Config;
// ✓ FILE COMPLETE — drizzle.config.ts
```

## File: next.config.ts
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.supabase.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ['pdf2pic', 'sharp', 'tiktoken'],
    },
};

export default nextConfig;
// ✓ FILE COMPLETE — next.config.ts
```

## File: package.json
```json
{
    "name": "medilex",
    "version": "0.1.0",
    "private": true,
    "description": "MediLex — AI-powered medical negligence litigation platform for Indian law firms",
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "eslint . --ext .ts,.tsx",
        "lint:fix": "eslint . --ext .ts,.tsx --fix",
        "format": "prettier --write \"**/*.{ts,tsx,json,css,md}\"",
        "type-check": "tsc --noEmit",
        "db:generate": "drizzle-kit generate",
        "db:push": "drizzle-kit push",
        "db:studio": "drizzle-kit studio",
        "prepare": "husky"
    },
    "dependencies": {
        "@fontsource/inter": "^5.0.18",
        "@fontsource/lora": "^5.0.18",
        "@google/genai": "^0.14.0",
        "@hookform/resolvers": "^3.9.0",
        "@radix-ui/react-dialog": "^1.1.1",
        "@radix-ui/react-label": "^2.1.0",
        "@radix-ui/react-select": "^2.1.1",
        "@radix-ui/react-separator": "^1.1.0",
        "@radix-ui/react-slot": "^1.1.0",
        "@radix-ui/react-tabs": "^1.1.0",
        "@radix-ui/react-tooltip": "^1.1.2",
        "@supabase/ssr": "^0.4.0",
        "@supabase/supabase-js": "^2.45.0",
        "@t3-oss/env-nextjs": "^0.10.1",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.1",
        "cohere-ai": "^7.13.0",
        "date-fns": "^3.6.0",
        "drizzle-orm": "^0.30.10",
        "groq-sdk": "^0.7.0",
        "lucide-react": "^0.378.0",
        "next": "^14.2.5",
        "pdf2pic": "^3.1.3",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-dropzone": "^14.2.3",
        "react-hook-form": "^7.52.1",
        "recharts": "^2.12.7",
        "sharp": "^0.33.4",
        "sonner": "^1.5.0",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "tiktoken": "^1.0.15",
        "zod": "^3.23.8"
    },
    "devDependencies": {
        "@types/node": "^20.14.10",
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@typescript-eslint/eslint-plugin": "^7.16.0",
        "@typescript-eslint/parser": "^7.16.0",
        "autoprefixer": "^10.4.19",
        "drizzle-kit": "^0.21.4",
        "eslint": "^8.57.0",
        "eslint-config-next": "^14.2.5",
        "husky": "^9.1.4",
        "lint-staged": "^15.2.7",
        "postcss": "^8.4.39",
        "prettier": "^3.3.3",
        "prettier-plugin-tailwindcss": "^0.6.5",
        "tailwindcss": "^3.4.6",
        "typescript": "^5.4.5"
    },
    "lint-staged": {
        "*.{ts,tsx}": [
            "eslint --fix",
            "prettier --write"
        ],
        "*.{json,css,md}": [
            "prettier --write"
        ]
    }
}
```

## File: postcss.config.js
```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};

module.exports = config;
```

## File: tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                navy: {
                    DEFAULT: '#0F1B35',
                    50: '#E8EDF5',
                    100: '#C5D0E3',
                    200: '#9BAAC8',
                    300: '#7184AD',
                    400: '#4D6192',
                    500: '#2E4270',
                    600: '#1F3058',
                    700: '#162545',
                    800: '#0F1B35',
                    900: '#080E1C',
                },
                ivory: {
                    DEFAULT: '#F5F0E8',
                    50: '#FEFDFB',
                    100: '#FAF7F2',
                    200: '#F5F0E8',
                    300: '#E8DECE',
                    400: '#DBCCB4',
                    500: '#CEBA9A',
                },
                gold: {
                    DEFAULT: '#C49A3C',
                    50: '#FCF6E8',
                    100: '#F5E5BF',
                    200: '#EDD496',
                    300: '#D9B464',
                    400: '#C49A3C',
                    500: '#A67F2A',
                    600: '#886520',
                },
                crimson: {
                    DEFAULT: '#C0392B',
                    50: '#FDECEB',
                    100: '#F5C6C1',
                    200: '#E88D84',
                    300: '#D4574A',
                    400: '#C0392B',
                    500: '#962D22',
                    600: '#6C2019',
                },
                slate: {
                    DEFAULT: '#E8EDF5',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['Lora', ...defaultTheme.fontFamily.serif],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};

export default config;
// ✓ FILE COMPLETE — tailwind.config.ts
```

## File: tsconfig.json
```json
{
    "compilerOptions": {
        "target": "es2017",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noUncheckedIndexedAccess": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
            {
                "name": "next"
            }
        ],
        "paths": {
            "@/*": ["./src/*"]
        }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
}
```
