import { beforeEach, describe, it, vi, MockedObject, expect } from 'vitest';
import { UpdateUserProfile } from '../UpdateUserProfile';
import { ProfileRepository } from '@/repositories/profileRepository/profile.repository';
import { SupabaseAnonClient } from 'utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';

vi.mock('@/repositories/profileRepository/profile.repository', () => {
  return {
    ProfileRepository: vi.fn().mockImplementation(() => ({
      checkUsernameExists: vi.fn(),
      updateProfileFields: vi.fn(),
      getById: vi.fn(),
      getByUsername: vi.fn(),
      getCurrentUser: vi.fn(),
    })),
  };
});

const mockSupabase = {
  from: (table: string) => mockSupabase,
  update: () => mockSupabase,
  eq: vi.fn().mockResolvedValue({ error: null }),
} as unknown as SupabaseAnonClient;

const mockSupabaseFails = {
  from: (table: string) => mockSupabaseFails,
  update: () => mockSupabaseFails,
  eq: vi.fn().mockResolvedValue({
    error: { message: 'violation or whatever', code: 'string' },
  }),
} as unknown as SupabaseAnonClient;

describe('Use Case - UpdateUserProfile', () => {
  let profileRepository: MockedObject<ProfileRepository>;
  let updateUserProfile: UpdateUserProfile;

  describe('UpdateUserProfile username handling', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      profileRepository = new ProfileRepository(
        mockSupabase
      ) as MockedObject<ProfileRepository>;
      updateUserProfile = new UpdateUserProfile(
        profileRepository,
        mockSupabase
      );
    });

    it('Fails if username is a route', async () => {
      const actual = await updateUserProfile.execute({
        id: 'test-id',
        username: 'onboarding',
      });

      expect(actual?.success).toBe(false);
      expect(actual?.message).toBe('Username is taken');
      expect(profileRepository.checkUsernameExists).not.toHaveBeenCalled();
    });

    it('Fails if username exists', async () => {
      profileRepository.checkUsernameExists.mockReturnValue(
        Promise.resolve(true)
      );
      const actual = await updateUserProfile.execute({
        id: 'test-id',
        username: 'testName',
      });

      expect(actual?.success).toBe(false);
      expect(actual?.message).toBe('Username is taken');
    });

    it.each(['fuck', 'shit', 'ass'])(
      'Fails if username is profanity',
      async (username) => {
        const actual = await updateUserProfile.execute({
          id: 'test-id',
          username: username,
        });

        expect(actual?.success).toBe(false);
        expect(actual?.message).toBe('Username not allowed');
      }
    );
  });

  describe('Profile updating', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Returns success if profile is updated', async () => {
      profileRepository = new ProfileRepository(
        mockSupabase
      ) as MockedObject<ProfileRepository>;
      updateUserProfile = new UpdateUserProfile(
        profileRepository,
        mockSupabase
      );

      const actual = await updateUserProfile.execute({
        id: 'test-id',
        username: 'testName',
      });

      expect(actual?.message).toBe('Profile updated');
      expect(actual?.success).toBe(true);
    });

    // FIXED: This test now expects the error to be thrown
    it('Throws error when profile update fails', async () => {
      profileRepository = new ProfileRepository(
        mockSupabaseFails
      ) as MockedObject<ProfileRepository>;
      updateUserProfile = new UpdateUserProfile(
        profileRepository,
        mockSupabaseFails
      );

      await expect(
        updateUserProfile.execute({
          id: 'test-id',
          username: 'testName',
        })
      ).rejects.toMatchObject({
        message: 'violation or whatever',
      });
    });
  });
});
