'use server';
// This file is used to sign out the user

import { redirect } from 'next/navigation';
import { createAnonClient } from 'utils/supabase/server';

export async function signOutUser() {
  const supabase = await createAnonClient();

  // Sign out the user from the client
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('Error signing out');
    }

    // Sign out the user from the server
    await supabase.auth.signOut();

    return redirect('/');
  } catch (e) {
    return {
      message: 'Could not log out',
    };
  }
}
