'use server';

import BackButton from '@/components/Buttons/BackButton';
import { ProjectPanel } from '@/components/Projects/ProjectPanel/ProjectPanel';

interface ProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Project({ params }: ProjectProps) {
  const { id } = await params;

  return (
    <section className='w-full h-full p-4 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr]'>
      <div className='p-4 flex flex-col items-center'>
        <BackButton />
      </div>
      <div className='flex flex-col gap-4 col'>
        <ProjectPanel projectId={id} />
      </div>
    </section>
  );
}
