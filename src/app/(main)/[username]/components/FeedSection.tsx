import { useState } from 'react';

const FeedSection = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');

  return (
    <section className='flex flex-col gap-4 w-2/4'>
    
    </section>
  );
};

export default FeedSection;
