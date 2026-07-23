import { Container } from './container';
import { Section } from './section';
import { HeroContent, type HeroCta } from './hero-content';
import { HeroScrollIndicator } from './hero-scroll-indicator';
import { HeroVehicle } from './hero-vehicle';

interface HeroProps {
  eyebrow: string;
  /** Headline split into short lines, each animated in on its own beat (see `HeroContent`). */
  headlineLines: string[];
  supportingText: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  /** Short, neutral placeholder trust points — see `HeroContent` for the "replace before launch" note. */
  trustItems: string[];
  /** Section id on the page below to scroll to — renders a scroll indicator when set. */
  scrollTargetId?: string;
}

/**
 * Dark cinematic homepage hero (Server Component). Two-column on `lg:` and
 * up — copy/CTAs on the left (`HeroContent`), a single placeholder vehicle
 * visual on the right (`HeroVehicle`) — collapsing to a single stacked
 * column (copy, then vehicle) below `lg:`. The background is a pure CSS/SVG
 * treatment — layered gradients, soft abstract "light bloom" blobs, a
 * readability vignette, and a faint grain texture — rather than a photo of
 * its own; see `docs/homepage.md` → "Hero asset strategy".
 *
 * Uses `size="wide"` on `<Container>` so the hero can use more of the
 * available desktop width than standard page content (see `container.tsx`).
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
        className="relative z-10 flex flex-1 flex-col justify-center py-20 sm:py-24 lg:py-16"
      >
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[0.82fr_1fr] lg:gap-12">
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
      {/* Faint rim light centred behind where the vehicle sits (right side on lg:). */}
      <div
        className="absolute top-1/2 right-[8%] h-[70%] w-[38%] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'oklch(0.9 0.01 260 / 0.08)' }}
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
