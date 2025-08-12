// components/ProjectStatusBadge.tsx
import React from 'react';
type Status = 'Planning' | 'In Progress' | 'On Hold' | 'Launched';

const STATUS_STYLES: Record<Status, string> = {
  Planning: 'text-purple-200 border-purple-500/60 bg-purple-500/10',
  'In Progress': 'text-sky-200 border-sky-500/60 bg-sky-500/10',
  'On Hold': 'text-amber-200 border-amber-500/60 bg-amber-500/10',
  Launched: 'text-emerald-200 border-emerald-500/60 bg-emerald-500/10',
};

export function ProjectStatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status] ?? ''}`}
      aria-label={`Project status: ${status}`}
    >
      {status}
    </span>
  );
}
