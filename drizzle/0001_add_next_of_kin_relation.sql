ALTER TABLE "cases"
    ADD COLUMN IF NOT EXISTS "next_of_kin_relation" varchar(100);
