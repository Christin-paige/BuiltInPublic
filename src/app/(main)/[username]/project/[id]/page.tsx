'use server';

import { ProjectPanel } from '@/components/Projects/ProjectPanel/ProjectPanel';

interface ProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Project({ params }: ProjectProps) {
  const { id } = await params;

  return (
    <section className='w-full h-full p-4 flex-col'>
      <ProjectPanel projectId={id} />
    </section>
  );
}
