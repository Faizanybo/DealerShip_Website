import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Horizontal page gutter + max-width wrapper. Mobile-first: padding starts
 * small and grows at `md`/`lg`. `size="default"` never exceeds
 * `--container-content` (80rem); `size="wide"` caps at `--container-wide`
 * (96rem) for showcase sections that should use more of the available
 * desktop width — currently only the homepage hero (see `hero.tsx`).
 */
const containerVariants = cva(
  'px-page-mobile md:px-page-tablet lg:px-page-desktop mx-auto w-full',
  {
    variants: {
      size: {
        default: 'max-w-content',
        wide: 'max-w-wide',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface ContainerProps
  extends React.ComponentProps<'div'>, VariantProps<typeof containerVariants> {}

function Container({ size, className, ...props }: ContainerProps) {
  return (
    <div data-slot="container" className={cn(containerVariants({ size }), className)} {...props} />
  );
}

export { Container };
