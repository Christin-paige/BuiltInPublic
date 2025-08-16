import ProjectPanel from '@/components/Projects/ProjectPanel';
import { GetProject } from '@/use-cases/projects/GetProject';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const getProject = await GetProject.create();

  const project = await getProject.execute({ id });

  if (!project) {
    notFound();
  }

  return <ProjectPanel project={project} canEdit={false} />;
}
