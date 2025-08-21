'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function BackButton({
  className,
  variant = 'outline',
  size = 'default',
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleBack}
      variant={variant}
      size={size}
      className={className}
      title='Go back'
      aria-label='Go back to previous page'
    >
      <ArrowLeft />
      Back
    </Button>
  );
}
