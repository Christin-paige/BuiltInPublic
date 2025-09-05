import { createClient } from '@supabase/supabase-js';

export async function seedPolicy() {
  const authClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data: authData, error: signInError } =
    await authClient.auth.signInWithPassword({
      email: 'builtinpublic1+testuser1@gmail.com',
      password: 'builtinpublic123',
    });

  if (signInError) {
    throw signInError;
  }

  console.log('Signed in as testuser1');

  let { data: documents, error: docError } = await authClient
    .schema('policy')
    .from('policy_documents')
    .select('*');

  if (docError) {
    throw docError;
  }

  const documentId = documents![0].id;

  // Insert the user consent using the authenticated client
  const { data: consentData, error: consentError } = await authClient
    .schema('policy')
    .from('user_consents')
    .insert({
      user_id: authData.user.id,
      document_id: documentId,
      consent_method: 'checkbox',
      ip_address: '192.168.0.1',
      user_agent: 'Mozilla/5.0 (Seeding Script)',
    })
    .select();

  if (consentError) {
    throw consentError;
  }

  console.log('Policy consent seeded successfully');

  await authClient.auth.signOut();
}
