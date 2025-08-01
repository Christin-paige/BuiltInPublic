'use client';

import { redirect, useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const username = params.username as string;

  redirect(`/${username}`);
}
