import useUser from '@/hooks/useUser/useUser';
import { Button } from '@/components/ui/button';

export default function SignOutBtn() {
  const { signOutUser } = useUser();

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
