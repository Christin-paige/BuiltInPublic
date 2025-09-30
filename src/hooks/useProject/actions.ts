'use server';

import { ProjectRepository } from '@/repositories/projectRepository/project.repository';
import {
  ProjectStatus,
  ProjectVisibility,
} from '@/repositories/projectRepository/project.types';
import { EditProject } from '@/use-cases/projects/EditProject';
import { createAnonClient } from 'utils/supabase/server';
import { editProjectSchema } from './editProject.schema';
import { ValidationError } from 'utils/errors/ValidationError';
import { updateProjectSchema } from './updateProject.schema';
import { UpdateProject } from '@/use-cases/projects/UpdateProject';
import {
  DeleteProject,
  DeleteProjectParams,
} from '@/use-cases/projects/DeleteProject';
import { redirect } from 'next/navigation';

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

    const result = await editProject.execute({
      projectId,
      ...validatedData.data,
    });

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  }
}

interface UpdateProjectParams {
  projectId: string;
  data: {
    update: string;
  };
}

export async function updateProject(params: UpdateProjectParams) {
  const { projectId, data } = params;
  const validatedUpdate = updateProjectSchema.safeParse(data);

  if (!validatedUpdate.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of validatedUpdate.error.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    }
    throw new ValidationError('Validation failed', errors);
  } else {
    const supabase = await createAnonClient();

    const updateProject = new UpdateProject(supabase);

    const result = await updateProject.execute({
      projectId,
      ...validatedUpdate.data,
    });

    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  }
}

export async function deleteProject(
  params: DeleteProjectParams & { username: string }
) {
  const { projectId, username } = params;

  const supabase = await createAnonClient();
  const deleteProject = new DeleteProject(supabase);

  const result = await deleteProject.execute({
    projectId,
  });

  if (!result.success) {
    console.error('Delete failed:', result.message);
    throw new Error(result.message);
  }

  redirect(`/${username}`);
}
