import { BaseRepository, FilterBuilder } from '../base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';
import { Profile, ProfileDTO } from './profile.types';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

export class ProfileRepository extends BaseRepository<ProfileDTO, Profile> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  getRawBaseQuery(count: boolean = false) {
    const query = this.supabase
      .from('profiles')
      .select('*', count ? { count: 'exact' } : undefined);

    return query;
  }

  transformDTO(row: ProfileDTO): Profile {
    const { id, username, avatar_url } = row;

    return {
      id,
      username: username || 'Unknown',
      avatarUrl: avatar_url || '',
    } satisfies Profile;
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const query = this.getBaseQuery(true);

    const { count, error } = await this.applyFilters(query, { username });

    if (error) {
      throw new Error('Something went wrong');
    }
    return Boolean(count);
  }

  async getCurrentUser(): Promise<Profile | null> {
    try {
      const {
        data: { user },
        error: authUserError,
      } = await this.supabase.auth.getUser();

      if (authUserError || !user) {
        throw new Error('Cannot find user');
      }

      const profile = await this.getById(user.id);

      return profile;
    } catch (e) {
      throw e;
    }
  }

  async getById(id: string): Promise<Profile | null> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        id,
      }).maybeSingle();

      if (!data || error) {
        throw new Error('Cannot find profile');
      }

      const profile = this.safeTransformDTO(data);

      return profile;
    } catch (e) {
      throw e;
    }
  }

  async getByUsername(username: string): Promise<Profile | null> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        username,
      }).maybeSingle();

      if (!data || error) {
        throw new Error('Profile not found');
      }

      const profile = this.safeTransformDTO(data);

      return profile;
    } catch (e) {
      throw e;
    }
  }
}
