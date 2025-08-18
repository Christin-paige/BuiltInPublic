import { BaseRepository } from '@/repositories/base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';
import { Project, ProjectDTO } from './project.types';

// This class extends the BaseRepository to provide specific methods for the Project entity
export class ProjectRepository extends BaseRepository<ProjectDTO, Project> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  // Get the projects from the database and the project updates then join
  getRawBaseQuery(count: boolean = false) {
  const query = this.supabase
    .from('projects')
    .select(
      '*, owner:profiles(id, username), updates:project_updates(*)',
      count ? { count: 'exact' } : undefined
    );

  return query;
  }

  // Transform the raw database row into a Project object
  transformDTO(row: ProjectDTO): Project {
    const {
      id,
      owner,
      name,
      description,
      visibility,
      status,
      external_url,
      createdAt,
      updates,
    } = row;

    return {
      id,
      owner: {
        id: owner.id,
        username: owner.username,
      },
      name,
      description: description || '',
      visibility,
      status,
      repoUrl: external_url || '',
      createdAt,
      updates: updates || [],
    } satisfies Project;
  }
}
