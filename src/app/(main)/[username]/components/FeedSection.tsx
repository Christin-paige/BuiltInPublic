import { CreateProjectButton } from '@/components/Projects/CreateProject/CreateProjectButton';
import { useProfileEdit } from '@/contexts/ProfileEditContext';
import { useState } from 'react';

const FeedSection = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');
  const { canEdit } = useProfileEdit();
  return (
    <section className='flex flex-col gap-4 w-2/4'>
      <CreateProjectButton canEdit={canEdit} />
    </section>
  );
};

export default FeedSection;
