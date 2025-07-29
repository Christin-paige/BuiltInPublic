'use client';

import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { username: string } }) {
  redirect(`/${params.username}`);
}