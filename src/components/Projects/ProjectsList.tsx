'use client';

import { useProjects } from '@/hooks/useProject/useProject';
import { Skeleton } from '../ui/skeleton';
import ProjectCard from './ProjectCard';
import { useProfileContext } from '@/components/Providers/ProfileProvider';

export function ProjectsList() {
  const { profile, canEdit } = useProfileContext();
  const { data, isLoading } = useProjects(profile?.username || '');

  if (isLoading) {
    return <Skeleton className='h-64 w-full' />;
  }

  return (
    <div className='flex flex-col gap-4 h-fit md:h-[73vh] scroll-hide overflow-scroll'>
      {data?.map((project) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          status={project.status}
          href={
            canEdit
              ? `/${profile.username}/project/${project.id}`
              : `/project/${project.id}`
          }
        />
      ))}
    </div>
  );
}
