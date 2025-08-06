-- Create enum type for project status - planning, in-progress, on-hold, completed, launched
CREATE TYPE "public"."project_status" AS ENUM ('planning', 'in-progress', 'on-hold', 'completed', 'launched');

-- Update projects table to include the status column
ALTER TABLE "public"."projects" ADD COLUMN IF NOT EXISTS "status" "public"."project_status" NOT NULL DEFAULT "planning";

-- Create project_updates table with id, project_id, update text, created_at, and updated_at
CREATE TABLE IF NOT EXISTS "public"."project_updates" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    "project_id" UUID NOT NULL REFERENCES public.projects (id) ON DELETE CASCADE,
    "update" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now (),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now ()
);

-- project_updates table row level security policies
CREATE POLICY "Anyone can read public project updates" ON "public"."project_updates" FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.visibility = 'public'
));
CREATE POLICY "Authenticated users can read their own private project updates" ON "public"."project_updates" FOR SELECT TO authenticated USING (EXISTS (
    SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.visibility = 'private' AND p.owner_id = auth.uid()
));
CREATE POLICY "Users can create project updates" ON "public"."project_updates" FOR INSERT TO authenticated WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()
));
CREATE POLICY "Users can update their own project updates" ON "public"."project_updates" FOR UPDATE TO authenticated USING (EXISTS (
    SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()
));
CREATE POLICY "Users can delete their own project updates" ON "public"."project_updates" FOR DELETE TO authenticated USING (EXISTS (
    SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.owner_id = auth.uid()
));

-- Create policy for projects table to allow anyone to read public projects
CREATE POLICY "Anyone can read public projects" ON "public"."projects" FOR SELECT USING (visibility = 'public');

-- Enable row level security
ALTER TABLE "public"."project_updates" ENABLE ROW LEVEL SECURITY;