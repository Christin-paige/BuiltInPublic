'use client';

import useProject from '@/hooks/useProject/useProject';
import useUser from '@/hooks/useUser/useUser';
import { notFound } from 'next/navigation';
import { ProjectDisplayPanel } from './ProjectDisplayPanel';
import { ProjectEditPanel } from './ProjectEditPanel';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { Skeleton } from '@/components/ui/skeleton';

interface ProjectPanelProps {
  projectId: string;
}

export function ProjectPanel({ projectId }: ProjectPanelProps) {
  const { data: project, isLoading: isLoadingProject } = useProject(projectId);
  const { data: user, isLoading: isLoadingUser } = useUser();

  const isLoading = isLoadingProject || isLoadingUser;

  if (isLoading) {
    return <Skeleton className='w-full h-48 p-4 flex-col' />;
  }

  if (!project) {
    notFound();
  }

  const canEdit = project.owner.id === user?.id;

  if (canEdit) {
    return (
      <ProjectProvider project={project}>
        <ProjectEditPanel />
      </ProjectProvider>
    );
  }

  return <ProjectDisplayPanel project={project} />;
}
