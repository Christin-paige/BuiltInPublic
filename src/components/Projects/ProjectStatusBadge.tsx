// components/ProjectStatusBadge.tsx
import React from 'react';

type Status = 'Planning' | 'In Progress' | 'On Hold' | 'Launched';

// Whitelist for runtime validation
const SAFE_STATUSES = [
  'Planning',
  'In Progress',
  'On Hold',
  'Launched',
] as const;

// Type guard to ensure only allowed values pass through
const isSafeStatus = (s: unknown): s is Status =>
  typeof s === 'string' && (SAFE_STATUSES as readonly string[]).includes(s);

// Use Map to avoid bracket-notation with potentially tainted input
const STATUS_STYLE_MAP = new Map<Status, string>([
  ['Planning', 'text-purple-200 border-purple-500/60 bg-purple-500/10'],
  ['In Progress', 'text-sky-200 border-sky-500/60 bg-sky-500/10'],
  ['On Hold', 'text-amber-200 border-amber-500/60 bg-amber-500/10'],
  ['Launched', 'text-emerald-200 border-emerald-500/60 bg-emerald-500/10'],
]);

export function ProjectStatusBadge({ status }: { status: Status }) {
  // Runtime safety (covers future refactors or external props)
  const safeStatus: Status = isSafeStatus(status) ? status : 'Planning';
  const classForStatus = STATUS_STYLE_MAP.get(safeStatus) ?? '';

  return (
    <span
      className={`inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-medium ${classForStatus}`}
      aria-label={`Project status: ${safeStatus}`}
    >
      {safeStatus}
    </span>
  );
}
