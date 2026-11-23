---
name: Rocket by Dutch-Bangla Bank
description: Soft lavender wash, violet ink-and-accent, pill buttons and pastel service cards, closed by a deep-violet footer.
colors:
  page-wash: "#F9F8FD"
  lavender: "#EDDFFD"
  lavender-deep: "#ECE1FC"
  lavender-soft: "#F6F2FD"
  ink: "#0F0A2E"
  ink-2: "#2B2750"
  ink-3: "#625E76"
  rule: "#E7E1F3"
  violet: "#6A03AF"
  violet-deep: "#2B0A52"
  cta-start: "#6C0CA7"
  cta-end: "#550086"
  cta-hover-end: "#3F0069"
  footer-top: "#550D77"
  footer-bottom: "#440E6D"
  footer-bar: "#310F4F"
  card-peach: "#FDE7E3"
  card-mint: "#E9F6F6"
  card-lilac: "#F3ECFA"
  card-sky: "#EDF3FC"
  card-sand: "#FDF2E1"
  trophy-gold: "#F5B82E"
  leaf: "#12805C"
  leaf-tint: "#E4F6EE"
  warn: "#A35A00"
  warn-bg: "#FFF4E0"
  alert: "#B42318"
  alert-bg: "#FDECEA"
  info: "#1D5FA8"
typography:
  display:
    fontFamily: "Manrope, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 4.8vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Manrope, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 2.9vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.026em"
  title:
    fontFamily: "Manrope, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)"
    fontWeight: 700
    lineHeight: 1.28
    letterSpacing: "-0.012em"
  body:
    fontFamily: "Manrope, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, Anek Bangla, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.24em"
rounded:
  sm: "10px"
  tile: "18px"
  card: "26px"
  benefit: "28px"
  frame: "30px"
  band: "32px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(56px, 7vw, 104px)"
  header: "96px"
  container: "1376px"
components:
  button-primary:
    backgroundColor: "{colors.cta-end}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "0 30px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.cta-hover-end}"
  button-outline:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 30px"
    height: "52px"
  pill-button:
    textColor: "{colors.violet}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "44px"
  service-card:
    backgroundColor: "{colors.card-peach}"
    rounded: "{rounded.card}"
    height: "206px"
    padding: "24px"
  benefit-card:
    backgroundColor: "{colors.lavender-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.benefit}"
    padding: "32px 24px"
  tile:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.tile}"
  footer:
    backgroundColor: "{colors.footer-top}"
    textColor: "#FFFFFF"
---

# Design System: Rocket by Dutch-Bangla Bank

## Overview

**Creative North Star: "The Violet Daybreak"**

A light lavender page wash with violet doing all the talking: ink-dark headlines whose second line turns violet, violet icons and links, and one gradient pill as the single action. Soft violet-tinted shadows and generously rounded frames keep it friendly for first-time, mixed-literacy users; a deep-violet footer closes the page. The system was rebuilt to match a user-supplied mockup, and the shipped code is the source for every value here.

The brand is Bangladeshi and says so quietly: a Shaheed Minar and a tree line sit as faded decorative SVG behind the hero, and the official wordmark stays in its own brand purple (about #8A288F, baked into the logo raster, not a token). Bangla is the first language; every type rule has a Bangla exception.

**Key Characteristics:**
- Lavender wash fields over a near-white page; violet is the only accent.
- Pill buttons, 22-32px rounded image frames and bands, 26-28px cards.
- Pastels belong to the five service cards; gold belongs to the awards strip.
- Shadows are soft, violet-tinted and offset downward, never hard.
- Hero scales in vw so the composition keeps the mockup's proportions.

## Colors

A cool lavender-and-violet palette with five pastel service cards and one gold exception.

### Primary
- **Violet** (#6A03AF): headline accent line, icons, links, focus ring, selection, pill-button outline, chip icons.
- **CTA Gradient** (#6C0CA7 to #550086, 100deg): primary button only. Hover darkens to #7A14B8 to #46007A.

### Secondary
- **Trophy Gold** (#F5B82E): only in the awards strip trophy artwork.

### Tertiary (service cards)
- **Peach** (#FDE7E3), **Mint** (#E9F6F6), **Lilac** (#F3ECFA), **Sky** (#EDF3FC), **Sand** (#FDF2E1): the five service-card grounds, each with a matching tinted icon disc.

### Neutral
- **Page Wash** (#F9F8FD): hero and page ground. **Lavender** (#EDDFFD) and **Lavender Deep** (#ECE1FC): pills, icon squares, soft fields. **Lavender Soft** (#F6F2FD): inner-page fields and benefit cards (gradient #F7F6FE to #F1ECFB).
- **Ink** (#0F0A2E) headlines; **Ink 2** (#2B2750) lead and intro text; **Ink 3** (#625E76) captions and card descriptions; **Rule** (#E7E1F3) hairlines.
- **Footer Violet** (#550D77 to #440E6D, bar #310F4F): footer on-dark surface, white text.
- Status only: Leaf (#12805C), Warn (#A35A00), Alert (#B42318), Info (#1D5FA8) with tints.

### Named Rules
**The One Action Rule.** The CTA gradient is the only gradient-filled control; secondary actions are the white outline pill.
**The Pastel Fence Rule.** Pastels appear only on service cards and their discs; gold only on the award trophy.
**The Own Purple Rule.** The wordmark keeps its brand purple; never recolor it to the UI violet.

## Typography

**Display and Body Font:** Manrope (500-800) with Anek Bangla, then system sans.
**Bangla Font:** Anek Bangla (400-800) first in the stack when `lang="bn"`.

**Character:** Geometric, confident, tightly tracked headlines over open body copy; Bangla gets looser line height and no tracking.

### Hierarchy
- **Display** (800, clamp 2.3-4rem, 1.06): hero-scale statements. The hero h1 is two lines: ink "Rocket" (up to 4.9rem) over violet accent line (up to 4.1rem).
- **Headline** (800, clamp 1.8-2.6rem, 1.15, centered): section titles with a violet word.
- **Title** (700, clamp 1.15-1.4rem, 1.28): card and sub-section titles; 1.05rem bold for card headings.
- **Body** (500, 1rem, 1.6; Bangla 1.0625rem, 1.75): paragraphs, max 62ch.
- **Label / Eyebrow** (700, 0.72-0.8rem, 0.24em tracking, uppercase): tracked caption; above Why, Products and Awards titles it carries a short violet rule (24px by 2px) before the text.

### Named Rules
**The Bangla Exception Rule.** In Bangla: letter-spacing 0, no uppercase, heading weight capped at 700, line height 1.3 for headings, extra word spacing.

## Layout

Single container, 1376px max with a fluid gutter (20-56px); sections breathe at clamp(56px, 7vw, 104px). The header is 96px, sticky, transparent over the hero and white/90 with blur and a hairline once scrolled; the hero pulls up under it with a negative top margin. Hero is a left text column (640px max) over a right art box sized 49.1vw (max 790px, aspect 454/391) pinned bottom-right on large screens and stacked and centered below. Benefit cards run 1/2/4 columns with 19px gaps; service cards sit in a horizontally paged carousel with 52px arrow buttons. Breakpoints are Tailwind defaults (sm, md, lg) plus a 1420px step for carousel arrows.

## Elevation & Depth

Hybrid: tonal lavender fields carry most grouping, and soft downward violet-ink shadows lift cards, frames and chips. Depth also comes from layered decorative art (ribbons behind and in front of the hand).

### Shadow Vocabulary
- **Button glow** (`0 14px 26px -12px rgba(85,0,134,0.6)`): primary button.
- **Benefit card** (`0 18px 36px -26px rgba(106,3,175,0.35)`): lavender cards.
- **Service card** (`0 16px 30px -22px rgba(43,10,82,0.35)`): pastel cards; lift 4px on hover.
- **Tile** (`0 10px 28px -20px rgba(43,10,82,0.35)`, hover `0 18px 36px -20px rgba(43,10,82,0.45)`): white bordered tile.
- **Frame** (`0 30px 70px -34px rgba(106,3,175,0.45)`): image frame on About.
- **Chip** (`0 22px 40px -22px rgba(106,3,175,0.45)`): hero chips.

### Named Rules
**The Soft Violet Shadow Rule.** Shadows are large-blur, negative-spread and violet or violet-ink tinted; no hard offset, no black.

## Shapes

Generously rounded everywhere: pills (999px) for actions and tags, 26-28px for cards, 30px for photo frames (with a 38px white halo behind), 32px for the awards band, 18px for tiles, 24px for icon squares, 10px for small notices. Hero chips are rounded squares (26% radius). Imagery is cropped to these frames; the hero hand is a cut-out, rotated 8deg, with a radial mask fading the forearm.

## Components

### Buttons
- **Shape:** full pill, 52px minimum height, 30px side padding, 700 weight.
- **Primary:** violet gradient (#6C0CA7 to #550086), white text, button glow; hover shifts darker and rises 1px; active drops 1px.
- **Outline:** white, 1.5px #D9C9F2 border, ink text; hover border and text turn violet. Often carries a small violet disc with a white chevron.
- **Pill button (compact):** 44px, 2px violet outline, violet text; hover fills violet with white text. `btn-sm` is 40px.
- **Focus:** 3px violet outline, 3px offset, white 6px halo; on dark surfaces the outline is white.

### Cards / Containers
- **Benefit card:** 28px, lavender gradient, white hairline, 56px solid-violet icon, centered text, min height 221px.
- **Service card:** 26px, pastel ground, 206px high, matching icon disc, white arrow disc (36px) bottom-right.
- **Tile:** 18px, white, rule border; hover lifts.
- **Awards band:** 32px, lavender gradient, trophy in gold, cropped official award images.

### Chips
Hero service chips: translucent white squares (16.5% of art box), violet icon over 600-weight label, gentle 6s float with per-chip rotation and delay; links to services.

### Navigation
Header with purple logo (58px tall), sticky, transparent then frosted white; mobile menu fades down. Footer is a deep-violet gradient with white logo lockup (92px) and a darker bottom bar.

### Motion
IntersectionObserver reveals fade and rise 28px (0.8-0.9s, ease cubic-bezier(0.16,1,0.3,1)); chip float; carousel scrolls smoothly (instant under reduced motion); Lenis smooth scroll site-wide (disabled under reduced motion). Reduced motion collapses all transitions and animations.

### Imagery
Natural hand cut-out photo with painted Rocket screen; woman in a purple sari holding a phone; official award images cropped; official logo lockup. Decorative SVG: two ribbons, Shaheed Minar, tree line. Rasters carry embedded provenance.

## Do's and Don'ts

### Do:
- **Do** use violet (#6A03AF) for emphasis words, icons and links, and ink (#0F0A2E) for the rest of the headline.
- **Do** keep primary action as the gradient pill at 52px minimum height.
- **Do** put a short violet rule before the eyebrow only where the title is a centered section title (Why, Products, Awards).
- **Do** round image frames and bands at 22-32px and cards at 26-28px.
- **Do** cap Bangla heading weight at 700 and remove tracking.
- **Do** disable float, smooth scroll and reveal motion under reduced motion.

### Don't:
- **Don't** use pastel grounds outside the five service cards, or gold outside the awards strip.
- **Don't** recolor the official wordmark.
- **Don't** use hard offset or black shadows.
- **Don't** letter-space or uppercase Bangla text.
- **Don't** stack more than one gradient button in a view.
