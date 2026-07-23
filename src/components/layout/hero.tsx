import { Container } from './container';
import { Section } from './section';
import { HeroContent, type HeroCta } from './hero-content';
import { HeroScrollIndicator } from './hero-scroll-indicator';
import { HeroVehicle } from './hero-vehicle';
import type { HeroTrustItem } from '@/config/site';

interface HeroProps {
  eyebrow: string;
  /** Headline split into short lines, each animated in on its own beat (see `HeroContent`). */
  headlineLines: string[];
  supportingText: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** PLACEHOLDER trust columns — sourced from `siteConfig.hero.trustItems`; replace before launch. */
  trustItems: readonly HeroTrustItem[];
  /** Section id on the page below to scroll to — renders a scroll indicator when set. */
  scrollTargetId?: string;
}

/**
 * Dark cinematic homepage hero (Server Component). Two-column on `lg:` and
 * up — copy/CTAs on ~44% of the width on the left (`HeroContent`), a single
 * placeholder vehicle visual on the remaining ~56% on the right
 * (`HeroVehicle`) — collapsing to a single stacked column (copy, then
 * vehicle) below `lg:`. The background is a pure CSS/SVG treatment —
 * layered gradients, soft abstract "light bloom" blobs, a readability
 * vignette, and a faint grain texture — rather than a photo of its own; see
 * `docs/homepage.md` → "Hero asset strategy".
 *
 * Uses `size="wide"` on `<Container>` (capped at 1504px, see `globals.css`
 * → `--container-wide`) so the hero can use more of the available desktop
 * width than standard page content (see `container.tsx`).
 *
 * Bleeds up under the fixed, transparent-on-home `Header` via a negative
 * top margin that exactly cancels the `pt-16 sm:pt-20` compensation added to
 * `(public)/layout.tsx`'s `<main>` (see `header.tsx` for the full explanation).
 *
 * The scroll indicator (`HeroScrollIndicator`) is pinned to the section's own
 * bottom edge rather than nested inside `HeroContent`, so it stays put
 * regardless of how tall the copy column or the vehicle visual end up being.
 */
function Hero({
  eyebrow,
  headlineLines,
  supportingText,
  primaryCta,
  secondaryCta,
  trustItems,
  scrollTargetId,
}: HeroProps) {
  return (
    <Section
      tone="hero"
      spacing="none"
      aria-label="Introduction"
      className="relative isolate -mt-16 flex min-h-svh flex-col overflow-hidden sm:-mt-20"
    >
      <HeroBackground />

      <Container
        size="wide"
        className="relative z-10 flex flex-1 flex-col justify-center py-16 sm:py-20 lg:py-16 xl:py-20"
      >
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:gap-14">
          <HeroContent
            eyebrow={eyebrow}
            headlineLines={headlineLines}
            supportingText={supportingText}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            trustItems={trustItems}
          />
          <HeroVehicle />
        </div>
      </Container>

      {scrollTargetId ? <HeroScrollIndicator targetId={scrollTargetId} /> : null}
    </Section>
  );
}

/** Purely decorative — no photographic or textual content, so it's fully `aria-hidden`. */
function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 bg-black">
      {/* Subtle left-side depth — keeps copy column readable without lifting overall luminance. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 18% 42%, oklch(0.14 0.006 260 / 0.55) 0%, transparent 62%)',
        }}
      />
      {/* Hero-wide vertical god-ray aligned with the vehicle column (reference mockup). */}
      <div
        className="absolute top-0 right-[8%] hidden h-full w-px lg:block xl:right-[12%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, oklch(0.72 0.12 55 / 0.22) 42%, oklch(0.78 0.14 55 / 0.35) 50%, oklch(0.72 0.12 55 / 0.22) 58%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-[6%] right-[4%] hidden h-[88%] w-24 blur-3xl lg:block xl:right-[8%] xl:w-28"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, oklch(0.68 0.13 55 / 0.18) 48%, transparent 100%)',
        }}
      />
      {/* Bottom vignette for scroll cue separation. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, oklch(0 0 0 / 0.15) 72%, oklch(0 0 0 / 0.65) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export { Hero };
