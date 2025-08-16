import { use } from 'react';

interface ProjectProps {
  params: {
    id: string;
  };
}

export default async function Project({ params }: ProjectProps) {
  const { id } = params;

  return <h1 className='text-2xl text-center'>Project {id}</h1>;
}
