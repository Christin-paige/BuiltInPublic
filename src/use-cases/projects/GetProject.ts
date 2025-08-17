import { AnySupabaseClient, createServiceClient } from 'utils/supabase/server';
import { BaseFetchUseCase } from '../BaseFetchUseCase';
import { Project } from '@/repositories/projectRepository/project.types';
import { ProjectRepository } from '@/repositories/projectRepository/project.repository';

interface GetProjectParams {
  id: string;
}

export class GetPublicProject extends BaseFetchUseCase<
  GetProjectParams,
  Project
> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  static async create() {
    const supabase = await createServiceClient();

    return new GetPublicProject(supabase);
  }

  async execute({ id }: GetProjectParams): Promise<Project | null> {
    const projectRepository = new ProjectRepository(this.supabase);
    try {
      const project = await projectRepository.getPublicProjectById(id);

      return project;
    } catch (e) {
      return null;
    }
  }
}
