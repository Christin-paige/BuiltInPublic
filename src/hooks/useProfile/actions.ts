'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import type { Project } from '@/repositories/projectRepository/project.types';
import { createAnonClient, type SupabaseAnonClient } from 'utils/supabase/server';

export async function getProjectsForDashboard(): Promise<Project[]> {
  const supabase: SupabaseAnonClient = await createAnonClient();
  const repo = new ProjectRepository(supabase);
  return await repo.listForDashboard();
}