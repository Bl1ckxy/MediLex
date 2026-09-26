-- ============================================================================
-- MediLex â€” Database Functions
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
        'Version ' || dn.version::TEXT || ' â€” ' || COALESCE(dn.recipient_name, 'No recipient'),
        dn.id
    FROM demand_notices dn
    WHERE dn.case_id = target_case_id

    ORDER BY event_date DESC;
END;
$$;

-- âœ“ FILE COMPLETE â€” supabase/functions.sql