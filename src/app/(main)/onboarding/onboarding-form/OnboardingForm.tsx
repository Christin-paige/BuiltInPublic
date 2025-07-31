'use client';

import { onboardingFormSchema } from './onboarding-form.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

export default function OnboardingForm() {
  const onboardingForm = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      userName: '',
      displayName: '',
      bio: '',
    },
  });

  const onSubmit = (values: z.infer<typeof onboardingFormSchema>) => {
    console.log(values);
  };

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
          className='w-1/2 flex items-center gap-2 p-2 cursor-pointer justify-center bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white font-bold py-2 px-4 rounded-full mt-4 hover:scale-105 transition-all duration-300 cursor-pointer text-xl hover:shadow-lg hover:shadow-violet-500/40 '
          type='submit'
        >
          submit
        </Button>
      </form>
    </Form>
  );
}
