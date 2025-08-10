'use client';

import { useQuery } from '@tanstack/react-query';
import { getProfileByUsername } from './actions';
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
