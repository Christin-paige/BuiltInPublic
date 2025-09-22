import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { BaseMutationUseCase } from '../BaseMutationUseCase';
import { checkProfanity, isUsernameRoute } from 'utils/usernameValidator';
import xss from 'xss';
import { AnySupabaseClient } from 'utils/supabase/server';

export interface UserProfileUpdateData {
  id: string;
  username?: string;
  bio?: string | null;
  display_name?: string;
}

export class UpdateUserProfile extends BaseMutationUseCase<UserProfileUpdateData> {
  repository: ProfileRepository;

  constructor(repository: ProfileRepository, supabase: AnySupabaseClient) {
    super(supabase);
    this.repository = repository;
  }

  async execute(params: UserProfileUpdateData) {
    const { id, username, display_name, bio } = params;

    try {
      if (username) {
        const usernameIsRoute = isUsernameRoute(username);

        if (usernameIsRoute) {
          // we return that the username is taken to not give away our route names
          return { success: false, message: 'Username is taken' };
        }
        const usernameExists =
          await this.repository.checkUsernameExists(username);

        if (usernameExists) {
          return { success: false, message: 'Username is taken' };
        }

        const usernameIsBanned = checkProfanity(username);

        if (usernameIsBanned) {
          return { success: false, message: 'Username not allowed' };
        }
      }
      // Prepare the update data with only the fields that are provided
      const updateData: Record<string, any> = {};

      if (bio !== undefined) {
        updateData.bio =
          bio === null
            ? null
            : xss(bio, {
                whiteList: {},
                stripIgnoreTag: true,
                stripIgnoreTagBody: ['script'],
              }).trim();
      }

      if (display_name !== undefined) {
        updateData.display_name = xss(display_name, {
          whiteList: {},
          stripIgnoreTag: true,
          stripIgnoreTagBody: ['script'],
        }).trim();
      }

      if (username !== undefined) {
        updateData.username = username;
      }

      // Only proceed if we have fields to update
      if (Object.keys(updateData).length === 0) {
        return { success: false, message: 'No fields to update' };
      }

      const { error } = await this.supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      return { success: true, message: 'Profile updated' };
    } catch (e) {
      throw e;
    }
  }
}
