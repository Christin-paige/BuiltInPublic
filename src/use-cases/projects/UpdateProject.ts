import { Database } from 'supabase/supabase.types';
import { BaseUseCase } from '../BaseUseCase';
import xss from 'xss';
import { SecureURLValidator } from 'utils/SecureURLValidator/SecureURLValidator';

export interface UpdateProjectParams {
  projectId: string;
  name?: string;
  visibility?: Database['public']['Enums']['project_visibility'];
  status?: Database['public']['Enums']['project_status'];
  description?: string;
  externalUrl?: string;
}

export class UpdateProject extends BaseUseCase<UpdateProjectParams> {
  async execute({
    projectId,
    name,
    visibility,
    status,
    description,
    externalUrl,
  }: UpdateProjectParams): Promise<{ success: boolean; message: string }> {
    const sanitizedName = name
      ? xss(name, {
          whiteList: {},
          stripIgnoreTag: true,
          stripIgnoreTagBody: ['script'],
        })
      : undefined;

    if (name && !sanitizedName) {
      return { success: false, message: 'Name cannot be blank' };
    }

    const sanitizedDescription = description
      ? xss(description, {
          whiteList: {},
          stripIgnoreTag: true,
          stripIgnoreTagBody: ['script'],
        })
      : undefined;

    let validatedUrl: string | undefined = undefined;
    if (externalUrl) {
      const urlValidator = new SecureURLValidator();
      const result = await urlValidator.validate(externalUrl);

      if (!result.isValid) {
        return { success: false, message: 'Must be valid URL' };
      }

      validatedUrl = externalUrl;
    }

    const updateData = {
      name: sanitizedName,
      description: sanitizedDescription,
      external_url: validatedUrl,
      visibility,
      status,
    };

    // spread to remove undefineds
    const update = { ...updateData };

    const { error } = await this.supabase
      .from('projects')
      .update(update)
      .eq('id', projectId);

    if (error) {
      return { success: false, message: 'Project update failed' };
    }

    return { success: true, message: 'Project updated!' };
  }
}
