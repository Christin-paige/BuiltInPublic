import { CreateProjectButton } from '@/components/Projects/CreateProject/CreateProjectButton';
import { useProfileProvider } from '@/contexts/ProfileProvider';
import { useState } from 'react';
import { ProjectsList } from '@/components/Projects/ProjectsList';

const FeedSection = ({ username }: { username: string }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
  const { canEdit } = useProfileProvider();
  return (
    <section className='flex flex-col gap-4 w-2/4'>
      <CreateProjectButton canEdit={canEdit} />
      <ProjectsList username={username} />
    </section>
  );
};

export default FeedSection;
