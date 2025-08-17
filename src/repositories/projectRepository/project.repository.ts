import { BaseRepository } from '@/repositories/base.repository';
import { AnySupabaseClient, isServiceRoleClient } from 'utils/supabase/server';
import { Project, ProjectDTO } from './project.types';

// This class extends the BaseRepository to provide specific methods for the Project entity
export class ProjectRepository extends BaseRepository<ProjectDTO, Project> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  // Get the projects from the database and the project updates then join them to include the updates in the project data and project owners username
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
      externalUrl: external_url || '',
      createdAt,
      updates: updates || [],
    } satisfies Project;
  }

  async getPublicProjectById(id: string): Promise<Project | null> {
    if (!isServiceRoleClient(this.supabase)) {
      throw new Error('Service Role Client required');
    }
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        id,
        visibility: 'public',
      }).maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error('Project not found');
      }

      const project = this.safeTransformDTO(data);

      return project;
    } catch (e) {
      console.error(
        `Failed to fetch project with: ${JSON.stringify(e, null, 2)} id: ${id}`
      );
      throw e;
    }
  }

  async getById(id: string): Promise<Project | null> {
    try {
      const query = this.getBaseQuery();

      const { data, error } = await this.applyFilters(query, {
        id,
      }).maybeSingle();

      if (error) {
        console.error(error);
        throw error;
      }

      if (!data) {
        throw new Error('Project not found');
      }

      const project = this.safeTransformDTO(data);

      return project;
    } catch (e) {
      console.error(
        `Failed to fetch project with: ${JSON.stringify(e, null, 2)} id: ${id}`
      );
      throw e;
    }
  }
}
