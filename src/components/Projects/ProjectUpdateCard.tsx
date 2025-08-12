// components/ProjectUpdateCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

export default function ProjectUpdateCard({ createdAt, text }: ProjectUpdateCardProps) {
  return (
    <Card className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/60 shadow-sm ring-1 ring-white/5 transition hover:bg-slate-900/80 hover:shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-3">
        <CardTitle className="text-base font-semibold text-slate-100">
          Status update
        </CardTitle>
        <div className="text-xs font-medium text-slate-400">
          {formatDate(createdAt)}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-slate-300 whitespace-pre-wrap">
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
