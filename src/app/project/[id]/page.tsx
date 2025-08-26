'use server';

import BackButton from '@/components/Buttons/BackButton';
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
    <section className='w-full min-h-screen p-4 flex flex-col gap-4 md:grid md:grid-cols-[1fr_2fr_1fr] bg-primary-950/30'>
      <div className='flex flex-col md:items-center'>
        <BackButton />
      </div>
      <div className='flex flex-col justify-start gap-4 col'>
        <ProjectDisplayPanel project={project} />
      </div>
    </section>
  );
}
