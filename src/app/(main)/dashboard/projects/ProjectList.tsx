'use client';

import React from 'react';
import { useProjectList } from '@/hooks/useProject/useProject';
import ProjectCard from '@/components/Projects/ProjectCard';

export default function ProjectList() {
  const { data, isLoading, isError, error } = useProjectList();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3">
        <h1 className="font-semibold text-center mb-2">Projects</h1>
        <div className="space-y-2">
          <div className="h-24 w-full rounded-md bg-white/5 animate-pulse" />
          <div className="h-24 w-full rounded-md bg-white/5 animate-pulse" />
          <div className="h-24 w-full rounded-md bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3">
        <h1 className="font-semibold text-center mb-2">Projects</h1>
        <p className="text-sm text-red-300">
          Failed to load projects{error instanceof Error ? `: ${error.message}` : '.'}
        </p>
      </div>
    );
  }

  const projects = data ?? [];

  return (
    <div className="bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-3">
      <h1 className="font-semibold text-center mb-2">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-center text-sm text-slate-300 py-8">No projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}