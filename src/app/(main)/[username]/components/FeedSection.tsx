import { CreateProjectButton } from '@/components/Projects/CreateProject/CreateProjectButton';
import { useProfileContext } from '@/components/Providers/ProfileProvider';
import { useState } from 'react';
import { ProjectsList } from '@/components/Projects/ProjectsList';

const FeedSection = ({ username }: { username: string }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
  const { canEdit } = useProfileContext();
  return (
    <section className='flex flex-col gap-4 w-2/4'>
      <CreateProjectButton canEdit={canEdit} />
      <ProjectsList username={username} />
    </section>
  );
};

export default FeedSection;
