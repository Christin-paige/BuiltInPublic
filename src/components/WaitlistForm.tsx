"use client";

import { useState, useTransition, useEffect } from "react";
import { subscribeToWaitlist } from "@/lib/mailchimp";

interface FormResult {
  success?: boolean;
  error?: string;
  field?: string;
}

interface RateLimitInfo {
  attempts: number;
  lastAttempt: number;
}

const RATE_LIMIT_KEY = "waitlist_rate_limit";
const MAX_ATTEMPTS = 1;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

export default function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo>({
    attempts: 0,
    lastAttempt: 0,
  });

  // Load rate limit info from localStorage on component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RATE_LIMIT_KEY);
      if (stored) {
        const parsed: RateLimitInfo = JSON.parse(stored);
        const now = Date.now();

        // Reset if the rate limit window has passed
        if (now - parsed.lastAttempt >= RATE_LIMIT_WINDOW) {
          const resetInfo = { attempts: 0, lastAttempt: 0 };
          setRateLimitInfo(resetInfo);
          localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(resetInfo));
        } else {
          setRateLimitInfo(parsed);
        }
      }
    } catch (error) {
      console.warn("Failed to load rate limit info from localStorage:", error);
    }
  }, []);

  // Update localStorage whenever rateLimitInfo changes
  const updateRateLimitInfo = (newInfo: RateLimitInfo) => {
    setRateLimitInfo(newInfo);
    try {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(newInfo));
    } catch (error) {
      console.warn("Failed to save rate limit info to localStorage:", error);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    // Client-side rate limiting with localStorage persistence
    const now = Date.now();
    if (
      rateLimitInfo.attempts >= MAX_ATTEMPTS &&
      now - rateLimitInfo.lastAttempt < RATE_LIMIT_WINDOW
    ) {
      const remainingTime = Math.ceil(
        (RATE_LIMIT_WINDOW - (now - rateLimitInfo.lastAttempt)) / 1000,
      );
      setResult({
        error: `Too many attempts. Please wait ${remainingTime} seconds.`,
      });
      return;
    }

    const newRateLimitInfo = {
      attempts: rateLimitInfo.attempts + 1,
      lastAttempt: now,
    };
    updateRateLimitInfo(newRateLimitInfo);

    startTransition(async () => {
      const response = await subscribeToWaitlist(formData);
      setResult(response);

      // Reset rate limit on successful submission
      if (response.success) {
        updateRateLimitInfo({ attempts: 0, lastAttempt: 0 });
      }
    });
  };

  const clearResult = () => setResult(null);

  const getFieldError = (fieldName: string) => {
    return result?.field === fieldName ? result.error : undefined;
  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl max-w-xl mt-12 w-full mx-auto shadow-lg text-center">
      {result?.success && (
        <div className="text-green-400 font-medium mb-4">
          🎉 Thanks for subscribing!
        </div>
      )}

      {result?.error && !result?.field && (
        <div className="text-red-400 font-medium mb-4">⚠️ {result.error}</div>
      )}

      <h2 className="text-3xl font-bold text-white mb-2">Join the Waitlist</h2>
      <p className="text-gray-300 mb-6">
        {`Be the first to know when we launch. We'll keep you informed with
        important updates and early access invitations.`}
      </p>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <input
            name="FNAME"
            type="text"
            placeholder="First name"
            required
            disabled={isPending}
            onChange={clearResult}
            className={`w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
              getFieldError("FNAME")
                ? "ring-2 ring-red-500 focus:ring-red-500"
                : "focus:ring-purple-500"
            }`}
            maxLength={50}
          />
          {getFieldError("FNAME") && (
            <p className="text-red-400 text-sm mt-1 text-left">
              {getFieldError("FNAME")}
            </p>
          )}
        </div>

        <div>
          <input
            name="EMAIL"
            type="email"
            placeholder="Email address"
            required
            disabled={isPending}
            onChange={clearResult}
            className={`w-full px-4 py-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
              getFieldError("EMAIL")
                ? "ring-2 ring-red-500 focus:ring-red-500"
                : "focus:ring-purple-500"
            }`}
            maxLength={254}
          />
          {getFieldError("EMAIL") && (
            <p className="text-red-400 text-sm mt-1 text-left">
              {getFieldError("EMAIL")}
            </p>
          )}
        </div>

        {/* Honeypot field for bot detection */}
        <input
          name="website"
          type="text"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={isPending || result?.success}
          className="w-full py-3 rounded-lg font-medium cursor-pointer text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition disabled:opacity-50"
        >
          {isPending ? "Submitting…" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
