---
name: laglabs-design
description: The laglabs design language and page conventions for this repo — tokens (colour, type, spacing), brand primitives, section anatomy, copy voice, motion, accessibility and the SEO/GEO/AEO checklist. Use whenever adding or changing anything visual on the site (a section, component, page, CTA, illustration or copy), or when touching metadata, structured data, llms.txt, robots or the sitemap.
---

# laglabs design language

The site is a **fully static** Next.js export (`output: "export"`) styled with Tailwind v4 + shadcn/ui, rendered from typed content. Everything new must look like it was always there: same tokens, same primitives, same rhythm, same voice.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (`@theme`) + shadcn variable mapping | `src/app/globals.css` |
| Component styles ported from the original site (`@layer base` / `@layer components`) | `src/styles/laglabs.css` |
| Brand primitives: `Icon`/`IconSprite`, `Wordmark`, `Eyebrow`, `Lines`, `ButtonLink`, `TextLink`, `StatusDot` | `src/components/brand/` |
| Page sections | `src/components/sections/` |
| All copy (also feeds JSON-LD + llms.txt) | `src/lib/content.ts` |
| Site facts (name, URL, email, descriptions) | `src/lib/site.ts` |
| Structured data | `src/lib/structured-data.ts` |
| llms.txt / llms-full.txt text | `src/lib/llms.ts` |
| Font (Manrope variable, self-hosted) + OFL | `src/fonts/` |
| Brand + messaging rationale | `docs/brand-and-messaging-research.md` |

## Tokens — never hard-code a new value if a token fits

Use them as Tailwind utilities (`bg-paper`, `text-ink-soft`, `border-line`, `font-mono`, `text-heading`, `px-gutter`, `rounded-control`) or as CSS vars (`var(--color-paper)`).

**Colour** — the brand colour is **neon azure `#0095ff`**: it has the same lightness and saturation (OKLCH L 0.66 / C 0.19) as the original orange, so it carries the same punch. Neutrals are deliberately neutral (no blue cast) so the brand is the only cool, saturated thing on the page; lime is the secondary.

| Token | Hex | Use |
| --- | --- | --- |
| `brand` | `#0095ff` | **Main colour.** Primary CTA fill, brand square, active tab, AI core, flow dots, step highlight, contact band |
| `brand-bright` | `#3aa9ff` | Hover on brand fills |
| `brand-strong` | `#0165b0` | Brand **text/icons** on light (5.6:1), section index, highlighted headline word, link hover, focus ring |
| `brand-deep` | `#012f56` | Borders/marks drawn on a `brand` fill |
| `brand-light` | `#97c9fe` | Brand accents on `night` (index, headline highlight) |
| `brand-tint` | `#e5f2ff` | Icon tiles, soft brand backgrounds |
| `on-brand` | `#0b1723` | Text on `brand` fills (5.8:1) |
| `lime` · `lime-dark` · `lime-tint` | `#c8cc40` · `#6f7312` · `#eff1cc` | Secondary: the **human / done** side (check icons, status dots, handoff tags, outcome boxes) |
| `steel` · `steel-tint` | `#586a85` · `#e8ecf3` | Tertiary icon tile |
| `paper` | `#f7f7f5` | Page background (neutral off-white) |
| `cream` | `#fefefd` | Raised surfaces: cards, nodes, bullets |
| `mist` | `#efefec` | Alternate section band |
| `night` | `#16191d` | Dark section ("The laglabs way") |
| `ink` · `ink-soft` · `ink-faint` | `#1d2024` · `#5a5e64` · `#82868c` | Text, body copy, de-emphasised half of a headline |
| `line` · `line-strong` | `#e0e0dc` · `#cbccc8` | 1px rules and borders |

Derived colours (connector strokes, glows, selection, contact-band borders) are `color-mix()`ed from `brand` in `src/styles/laglabs.css`, so **changing the brand is one edit in `globals.css`** — plus the raster copies in `public/icon.svg`, `src/lib/brand-mark.tsx` and `src/app/og.png/route.tsx` (Satori/SVG can't read CSS variables).

Contrast rules: `brand` is a **fill**, never small text on light (2.9:1) — use `brand-strong`. On a `brand` fill, small text is `on-brand`/ink; **white is allowed only for large text** (≥24px or ≥19px bold: 3.1:1), e.g. the contact headline highlight. On `night`: text `#b8bcc2`, highlights `brand-light`, borders `#2e333a`.

The brand colour is the signature, used with intent: one primary CTA per view, one highlighted word per headline at most. Brand = AI/action, lime = people/done — keep that mapping in illustrations.

**Type** — Manrope (`font-sans`) for everything; system mono (`font-mono`) only for small uppercase labels, indices, tags and captions.

| Token | Size | LH / tracking | Use |
| --- | --- | --- | --- |
| `text-display` | clamp(51–87px) | 1.075 / −0.064em | h1 only, weight 500, `nowrap` |
| `text-heading` | clamp(32–50px) | 1.2 / −0.045em | h2 |
| `text-title` | clamp(24–33px) | 1.35 / −0.035em | h3 in feature panels |
| `text-lead` | 16px | 1.8 | Hero description |
| `text-body` | 15px | 1.65 | Default |
| `text-copy` | 13px | 1.9 | Section paragraphs |
| `text-small` | 12px | 1.9 | Card copy, links, nav |
| `text-caption` | 10px | 1.5 | Notes, footnotes |
| `text-eyebrow` | 10px mono | +0.075em, uppercase | Eyebrows |
| `text-micro` | 8px mono | +0.05em, uppercase | Badges, tags, deliverables |

Headings are weight **500** (never bold), tight negative tracking, and usually **two short lines** split with `<Lines>` or ` <br />` (keep the space before `<br />` so words don't merge when a breakpoint hides the break).

**Layout** — content width `min(100% − 2×gutter, 1312px)` via `.wrap`; `--gutter` is clamp(24–88px) and steps to 40/30/23px at 1100/800/600. Sections use `.section-pad` (112 → 78 → 66px). Breakpoints are **1100, 800, 600px** (max-width) plus 1550px min-width for the hero.

**Shape** — buttons `5px` (`rounded-control`), illustration nodes `8px`, cards `11px`, icon tiles `6–7px`, tags `3px`, avatars/dots round. Borders are 1px `line`; shadows are barely there (`0 12px 30px #262b1904`).

## Primitives (use these, don't re-invent)

```tsx
<Eyebrow index="05 /">Section label</Eyebrow>        // mono, uppercase, brand-strong index
<Eyebrow spark>Let’s make room for what’s next</Eyebrow> // brand ✳ variant
<h2><Lines lines={["First beat.", "Second beat."]} /></h2>
<ButtonLink href="#contact">Build your AI team</ButtonLink>          // brand fill, ↗ icon
<ButtonLink variant="dark" size="small" href="#contact">Let’s talk</ButtonLink>
<TextLink href={mailto("Subject")}>Ask us <Icon name="diagonal" /></TextLink>
<StatusDot />  <Icon name="check" />  <Wordmark />
```

Icons: 24×24 grid, 1.6 stroke, round caps/joins, no fill, always decorative (`aria-hidden`); the control carries the label. Add new ones as `<symbol id="i-name">` in `src/components/brand/icon.tsx` and extend `IconName`. The CTA arrow is always `diagonal` (↗), never a chevron.

shadcn/ui components are themed through the token mapping (primary = ink, accent = brand, ring = brand-strong, radius 5px, Manrope), so `bunx shadcn@latest add …` output is on-brand by default. Prefer brand primitives on marketing surfaces; use shadcn for app-like UI (dialogs, forms, menus).

## Runtime: no React in the browser

The site is authored in Next/React, but **ships no React runtime**: `bun run build` = `islands` (Bun bundles `src/islands/enhance.ts` → `/enhance.js`, ~1.3 KB gz) → `next build` (static export) → `scripts/strip-runtime.ts` (cheerio removes Next/React scripts, the inline RSC payload, `.txt` payloads and unreferenced chunks). Result: plain HTML + CSS + one tiny script.

- **Components are server components.** Don't add `"use client"` to anything on a marketing page — its JavaScript is stripped in production, so it would render but never respond.
- **Interactivity = progressive enhancement in `src/islands/enhance.ts`.** Render the complete, accessible initial state on the server (ARIA attributes, `hidden`, `aria-expanded`…), then add one `enhanceX()` function that wires behaviour to that markup. The page must work and read fully without it.
- Only scripts with `data-keep` (and JSON-LD) survive the strip. Inline head scripts must be tiny and run before paint only to prevent layout shift (like `nav-enhanced`).
- A page that truly needs React in the browser (e.g. a shadcn dialog/form) opts out with `export const metadata = { other: { "laglabs:runtime": "react" } }` — use sparingly; it brings back ~175 KB of JS for that page.
- `bun dev` runs the same `enhance.js`, so dev and production behave the same.

## Section anatomy

Every section follows the same skeleton:

```tsx
<section className="my-section section-pad" id="anchor" aria-labelledby="my-title">
  <div className="wrap">
    <div className="section-heading reveal">
      <div>
        <Eyebrow index="0N /">Label</Eyebrow>
        <h2 id="my-title">Short claim. <br />Second beat.</h2>
      </div>
      <p><Lines lines={["One-line support,", "split in two."]} /></p>
    </div>
    {/* content */}
  </div>
</section>
```

- Alternate backgrounds: paper → mist band (with `#e2e8e9` top/bottom borders) → paper → night → paper → brand (contact). Never two dark/coloured bands in a row.
- Numbered sections continue the `01 / 02 / …` index in order.
- Put `reveal` on blocks that should fade up on scroll (headings, cards). Never on the hero or anything above the fold.
- Component CSS goes in `src/styles/laglabs.css` inside `@layer components`, using tokens; or use Tailwind utilities with tokens. Don't name a class after a Tailwind utility (`container`, `hidden`, `flex`…). The layout wrapper is `.wrap` for that reason.

## Voice

- Short, two-beat lines with a turn: "More ambition. Less busywork." / "You know your business. We make AI work in it."
- Second person, warm, plain. "Your people", "your tools", "your rules". AI is a **teammate/employee**, people stay **in control**.
- **No invented claims**: no customer logos, metrics, ROI numbers, certifications, team size or pricing unless they are real and sourced. Illustrations are labelled as examples.
- UI microcopy in sentence case; mono labels in UPPERCASE.
- Curly apostrophes and quotes (’ “ ”), en/em dashes used correctly, arrows → ↗ ↓ ↑ as glyphs.

## Motion

Subtle and optional: scroll reveals (`.reveal` → `RevealOnScroll`), the flowing dots and slowly turning mark in the hero, a 0.3s panel fade. Everything is disabled under `prefers-reduced-motion` and pausable with the footer motion toggle. Never animate layout, never hide above-the-fold content, never autoplay anything else.

## Accessibility (non-negotiable)

Semantic landmarks and one `h1`; `aria-labelledby` on every section; visible focus (`3px brand-strong`, 5px offset); content must work without JavaScript (native `<details>`, links not buttons for navigation, all tab panels in the HTML); keyboard support for any widget (use Base UI primitives — they handle it); colour contrast ≥ AA (`brand-strong` for brand-coloured text on light, `on-brand` for text on brand fills).

## SEO · GEO · AEO · AIO checklist (for every new page or section)

1. **Static, light**: no client components (see Runtime), no Server Actions, request-time APIs, rewrites or runtime image optimisation. Route handlers need `export const dynamic = "force-static"`.
2. **Content in `src/lib/content.ts`**, rendered as real HTML text (not images, not client-only).
3. **One question → one answer**: phrase FAQs as people ask them; answer in the first sentence, 40–80 words, self-contained. New FAQ items automatically flow into `FAQPage` JSON-LD and `llms-full.txt`.
4. **Structured data**: extend the `@graph` in `src/lib/structured-data.ts` (reference entities by `@id`). Only facts that are on the page.
5. **New page?** Add `export const metadata` (title, description, `alternates.canonical`), add it to `src/app/sitemap.ts`, list it in `llmsTxt()`, link it from the page.
6. **Headings carry meaning**: h2 = the claim, eyebrow = the topic. Keep entity names consistent ("laglabs", "AI employees", "mid-sized companies").
7. Keep `robots.ts` allowing search and answer-engine crawlers.
8. Verify: `bun run lint && bun run build`, then check `out/index.html`, `out/llms.txt`, the JSON-LD and that the page loads only `/enhance.js`.

## Verifying visual changes

`bun run build` then serve `out/` (`python3 -m http.server -d out 4174`) and check 1440, 1000, 700 and 390px widths, with and without JavaScript and with reduced motion.
