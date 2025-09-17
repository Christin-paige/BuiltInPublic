import { CreateProjectButton } from '@/components/Projects/CreateProject/CreateProjectButton';
import { useProfileContext } from '@/components/Providers/ProfileProvider';
import { ProjectsList } from '@/components/Projects/ProjectsList';

const FeedSection = () => {
  const { canEdit } = useProfileContext();
  return (
    <section className='flex flex-col gap-4 xl:mt-20 w-full relative col-span-4 xl:col-span-2'>
      <CreateProjectButton canEdit={canEdit} />
      <ProjectsList />
    </section>
  );
};

export default FeedSection;
