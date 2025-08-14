// src/hooks/useProject/actions.ts
'use server';

import { createClient } from '@supabase/supabase-js';
import type { Database } from 'supabase/supabase.types';
import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import type {
  Project,
  ProjectDTO,
} from '@/repositories/projectRepository/project.types';

// Local, edge-safe anon client (no session persistence or refresh)
function createEdgeAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error('Missing Supabase env vars');

  return createClient<Database>(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: { fetch },
  });
}

/**
 * Fetch projects for the dashboard (latest first).
 * Returns clean `Project[]` using your repository transform.
 */
export async function getProjectsForDashboard(): Promise<Project[]> {
  const supabase = createEdgeAnonClient();
  const repo = new ProjectRepository(supabase);

  const { data, error } = await repo
    .getRawBaseQuery(false)
    // If your DB column is camelCase, change to 'createdAt'
    .order('created_at', { ascending: false })
    .returns<ProjectDTO[]>();

  if (error) throw new Error(error.message || 'Failed to fetch projects');

  return (data ?? []).map((row) => repo.transformDTO(row));
}

// Optional helper type for the hook
export type FetchProjectsResult = Awaited<
  ReturnType<typeof getProjectsForDashboard>
>;
