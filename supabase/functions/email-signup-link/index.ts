// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

async function sendEmailWithRetry(
  resendApiKey: string,
  emailData: any,
  maxRetries = 3
): Promise<Response> {
  let retries = 0;

  while (retries < maxRetries) {
    const response = await fetch(`https://api.resend.com/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailData),
    });

    // If successful, return the response
    if (response.ok) {
      return response;
    }

    // Check if it's a rate limit error (429) or server error (5xx)
    if (response.status === 429 || response.status >= 500) {
      retries++;

      if (retries < maxRetries) {
        // Exponential backoff: wait 2^retries seconds (plus some jitter)
        const waitTime = Math.pow(2, retries) * 1000 + Math.random() * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
    }

    // If it's not a retryable error or we've exhausted retries, return the response
    return response;
  }

  // This should never be reached, but just in case
  return new Response('Max retries exceeded', { status: 500 });
}

async function handler(req: Request) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';
  const webhookSecret = Deno.env.get('WEBHOOK_SECRET') ?? '';
  const platformHost = Deno.env.get('PLATFORM_HOST') ?? '';

  if (!resendApiKey || !webhookSecret || !platformHost) {
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

  const emailData = {
    from: 'no-reply@onboarding.builtinpublic.tech',
    to: send_email,
    subject: 'Built In Public Sign up link',
    html: `<h2>Welcome aboard!</h2><p>Thanks for being part of our alpha user group, we can't wait to hear what you think!</p><p>Click <a href="https://${platformHost}/auth?token=${id}">here</a> to sign up.</p><p>And don't forget to join our <a href="https://discord.gg/bYgd6W33">discord</a> server!</p><h2>What to expect:</h2><p>At the moment we have a pretty limited feature set. We've been spending much of our time on infrastructure and security concerns, and we've reached a point where there is enough functionality to take a few users with us as we build out the initial feature set.</p><p>You'll be able to create a profile, some projects, and add updates to those projects. Over the next few weeks we'll be finishing up our initial feature set and would love your input and feedback as we go forward.</p><h3>What we're working on now:</h3><ul><li>Image support</li><li>Markdown support and editing</li><li>A Share button to easily create a shareable link to a project</li></ul><p>From there, we'll be moving on to add social features (friending/following, a feed, comments, etc) and we hope you'll stick around for that!</p>`,
  };

  const response = await sendEmailWithRetry(resendApiKey, emailData);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Email sending failed:', {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });
    return new Response(`Failed to send email: ${response.statusText}`, {
      status: response.status,
    });
  }

  return new Response('Email sent', { status: 200 });
}

Deno.serve(handler);
