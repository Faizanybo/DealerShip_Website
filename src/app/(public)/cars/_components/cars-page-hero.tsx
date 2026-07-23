import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { BodyLarge, Eyebrow, PageTitle } from '@/components/ui/typography';

/**
 * Internal-page hero for `/cars` — restrained light treatment, distinct from the
 * cinematic homepage hero.
 */
function CarsPageHero() {
  return (
    <Section tone="muted" spacing="normal" aria-label="Introduction">
      <Container size="wide" className="flex flex-col gap-4 py-2 sm:gap-5 sm:py-4">
        <Eyebrow>Current stock</Eyebrow>
        <PageTitle className="max-w-3xl">Explore our vehicles</PageTitle>
        <BodyLarge className="text-text-secondary max-w-2xl leading-relaxed">
          A carefully presented selection of performance, prestige, and everyday vehicles.
        </BodyLarge>
      </Container>
    </Section>
  );
}

export { CarsPageHero };
