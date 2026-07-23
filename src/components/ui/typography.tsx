import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Typography primitives for the design system. Each component maps to one
 * semantic role from docs/design-system.md — prefer these over ad-hoc
 * `text-*`/`font-*` utility soup so headings/body copy stay consistent.
 *
 * All components accept `as` to change the rendered element without losing
 * the associated styles (e.g. a visually "SectionTitle" that must be an
 * `<h1>` for document outline reasons).
 */

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextTag = 'p' | 'span' | 'div';

type HeadingProps = { as?: HeadingTag } & Omit<
  React.ComponentPropsWithoutRef<'h1'>,
  'className'
> & {
    className?: string;
  };

type TextProps = { as?: TextTag } & Omit<React.ComponentPropsWithoutRef<'p'>, 'className'> & {
    className?: string;
  };

function Display({ as, className, ...props }: HeadingProps) {
  const Comp = as ?? 'h1';
  return (
    <Comp
      data-slot="typography-display"
      className={cn(
        'font-display text-[clamp(2.5rem,4vw+1.5rem,5.75rem)] leading-[1.05] font-semibold tracking-tight text-balance',
        className,
      )}
      {...props}
    />
  );
}

function PageTitle({ as, className, ...props }: HeadingProps) {
  const Comp = as ?? 'h1';
  return (
    <Comp
      data-slot="typography-page-title"
      className={cn(
        'text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl',
        className,
      )}
      {...props}
    />
  );
}

function SectionTitle({ as, className, ...props }: HeadingProps) {
  const Comp = as ?? 'h2';
  return (
    <Comp
      data-slot="typography-section-title"
      className={cn(
        'text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl',
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ as, className, ...props }: HeadingProps) {
  const Comp = as ?? 'h3';
  return (
    <Comp
      data-slot="typography-card-title"
      className={cn('text-lg leading-snug font-semibold sm:text-xl', className)}
      {...props}
    />
  );
}

function BodyLarge({ as, className, ...props }: TextProps) {
  const Comp = as ?? 'p';
  return (
    <Comp
      data-slot="typography-body-large"
      className={cn('text-text-secondary text-lg leading-relaxed', className)}
      {...props}
    />
  );
}

function Body({ as, className, ...props }: TextProps) {
  const Comp = as ?? 'p';
  return (
    <Comp
      data-slot="typography-body"
      className={cn('text-text-secondary text-base leading-relaxed', className)}
      {...props}
    />
  );
}

function BodySmall({ as, className, ...props }: TextProps) {
  const Comp = as ?? 'p';
  return (
    <Comp
      data-slot="typography-body-small"
      className={cn('text-text-muted text-sm leading-relaxed', className)}
      {...props}
    />
  );
}

function Eyebrow({ as, className, ...props }: TextProps) {
  const Comp = as ?? 'p';
  return (
    <Comp
      data-slot="typography-eyebrow"
      className={cn(
        'text-brand-accent text-xs font-semibold tracking-[0.14em] uppercase',
        className,
      )}
      {...props}
    />
  );
}

function Metadata({ as, className, ...props }: TextProps) {
  const Comp = as ?? 'span';
  return (
    <Comp
      data-slot="typography-metadata"
      className={cn('text-text-muted text-xs tabular-nums', className)}
      {...props}
    />
  );
}

export {
  Display,
  PageTitle,
  SectionTitle,
  CardTitle,
  BodyLarge,
  Body,
  BodySmall,
  Eyebrow,
  Metadata,
};
