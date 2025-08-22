'use client';

import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { getProfileByUsername, updateProfile } from './actions';
import UINotification from '@/services/UINotification.service';
import { UserProfileUpdateData } from '@/use-cases/updateUserProfile/UpdateUserProfile';
import { ValidationError } from 'utils/errors/ValidationError';

const profileQueryKeys = {
  all: ['profile'] as const,
  username: (profileUserame: string) =>
    [...profileQueryKeys.all, profileUserame] as const,
};

export default function useProfile(username: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: profileQueryKeys.username(username),
    queryFn: () => getProfileByUsername(username),
    enabled: Boolean(username),
  });

  if (error) {
    UINotification.error('Error fetching profile');
  }

  return { data, isLoading, error };
}

const useUpdateProfile = (): UseMutationResult<
  { success: boolean; message: string },
  Error,
  UserProfileUpdateData
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (fields: UserProfileUpdateData) => updateProfile(fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
      UINotification.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      if (error instanceof ValidationError) {
        // let onSettled handle validation errors
        return;
      }
      UINotification.error('Error updating profile');
    },
  });

  return mutation;
};

export { useUpdateProfile };
