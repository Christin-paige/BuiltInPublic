import { BaseRepository } from '@/repositories/base.repository';
import { AnySupabaseClient } from 'utils/supabase/server';
import { Project, ProjectDTO } from './project.types';

export class ProjectRepository extends BaseRepository<ProjectDTO, Project> {
  constructor(supabase: AnySupabaseClient) {
    super(supabase);
  }

  // INNER join on the explicit FK so owner is guaranteed
  getRawBaseQuery(count: boolean = false) {
    return this.supabase.from('projects').select(
      [
        'id',
        'name',
        'description',
        'visibility',
        'status',
        'repo_url',
        'created_at',
        // 👇 use the FK name and !inner to force a match
        'owner:profiles!projects_owner_id_fkey(id,username)',
        'updates:project_updates(*)',
      ].join(','),
      count ? { count: 'exact' } : undefined
    );
  }

  transformDTO(row: ProjectDTO): Project {
    const owner = row.owner
      ? { id: row.owner.id, username: row.owner.username ?? null }
      : null;

    const updates = Array.isArray(row.updates)
      ? row.updates.map((u: any) => ({
          id: u.id,
          projectId: u.project_id,
          createdAt: u.created_at,
          text: u.text ?? u.content ?? u.body ?? null,
        }))
      : [];

    return {
      id: row.id,
      name: row.name,
      description: row.description ?? null,
      visibility: row.visibility,
      status: row.status,
      repoUrl: row.repo_url ?? null,
      createdAt:
        typeof row.created_at === 'string'
          ? row.created_at
          : new Date(row.created_at as unknown as string).toISOString(),
      owner, // guaranteed by !inner, but we keep type-safe
      updates,
    };
  }
}
