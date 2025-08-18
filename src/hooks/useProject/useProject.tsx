'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjectsForDashboard, getProjectsByUsername } from './actions';
import type { Project } from '@/repositories/projectRepository/project.types';

type UseProjectsResult = {
  data: Project[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * Hook for fetching all projects for the dashboard (all visible projects).
 * Uses React Query under the hood to manage loading, error, and caching states.
 */
export function useProjectsForDashboard(): UseProjectsResult {
  const { data, isLoading, isError, error } = useQuery<Project[], Error>({
    queryKey: ['projects', 'dashboard'],
    queryFn: () => getProjectsForDashboard(),
    staleTime: 30_000, // 30s fresh
    gcTime: 5 * 60_000, // 5 min cache
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
    error: error ?? null,
  };
}

/**
 * Hook for fetching projects owned by a specific username.
 * This is useful on profile pages like /[username].
 */
export function useProjectsByUsername(username: string | null): UseProjectsResult {
  const { data, isLoading, isError, error } = useQuery<Project[], Error>({
    queryKey: ['projects', 'by-username', username],
    queryFn: () => getProjectsByUsername(username as string),
    enabled: !!username, // don’t run until we have a username
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
    error: error ?? null,
  };
}