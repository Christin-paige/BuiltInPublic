'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjectsForDashboard } from './actions';
import type { Project } from '@/repositories/projectRepository/project.types';

type UseProjectsResult = {
  data: Project[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

/**
 * Hook for fetching all projects for the dashboard.
 * Uses React Query under the hood to manage loading, error, and caching states.
 */
export function useProjectsForDashboard(): UseProjectsResult {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<Project[], Error>({
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