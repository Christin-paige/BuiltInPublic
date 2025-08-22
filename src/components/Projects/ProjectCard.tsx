// components/ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectStatusBadge } from './ProjectStatusBadge';
import type { Project } from '@/repositories/projectRepository/project.types';

interface ProjectCardProps extends Partial<Project> {
  href: string;
}

function truncate(text: string, max = 140) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

export default function ProjectCard({
  name,
  description = '',
  status = 'planning',
  href,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl'
      aria-label={`Open project: ${name}`}
    >
      <Card className='w-full rounded-2xl shadow-sm backdrop-blur-2xl hover:shadow cursor-pointer'>
        <CardHeader className='flex px-4 flex-row items-start justify-between space-y-0 gap-3 font-subheading'>
          <CardTitle className='text-base font-semibold text-slate-100'>
            {name}
          </CardTitle>
          <ProjectStatusBadge status={status} />
        </CardHeader>

        {description ? (
          <CardContent>
            <p className='text-sm leading-6 text-slate-300 font-body'>
              {truncate(description, 140)}
            </p>
          </CardContent>
        ) : null}
      </Card>
    </Link>
  );
}
