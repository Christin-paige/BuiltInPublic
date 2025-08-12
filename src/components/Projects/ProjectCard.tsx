// components/ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { Project } from '@/repositories/projectRepository/project.types';

interface ProjectCardProps extends Project {
  href: string;
}

function truncate(text: string, max = 140) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

export default function ProjectCard({
  title,
  description = '',
  status,
  href,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl"
      aria-label={`Open project: ${title}`}
    >
      <Card className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/60 shadow-sm ring-1 ring-white/5 transition hover:bg-slate-900/80 hover:shadow cursor-pointer">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 gap-3">
          <CardTitle className="text-base font-semibold text-slate-100">
            {title}
          </CardTitle>
          <ProjectStatusBadge status={status} />
        </CardHeader>

        {description ? (
          <CardContent>
            <p className="text-sm leading-6 text-slate-300">
              {truncate(description, 140)}
            </p>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}