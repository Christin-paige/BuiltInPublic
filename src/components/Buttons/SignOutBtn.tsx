import useUser from '@/hooks/useUser/useUser';
import useProfile from '@/hooks/useProfile/useProfile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Profile } from '@/repositories/profileRepository/profile.types';

export default function SignOutBtn({ profile }: { profile: Profile }) {
  const { signOutUser, data, isLoading } = useUser();

  if (data?.id !== profile.id) return null;

  return (
    <>
      {isLoading ? (
        <Skeleton className='h-10' />
      ) : (
        <Button
          onClick={signOutUser}
          type='button'
          title='Sign Out'
          aria-label='Sign Out'
        >
          Sign Out
        </Button>
      )}
    </>
  );
}
