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
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

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
          profileId: profile?.id || '',
          fields: { bio: data.bio },
        });
        toast.success('Bio updated successfully!');
        setIsEditing(false);
      } catch (error) {
        toast.error('Failed to update bio');
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
          <p className='font-body text-lg'>{profile.bio}</p>
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
      ) : (
        <div className='flex items-center font-body text-lg group gap-8'>
          <p>{profile?.bio || 'Add a bio…'}</p>
          <button
            className='cursor-pointer hidden group-hover:block transition-all duration-300 text-zinc-400 hover:text-zinc-100'
            onClick={() => setIsEditing(true)}
          >
            <Pencil className='w-4 h-4' />
          </button>
        </div>
      )}
    </>
  );
}
