import { Database } from 'supabase/supabase.types';

// Raw DB rows from Supabase types
export type ProjectRow = Database['public']['Tables']['projects']['Row'];
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type UpdateRow  = Database['public']['Tables']['project_updates']['Row'];

export type ProjectVisibility = ProjectRow['visibility'];
export type ProjectStatus     = ProjectRow['status'];

/**
 * Shape returned directly by your Supabase select:
 * '*, owner:profiles(id, username), updates:project_updates(*)'
 */
export interface ProjectDTO extends ProjectRow {
  owner: Pick<ProfileRow, 'id' | 'username'> | null;
  updates: UpdateRow[] | null;
}

/** Convenience type for a single normalized update item (app-facing). */
export type ProjectUpdate = {
  id: string;
  projectId: string;
  createdAt: string;
  text?: string | null;
};

/**
 * App-facing entity used by the UI.
 * Normalize snake_case -> camelCase in your repository transform.
 */
export interface Project {
  id: string;
  name: string;
  description: string | null;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  repoUrl: string | null;   // from repo_url
  createdAt: string;        // ISO string from created_at

  owner: {
    id: string;
    username: string | null;
  } | null;

  updates: ProjectUpdate[];
}