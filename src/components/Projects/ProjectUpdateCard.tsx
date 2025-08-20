import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export type ProjectUpdateCardProps = {
  createdAt: string | number | Date;
  update: string;
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
  update,
}: ProjectUpdateCardProps) {
  return (
    <Card className='w-full rounded-2xl border border-slate-700/70 bg-slate-900/60 shadow-sm ring-1 ring-white/5 transition'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 gap-3'>
        <CardTitle className='text-base font-semibold text-slate-100'>
          Project update
        </CardTitle>
        <div className='text-xs font-medium text-slate-400'>
          {formatDate(createdAt)}
        </div>
      </CardHeader>

      <CardContent>
        <p className='text-sm leading-6 text-slate-300 whitespace-pre-wrap'>
          {update}
        </p>
      </CardContent>
    </Card>
  );
}
