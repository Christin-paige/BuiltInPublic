'use client';

import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { getProfileByUsername, updateProfile } from './actions';
import UINotification from '@/services/UINotification.service';

const profileQueryKeys = {
  all: ['profile'] as const,
  username: (profileUserame: string) =>
    [...profileQueryKeys.all, profileUserame] as const,
};

export default function useProfile(username: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: profileQueryKeys.username(username),
    queryFn: () => getProfileByUsername(username),
  });

  if (error) {
    UINotification.error('Error fetching profile');
  }

  return { data, isLoading, error };
}

interface UpdateProfileVars {
  profileId: string;
  fields: Partial<{ username: string; bio: string; display_name: string }>;
}

const useUpdateProfile = (): UseMutationResult<
  boolean,
  Error,
  UpdateProfileVars
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ profileId, fields }: UpdateProfileVars) =>
      updateProfile(profileId, fields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
  });

  return mutation;
};

export { useUpdateProfile };
