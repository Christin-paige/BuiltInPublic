'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import {
  Project,
  ProjectStatus,
  ProjectVisibility,
} from '@/repositories/projectRepository/project.types';
import { EditProject } from '@/use-cases/projects/EditProject';
import { Database } from 'supabase/supabase.types';
import { createAnonClient } from 'utils/supabase/server';
import { editProjectSchema } from './editProject.schema';
import { ValidationError } from 'utils/errors/ValidationError';

export async function getProjectById(id: string) {
  const supabase = await createAnonClient();
  const projectRepository = new ProjectRepository(supabase);

  const project = await projectRepository.getById(id);

  return project ?? null;
}

export async function getProjectsByUsername(username: string) {
  const supabase = await createAnonClient();
  const projectRepository = new ProjectRepository(supabase);

  const projects = await projectRepository.getProjectsByUsername(username);

  return projects ?? null;
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
  const validatedData = editProjectSchema.safeParse(data);

  if (!validatedData.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of validatedData.error.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    }
    throw new ValidationError('Validation failed', errors);
  } else {
    const supabase = await createAnonClient();
    const editProject = new EditProject(supabase);

    const result = await editProject.execute({ projectId, ...data });

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  }
}
