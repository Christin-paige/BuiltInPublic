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
    const { id, username, avatar_url, bio } = row;

    return {
      id,
      username: username,
      avatarUrl: avatar_url || '',
      bio: bio || '',
    } satisfies Profile;
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    const query = this.supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .ilike('username', username);

    const { count, error } = await query;

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

      if (authUserError) {
        throw new Error('Cannot find user');
      }

      if (!user) {
        return null;
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

      if (error) {
        throw new Error('Cannot find profile');
      }

      if (!data) {
        return null;
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

      if (error) {
        throw new Error('Profile not found');
      }

      if (!data) {
        return null;
      }

      const profile = this.safeTransformDTO(data);

      return profile;
    } catch (e) {
      throw e;
    }
  }

  async updateProfileFields(
    id: string,
    fields: Partial<{ username: string; bio: string }>
  ): Promise<void> {
    if (fields.username) {
      const exists = await this.checkUsernameExists(fields.username);
      if (exists) {
        throw new Error('Username already exists');
      }
    }
    const { error } = await this.supabase
      .from('profiles')
      .update(fields)
      .eq('id', id);

    if (error) {
      throw error;
    }
  }
}
