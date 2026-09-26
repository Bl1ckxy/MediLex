-- Remove older duplicates before adding the database-level upload guard.
WITH duplicates AS (
    SELECT id, ROW_NUMBER() OVER (PARTITION BY case_id, client_hash ORDER BY created_at, id) AS row_number
    FROM public.documents
)
DELETE FROM public.documents
WHERE id IN (SELECT id FROM duplicates WHERE row_number > 1);

CREATE UNIQUE INDEX IF NOT EXISTS documents_case_client_hash_unique
    ON public.documents (case_id, client_hash);
