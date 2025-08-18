'use client';

import React from 'react';
import { useProjectsForDashboard } from '@/hooks/useProject/useProject';
import ProjectCard from '@/components/Projects/ProjectCard';
import ProjectUpdateCard from '@/components/Projects/ProjectUpdateCard';

export default function ProjectList() {
  const { data, isLoading, isError, error } = useProjectsForDashboard();

  if (isLoading) {
    return (
      <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3'>
        <h1 className='font-semibold text-center mb-2'>Projects</h1>
        <div className='space-y-2'>
          <div className='h-24 w-full rounded-md bg-white/5 animate-pulse' />
          <div className='h-24 w-full rounded-md bg-white/5 animate-pulse' />
          <div className='h-24 w-full rounded-md bg-white/5 animate-pulse' />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3'>
        <h1 className='font-semibold text-center mb-2'>Projects</h1>
        <p className='text-sm text-red-300'>
          {error?.message ?? 'Failed to load projects'}
        </p>
      </div>
    );
  }

  const projects = data ?? [];

  return (
    <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3'>
      <h1 className='font-semibold text-center mb-2'>Projects</h1>

      {!projects.length ? (
        <p className='text-center text-sm text-white/70 py-8'>
          No projects yet
        </p>
      ) : (
        <div className='grid gap-3'>
          {projects.map((project) => (
            <div key={project.id} className='space-y-3'>
              {/* Card shows title (linked to /{owner.username}/projects/{id}), status, description */}
              <ProjectCard project={project} />

              {/* Optional: preview recent updates under each project */}
              {project.updates?.length ? (
                <div className='space-y-2'>
                  {project.updates.slice(0, 2).map((u) => (
                    <ProjectUpdateCard
                      key={u.id}
                      createdAt={u.createdAt}
                      text={u.text ?? ''}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
