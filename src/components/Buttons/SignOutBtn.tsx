import useUser from '@/hooks/useUser/useUser';
import useProfile from '@/hooks/useProfile/useProfile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Profile } from '@/repositories/profileRepository/profile.types';

export default function SignOutBtn({ profile }: { profile: Profile }) {
  const { signOutUser, data } = useUser();
  const { isLoading: isProfileLoading } = useProfile(profile.id);

  if (isProfileLoading) {
    return <Skeleton className='h-10' />;
  }

  if (data?.id !== profile.id) return null;

  return (
    <Button
      onClick={signOutUser}
      type='button'
      title='Sign Out'
      aria-label='Sign Out'
    >
      Sign Out
    </Button>
  );
}
