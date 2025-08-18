'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import { createServiceClient, createAnonClient } from 'utils/supabase/server';
import type {
  Project,
  ProjectDTO,
} from '@/repositories/projectRepository/project.types';

/**
 * Get all projects for the **current authenticated user** (dashboard view).
 */
export async function getProjectsForDashboard(): Promise<Project[]> {
  const supabase = await createServiceClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Not authenticated');
  }

  const repo = new ProjectRepository(supabase);

  const { data, error } = await repo
    .getRawBaseQuery(false)
    .eq('owner_id', user.id) // ✅ only fetch current user’s projects
    .order('created_at', { ascending: false })
    .returns<ProjectDTO[]>();

  if (error) throw new Error(error.message || 'Failed to fetch projects');
  return (data ?? []).map((row) => repo.transformDTO(row));
}

/**
 * Get projects for a specific username (for profile pages).
 */
export async function getProjectsByUsername(username: string): Promise<Project[]> {
  const supabase = await createAnonClient();
  const repo = new ProjectRepository(supabase);

  // 1) Resolve profile id from username
  const { data: profileRow, error: profileErr } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (profileErr || !profileRow?.id) {
    return [];
  }

  // 2) Query projects directly with base-table filter + explicit FK join
  const { data, error } = await supabase
    .from('projects')
    .select(
      '*, owner:profiles!projects_owner_id_fkey(id, username), updates:project_updates(*)'
    )
    .eq('owner_id', profileRow.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to fetch projects for user');
  }

  return (data ?? []).map((row) => repo.transformDTO(row as ProjectDTO));
}