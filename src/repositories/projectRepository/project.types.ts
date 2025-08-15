import { Database } from 'supabase/supabase.types';

type ProjectVisibility =
  Database['public']['Tables']['projects']['Row']['visibility'];
type ProjectStatus = Database['public']['Tables']['projects']['Row']['status'];

// Create interface for the project data transfer object (DTO)
export interface ProjectDTO {
  id: string;
  owner: {
    id: string;
    username: string;
  };
  name: string;
  description: string | null;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  external_url: string | null;
  createdAt: string;
  updates:
    | {
        id: string;
        project_id: string;
        createdAt: string;
      }[]
    | null;
}

// Create interface for the project entity
export interface Project {
  id: string;
  owner: {
    id: string;
    username: string;
  };
  name: string;
  description?: string;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  repoUrl?: string;
  createdAt: string;
  updates:
    | {
        id: string;
        project_id: string;
        createdAt: string;
      }[]
    | null;
}
