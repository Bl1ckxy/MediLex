-- ============================================================================
-- MediLex â€” Storage Bucket Configuration
-- Run AFTER schema.sql and rls_policies.sql
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

-- Users can upload only into a case they can access. Object names are stored
-- as <case-id>/<random-id>-<file-name>.
CREATE POLICY storage_case_documents_insert
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'case-documents'
        AND has_case_access(((storage.foldername(name))[1])::UUID)
    );

-- Users can read only documents belonging to an accessible case.
CREATE POLICY storage_case_documents_select
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'case-documents'
        AND has_case_access(((storage.foldername(name))[1])::UUID)
    );

-- Users with access to the case can delete its documents.
CREATE POLICY storage_case_documents_delete
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'case-documents'
        AND has_case_access(((storage.foldername(name))[1])::UUID)
    );

-- âœ“ FILE COMPLETE â€” supabase/storage.sql