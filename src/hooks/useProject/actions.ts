// src/hooks/useProject/actions.ts
'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import { Project, ProjectDTO } from '@/repositories/projectRepository/project.types';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { createAnonClient, SupabaseAnonClient } from 'utils/supabase/server';

/**
 * List projects for the dashboard (latest first).
 * Mirrors the profile action style: create anon client -> repo -> return typed entities.
 */
export async function getProjectsForDashboard(): Promise<Project[]> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const projectRepository = new ProjectRepository(supabase);

  const { data, error } = await projectRepository
    .getRawBaseQuery(false)
    // use 'created_at' if your DB column is snake_case
    .order('created_at', { ascending: false })
    .returns<ProjectDTO[]>();

  if (error) throw new Error(error.message || 'Failed to fetch projects');

  return (data ?? []).map((row) => projectRepository.transformDTO(row));
}

/**
 * Get all projects owned by a specific username.
 * Resolves username -> profile.id, then filters projects by owner_id.
 */
export async function getProjectsByOwnerUsername(
  username: string
): Promise<Project[]> {
  const supabase: SupabaseAnonClient = await createAnonClient();

  const profileRepository = new ProfileRepository(supabase);
  const profile = await profileRepository.getByUsername(username);
  if (!profile) return [];

  const projectRepository = new ProjectRepository(supabase);
  const { data, error } = await projectRepository
    .getRawBaseQuery(false)
    .eq('owner_id', profile.id)
    .order('created_at', { ascending: false })
    .returns<ProjectDTO[]>();

  if (error) throw new Error(error.message || 'Failed to fetch projects');

  return (data ?? []).map((row) => projectRepository.transformDTO(row));
}

/**
 * Get a single project by id.
 */
export async function getProjectById(
  projectId: string
): Promise<Project | null> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const projectRepository = new ProjectRepository(supabase);

  const { data, error } = await projectRepository
    .getRawBaseQuery(false)
    .eq('id', projectId)
    .limit(1)
    .returns<ProjectDTO[]>();

  if (error) throw new Error(error.message || 'Failed to fetch project');

  const row = (data ?? [])[0];
  return row ? projectRepository.transformDTO(row) : null;
}
