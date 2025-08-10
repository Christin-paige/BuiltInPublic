'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './actions';
import UINotification from '@/services/UINotification.service';

export default function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  if (error) {
    UINotification.error('Could not retrieve user');
  }
  // TODO: check for error in useQuery response and notify user
  return { data, isLoading, error };
}
