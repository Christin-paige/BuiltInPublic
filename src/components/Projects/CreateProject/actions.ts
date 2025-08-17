'use server';

import CreateNewProject from '@/use-cases/projects/CreateNewProject';
import {
  createProjectSchema,
  CreateProjectSchema,
} from './createProject.schema';
import { createAnonClient } from 'utils/supabase/server';
import { redirect } from 'next/navigation';

export interface CreateProjectParams {
  formData: CreateProjectSchema;
  ownerId: string;
  username: string;
}
export async function createProject(params: CreateProjectParams) {
  const { formData, ownerId, username } = params;

  const safeParams = createProjectSchema.safeParse(formData);

  if (!safeParams.success) {
    const errors: Record<string, string[]> = {};

    for (const issue of safeParams.error.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(issue.message);
    }

    return { success: false, errors };
  } else {
    const supabase = await createAnonClient();
    const createNewProject = new CreateNewProject(supabase);

    const { success, message, projectId } = await createNewProject.execute({
      ...safeParams.data,
      ownerId,
    });

    if (!success) {
      return { success, message };
    }

    redirect(`/${username}/projects/${projectId}`);
  }
}
