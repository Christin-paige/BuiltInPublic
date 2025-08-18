'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import { createAnonClient } from 'utils/supabase/server';
import type {
  Project,
  ProjectDTO,
} from '@/repositories/projectRepository/project.types';

export async function getProjectsForDashboard(): Promise<Project[]> {
  const supabase = await createAnonClient(); // server-side util only
  const repo = new ProjectRepository(supabase);

  const { data, error } = await repo
    .getRawBaseQuery(false)
    .order('created_at', { ascending: false })
    .returns<ProjectDTO[]>();

  if (error) throw new Error(error.message || 'Failed to fetch projects');
  return (data ?? []).map((row) => repo.transformDTO(row));
}
