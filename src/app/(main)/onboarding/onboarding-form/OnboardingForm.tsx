'use client';

import {
  OnboardingFormSchema,
  onboardingFormSchema,
} from './onboarding-form.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useUser from '@/hooks/useUser/useUser';
import { onboardingFormSubmit } from './actions';
import UINotification from '@/services/UINotification.service';

export default function OnboardingForm() {
  const { data: user, isLoading } = useUser();

  const onboardingForm = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      userName: '',
      displayName: '',
      bio: '',
    },
  });

  const onSubmit = async (values: OnboardingFormSchema) => {
    if (user?.id) {
      const result = await onboardingFormSubmit(values, user.id);

      if (!result?.success) {
        UINotification.error(result?.message);
      }
    }
  };

  // TODO: add loading skeleton for form
  if (isLoading || !user) {
    return (
      <div className='flex flex-col gap-4 w-full max-w-sm items-center'>
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-8 w-full' />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-8 w-full' />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-16 w-full' />
        </div>
        <Skeleton className='h-10 w-1/2 rounded-full' />
      </div>
    );
  }

  return (
    <Form {...onboardingForm}>
      <form
        onSubmit={onboardingForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-4 w-full max-w-sm items-center'
      >
        <FormField
          control={onboardingForm.control}
          name='userName'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={onboardingForm.control}
          name='displayName'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder='display name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={onboardingForm.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder='bio' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant='outline'
          className='w-1/2 flex items-center gap-2 p-2 cursor-pointer justify-center bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-full mt-4 hover:scale-105 transition-all duration-300 text-xl hover:shadow-lg hover:shadow-violet-500/40 '
          type='submit'
        >
          submit
        </Button>
      </form>
    </Form>
  );
}
