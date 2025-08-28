// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

async function handler(req: Request) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';
  const webhookSecret = Deno.env.get('WEBHOOK_SECRET') ?? '';

  if (!resendApiKey || !webhookSecret) {
    return new Response('Missing environment variables', { status: 500 });
  }

  const auth = req.headers.get('x-supabase-webhook-source');

  if (auth !== webhookSecret) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { record } = await req.json();

  const { send_email, id } = record;

  if (!send_email || !id) {
    return new Response('Missing email or id', { status: 400 });
  }

  const response = await fetch(`https://api.resend.com/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'no-reply@builtinpublic.tech',
      to: send_email,
      subject: 'Built In Public Sign up link',
      html: `<h2>Welcome aboard!</h2><p>Thanks for being part of our alpha user group, we can't wait to hear what you think!</p><p>Click <a href="https://example.com/signup/${id}">here</a> to sign up.</p>`,
    }),
  });

  if (!response.ok) {
    return new Response('Failed to send email', { status: 500 });
  }

  return new Response('Email sent', { status: 200 });
}

Deno.serve(handler);
