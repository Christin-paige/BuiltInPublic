'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import emojiRegex from 'emoji-regex';

export default function OnboardingForm() {
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const onboardingFormSchema = z.object({
    userName: 
      z.string().max(32, {
      message: 'username cannot be longer than 32 characters'
    })
    // only allow lowercase letters, numbers and the following symbols: _-
    .regex(/^[a-z0-9_-]+$/, {
      message: 'username must only contain lowercase letters, numbers, _ and - symbols'
    }).refine((name) => !emojiRegex().test(name), {
      message: 'username must not contain emoji'
    }),
    displayName: z.string().max(32, {
      message: 'display name cannot be longer than 32 characters'
    }),
    bio: z.string().max(300, {
      message: 'bio cannot cannot be longer than 300 characters'
    })
  })

  const onboardingForm = useForm<z.infer<typeof onboardingFormSchema>>({
      resolver: zodResolver(onboardingFormSchema),
      defaultValues: {
        userName: "",
        displayName: "",
        bio: ""
      }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    // Work In Progress - replacing this validation with a zod schema, then will remove


    // validate userName;
    const emojiValidationRegex = emojiRegex();
    const allowedCharactersRegex = /^[a-z0-9_-]+$/;

    if (userName.length > 32) {
      const userNameLengthError =
        'username cannot be longer than 32 characters';
      newErrors.push(userNameLengthError);
    }

    if (emojiValidationRegex.test(userName)) {
      const userNameEmojiError = 'username must not contain emoji';
      newErrors.push(userNameEmojiError);
    }

    if (!allowedCharactersRegex.test(userName)) {
      const userNameAlphaNumericError =
        'username must only contain lowercase letters, numbers, _ and - symbols';
      newErrors.push(userNameAlphaNumericError);
    }

    // validate display name
    if (displayName.length > 32) {
      const displayNameLengthError =
        'display name cannot be longer than 32 characters';
      newErrors.push(displayNameLengthError);
    }

    // valiate bio
    if (bio.length > 300) {
      const bioLengthError = 'bio cannot cannot be longer than 300 characters';
      newErrors.push(bioLengthError);
    }

    if (newErrors.length === 0) {
      // TODO submit form (part of another task)
    }

    setErrors(newErrors);

    console.log(newErrors);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
  );
}
