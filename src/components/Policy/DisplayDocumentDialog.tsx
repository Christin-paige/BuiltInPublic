'use client';

import React from 'react';
import usePolicyDocument, {
  type UiPolicyType,
} from '@/hooks/usePolicy/usePolicyDocument';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

function titleFor(type: UiPolicyType) {
  switch (type) {
    case 'terms':
      return 'Terms & Conditions';
    case 'privacy':
      return 'Privacy Policy';
    case 'cookies':
      return 'Cookie Policy';
  }
}

export default function DisplayDocumentDialog({
  policyType,
}: {
  policyType: UiPolicyType;
}) {
  const { data, isLoading } = usePolicyDocument(policyType);

  const heading = data?.title ?? titleFor(policyType);
  const effective = data?.effective_from
    ? new Date(data.effective_from).toLocaleDateString()
    : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='p-0 h-auto underline underline-offset-4'
        >
          {heading}
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
          {isLoading ? 'Loading…' : (data?.content ?? 'No content available.')}
        </div>
      </DialogContent>
    </Dialog>
  );
}
