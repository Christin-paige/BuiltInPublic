'use client';

import React from 'react';
import {
  OnboardingFormSchema,
  onboardingFormSchema,
} from './onboarding-form.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useUser from '@/hooks/useUser/useUser';
import { onboardingFormSubmit, fetchPolicyDocument } from './actions';
import UINotification from '@/services/UINotification.service';

type PolicyType = 'terms' | 'privacy' | 'cookies';

/** ───── Tiny dependency-free HTML sanitizer ─────
 *  - Parses into a detached DOM with DOMParser
 *  - Removes forbidden tags (script/iframe/object/etc.)
 *  - Strips dangerous attrs (on*, style, srcdoc)
 *  - <a> only keeps safe hrefs (http/https, /, #, mailto:, tel:) and adds rel for target=_blank
 */
const ALLOWED_TAGS = new Set([
  'a',
  'p',
  'br',
  'b',
  'strong',
  'i',
  'em',
  'u',
  'ul',
  'ol',
  'li',
  'blockquote',
  'code',
  'pre',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
]);
const FORBID_TAGS = new Set([
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'template',
  'noscript',
]);
const GLOBAL_FORBID_ATTR_PREFIXES = ['on']; // onclick, onerror, etc.
const GLOBAL_FORBID_ATTRS = new Set(['style', 'srcdoc']);
const A_ALLOWED_ATTRS = new Set(['href', 'title', 'target', 'rel']);

function isAllowedHref(href: string): boolean {
  if (!href) return false;
  if (/^https?:\/\//i.test(href)) return true;
  if (href.startsWith('/') || href.startsWith('#')) return true;
  if (/^mailto:/i.test(href)) return true;
  if (/^tel:/i.test(href)) return true;
  return false;
}

function sanitizeHtmlNoDeps(input: string): string {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined')
    return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${input ?? ''}</div>`, 'text/html');
  const root = doc.body.firstElementChild as HTMLDivElement | null;
  if (!root) return '';

  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  const toRemove: Element[] = [];

  while (walker.nextNode()) {
    const el = walker.currentNode as Element;
    const tag = el.tagName.toLowerCase();

    // Remove forbidden or non-allowlisted tags entirely (keep text children)
    if (FORBID_TAGS.has(tag) || !ALLOWED_TAGS.has(tag)) {
      toRemove.push(el);
      continue;
    }

    // Attribute scrub
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();

      if (GLOBAL_FORBID_ATTRS.has(name)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (GLOBAL_FORBID_ATTR_PREFIXES.some((p) => name.startsWith(p))) {
        el.removeAttribute(attr.name);
        continue;
      }

      if (tag === 'a') {
        if (!A_ALLOWED_ATTRS.has(name)) {
          el.removeAttribute(attr.name);
          continue;
        }
      } else {
        // For non-links, drop all attributes for simplicity/safety
        el.removeAttribute(attr.name);
      }
    }

    // Link-specific checks
    if (tag === 'a') {
      const href = el.getAttribute('href') || '';
      if (!isAllowedHref(href)) {
        el.removeAttribute('href');
      }
      if (el.getAttribute('target') === '_blank') {
        const rel = (el.getAttribute('rel') || '').toLowerCase();
        const parts = new Set(rel.split(/\s+/).filter(Boolean));
        parts.add('noopener');
        parts.add('noreferrer');
        el.setAttribute('rel', Array.from(parts).join(' '));
      }
    }
  }

  // Drop queued nodes but keep their children text
  for (const el of toRemove) {
    el.replaceWith(...Array.from(el.childNodes));
  }

  return root.innerHTML;
}
/** ───── end sanitizer ───── */

export default function OnboardingForm() {
  const { data: user, isLoading } = useUser();
  const onboardingForm = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      userName: '',
      displayName: '',
      bio: '',
      termsAccepted: false,
      privacyAccepted: false,
      cookiesAccepted: false,
    },
  });

  const onSubmit = async (values: OnboardingFormSchema) => {
    if (user?.id) {
      const result = await onboardingFormSubmit(values, user.id);
      if (!result?.success) {
        UINotification.error(result?.message);
      }
    }
  };

  const disableSubmit =
    !onboardingForm.formState.isValid || onboardingForm.formState.isSubmitting;

  const safePolicyHtml = React.useMemo(
    () => sanitizeHtmlNoDeps(policy?.content ?? ''),
    [policy?.content]
  );

  if (isLoading || !user) {
    return (
      <div className='flex flex-col gap-4 w-full max-w-sm items-center'>
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-8 w-full' />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-8 w-full' />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-16 w-full' />
        </div>
        <Skeleton className='h-10 w-1/2 rounded-full' />
      </div>
    );
  }

  return (
    <>
      <Form {...onboardingForm}>
        <form
          onSubmit={onboardingForm.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full max-w-sm items-center'
        >
          <FormField
            control={onboardingForm.control}
            name='userName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={onboardingForm.control}
            name='displayName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input placeholder='display name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={onboardingForm.control}
            name='bio'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className='resize-none'
                    maxLength={256}
                    placeholder='bio'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ Terms */}
          <FormField
            control={onboardingForm.control}
            name='termsAccepted'
            render={({ field }) => (
              <FormItem className='w-full flex items-start space-x-3'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className='h-4 w-4 rounded-sm border border-primary'
                  />
                </FormControl>
                <div className='grid gap-1'>
                  <FormLabel className='font-normal'>
                    I agree to the{' '}
                    <button
                      type='button'
                      className='underline underline-offset-4'
                      onClick={() => openPolicy('terms')}
                    >
                      Terms &amp; Conditions
                    </button>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* ✅ Privacy */}
          <FormField
            control={onboardingForm.control}
            name='privacyAccepted'
            render={({ field }) => (
              <FormItem className='w-full flex items-start space-x-3'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className='h-4 w-4 rounded-sm border border-primary'
                  />
                </FormControl>
                <div className='grid gap-1'>
                  <FormLabel className='font-normal'>
                    I agree to the{' '}
                    <button
                      type='button'
                      className='underline underline-offset-4'
                      onClick={() => openPolicy('privacy')}
                    >
                      Privacy Policy
                    </button>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* ✅ Cookies */}
          <FormField
            control={onboardingForm.control}
            name='cookiesAccepted'
            render={({ field }) => (
              <FormItem className='w-full flex items-start space-x-3'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className='h-4 w-4 rounded-sm border border-primary'
                  />
                </FormControl>
                <div className='grid gap-1'>
                  <FormLabel className='font-normal'>
                    I agree to the{' '}
                    <button
                      type='button'
                      className='underline underline-offset-4'
                      onClick={() => openPolicy('cookies')}
                    >
                      Cookie Policy
                    </button>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button className='mt-6' type='submit' disabled={disableSubmit}>
            Submit
          </Button>
        </form>
      </Form>

      {/* 🔎 Simple modal for policies */}
      {dialog && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='absolute inset-0 bg-black/60'
            onClick={() => setDialog(null)}
          />
          <div className='relative z-10 w-[92vw] max-w-2xl max-h-[80vh] rounded-lg border bg-background shadow-xl'>
            <div className='px-5 pt-4 pb-2 border-b'>
              <h2 className='text-lg font-semibold'>
                {policy?.title ??
                  (dialog === 'terms'
                    ? 'Terms & Conditions'
                    : dialog === 'privacy'
                      ? 'Privacy Policy'
                      : 'Cookie Policy')}
              </h2>
              {policy?.effective_from ? (
                <p className='text-sm text-muted-foreground mt-1'>
                  Effective from{' '}
                  {new Date(policy.effective_from).toLocaleDateString()}
                </p>
              ) : null}
            </div>

            <div className='p-5 max-h-[60vh] overflow-y-auto'>
              {loading ? (
                <p>Loading…</p>
              ) : (
                <div
                  className='prose prose-invert max-w-none'
                  /* nosemgrep: eslint.react-dangerouslysetinnerhtml -- Content sanitized via sanitizeHtmlNoDeps() above. */
                  dangerouslySetInnerHTML={{ __html: safePolicyHtml }}
                />
              )}
            </div>

            <div className='px-5 py-3 border-t flex justify-end'>
              <button
                type='button'
                onClick={() => setDialog(null)}
                className='px-4 py-2 rounded-md border hover:bg-accent/40 transition'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
