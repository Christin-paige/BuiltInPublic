'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import {
  Project,
  ProjectStatus,
  ProjectVisibility,
} from '@/repositories/projectRepository/project.types';
import { UpdateProject } from '@/use-cases/projects/UpdateProject';
import { Database } from 'supabase/supabase.types';
import { createAnonClient } from 'utils/supabase/server';

export async function getProjectById(id: string) {
  const supabase = await createAnonClient();
  const projectRepository = new ProjectRepository(supabase);

  const project = await projectRepository.getById(id);

  return project ?? null;
}

interface EditProjectParams {
  projectId: string;
  data: {
    external_url?: string;
    name?: string;
    visibility?: ProjectVisibility;
    status?: ProjectStatus;
  };
}

export async function editProject({ projectId, data }: EditProjectParams) {
  const supabase = await createAnonClient();
  const updateProject = new UpdateProject(supabase);

  const result = await updateProject.execute({ projectId, ...data });

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}
