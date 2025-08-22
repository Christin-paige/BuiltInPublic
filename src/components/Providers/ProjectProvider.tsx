import React, { createContext, useContext, ReactNode } from 'react';
import { Project } from '@/repositories/projectRepository/project.types';

const ProjectContext = createContext<Project | undefined>(undefined);

interface ProjectProviderProps {
  project: Project;
  children: ReactNode;
}

export function ProjectProvider({ project, children }: ProjectProviderProps) {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const project = useContext(ProjectContext);
  if (project === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return project;
}
