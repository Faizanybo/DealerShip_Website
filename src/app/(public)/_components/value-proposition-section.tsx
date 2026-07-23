import { Handshake, ShieldCheck, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SectionHeader } from '@/components/layout/section-header';
import { Body, CardTitle } from '@/components/ui/typography';

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    icon: ShieldCheck,
    title: 'Honestly presented',
    description: 'Clear, straightforward information on every vehicle we list — no surprises.',
  },
  {
    icon: Sparkles,
    title: 'Prepared with care',
    description: 'Every car is checked over and presented to a high standard before it goes live.',
  },
  {
    icon: Handshake,
    title: 'Straightforward buying',
    description: 'A calm, pressure-free experience from first enquiry through to collection.',
  },
];

/**
 * Homepage value-proposition intro — the scroll target for the hero's
 * scroll indicator (`id="intro"`). Neutral, generic copy; no statistics or
 * client-specific claims.
 */
function ValuePropositionSection() {
  return (
    <Section id="intro" spacing="lg">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          eyebrow="Why choose us"
          title="A better way to find your next car"
          description="We're building a straightforward, no-nonsense buying experience. Here's what that means in practice."
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="bg-surface-muted text-brand-accent flex size-11 items-center justify-center rounded-full">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <CardTitle as="h3">{title}</CardTitle>
              <Body>{description}</Body>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { ValuePropositionSection };
