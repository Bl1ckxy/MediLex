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
// âœ“ FILE COMPLETE â€” src/types/database.ts