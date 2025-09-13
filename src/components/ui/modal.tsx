'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  className,
  children,
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted || !open) return null;

  const overlay = (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-[92vw] max-w-2xl max-h-[80vh] rounded-lg border border-border bg-background shadow-xl',
          className
        )}
      >
        <div className='px-5 pt-4 pb-2 border-b border-border'>
          {title ? <h2 className='text-lg font-semibold'>{title}</h2> : null}
          {description ? (
            <p className='text-sm text-muted-foreground mt-1'>{description}</p>
          ) : null}
        </div>

        <div className='p-5 overflow-y-auto'>{children}</div>

        <div className='px-5 py-3 border-t border-border flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 rounded-md border border-border hover:bg-accent/40 transition'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
