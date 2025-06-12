'use server';
// This file is used to sign out the user

import { createClient } from 'utils/supabase/server';

export async function signOutUser() {
  const supabase = await createClient();

  // Sign out the user from the client
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('Error signing out');
    }

    // Sign out the user from the server
    await supabase.auth.signOut();

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return { success: false };
  }
}
