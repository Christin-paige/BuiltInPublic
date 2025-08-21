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
import { Pencil } from 'lucide-react';
// Hooks & Utilities
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BioSchema, bioSchema } from '@/hooks/useProfile/profile.schema';
import useProfile, { useUpdateProfile } from '@/hooks/useProfile/useProfile';
import useUser from '@/hooks/useUser/useUser';
import { checkProfanity } from 'utils/usernameValidator';
import { Profile } from '@/repositories/profileRepository/profile.types';
import { ValidationError } from 'utils/errors/ValidationError';
import { useProfileEdit } from '@/contexts/ProfileEditContext';

function BioForm({ profile }: { profile?: Profile }) {
  const [isEditing, setIsEditing] = useState(false);

  const updateProfileMutation = useUpdateProfile();

  // Form setup to edit bio and test validation
  const form = useForm<BioSchema>({
    resolver: zodResolver(bioSchema),
    mode: 'onChange',
    defaultValues: {
      bio: profile?.bio || '',
    },
  });

  const onSubmit = (data: BioSchema) => {
    if (profile?.id) {
      updateProfileMutation.mutate(
        {
          id: profile.id,
          bio: data.bio,
        },
        {
          onSettled: (data, error) => {
            if (error && error instanceof ValidationError) {
              Object.entries(error.validationErrors).forEach(
                ([field, messages]) => {
                  form.setError(field as keyof BioSchema, {
                    message: messages.join(', '),
                  });
                }
              );
            }

            if (data && data.success) {
              setIsEditing(false);
            }
          },
        }
      );
    }
  };

  // Return the skeleton loader while loading
  if (isLoading) {
    return <Skeleton className='h-6' />;
  }

  if (isEditing) {
    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input autoFocus placeholder='Edit your bio' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center gap-2'>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </div>
      </Form>
    );
  }

  return (
    <div className='flex items-center font-body text-lg group gap-8'>
      <p className='whitespace-pre-wrap'>{profile?.bio || 'Add a bio…'}</p>
      <Button variant='ghost' onClick={() => setIsEditing(true)}>
        <Pencil className='w-4 h-4' />
      </Button>
    </div>
  );
}

export default function Bio() {
  const { canEdit } = useProfileEdit();
}
