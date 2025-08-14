// src/hooks/useProject/useProject.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjectById } from './actions';
import UINotification from '@/services/UINotification.service';

const projectQueryKeys = {
  all: ['project'] as const,
  id: (projectId: string) => [...projectQueryKeys.all, projectId] as const,
};

export default function useProject(projectId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: projectQueryKeys.id(projectId),
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId, // avoid firing until we have an id
  });

  if (error) {
    UINotification.error('Error fetching project');
  }

  return { data, isLoading, error };
}
