-- ============================================================================
-- MediLex â€” Row Level Security Policies
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

CREATE POLICY documents_delete ON documents
    FOR DELETE
    USING (has_case_access(case_id));

-- ========================================================================
-- 4. DOCUMENT_CHUNKS â€” service role only
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

-- âœ“ FILE COMPLETE â€” supabase/rls_policies.sql