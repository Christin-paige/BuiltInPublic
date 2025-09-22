import { BaseRepository, FilterBuilder } from '../base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';
import { Profile, ProfileDTO, UserConsents } from './profile.types';
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

  transformDTO(row: ProfileDTO & { consents: UserConsents }): Profile {
    const { id, username, avatar_url, bio, display_name, consents } = row;

    return {
      id,
      username: username,
      avatarUrl: avatar_url || '',
      bio: bio ?? '',
      displayName: display_name || '',
      consents,
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

  async getUserConsents(userId: string) {
    const { data, error } = await this.supabase
      .schema('policy')
      .from('user_consents')
      .select('*, policy_documents(document_type)')
      .eq('user_id', userId)
      .is('policy_documents.superseded_at', null);

    if (error) {
      throw new Error('Cannot fetch user consents');
    }

    return data.map((consent) => ({
      consentedAt: consent.consented_at,
      documentId: consent.document_id,
      documentType: consent.policy_documents.document_type,
    }));
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

      const consents = await this.getUserConsents(id);
      const profile = this.safeTransformDTO({ ...data, consents });

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

      const { id } = data as ProfileDTO;
      const consents = await this.getUserConsents(id);

      const profile = this.safeTransformDTO({ ...data, consents });

      return profile;
    } catch (e) {
      throw e;
    }
  }
}
