-- Create project_updates table with id, project_id, update text, created_at, and updated_at
CREATE TABLE IF NOT EXISTS "public"."project_updates" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    "project_id" UUID NOT NULL REFERENCES public.projects (id) ON DELETE CASCADE,
    "update" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now (),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now ()
);

-- project_updates
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

