'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        ref={ref}
        className={cn(
          'peer appearance-none h-4 w-4 shrink-0 rounded-sm border border-primary ' +
            'checked:bg-primary checked:text-primary-foreground ' +
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
            'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      <span
        className='pointer-events-none absolute inset-0 flex items-center justify-center text-white'
        aria-hidden='true'
      >
        <Check className='h-3 w-3 opacity-0 peer-checked:opacity-100' />
      </span>
    </label>
  )
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
