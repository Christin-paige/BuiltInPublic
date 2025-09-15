import xss from 'xss';
import { BaseMutationUseCase } from '../BaseMutationUseCase';

export interface CreateNewProjectParams {
  name: string;
  ownerId: string;
}

export default class CreateNewProject extends BaseMutationUseCase<CreateNewProjectParams> {
  async execute({ name, ownerId }: CreateNewProjectParams): Promise<{
    success: boolean;
    message: string;
    projectId?: string;
  }> {
    const sanitizedName = xss(name, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script'],
    }).trim();

    if (!sanitizedName) {
      return { success: false, message: 'Name is required' };
    }

    const { data, error } = await this.supabase
      .from('projects')
      .insert({ name: sanitizedName, owner_id: ownerId })
      .select()
      .single();

    if (error || !data.id) {
      console.error(
        `Project creation failed with: ${JSON.stringify(error, null, 2)} for user: ${ownerId.replace(/\n|\r/g, "")}`
      );
      return { success: false, message: 'Project creation failed' };
    }

    return { success: true, message: 'Project created!', projectId: data.id };
  }
}
