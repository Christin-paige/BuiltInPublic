import { ProjectPanel } from '@/components/Projects/ProjectPanel/ProjectPanel';
import { use } from 'react';

interface ProjectProps {
  params: {
    id: string;
  };
}

export default async function Project({ params }: ProjectProps) {
  const { id } = params;

  return (
    <section className='w-full h-full p-4 flex-col'>
      <ProjectPanel projectId={id} />
    </section>
  );
}
