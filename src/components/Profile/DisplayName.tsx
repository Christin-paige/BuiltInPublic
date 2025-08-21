// Component imports
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import EditButton from '@/components/Buttons/EditButton';
import { Pencil } from 'lucide-react';
// Hooks & Utilities
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  displayNameSchema,
  DisplayNameSchema,
} from '@/hooks/useProfile/profile.schema';
import useProfile, { useUpdateProfile } from '@/hooks/useProfile/useProfile';
import useUser from '@/hooks/useUser/useUser';
import { checkProfanity } from 'utils/usernameValidator';
import { Profile } from '@/repositories/profileRepository/profile.types';

export default function DisplayName({ profile }: { profile?: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useUser();

  const { data: userProfile } = useProfile(user?.username || '');
  const updateProfileMutation = useUpdateProfile();

  // Form setup to edit display name and test validation
  const form = useForm<DisplayNameSchema>({
    resolver: zodResolver(displayNameSchema),
    mode: 'onChange',
    defaultValues: {
      displayName: '',
    },
  });

  // Handle the form submission and test display name for profanity
  const onSubmit = async (data: DisplayNameSchema) => {
    const displayName = data?.displayName;
    const isProfane = await checkProfanity(displayName as string);
    if (isProfane) {
      form.setError('displayName', {
        type: 'manual',
        message: 'Please avoid using inappropriate language.',
      });
    } else {
      // Try to update the profile display name, and show the error if it's not successful
      try {
        await updateProfileMutation.mutateAsync({
          id: profile?.id || '',
          display_name: displayName as string,
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating display name:', error);
      }
    }
  };

  // Reset form values when profile data changes
  useEffect(() => {
    if (profile) {
      form.reset({
        displayName: profile.displayName || '',
      });
    }
  }, [form, profile]);

  // Return the skeleton loader while loading
  if (isLoading) {
    return <Skeleton className='h-6' />;
  }

  if (profile?.id !== userProfile?.id) {
    return (
      <>
        {profile?.displayName ? (
          <p className='font-body text-lg'>{profile.displayName}</p>
        ) : (
          <p className='font-body text-lg'>{profile?.username}</p>
        )}
      </>
    );
  }

  return (
    <>
      {isEditing ? (
        <Form {...form}>
          <FormField
            control={form.control}
            name='displayName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder='Enter your display name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center gap-2'>
            <Button variant={'outline'} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
          </div>
        </Form>
      ) : (
        <div className='flex items-center font-body text-lg group gap-8'>
          {profile?.displayName ? (
            <p>{profile.displayName}</p>
          ) : (
            <p>{profile?.username}</p>
          )}
          <EditButton onClick={() => setIsEditing(true)} />
        </div>
      )}
    </>
  );
}
