import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Full-bleed vertical rhythm + background-tone wrapper. Compose with
 * `<Container>` inside for constrained-width content:
 *
 * ```tsx
 * <Section tone="hero" spacing="lg">
 *   <Container>...</Container>
 * </Section>
 * ```
 *
 * `tone="hero"` applies the `dark` class locally, which flips every nested
 * shadcn/ui primitive and semantic colour token to the dark cinematic
 * palette — see docs/design-system.md.
 */
const sectionVariants = cva('w-full', {
  variants: {
    tone: {
      page: 'bg-background text-foreground',
      muted: 'bg-surface-muted text-foreground',
      hero: 'dark bg-hero-background text-hero-foreground',
    },
    spacing: {
      none: '',
      normal: 'py-section-y',
      lg: 'py-section-y-lg',
    },
  },
  defaultVariants: {
    tone: 'page',
    spacing: 'normal',
  },
});

interface SectionProps
  extends React.ComponentProps<'section'>, VariantProps<typeof sectionVariants> {}

function Section({ tone, spacing, className, ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ tone, spacing }), className)}
      {...props}
    />
  );
}

export { Section, sectionVariants };
