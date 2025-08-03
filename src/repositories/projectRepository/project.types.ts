// Define the types for project visibility and status
type ProjectVisibility = 'public' | 'private';
type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'launched';

// Create interface for the project data transfer object (DTO)
export interface ProjectDTO {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  repo_url: string | null;
  created_at: Date;
};

// Create interface for the project entity
export interface Project {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  repoUrl?: string;
  createdAt: Date;
}

// Create interface for the project updates DTO & entity
export interface ProjectUpdates {
  id: string;
  project_id: string;
  update: string;
  created_at: Date;
  updated_at: Date;
}