import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function OnboardingForm() {
  return (
    <form className='flex flex-col gap-4 w-full max-w-sm items-center'>
      <Input
        className='text-center'
        id='userName'
        type='text'
        placeholder='username'
        required
      />
      <Input
        className='text-center'
        id='displayName'
        type='text'
        placeholder='display name'
        required
      />
      <Textarea className='text-center' placeholder='bio' />
      <Button
        variant='outline'
        className='w-1/2 flex items-center gap-2 p-2 cursor-pointer justify-center'
        type='submit'
      >
        submit
      </Button>
    </form>
  );
}