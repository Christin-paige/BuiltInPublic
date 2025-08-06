import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { BaseUseCase } from '../BaseUseCase';
import { checkProfanity, isUsernameRoute } from 'utils/usernameValidator';
import xss from 'xss';

export interface UserProfileUpdateData {
  id: string;
  username?: string;
  bio?: string;
  display_name?: string;
}

export class UpdateUserProfile extends BaseUseCase<
  ProfileRepository,
  UserProfileUpdateData
> {
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
      const sanitizedBio = bio
        ? xss(bio, {
            whiteList: {},
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script'],
          })
        : undefined;

      const sanitizedDisplayName = display_name
        ? xss(display_name, {
            whiteList: {},
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script'],
          })
        : undefined;

      const sanitizedUpdate = {
        username,
        bio: sanitizedBio,
        display_name: sanitizedDisplayName,
      };
      // spread sanitizedUpdate to remove fields that are undefined
      const update = { ...sanitizedUpdate };

      const { error } = await this.supabase
        .from('profiles')
        .update(update)
        .eq('id', id);

      if (error) {
        throw error;
      }

      return { success: true, message: 'Profile updated' };
    } catch (e) {
      return { success: false, message: 'Update failed' };
    }
  }
}
