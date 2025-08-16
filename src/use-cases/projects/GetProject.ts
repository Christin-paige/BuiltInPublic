'use server';

import { AnySupabaseClient, createAnonClient } from 'utils/supabase/server';
import { BaseFetchUseCase } from '../BaseFetchUseCase';
import { Project } from '@/repositories/projectRepository/project.types';
import { ProjectRepository } from '@/repositories/projectRepository/project.repository';

interface GetProjectParams {
  id: string;
}

export class GetProject extends BaseFetchUseCase<GetProjectParams, Project> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  static async create() {
    const supabase = await createAnonClient();

    return new GetProject(supabase);
  }

  async execute({ id }: GetProjectParams): Promise<Project | null> {
    const projectRepository = new ProjectRepository(this.supabase);
    try {
      const project = await projectRepository.getById(id);

      return project;
    } catch (e) {
      return null;
    }
  }
}
