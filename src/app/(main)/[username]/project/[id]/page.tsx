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
    <section className='w-full min-h-screen h-full p-4 flex-col bg-primary-950/30'>
      <ProjectPanel projectId={id} />
    </section>
  );
}
