import useUser from '@/hooks/useUser/useUser';
import useProfile from '@/hooks/useProfile/useProfile';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';
import { Profile } from '@/repositories/profileRepository/profile.types';

export default function SignOutBtn() {
  const { signOutUser, data, isLoading } = useUser();

  if (isLoading) {
    return <Skeleton className='h-10' />;
  }

  if (!data?.id) {
    return null;
  }

  return (
    <Button
      onClick={signOutUser}
      variant={'destructive'}
      type='button'
      title='Sign Out'
      aria-label='Sign Out'
    >
      Sign Out
      <LogOut />
    </Button>
  );
}
