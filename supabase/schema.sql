-- ============================================================================
-- MediLex â€” Complete Database Schema (DDL)
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

-- Create the application profile as part of Supabase Auth signup. This runs
-- with definer privileges because a newly confirmed user may not have a
-- session yet when the auth row is created.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (auth_id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''), split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (auth_id) DO UPDATE
        SET email = EXCLUDED.email,
            full_name = EXCLUDED.full_name,
            updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

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
    next_of_kin_relation        VARCHAR(100),

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
ALTER TABLE cases ADD COLUMN IF NOT EXISTS next_of_kin_relation VARCHAR(100);

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
-- â‰¤50 lakh â†’ District Commission
-- â‰¤2 crore â†’ State Commission
-- >2 crore â†’ NCDRC
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION compute_recommended_forum(claim NUMERIC)
RETURNS forum_type AS $$
BEGIN
    IF claim <= 5000000 THEN          -- â‰¤50 lakh
        RETURN 'district_commission';
    ELSIF claim <= 20000000 THEN      -- â‰¤2 crore
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

-- âœ“ FILE COMPLETE â€” supabase/schema.sql