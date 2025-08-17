import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import DisplayName from '@/components/Profile/DisplayName';
import Bio from '@/components/Profile/Bio';
import { Profile } from '@/repositories/profileRepository/profile.types';
import useProfile from '@/hooks/useProfile/useProfile';
import SignOutBtn from '@/components/Buttons/SignOutBtn';
import 'react-toastify/dist/ReactToastify.css';

export default function UserInfo({ profile }: { profile: Profile }) {
  const { isLoading } = useProfile(profile.id);

  return (
    <section className='flex flex-col gap-4 w-1/4 relative transform -translate-y-28'>
      {isLoading ? (
        <Skeleton className='w-24 h-24 rounded-full' />
      ) : (
        <Avatar className='w-24 h-24'>
          <AvatarImage src={profile.avatarUrl || ''} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}

      <DisplayName profile={profile} />
      <Bio profile={profile} />
      <SignOutBtn profile={profile} />
    </section>
  );
}
