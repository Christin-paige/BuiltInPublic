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
}