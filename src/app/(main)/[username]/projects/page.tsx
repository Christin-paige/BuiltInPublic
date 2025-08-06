'use client';

import ProjectList from '@/app/(main)/dashboard/projects/ProjectList';

export default function Projects() {
  return (
    <div className='px-4 py-6 max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold text-center text-white mb-6'>
        Your Projects
      </h1>
      <ProjectList />
    </div>
  );
}
