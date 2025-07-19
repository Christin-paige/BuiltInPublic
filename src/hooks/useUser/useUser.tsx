'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './actions';

export default function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  // TODO: check for error in useQuery response and notify user
  return { data, isLoading };
}
