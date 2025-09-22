'use client';

import useUser from '@/hooks/useUser/useUser';
import Image from 'next/image';

export default function Profile() {
  const { isLoading, data } = useUser();

  if (isLoading) {
    return <></>;
  }
  return (
    <div className='flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 gap-4'>
      {!data?.id ? (
        <h1>profile</h1>
      ) : (
        <Image
          src={data.avatarUrl || ''}
          alt={data.username || ''}
          width={100}
          height={100}
          className='rounded-full '
        />
      )}

      <h1 className='text-md font-bold justify-items-center'>
        {data?.username}
      </h1>
    </div>
  );
}
