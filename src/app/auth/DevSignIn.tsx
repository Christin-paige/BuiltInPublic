'use client';

import { Button } from '@/components/ui/button';
import { loginWithEmail } from './actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DevSignIn() {
  // use state to store email, password, error, and success messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // handle login with email and redirect to dashboard
  const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = await loginWithEmail(email, password);

    if (error) {
      setError('Invalid credentials. Try again.');
    }

    // clear error and success messages after 3 seconds
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
  };

  // ✅ Safe conditional render (hooks above this line)
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='w-96 text-center rounded-md border p-5 space-y-5 relative bg-slate-950'>
        <h2 className='text-xl font-bold'>Dev Login</h2>
        <form onSubmit={handleLoginWithEmail} className='flex flex-col gap-4'>
          <input
            className='w-full p-2 rounded-md border'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='w-full p-2 rounded-md border'
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant='outline'
            size='default'
            className='w-full flex items-center gap-2 p-2 cursor-pointer'
            type='submit'
          >
            Login
          </Button>
        </form>
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}
      </div>
    </div>
  );
}
