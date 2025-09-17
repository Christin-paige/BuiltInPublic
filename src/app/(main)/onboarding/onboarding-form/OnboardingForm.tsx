'use client';

import React from 'react';
import { z } from 'zod';
import { onboardingFormSchema } from './onboarding-form.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type Resolver } from 'react-hook-form';
import useUser from '@/hooks/useUser/useUser';
import { onboardingFormSubmit } from './actions';
import UINotification from '@/services/UINotification.service';
import DisplayDocumentDialog from '@/components/Policy/DisplayDocumentDialog';

// Make RHF types line up with Zod output types
type FormValues = z.infer<typeof onboardingFormSchema>;

export default function OnboardingForm() {
  const { data: user, isLoading } = useUser();

  // RHF + Zod: if your schema uses transforms/pipes, it's easiest to cast the resolver.
  const resolver = zodResolver(
    onboardingFormSchema
  ) as unknown as Resolver<FormValues>;

  const onboardingForm = useForm<FormValues>({
    resolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      userName: '',
      displayName: '',
      bio: '',
      termsAccepted: false,
      privacyAccepted: false,
      cookiesAccepted: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (user?.id) {
      const result = await onboardingFormSubmit(values, user.id);
      if (!result?.success) {
        UINotification.error(result?.message);
      }
    }
  };

  const disableSubmit =
    !onboardingForm.formState.isValid || onboardingForm.formState.isSubmitting;

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
    <>
      {/* no dialog state needed — we use inline DisplayDocumentDialog triggers */}
      <Form {...onboardingForm}>
        <form
          onSubmit={onboardingForm.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full max-w-sm items-center'
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
                  <Textarea
                    className='resize-none'
                    maxLength={256}
                    placeholder='bio'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms */}
          <FormField
            control={onboardingForm.control}
            name='termsAccepted'
            render={({ field }) => (
              <FormItem className='w-full flex items-start space-x-3'>
                <FormControl>
                  <Checkbox
                    className='h-4 w-4 rounded-sm border border-primary'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <div className='grid gap-1'>
                  <FormLabel className='font-normal'>
                    I agree to the {field.value}
                    <DisplayDocumentDialog policyType='T&C'>
                      Terms &amp; Conditions
                    </DisplayDocumentDialog>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Privacy */}
          <FormField
            control={onboardingForm.control}
            name='privacyAccepted'
            render={({ field }) => (
              <FormItem className='w-full flex items-start space-x-3'>
                <FormControl>
                  <Checkbox
                    className='h-4 w-4 rounded-sm border border-primary'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <div className='grid gap-1'>
                  <FormLabel className='font-normal'>
                    I agree to the {field.value}
                    <DisplayDocumentDialog policyType='privacy'>
                      Privacy Policy
                    </DisplayDocumentDialog>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Cookies */}
          <FormField
            control={onboardingForm.control}
            name='cookiesAccepted'
            render={({ field }) => (
              <FormItem className='w-full flex items-start space-x-3'>
                <FormControl>
                  <Checkbox
                    className='h-4 w-4 rounded-sm border border-primary'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <div className='grid gap-1'>
                  <FormLabel className='font-normal'>
                    I agree to the {field.value}
                    <DisplayDocumentDialog policyType='cookies'>
                      Cookie Policy
                    </DisplayDocumentDialog>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button className='mt-6' type='submit' disabled={disableSubmit}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
