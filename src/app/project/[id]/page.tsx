'use server';

import { ProjectDisplayPanel } from '@/components/Projects/ProjectPanel/ProjectDisplayPanel';
import { GetPublicProject } from '@/use-cases/projects/GetProject';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const getProject = await GetPublicProject.create();

  const project = await getProject.execute({ id });

  if (!project) {
    notFound();
  }

  return (
    <section className='w-full h-full p-4 flex-col'>
      <ProjectDisplayPanel project={project} />
    </section>
  );
}
