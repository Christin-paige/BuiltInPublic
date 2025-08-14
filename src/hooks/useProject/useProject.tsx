'use client';

import { useQuery } from '@tanstack/react-query';
import UINotification from '@/services/UINotification.service';
import { getProjectsForDashboard } from './actions';
import type { Project } from '@/repositories/projectRepository/project.types';

const projectQueryKeys = {
  all: ['projects'] as const,
  dashboard: () => [...projectQueryKeys.all, 'dashboard'] as const,
};

/**
 * Hook to fetch dashboard projects
 */
export function useProjectsForDashboard() {
  const { data, isLoading, error } = useQuery<Project[]>({
    queryKey: projectQueryKeys.dashboard(),
    queryFn: getProjectsForDashboard,
  });

  if (error) {
    UINotification.error('Error fetching projects');
  }

  return { data, isLoading, error };
}

// ✅ Alias so imports using `useProjectList` still work
export { useProjectsForDashboard as useProjectList };