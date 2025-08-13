// src/app/(main)/dashboard/projects/ProjectList.tsx
import React from 'react';
import Link from 'next/link';
import type { Project } from '@/repositories/projectRepository/project.types';
import { createAnonClient } from 'utils/supabase/server';
import type { Database } from 'supabase/supabase.types';
import { ProjectStatusBadge } from '@/components/Projects/ProjectStatusBadge';

type ProjectRow = Database['public']['Tables']['projects']['Row'];

function truncate100(text?: string | null) {
  if (!text) return '';
  return text.length > 100 ? text.slice(0, 100).trimEnd() + '…' : text;
}

export default async function ProjectList() {
  const supabase = await createAnonClient();

  // Auth: who is signed in?
  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr) {
    return (
      <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-5 text-center text-rose-400'>
        Failed to load user: {userErr.message}
      </div>
    );
  }
  const user = userRes?.user;
  if (!user) {
    return (
      <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-5 text-center text-slate-300'>
        Sign in to see your projects.
      </div>
    );
  }

  // Get username for link building (/:username/projects/:id). Fallback to /projects/:id.
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  const username = profile?.username ?? null;
  const hrefBase = username ? `/${username}/projects` : '/projects';

  // Fetch the signed-in user’s projects
  const { data: rows, error } = await supabase
    .from('projects')
    .select(
      'id, name, description, visibility, status, repo_url, created_at, owner_id'
    )
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-5 text-center text-rose-400'>
        Failed to load projects: {error.message}
      </div>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-5 text-center text-slate-300'>
        No projects yet. Create your first one!
      </div>
    );
  }

  // Map DB rows → repository Project type for ProjectCard
  const projectsForCards: Project[] = (rows as ProjectRow[]).map((r) => ({
    id: r.id,
    owner: { id: r.owner_id, username: username ?? '' },
    name: r.name,
    description: r.description ?? '', // Pass full description — ProjectCard will truncate
    visibility: r.visibility as Project['visibility'],
    status: r.status as Project['status'],
    repoUrl: r.repo_url ?? '',
    createdAt: (r.created_at as unknown as string) ?? '',
    updates: [],
  }));

  return (
    <div className='bg-gradient-to-b from-[#1d1d1d] to-[#86059F] rounded-md shadow p-5'>
      <h1 className='font-semibold text-xl text-center mb-4'>Projects</h1>

      {/* Column headers for desktop */}
      <div className='hidden sm:grid grid-cols-3 gap-4 px-1 pb-2 text-sm font-semibold text-slate-300 border-b border-slate-700 mb-3'>
        <div>Title</div>
        <div>Description</div>
        <div>Status</div>
      </div>

      {/* Rows (table-style; aligned with headers) */}
      <div className='divide-y divide-slate-800'>
        {(rows as ProjectRow[]).map((p) => (
          <div
            key={p.id}
            className='
              grid grid-cols-1 md:grid-cols-[1.6fr_3fr_auto]
              gap-3 md:gap-4 px-3 py-3 items-start
              hover:bg-slate-900/40 transition rounded-lg md:rounded-none
            '
          >
            {/* Title → link to project page */}
            <div className='text-white font-medium'>
              <Link href={`${hrefBase}/${p.id}`} className='hover:underline'>
                {p.name}
              </Link>
            </div>

            {/* 100-char Description */}
            <div className='text-slate-400 text-sm'>
              {truncate100(p.description)}
            </div>

            {/* Status badge via your component */}
            <div className='md:justify-self-end'>
              <ProjectStatusBadge status={p.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
