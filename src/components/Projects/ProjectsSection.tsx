'use client';

import React from 'react';
import ProjectCard from '@/components/Projects/ProjectCard';
import { useProjectsByUsername } from '@/hooks/useProject/useProject';

type ProjectsSectionProps = {
  username: string;
  className?: string;
};

export default function ProjectsSection({
  username,
  className,
}: ProjectsSectionProps) {
  const { data, isLoading, isError, error } = useProjectsByUsername(username);

  return (
    <section className={className ?? 'w-full'}>
      <h2 className='mb-3 text-lg font-semibold text-white'>Projects</h2>

      {isLoading ? (
        <div className='space-y-2'>
          <div className='h-24 w-full rounded-md bg-white/5 animate-pulse' />
          <div className='h-24 w-full rounded-md bg-white/5 animate-pulse' />
        </div>
      ) : isError ? (
        <p className='text-sm text-red-300'>
          {error?.message ?? 'Failed to load projects'}
        </p>
      ) : !data?.length ? (
        <p className='text-sm text-white/70'>No projects yet</p>
      ) : (
        <div className='grid gap-3'>
          {data.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
