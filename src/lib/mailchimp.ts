"use server";

import { z, ZodError } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create a server-side DOMPurify instance
const window = new JSDOM("").window;
const purify = DOMPurify(window as any);

const MAILCHIMP_URL = process.env.MAILCHIMP_API_URL;
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;

// Zod schema for validation
const waitlistSchema = z.object({
  FNAME: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .transform((val) => val.trim()),

  EMAIL: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters")
    .toLowerCase()
    .transform((val) => val.trim()),

  website: z.string().optional(), // Honeypot field
});

// Type for the validated data
type WaitlistData = z.infer<typeof waitlistSchema>;

// Sanitize input using DOMPurify
const sanitizeInput = (input: string): string => {
  return purify.sanitize(input.trim(), {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep the text content
  });
};

export async function subscribeToWaitlist(formData: FormData) {
  try {
    // Extract and sanitize inputs
    const rawData = {
      FNAME: sanitizeInput((formData.get("FNAME") as string) || ""),
      EMAIL: sanitizeInput((formData.get("EMAIL") as string) || ""),
      website: (formData.get("website") as string) || "",
    };

    // Validate with Zod
    const validatedData = waitlistSchema.parse(rawData);

    // Honeypot check (bot detection)
    if (validatedData.website) {
      console.log("Bot detected via honeypot");
      return { success: true }; // Silently fail for bots
    }

    // Check if Mailchimp URL is configured
    if (!MAILCHIMP_URL || !MAILCHIMP_API_KEY) {
      console.error("MAILCHIMP_URL environment variable is not configured");
      return { error: "Configuration error. Please try again later." };
    }

    // Submit to Mailchimp
    const response = await fetch(MAILCHIMP_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: validatedData.EMAIL,
        status: "subscribed",
        merge_fields: {
          FNAME: validatedData.FNAME,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      if (error.title === "Member Exists") {
        throw new Error("Already subscribed");
      }
      console.error(
        "Mailchimp submission failed:",
        response.status,
        response.statusText,
      );
      throw new Error("Mailchimp submission failed");
    }

    // Log successful subscription
    console.log(`New waitlist subscription: ${validatedData.EMAIL}`);

    return { success: true };
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const firstError = error.issues[0];
      return {
        error: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    if (error instanceof Error && error.message === "Already subscribed") {
      return { error: `This email is already subscribed` };
    }
    console.error("Subscription error:", error);
    return { error: "Subscription failed. Please try again." };
  }
}
