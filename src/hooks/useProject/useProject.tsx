'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editProject, getProjectById, updateProject } from './actions';
import UINotification from '@/services/UINotification.service';
import { ValidationError } from 'utils/errors/ValidationError';

const projectQueryKeys = {
  all: ['project'] as const,
  projectId: (projectId: string) =>
    [...projectQueryKeys.all, projectId] as const,
};

export default function useProject(projectId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: projectQueryKeys.projectId(projectId),
    queryFn: () => getProjectById(projectId),
  });

  if (error) {
    UINotification.error('Error fetching profile');
  }

  return { data, isLoading, error };
}

export function useEditProject(projectId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editProject,
    onError: (error) => {
      if (error instanceof ValidationError) {
        // let onSettled handle validation errors
        return;
      }
      UINotification.error(error.message);
    },
    onSuccess: (result) => {
      UINotification.success(result.message);
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.projectId(projectId),
      });
    },
  });

  return mutation;
}

export function useUpdateProject(projectId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      if (error instanceof ValidationError) {
        // let onSettled handle the validation errors
        return;
      }
      UINotification.error(error.message);
    },
    onSuccess: (result) => {
      UINotification.success(result.message);
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.projectId(projectId),
      });
    },
  });
}
