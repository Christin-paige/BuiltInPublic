import { Database } from 'supabase/supabase.types';
import { BaseUseCase } from '../BaseUseCase';
import xss, { stripBlankChar } from 'xss';
import { SecureURLValidator } from 'utils/SecureURLValidator/SecureURLValidator';
import { stripObjectNullish } from 'utils/stripObjectNullish';

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
        }).trim()
      : undefined;

    if (name && !sanitizedName) {
      return { success: false, message: 'Name cannot be blank' };
    }

    const sanitizedDescription = description
      ? xss(description, {
          whiteList: {},
          stripIgnoreTag: true,
          stripIgnoreTagBody: ['script'],
        }).trim()
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

    try {
      const update = stripObjectNullish({
        name: sanitizedName,
        description: sanitizedDescription,
        external_url: validatedUrl,
        visibility,
        status,
      });

      const { error } = await this.supabase
        .from('projects')
        .update(update)
        .eq('id', projectId);

      if (error) {
        throw error;
      }

      return { success: true, message: 'Project updated!' };
    } catch (e) {
      console.error(
        `Update failed for project: ${projectId} with: ${JSON.stringify(e, null, 2)}`
      );
      return { success: false, message: 'Project update failed' };
    }
  }
}
