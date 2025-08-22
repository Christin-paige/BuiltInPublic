import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import DisplayName from '@/components/Profile/DisplayName';
import Bio from '@/components/Profile/Bio';
import SignOutBtn from '@/components/Buttons/SignOutBtn';
import 'react-toastify/dist/ReactToastify.css';
import { useProfileContext } from '@/components/Providers/ProfileProvider';

export default function UserInfo() {
  const { isLoading, profile } = useProfileContext();

  return (
    <section className='flex flex-col gap-4 relative w-full col-span-1'>
      {isLoading ? (
        <Skeleton className='w-24 h-24 rounded-full' />
      ) : (
        <Avatar className='w-24 h-24'>
          <AvatarImage src={profile.avatarUrl || ''} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      )}

      <DisplayName />
      <Bio />
      <SignOutBtn />
    </section>
  );
}
