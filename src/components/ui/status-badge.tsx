import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Status indicator built on top of the shadcn `Badge` markup pattern.
 *
 * Status is always conveyed through the text label (required `children`)
 * plus a small dot, never through colour alone — keep callers passing a
 * real label (e.g. "In stock", "Pending"), not just a colour name.
 */
const statusBadgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      status: {
        success: 'bg-status-success/10 text-status-success',
        warning: 'bg-status-warning/15 text-status-warning-foreground',
        destructive: 'bg-status-destructive/10 text-status-destructive',
        neutral: 'bg-secondary text-secondary-foreground',
      },
    },
    defaultVariants: {
      status: 'neutral',
    },
  },
);

const dotColorByStatus = {
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  destructive: 'bg-status-destructive',
  neutral: 'bg-muted-foreground',
} as const;

interface StatusBadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof statusBadgeVariants> {
  /** Hide the leading dot indicator (label text remains — never colour-only). */
  hideDot?: boolean;
}

function StatusBadge({
  status = 'neutral',
  hideDot,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const resolvedStatus = status ?? 'neutral';
  return (
    <span
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    >
      {!hideDot && (
        <span
          aria-hidden="true"
          className={cn('size-1.5 shrink-0 rounded-full', dotColorByStatus[resolvedStatus])}
        />
      )}
      {children}
    </span>
  );
}

export { StatusBadge, statusBadgeVariants };
