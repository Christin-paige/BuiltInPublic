'use client';
import useUser from '@/hooks/useUser/useUser';
import Image from 'next/image';

export default function ProfileIcon() {
  const { data } = useUser();

  if (!data?.id) {
    return null;
  }

  return (
    <div>
      <Image
        src={data.avatar_url || '/default-avatar.png'}
        alt={data.name || 'User profile'}
        width={50}
        height={50}
        className='rounded-full'
      />
    </div>
  );
}
