import { BaseRepository } from '@/repositories/base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';
import { Project, ProjectDTO, ProjectUpdates } from './project.types';

export class ProjectRepository extends BaseRepository<ProjectDTO, Project> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  // Get the projects from the database and the project updates then join them to include the updates in the project data and project owners username
  getRawBaseQuery(count: boolean = false) {
    const query = this.supabase
      .from('projects')
      .select(
        '*, owner:profiles(username), updates(*)',
        count ? { count: 'exact' } : undefined
      );

    return query;
  }
}
