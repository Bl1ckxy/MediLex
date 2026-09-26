DO $$ BEGIN
 CREATE TYPE "public"."analysis_type" AS ENUM('case_strength', 'compensation_estimate', 'precedent_search', 'demand_notice_draft', 'complaint_draft');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."case_status" AS ENUM('intake', 'investigation', 'analysis', 'filed', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."demand_notice_status" AS ENUM('draft', 'sent', 'acknowledged', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."document_category" AS ENUM('discharge_summary', 'prescription', 'lab_report', 'radiology_report', 'ot_notes', 'consent_form', 'death_certificate', 'billing_record', 'nursing_notes', 'medico_legal_certificate', 'expert_opinion', 'police_report', 'correspondence', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."embedding_status" AS ENUM('pending', 'completed', 'failed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."forum_type" AS ENUM('district_commission', 'state_commission', 'ncdrc', 'high_court', 'civil_court');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."hospital_type" AS ENUM('govt', 'private', 'trust', 'clinic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."negligence_type" AS ENUM('misdiagnosis', 'surgical_error', 'delayed_treatment', 'medication_error', 'birth_injury', 'anesthesia_error', 'informed_consent_failure', 'hospital_infection', 'wrong_site_surgery', 'equipment_failure', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ocr_status" AS ENUM('pending', 'processing', 'completed', 'failed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."patient_gender" AS ENUM('male', 'female', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."severity_level" AS ENUM('death', 'permanent_disability', 'temporary_disability', 'prolonged_suffering');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('firm_admin', 'senior_partner', 'associate', 'paralegal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ai_analyses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"analysis_type" "analysis_type" NOT NULL,
	"model_used" varchar(100) NOT NULL,
	"prompt_tokens" integer,
	"completion_tokens" integer,
	"result" jsonb NOT NULL,
	"confidence" numeric(5, 2),
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "case_hearings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"hearing_date" timestamp with time zone NOT NULL,
	"forum" "forum_type" NOT NULL,
	"purpose" text NOT NULL,
	"notes" text,
	"outcome" text,
	"next_hearing_date" timestamp with time zone,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_number" varchar(20) NOT NULL,
	"status" "case_status" DEFAULT 'intake' NOT NULL,
	"created_by" uuid NOT NULL,
	"assigned_to" uuid,
	"firm_id" uuid,
	"patient_name" varchar(200) NOT NULL,
	"patient_age" integer NOT NULL,
	"patient_gender" "patient_gender" NOT NULL,
	"next_of_kin" varchar(200),
	"hospital_name" varchar(300) NOT NULL,
	"hospital_type" "hospital_type" NOT NULL,
	"hospital_city" varchar(100) NOT NULL,
	"hospital_state" varchar(100) NOT NULL,
	"negligence_type" "negligence_type" NOT NULL,
	"severity" "severity_level" NOT NULL,
	"incident_date" timestamp with time zone NOT NULL,
	"incident_description" text NOT NULL,
	"claim_amount" numeric(15, 2) NOT NULL,
	"recommended_forum" "forum_type",
	"filed_forum" "forum_type",
	"complaint_number" varchar(100),
	"limitation_deadline" timestamp with time zone,
	"treating_doctor_name" varchar(200),
	"treating_doctor_registration" varchar(100),
	"ai_strength_score" numeric(5, 2),
	"ai_compensation_estimate" numeric(15, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cases_case_number_unique" UNIQUE("case_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "demand_notices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"content" text NOT NULL,
	"status" "demand_notice_status" DEFAULT 'draft' NOT NULL,
	"sent_date" timestamp with time zone,
	"acknowledged_date" timestamp with time zone,
	"recipient_name" varchar(300),
	"recipient_address" text,
	"generated_by_ai" boolean DEFAULT false NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document_chunks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"document_id" uuid NOT NULL,
	"case_id" uuid NOT NULL,
	"chunk_index" integer NOT NULL,
	"chunk_content" text NOT NULL,
	"token_count" integer NOT NULL,
	"embedding" "vector(768)",
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"uploaded_by" uuid NOT NULL,
	"category" "document_category" NOT NULL,
	"file_name" varchar(500) NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"storage_path" text NOT NULL,
	"client_hash" varchar(64) NOT NULL,
	"server_hash" varchar(64),
	"page_count" integer,
	"ocr_status" "ocr_status" DEFAULT 'pending' NOT NULL,
	"ocr_text" text,
	"ocr_error" text,
	"embedding_status" "embedding_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_id" uuid NOT NULL,
	"email" varchar(320) NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"role" "user_role" DEFAULT 'associate' NOT NULL,
	"firm_id" uuid,
	"avatar_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_auth_id_unique" UNIQUE("auth_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_analyses" ADD CONSTRAINT "ai_analyses_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ai_analyses" ADD CONSTRAINT "ai_analyses_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "case_hearings" ADD CONSTRAINT "case_hearings_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "case_hearings" ADD CONSTRAINT "case_hearings_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cases" ADD CONSTRAINT "cases_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cases" ADD CONSTRAINT "cases_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "demand_notices" ADD CONSTRAINT "demand_notices_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "demand_notices" ADD CONSTRAINT "demand_notices_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_chunks" ADD CONSTRAINT "document_chunks_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document_chunks" ADD CONSTRAINT "document_chunks_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ai_analyses_case_id_idx" ON "ai_analyses" ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ai_analyses_analysis_type_idx" ON "ai_analyses" ("analysis_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ai_analyses_created_at_idx" ON "ai_analyses" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "case_hearings_case_id_idx" ON "case_hearings" ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "case_hearings_hearing_date_idx" ON "case_hearings" ("hearing_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_status_idx" ON "cases" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_created_by_idx" ON "cases" ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_assigned_to_idx" ON "cases" ("assigned_to");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_firm_id_idx" ON "cases" ("firm_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_case_number_idx" ON "cases" ("case_number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_incident_date_idx" ON "cases" ("incident_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cases_negligence_type_idx" ON "cases" ("negligence_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "demand_notices_case_id_idx" ON "demand_notices" ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "demand_notices_status_idx" ON "demand_notices" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_chunks_document_id_idx" ON "document_chunks" ("document_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "document_chunks_case_id_idx" ON "document_chunks" ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_case_id_idx" ON "documents" ("case_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_uploaded_by_idx" ON "documents" ("uploaded_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_category_idx" ON "documents" ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "documents_ocr_status_idx" ON "documents" ("ocr_status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_auth_id_idx" ON "users" ("auth_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_firm_id_idx" ON "users" ("firm_id");