// components/ProjectUpdateCard.tsx
import React from 'react';

export type ProjectUpdateCardProps = {
  createdAt: string | number | Date;
  text: string;
};

function formatDate(d: string | number | Date) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(new Date(d));
  } catch {
    return String(d);
  }
}

export default function ProjectUpdateCard({
  createdAt,
  text,
}: ProjectUpdateCardProps) {
  return (
    <div className='w-full rounded-2xl border border-slate-700/70 bg-slate-900/60 p-4 shadow-sm ring-1 ring-white/5'>
      <div className='text-xs font-medium text-slate-400'>
        Status update: {formatDate(createdAt)}
      </div>
      <p className='mt-2 text-slate-200 text-sm leading-6 whitespace-pre-wrap'>
        {text}
      </p>
    </div>
  );
}
