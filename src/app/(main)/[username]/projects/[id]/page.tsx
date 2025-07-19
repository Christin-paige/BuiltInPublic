import { use } from 'react';

interface ProjectProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Project({ params }: ProjectProps) {
  const { id } = use(params);

  return <h1 className="text-2xl text-center">Project {id}</h1>;
}
