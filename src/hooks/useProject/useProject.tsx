'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  editProject,
  getProjectById,
  getProjectsByUsername,
  updateProject,
  deleteProject,
} from './actions';
import { createProject } from '@/components/Projects/CreateProject/actions';
import UINotification from '@/services/UINotification.service';
import { ValidationError } from 'utils/errors/ValidationError';
import { Variable } from 'lucide-react';

const projectQueryKeys = {
  all: ['project'] as const,
  projectId: (projectId: string) =>
    [...projectQueryKeys.all, projectId] as const,
  username: (username: string) => [...projectQueryKeys.all, username] as const,
};

export default function useProject(projectId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: projectQueryKeys.projectId(projectId),
    queryFn: () => getProjectById(projectId),
  });

  if (error) {
    UINotification.error('Error fetching projects');
  }

  return { data, isLoading, error };
}

export function useProjects(username?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: projectQueryKeys.username(username || ''),
    queryFn: () => getProjectsByUsername(username || ''),
    enabled: Boolean(username),
  });

  if (error) {
    UINotification.error('Error fetching projects');
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

export function useCreateProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      if (error.message === 'NEXT_REDIRECT') {
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.all,
          exact: false,
        });
        return;
      }
      else if (error instanceof ValidationError) {
        // let onSettled handle validation errors
        return;
      }
      UINotification.error(error.message);
    },
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.username(variables.username),
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

  return mutation;
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProject,
    onError: (error, variables) => {
      if (error.message !== 'NEXT_REDIRECT') {
        UINotification.error(error.message);
      } else {
        queryClient.removeQueries({
          queryKey: projectQueryKeys.projectId(variables.projectId)
        });
        queryClient.invalidateQueries({
          queryKey: projectQueryKeys.all,
          exact: false,
        });
      }
    },
    onSuccess: (result, variables) => {
      queryClient.removeQueries({
        queryKey: projectQueryKeys.projectId(variables.projectId)
      })
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.all,
        exact: false,
      });
    },
  });

  return mutation;
}
