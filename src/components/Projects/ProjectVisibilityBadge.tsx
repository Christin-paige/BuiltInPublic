import React from 'react';
import { ProjectVisibility } from '@/repositories/projectRepository/project.types';

const VISIBILITY_ENTRIES = [
  ['public', 'text-emerald-200 border-emerald-500/60 bg-emerald-500/10'],
  ['private', 'text-slate-200 border-slate-500/60 bg-slate-500/10'],
] as const satisfies readonly Readonly<[ProjectVisibility, string]>[];

const VISIBILITY_STYLE_MAP: ReadonlyMap<ProjectVisibility, string> = new Map(
  VISIBILITY_ENTRIES
);

export function ProjectVisibilityBadge({
  visibility,
}: {
  visibility: ProjectVisibility;
}) {
  const classForVisibility = VISIBILITY_STYLE_MAP.get(visibility) ?? '';

  return (
    <span
      className={`inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-medium ${classForVisibility}`}
      aria-label={`Project visibility: ${visibility}`}
    >
      {visibility}
    </span>
  );
}
