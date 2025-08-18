// src/components/Projects/ProjectCard.tsx
import type { Project } from '@/repositories/projectRepository/project.types';

export type ProjectCardProps = {
  project: Project;
  showDescription?: boolean;
};

export default function ProjectCard({
  project,
  showDescription = true,
}: ProjectCardProps) {
  const { id, name, description, status, owner } = project;
  const username = owner?.username ?? null;
  const href = username ? `/${username}/projects/${id}` : null;

  const statusClass =
    'rounded-lg border border-white/30 bg-[#23262d] px-3 py-[2px] text-xs leading-5 text-slate-200';

  return (
    <div className='rounded-[22px] border-2 border-white/25 bg-[#121418] p-4'>
      <div className='mb-3 flex items-start justify-between'>
        {href ? (
          <a
            href={href}
            className='text-[16px] font-semibold text-white hover:underline'
          >
            {name}
          </a>
        ) : (
          <span className='text-[16px] font-semibold text-white'>{name}</span>
        )}
        <span className={statusClass}>{status}</span>
      </div>

      {showDescription && (
        <p className='text-[15px] leading-7 text-slate-200'>
          {description ?? 'No description'}
        </p>
      )}
    </div>
  );
}
