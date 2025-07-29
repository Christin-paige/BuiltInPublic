'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import emojiRegex from 'emoji-regex';

export default function OnboardingForm() {
  const [userName, setUserName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState<string[]>([]);


  const handleSubmit = (e:FormEvent) => {

    e.preventDefault();

    const newErrors: string[] = [];

    // validate userName;
    const emojiValidationRegex = emojiRegex();
    const allowedCharactersRegex = /^[a-z0-9_-]+$/;

    if (userName.length > 32 ){
      const lengthError = "username cannot be longer than 32 characters";
      newErrors.push(lengthError);
    }

    if ( emojiValidationRegex.test(userName)){
      const emojiError = "username must not contain emoji";
      newErrors.push(emojiError);
    }

    if ( !allowedCharactersRegex.test(userName)){
      const alphaNumericError = "username must only contain lowercase letters, numbers, _ and - symbols"
      newErrors.push(alphaNumericError);
    }

    setErrors(newErrors);

    console.log(newErrors);


  }
 
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-sm items-center'>
      <Input
        className='text-center'
        id='userName'
        type='text'
        placeholder='username'
        required
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        className='text-center'
        id='displayName'
        type='text'
        placeholder='display name'
        required
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <Textarea
        className='text-center'
        placeholder='bio'
        value={bio}
        maxLength={300}
        onChange={(e => setBio(e.target.value))}
      />
      {errors.length > 0 && (
        <ul className="text-red-500 text-sm list-disc pl-5">
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
