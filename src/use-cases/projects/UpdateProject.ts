import xss from 'xss';
import { BaseMutationUseCase } from '../BaseMutationUseCase';

export interface UpdateProjectParams {
  projectId: string;
  update: string;
}

export class UpdateProject extends BaseMutationUseCase<UpdateProjectParams> {
  async execute(
    params: UpdateProjectParams
  ): Promise<{ success: boolean; message: string }> {
    const { projectId, update } = params;

    const sanitizedUpdate = xss(update, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script'],
    }).trim();

    if (!sanitizedUpdate) {
      return { success: false, message: 'Update cannot be blank' };
    }

    const { error } = await this.supabase
      .from('project_updates')
      .insert({ project_id: projectId, update: sanitizedUpdate });

    if (error) {
      console.error(
        `Creating project update failed with: ${JSON.stringify(error, null, 2)} for project id: ${projectId}`
      );
      return { success: false, message: 'Creating Update failed' };
    }

    return { success: true, message: 'Update added!' };
  }
}
