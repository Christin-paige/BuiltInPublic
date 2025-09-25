// src/components/Policy/DisplayDocumentDialog.tsx
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
import Markdown, { Components } from 'react-markdown';

const markdownComponents: Components = {
  a: ({ children, ...props }) => (
    <a
      {...props}
      className='underline'
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  ),
};

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

export default function DisplayDocumentDialog({
  policyType,
  children,
}: {
  policyType: PolicyDocumentType; // DB enum: 'T&C' | 'privacy' | 'cookies' | 'disclaimer'
  children?: React.ReactNode;
}) {
  const { data, isLoading } = usePolicyDocument(policyType);

  const heading = titleFor(policyType);
  const effective = data?.effective_from
    ? new Date(data.effective_from).toLocaleDateString()
    : null;

  const body = isLoading
    ? 'Loading…'
    : data?.content?.trim()
      ? data.content
      : 'No content available.';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='link'
          className='p-0 h-auto underline underline-offset-4'
        >
          {children ?? heading}
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-2xl max-h-full md:max-h-[80%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
          {effective && (
            <DialogDescription>Effective from {effective}</DialogDescription>
          )}
        </DialogHeader>

        <div className='whitespace-pre-wrap'>
          <Markdown components={markdownComponents}>{body}</Markdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
