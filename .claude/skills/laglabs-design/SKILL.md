---
name: laglabs-design
description: The laglabs design language and page conventions for this repo — tokens (colour, type, spacing), brand primitives, section anatomy, copy voice, motion, accessibility and the SEO/GEO/AEO checklist. Use whenever adding or changing anything visual on the site (a section, component, page, CTA, illustration or copy), or when touching metadata, structured data, llms.txt, robots or the sitemap.
---

# laglabs design language

**Source of truth: the laglabs brand guidelines v1.0 — `docs/brand-guidelines.html`** (open it in a browser; logos, font and `laglabs-tokens.css` are downloadable from its toolkit section). This skill is how that guide is implemented in this repo. If the two ever disagree, the guide wins — fix the code.

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
| Brand guidelines (source of truth) | `docs/brand-guidelines.html` |
| Brand + messaging rationale | `docs/brand-and-messaging-research.md` |
| Brand symbol (favicon, avatars) | `public/icon.svg`; raster copies via `src/lib/brand-mark.tsx` |

## Tokens — never hard-code a new value if a token fits

Use them as Tailwind utilities (`bg-paper`, `text-ink-soft`, `border-line`, `font-mono`, `text-heading`, `px-gutter`, `rounded-control`) or as CSS vars (`var(--color-paper)`).

**Colour** — the guide's palette: **possibility blue `#00A9BD`** on a warm foundation. Use roughly **70% light neutrals · 20% ink/forest · 10% blue** per composition (a starting point, not a quota; a focused campaign panel can go all blue).

| Token | Hex | Guide name · use |
| --- | --- | --- |
| `brand` | `#00a9bd` | Primary blue · primary actions, brand dot, active tab, active AI step, blue panels. **A fill — never text on light** |
| `brand-hover` | `#00a0b3` | Hover on blue fills |
| `brand-strong` | `#006d7c` | Blue strong · blue text, links, chapter numbers (`01 /`), focus rings (5.6:1 on paper) |
| `brand-tint` | `#e0f3f4` | Blue tint · quiet accent surfaces, selection, AI icon tiles |
| `paper` | `#f8f7f3` | Paper · primary background |
| `cream` | `#fffefa` | Warm white · cards & raised surfaces |
| `mist` | `#eeefe8` | Alternate section band |
| `ink` | `#242820` | Ink · headlines, body, and **all text on blue** |
| `ink-soft` | `#62665c` | Muted · secondary text |
| `ink-faint` | `#858979` | De-emphasised half of a headline |
| `forest` | `#252b22` | Forest · dark feature sections |
| `sage` (+ `sage-ink` `#667153`) | `#e9efdf` | Sage · **human & knowledge** nodes, outcome boxes |
| `lavender` (+ `lavender-ink` `#817197`) | `#eeebf5` | Lavender · **tools & integration** nodes |
| `green` | `#587050` | Success · status dots, checks — always with a label or checkmark, never colour alone |
| `line` · `line-strong` | `#dedfd5` · `#cdd0c3` | 1px warm-gray borders and rules |

Contrast rules (from the guide): **white on blue is only 2.8:1 — use ink instead, including in large headlines.** Blue is never text on paper (2.6:1): use `brand-strong`. On `forest`: text `#bec3b7`, headline accent `#c0cbae`, chapter number `brand` (5.1:1), borders `#464e3d`. On blue panels: ink text, ink wordmark dot, `#24282088` outlines.

Diagram colour roles: **blue = the active AI step**, sage = people/knowledge, lavender = tools, green = done. Show the work, not the sci-fi: no robots, **no neon glows**, no decorative complexity.

**Logo & symbol** — always `laglabs`, one lowercase word, with the square dot attached (`<Wordmark />`). Minimum width **100px** digital (31px font ≈ 106px), clear space ≥ 1× the “l” height. The **symbol** is a blue tile with an **ink** asterisk (`public/icon.svg`) for favicons, avatars and diagrams; minimum tile 24px. No shadows, outlines, gradients or new icon + wordmark lockups.

**Type** — Manrope (`font-sans`, Arial fallback): **400/500/600 for layouts, 800 only for the wordmark**. System mono (`font-mono`) only for chapter numbers, eyebrows and technical metadata — never paragraphs or the wordmark. Headlines short, sentence case, focused on the outcome.

**Keep essential content at 14px or larger** (prose, lists, FAQ, nav, tabs, buttons, links). Below 14px is only for short supplementary text: mono labels, tags, captions, footer small print, and the illustrative workflow card (which uses the guide's own component sizes).

| Token | Size | LH / tracking | Use |
| --- | --- | --- | --- |
| `text-display` | clamp(51–87px); 39–59px on mobile | 1.075 / −0.064em | h1 only, weight 500, `nowrap` |
| `text-heading` | clamp(32–50px) | 1.2 / −0.045em | h2 |
| `text-title` | clamp(24–33px) | 1.35 / −0.035em | h3 in feature panels |
| `text-lead` | 16px | 1.8 | Hero description |
| `text-body` | 15px | 1.65 | Default |
| `text-copy` | 14px | 1.9 | Section paragraphs |
| `text-small` | 14px | 1.9 | Card copy, links, nav |
| `text-caption` | 10px | 1.5 | Notes, footnotes |
| `text-eyebrow` | 10px mono | +0.075em, uppercase | Eyebrows |
| `text-micro` | 8px mono | +0.05em, uppercase | Badges, tags, deliverables |

Headings are weight **500** (never bold), tight negative tracking, and usually **two short lines** split with `<Lines>` or ` <br />` (keep the space before `<br />` so words don't merge when a breakpoint hides the break).

**Layout** — content width `min(100% − 2×gutter, 1312px)` via `.wrap`; `--gutter` is clamp(24–88px) and steps to 40/30/23px at 1100/800/600. Sections use `.section-pad` (112 → 78 → 66px). Breakpoints are **1100, 800, 600px** (max-width) plus 1550px min-width for the hero.

**Rhythm** — 4px base unit (Tailwind spacing `1` = 4px): 24px inside cards, 32–48px between groups, 64–112px between sections.

**Shape** — buttons `5px` (`rounded-control`), cards `8px` (`rounded-node`), larger workflow panels `11px` (`rounded-card`), icon tiles `6–7px`, tags `3px`, avatars/dots round. Borders are 1px warm-gray `line`; shadows subtle and functional (`0 12px 30px #262b1904`).

## Primitives (use these, don't re-invent)

```tsx
<Eyebrow index="05 /">Section label</Eyebrow>        // mono, uppercase, brand-strong index
<Eyebrow spark>Let’s make room for what’s next</Eyebrow> // brand ✳ variant
<h2><Lines lines={["First beat.", "Second beat."]} /></h2>
<ButtonLink href="#contact">Build your AI team</ButtonLink>          // blue fill, ink label, ↗ icon
<ButtonLink variant="dark" size="small" href="#contact">Let’s talk</ButtonLink>
<TextLink href={mailto("Subject")}>Ask us <Icon name="diagonal" /></TextLink>
<StatusDot />  <Icon name="check" />  <Wordmark />
```

Icons: 24×24 grid, 1.6 stroke, round caps/joins, no fill, always decorative (`aria-hidden`); the control carries the label. Add new ones as `<symbol id="i-name">` in `src/components/brand/icon.tsx` and extend `IconName`. The CTA arrow is always `diagonal` (↗), never a chevron.

Actions (guide): **one primary action per group**, a clear verb, **minimum 44 × 44px target** (small text controls get an invisible 44px hit area via the `::after` rule at the top of `laglabs.css` — add new small links/buttons to that selector list). Links inside body text are underlined.

shadcn/ui components are themed through the token mapping (primary = ink, accent = blue with ink text, ring = brand-strong, radius 5px, Manrope), so `bunx shadcn@latest add …` output is on-brand by default. Prefer brand primitives on marketing surfaces; use shadcn for app-like UI (dialogs, forms, menus).

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

- Alternate backgrounds: paper → mist band (with `#e5e6dd` top/bottom borders) → paper → forest → paper → blue (contact, ink text). Never two dark/coloured bands in a row.
- Numbered sections continue the `01 / 02 / …` index in order.
- Put `reveal` on blocks that should fade up on scroll (headings, cards). Never on the hero or anything above the fold.
- Component CSS goes in `src/styles/laglabs.css` inside `@layer components`, using tokens; or use Tailwind utilities with tokens. Don't name a class after a Tailwind utility (`container`, `hidden`, `flex`…). The layout wrapper is `.wrap` for that reason.

## Voice

Sound like a partner, not a pitch: lead with human ambition, explain the technology through the work it helps people do. Write **AI** in capitals and **laglabs** in lowercase. Language to build on: AI employees · AI teammates · your people · built around your business · more capacity. Avoid: “Replace your workforce…”, “Revolutionize…”, “Guaranteed 10×…”.

- Short, two-beat lines with a turn: "More ambition. Less busywork." / "You know your business. We make AI work in it."
- Second person, warm, plain. "Your people", "your tools", "your rules". AI is a **teammate/employee**, people stay **in control**.
- **No invented claims**: no customer logos, metrics, ROI numbers, certifications, team size or pricing unless they are real and sourced. Illustrations are labelled as examples.
- UI microcopy in sentence case; mono labels in UPPERCASE.
- Curly apostrophes and quotes (’ “ ”), en/em dashes used correctly, arrows → ↗ ↓ ↑ as glyphs.

## Motion

200ms transitions for controls (Tailwind default duration is set to 200ms) and a subtle 1–2px arrow shift. Diagram animation must explain a flow. Subtle and optional: scroll reveals (`.reveal`, wired in `src/islands/enhance.ts`), the flowing dots and slowly turning mark in the hero, a 0.3s panel fade. Everything is disabled under `prefers-reduced-motion` and pausable with the footer motion toggle. Never animate layout, never hide above-the-fold content, never autoplay anything else.

## Accessibility (non-negotiable)

Semantic landmarks and one `h1`; `aria-labelledby` on every section; visible focus (`3px brand-strong`, 5px offset); content must work without JavaScript (native `<details>`, links not buttons for navigation, all tab panels in the HTML); keyboard support for any widget (implemented in `src/islands/enhance.ts`); colour contrast ≥ AA (`brand-strong` for blue text on light, ink for any text on blue); essential text ≥ 14px; touch targets ≥ 44 × 44px.

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
