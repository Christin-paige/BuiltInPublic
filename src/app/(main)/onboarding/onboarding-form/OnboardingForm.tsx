'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import emojiRegex from 'emoji-regex';

export default function OnboardingForm() {
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const onboardingFormSchema = z.object({
    userName: z
      .string()
      .max(32, {
        message: 'username cannot be longer than 32 characters',
      })
      // only allow lowercase letters, numbers and the following symbols: _-
      .regex(/^[a-z0-9_-]+$/, {
        message:
          'username must only contain lowercase letters, numbers, _ and - symbols',
      })
      .refine((name) => !emojiRegex().test(name), {
        message: 'username must not contain emoji',
      }),
    displayName: z.string().max(32, {
      message: 'display name cannot be longer than 32 characters',
    }),
    bio: z.string().max(300, {
      message: 'bio cannot cannot be longer than 300 characters',
    }),
  });

  const onboardingForm = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
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
        <Input
          id='userName'
          type='text'
          placeholder='username'
          required
          value={userName}
          maxLength={32}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          id='displayName'
          type='text'
          placeholder='display name'
          required
          value={displayName}
          maxLength={32}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Textarea
          placeholder='bio'
          value={bio}
          maxLength={300}
          onChange={(e) => setBio(e.target.value)}
        />
        {errors.length > 0 && (
          <ul className='text-red-500 text-sm list-disc pl-5'>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
        <Button
          variant='outline'
          className='w-1/2 flex items-center gap-2 p-2 cursor-pointer justify-center'
          type='submit'
        >
          submit
        </Button>
      </form>
    </Form>
  );
}
