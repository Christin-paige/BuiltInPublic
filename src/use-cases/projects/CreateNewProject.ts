import { BaseUseCase } from '../BaseUseCase';

export interface CreateNewProjectData {
  name: string;
  ownerId: string;
}

export default class CreateNewProject extends BaseUseCase<CreateNewProjectData> {
  async execute({ name, ownerId }: CreateNewProjectData): Promise<{
    success: boolean;
    message: string;
    projectId?: string;
  }> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert({ name, owner_id: ownerId })
      .select()
      .single();

    if (error || !data.id) {
      return { success: false, message: 'Project creation failed' };
    }

    return { success: true, message: 'Project created!', projectId: data.id };
  }
}
