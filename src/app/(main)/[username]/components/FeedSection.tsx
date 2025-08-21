import { CreateProjectButton } from '@/components/Projects/CreateProject/CreateProjectButton';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import { useState } from 'react';
import { ProjectsList } from '@/components/Projects/ProjectsList';

const FeedSection = ({ username }: { username: string }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
  const { canEdit } = useProfileEdit();
  return (
    <section className='flex flex-col gap-4 lg:pt-20'>
      <CreateProjectButton canEdit={canEdit} />
      <ProjectsList username={username} />
    </section>
  );
};

export default FeedSection;
