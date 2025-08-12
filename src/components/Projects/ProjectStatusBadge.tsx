// components/ProjectStatusBadge.tsx
import React from 'react';
import { Database } from 'supabase/supabase.types';

// Status type from Supabase (may include null)
type Status = Database['public']['Tables']['projects']['Row']['status'];
// Only the string members (exclude null if present)
type SafeStatus = Extract<Status, string>;

// Typed entries for the Map (no bracket-notation, so ESLint is happy)
const STATUS_ENTRIES = [
  ['planning', 'text-purple-200 border-purple-500/60 bg-purple-500/10'],
  ['in-progress', 'text-sky-200 border-sky-500/60 bg-sky-500/10'],
  ['on-hold', 'text-amber-200 border-amber-500/60 bg-amber-500/10'],
  ['launched', 'text-emerald-200 border-emerald-500/60 bg-emerald-500/10'],
] as const satisfies readonly Readonly<[SafeStatus, string]>[];

// Map keyed by the string portion of your DB enum
const STATUS_STYLE_MAP: ReadonlyMap<SafeStatus, string> = new Map(
  STATUS_ENTRIES
);

export function ProjectStatusBadge({ status }: { status: Status }) {
  // If the column is nullable, provide a sane fallback; otherwise this is just a cast.
  const key = (status ?? 'planning') as SafeStatus;
  const classForStatus = STATUS_STYLE_MAP.get(key) ?? '';

  return (
    <span
      className={`inline-flex items-center rounded-xl border px-2.5 py-0.5 text-xs font-medium ${classForStatus}`}
      aria-label={`Project status: ${key}`}
    >
      {key}
    </span>
  );
}
