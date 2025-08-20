'use client';

import { useProjects } from '@/hooks/useProject/useProject';
import { use } from 'react';
import { Skeleton } from '../ui/skeleton';
import ProjectCard from './ProjectCard';

interface ProjectsListProps {
  username: string;
}

export function ProjectsList({ username }: ProjectsListProps) {
  const { data, isLoading } = useProjects(username);

  if (isLoading) {
    return <Skeleton className='h-64 w-full' />;
  }

  return (
    <div className='flex flex-col gap-4'>
      {data?.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          status={project.status}
          href={`/${username}/project/${project.id}`}
        />
      ))}
    </div>
  );
}
