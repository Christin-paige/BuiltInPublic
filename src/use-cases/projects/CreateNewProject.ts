import xss from 'xss';
import { BaseUseCase } from '../BaseUseCase';

export interface CreateNewProjectParams {
  name: string;
  ownerId: string;
}

export default class CreateNewProject extends BaseUseCase<CreateNewProjectParams> {
  async execute({ name, ownerId }: CreateNewProjectParams): Promise<{
    success: boolean;
    message: string;
    projectId?: string;
  }> {
    const sanitizedName = xss(name, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script'],
    });

    if (!sanitizedName) {
      return { success: false, message: 'Name is required' };
    }

    const { data, error } = await this.supabase
      .from('projects')
      .insert({ name: sanitizedName, owner_id: ownerId })
      .select()
      .single();

    if (error || !data.id) {
      return { success: false, message: 'Project creation failed' };
    }

    return { success: true, message: 'Project created!', projectId: data.id };
  }
}
