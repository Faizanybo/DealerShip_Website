import * as React from 'react';

import { cn } from '@/lib/utils';

interface FormFieldProps {
  /** Visible label text — always rendered as a real `<label>`, never a placeholder-only field. */
  label: string;
  /** The form control (e.g. `<Input />` or `<Textarea />`). Receives `id`/`aria-*` automatically. */
  children: React.ReactElement<{
    id?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
  }>;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  className?: string;
  id?: string;
}

/**
 * Associates a label, help text, and error text with a single form control
 * via `htmlFor`/`id` and `aria-describedby`, so screen readers announce the
 * relationship correctly without any extra wiring at call sites.
 */
function FormField({
  label,
  children,
  description,
  error,
  required,
  className,
  id,
}: FormFieldProps) {
  const generatedId = React.useId();
  const controlId = id ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const control = React.cloneElement(children, {
    id: controlId,
    'aria-describedby': describedBy,
    'aria-invalid': Boolean(error) || undefined,
  });

  return (
    <div data-slot="form-field" className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={controlId} className="text-foreground text-sm font-medium">
        {label}
        {required ? (
          <span className="text-status-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {control}
      {description ? (
        <p id={descriptionId} className="text-text-muted text-xs">
          {description}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-status-destructive text-xs font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { FormField };
