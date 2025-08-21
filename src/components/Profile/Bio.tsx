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
import EditButton from '@/components/Buttons/EditButton';
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

export default function Bio({ profile }: { profile?: Profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading } = useUser();
  const { data: userProfile } = useProfile(user?.username || '');
  const updateProfileMutation = useUpdateProfile();

  // Form setup to edit bio and test validation
  const form = useForm<BioSchema>({
    resolver: zodResolver(bioSchema),
    mode: 'onChange',
    defaultValues: {
      bio: userProfile?.bio || '',
    },
  });

  // Handle the form submission and test bio for profanity
  const onSubmit = async (data: BioSchema) => {
    // Split the bio into individual words and check each for profanity
    const bioList = data.bio?.split(' ') || [];
    const profanityResults = await Promise.all(
      bioList.map(async (element) => {
        return await checkProfanity(element);
      })
    );

    // Check if any word is profane
    const isProfane = profanityResults.some((result) => result === true);

    if (isProfane) {
      form.setError('bio', {
        type: 'manual',
        message: 'Please avoid using inappropriate language.',
      });
    } else {
      // Try to update the profile bio, and show the error if it's not successful
      try {
        await updateProfileMutation.mutateAsync({
          id: profile?.id || '',
          bio: data.bio || '',
          ...(profile?.displayName && { display_name: profile.displayName }),
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating bio:', error);
      }
    }
  };

  // Reset form values when profile data changes
  useEffect(() => {
    if (profile) {
      form.reset({
        bio: profile.bio || '',
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
        {profile?.bio ? (
          <Card className='py-2 max-h-30 overflow-scroll'>
            <CardContent>
              <CardTitle className='text-text-300'>Bio</CardTitle>
              <p className='font-body text-text-200 whitespace-pre-line'>
                {profile.bio}
              </p>
            </CardContent>
          </Card>
        ) : (
          <></>
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
            name='bio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className='resize-none'
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
            <Button variant={'outline'} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
          </div>
        </Form>
      ) : (
        <>
          {profile?.bio ? (
            <Card className='py-2 max-h-30 overflow-scroll'>
              <CardContent>
                <CardTitle className='text-text-300 flex gap-4 items-center justify-between'>
                  Bio
                  <EditButton onClick={() => setIsEditing(true)} />
                </CardTitle>
                <p className='font-body text-text-200 whitespace-pre-line'>
                  {profile.bio}
                </p>
              </CardContent>
            </Card>
          ) : (
            <p className='text-text-200'>Add your bio...</p>
          )}
        </>
      )}
    </>
  );
}
