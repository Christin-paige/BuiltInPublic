import { useState } from 'react';
import { useProjectList } from '@/hooks/useProject/useProject';
import ProjectCard from '@/components/Projects/ProjectCard';

const FeedSection = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
  const { data: projects, isLoading, isError, error } = useProjectList();

  return (
    <section className='flex flex-col gap-4 w-2/4'>
      {/* Tab selector */}
      <div className='flex gap-4 border-b border-white/10 pb-2'>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-3 py-1 rounded-md ${
            activeTab === 'posts' ? 'bg-purple-600 text-white' : 'bg-white/10'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-1 rounded-md ${
            activeTab === 'projects'
              ? 'bg-purple-600 text-white'
              : 'bg-white/10'
          }`}
        >
          Projects
        </button>
      </div>

      {/* Content */}
      {activeTab === 'projects' && (
        <>
          {isLoading && <p>Loading projects…</p>}
          {isError && <p className='text-red-400'>{error?.message}</p>}
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </>
      )}

      {activeTab === 'posts' && (
        <div>
          {/* Replace with your posts UI */}
          <p>No posts yet</p>
        </div>
      )}
    </section>
  );
};

export default FeedSection;
