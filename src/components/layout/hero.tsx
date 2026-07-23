import { Container } from './container';
import { Section } from './section';
import { HeroContent, type HeroCta } from './hero-content';

interface HeroProps {
  eyebrow: string;
  headline: string;
  supportingText: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** Section id on the page below to scroll to — renders a scroll indicator when set. */
  scrollTargetId?: string;
}

/**
 * Dark cinematic homepage hero (Server Component). The background is a pure
 * CSS/SVG treatment — layered gradients, two soft abstract "light bloom"
 * blobs, a readability vignette, and a faint grain texture — rather than a
 * photo. See `docs/homepage.md` → "Hero asset strategy" for why, and swap
 * `HeroBackground` for a real `next/image` once the client supplies
 * dealership photography.
 *
 * Bleeds up under the fixed, transparent-on-home `Header` via a negative
 * top margin that exactly cancels the `pt-16 sm:pt-18` compensation added to
 * `(public)/layout.tsx`'s `<main>` (see `header.tsx` for the full explanation).
 */
function Hero({
  eyebrow,
  headline,
  supportingText,
  primaryCta,
  secondaryCta,
  scrollTargetId,
}: HeroProps) {
  return (
    <Section
      tone="hero"
      spacing="none"
      aria-label="Introduction"
      className="relative isolate -mt-16 flex min-h-svh flex-col overflow-hidden sm:-mt-18"
    >
      <HeroBackground />

      <Container className="relative z-10 flex flex-1 flex-col justify-center py-28 sm:py-32">
        <HeroContent
          eyebrow={eyebrow}
          headline={headline}
          supportingText={supportingText}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          scrollTargetId={scrollTargetId}
        />
      </Container>
    </Section>
  );
}

/** Purely decorative — no photographic or textual content, so it's fully `aria-hidden`. */
function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, oklch(0.22 0.012 255) 0%, oklch(0.14 0.006 260) 55%, oklch(0.1 0.004 260) 100%)',
        }}
      />
      <div
        className="absolute -top-1/3 -right-1/4 h-[60%] w-[60%] rounded-full blur-3xl"
        style={{ background: 'oklch(0.62 0.11 55 / 0.18)' }}
      />
      <div
        className="absolute bottom-0 left-0 h-[45%] w-[45%] rounded-full blur-3xl"
        style={{ background: 'oklch(0.42 0.05 255 / 0.2)' }}
      />
      {/* Readability vignette so text stays legible regardless of what sits behind it. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, oklch(0 0 0 / 0.1) 0%, oklch(0 0 0 / 0.3) 70%, oklch(0 0 0 / 0.55) 100%)',
        }}
      />
      {/* Faint grain so the gradient doesn't look flat — inline SVG, no network request. */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export { Hero };
