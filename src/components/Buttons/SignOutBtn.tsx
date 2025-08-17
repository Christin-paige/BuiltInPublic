import useUser from '@/hooks/useUser/useUser';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';

export default function SignOutBtn() {
  const { signOutUser, data, isLoading } = useUser();

  if (!data) return null;

  return (
    <>
      {isLoading ? (
        <Skeleton className='h-10' />
      ) : (
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
      )}
    </>
  );
}
