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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  displayNameSchema,
  DisplayNameSchema,
} from '@/hooks/useProfile/profile.schema';
import { useUpdateProfile } from '@/hooks/useProfile/useProfile';
import { Profile } from '@/repositories/profileRepository/profile.types';
import { useProfileContext } from '../Providers/ProfileProvider';
import { ValidationError } from 'utils/errors/ValidationError';

function DisplayNameForm({ profile }: { profile?: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
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
    updateProfileMutation.mutate(
      {
        id: profile?.id || '',
        display_name: displayName as string,
      },
      {
        onSettled: (data, error) => {
          if (error && error instanceof ValidationError) {
            Object.entries(error.validationErrors).forEach(
              ([field, messages]) => {
                form.setError(field as keyof DisplayNameSchema, {
                  message: messages.join(', '),
                });
              }
            );
          }

          if (data && data.success) {
            setIsEditing(false);
            form.reset();
          }
        },
      }
    );
  };

  if (isEditing) {
    return (
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
          <Button variant='outline' onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </div>
      </Form>
    );
  }

  return (
<<<<<<< HEAD
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
          <EditButton label='Display Name' onClick={() => setIsEditing(true)} />
        </div>
=======
    <div className='flex items-center font-body text-lg group gap-8'>
      {profile?.displayName ? (
        <p>{profile.displayName}</p>
      ) : (
        <p>{profile?.username}</p>
>>>>>>> 7daa1da5580384c2515bbad88e8e6f7d64e2ec3a
      )}
      <Button variant='ghost' onClick={() => setIsEditing(true)}>
        <Pencil className='w-4 h-4' />
      </Button>
    </div>
  );
}

export default function DisplayName() {
  const { canEdit, isLoading, profile } = useProfileContext();

  if (isLoading) {
    return <Skeleton className='h-6' />;
  }

  if (canEdit) {
    return <DisplayNameForm profile={profile} />;
  }

  return <p className='text-lg'>{profile.displayName || profile.username}</p>;
}
