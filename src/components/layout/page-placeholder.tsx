import * as React from 'react';

import { StatusBadge } from '@/components/ui/status-badge';
import { BodyLarge, Eyebrow, PageTitle } from '@/components/ui/typography';
import { Container } from './container';
import { Section } from './section';

interface PagePlaceholderProps {
  eyebrow?: string;
  title: string;
  description: string;
  /** Optional extra content rendered below the description (e.g. quick contact links). */
  children?: React.ReactNode;
}

/**
 * Temporary "content in progress" page shell shared by every public route
 * that doesn't have real content yet (Phase 2.1: `/cars`, `/recently-sold`,
 * `/about`, `/contact`). Swap the page's `<PagePlaceholder>` call for real
 * content in a later phase — the route, its metadata, and its place in
 * navigation all stay the same.
 */
function PagePlaceholder({ eyebrow, title, description, children }: PagePlaceholderProps) {
  return (
    <Section spacing="lg">
      <Container className="flex flex-col items-start gap-5">
        <StatusBadge status="neutral">Content in progress</StatusBadge>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <PageTitle>{title}</PageTitle>
        <BodyLarge className="max-w-2xl">{description}</BodyLarge>
        {children}
      </Container>
    </Section>
  );
}

export { PagePlaceholder };
