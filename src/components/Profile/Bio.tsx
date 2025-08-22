// Component imports
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Form,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
// Hooks & Utilities
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BioSchema, bioSchema } from '@/hooks/useProfile/profile.schema';
import { useUpdateProfile } from '@/hooks/useProfile/useProfile';
import { Profile } from '@/repositories/profileRepository/profile.types';
import { ValidationError } from 'utils/errors/ValidationError';
import { useProfileContext } from '../Providers/ProfileProvider';
import EditButton from '@/components/Buttons/EditButton';

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
                <Textarea
                    className='resize-none max-w-md'
                    autoFocus
                    placeholder='Edit your bio'
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
    <Card className='relative min-w-xs max-w-md pt-2 max-h-22 overflow-y-scroll scroll-hide'>
      <CardTitle className='sr-only h-0'>Bio</CardTitle>
        <div className="absolute top-2 right-2 z-10">
          <EditButton label='Edit Bio' onClick={() => setIsEditing(true)} />
        </div>
      <CardContent className='flex justify-between'>
        <p className='whitespace-pre-wrap break-words w-11/12 text-base font-body'>{profile?.bio || ''}</p>
      </CardContent>
    </Card>
  );
}

export default function Bio() {
  const { canEdit, isLoading, profile } = useProfileContext();

  // Return the skeleton loader while loading
  if (isLoading) {
    return <Skeleton className='h-6' />;
  }

  if (canEdit) {
    return <BioForm profile={profile} />;
  }

  return (
    <Card>
      <CardTitle>Bio</CardTitle>
      <CardContent>
        <p className='whitespace-pre-wrap text-lg'>{profile.bio || ''}</p>
      </CardContent>
    </Card>
  );
}
