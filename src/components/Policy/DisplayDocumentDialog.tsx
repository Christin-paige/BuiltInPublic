'use client';

import React from 'react';
import { usePolicyDocument } from '@/hooks/usePolicy/usePolicyDocument';
import type { PolicyDocumentType } from '@/repositories/policyRepository/policy.types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

function titleFor(type: PolicyDocumentType) {
  switch (type) {
    case 'T&C':
      return 'Terms & Conditions';
    case 'privacy':
      return 'Privacy Policy';
    case 'cookies':
      return 'Cookie Policy';
    case 'disclaimer':
      return 'Disclaimer';
  }
}

type UiKey = 'terms' | 'privacy' | 'cookies';
function toUiKey(type: PolicyDocumentType): UiKey | null {
  switch (type) {
    case 'T&C':
      return 'terms';
    case 'privacy':
      return 'privacy';
    case 'cookies':
      return 'cookies';
    case 'disclaimer':
      return null; // not backed by the hook (yet)
  }
}

export default function DisplayDocumentDialog({
  policyType,
  open,
  onOpenChange,
  children,
}: {
  policyType: PolicyDocumentType;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Optional custom trigger label; defaults to the policy’s title */
  children?: React.ReactNode;
}) {
  // Always call the hook with a valid key; ignore returned data for disclaimer
  const uiKey = toUiKey(policyType);
  const { data, isLoading } = usePolicyDocument((uiKey ?? 'privacy') as UiKey);

  const useHookData = uiKey !== null;
  const heading =
    (useHookData ? data?.title : undefined) ?? titleFor(policyType);
  const effective =
    useHookData && data?.effective_from
      ? new Date(data.effective_from).toLocaleDateString()
      : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='p-0 h-auto underline underline-offset-4'
        >
          {children ?? heading}
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          {effective && (
            <DialogDescription>Effective from {effective}</DialogDescription>
          )}
        </DialogHeader>

        <div className='whitespace-pre-wrap text-sm leading-6'>
          {useHookData
            ? isLoading
              ? 'Loading…'
              : (data?.content ?? 'No content available.')
            : 'No content available.'}
        </div>
      </DialogContent>
    </Dialog>
  );
}
