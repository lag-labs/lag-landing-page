---
name: laglabs-design
description: The laglabs brand guidelines v1.0 (docs/brand-guidelines.html) and how they are implemented in this repo. Covers idea, logo and symbol, colour, typography, design language, components, voice and copy rules (dashes are forbidden), formats, toolkit, plus tokens, primitives, static runtime, accessibility and the SEO/GEO/AEO checklist. Use whenever adding or changing anything visual or written on the site (a section, component, page, CTA, illustration, copy, metadata, structured data, llms.txt, robots or sitemap) or anything made for laglabs.
---

# laglabs design language

**Source of truth: laglabs brand guidelines v1.0, October 2026, in `docs/brand-guidelines.html`.** Open it in a browser: it has live specimens and a toolkit with the logo SVGs, the Manrope font and `laglabs-tokens.css`. This skill restates the guide (chapters 01 to 08, in the guide's order) and adds how it is built in this repo. If the code and the guide disagree, the guide wins: fix the code. The one deliberate addition to the guide is the dash ban in the copy rules below.

The site is a **fully static** Next.js export styled with Tailwind v4 + shadcn/ui and rendered from typed content. Everything new must look and sound like it was always there.

## The idea behind it all

**More ambition. Less busywork.** We build custom AI employees around a company's people, knowledge and tools, giving teams more capacity for what comes next. Three principles shape every decision:

| Principle | What it means |
| --- | --- |
| **People at the center.** | Warm surfaces, open space and everyday language. Technology should feel approachable. |
| **Clarity over complexity.** | Precise typography, purposeful diagrams and practical examples. Show how the work moves. |
| **A little forward energy.** | A bright blue, an upward arrow (↗) and room to imagine. Confident without being loud. |

The foundation is the original landing page (wordmark, Manrope, warm neutrals, workflow illustrations); the evolution is possibility blue replacing orange as the primary accent.

## 01 · Logo and symbol

A small mark, a clear signature.

* **Wordmark** (`<Wordmark />`): `laglabs`, lowercase, Manrope 800, with the **square dot attached**. It is the main identifier. Always write laglabs as one lowercase word, in copy too.
* **Clear space**: at least 1× the height of the “l” on all sides. **Minimum width: 100px digital, 25mm print** (31px font ≈ 106px; never set the wordmark below 30px).
* **Variants**: ink + blue dot (light backgrounds), warm white + blue dot (dark backgrounds), single colour ink (one ink production). On a blue panel the dot turns ink.
* **Symbol**: the asterisk on a **blue tile with an ink asterisk** (`public/icon.svg`). Use it for avatars, favicons and diagrams; keep the wordmark nearby when introducing the brand. Minimum tile size 24px.
* **Never**: shadows, outlines, gradients, distortion, or a new icon + wordmark lockup. For finished artwork use the outlined SVGs from the guide's toolkit (they need no font installed).

## 02 · Colour palette

A fresh blue on the same warm foundation. Blue is the signal, warm paper gives it room, dark slightly olive ink keeps the system grounded and human.

| Token | Hex | Guide name | Use |
| --- | --- | --- | --- |
| `brand` | `#00a9bd` | Possibility blue | Primary actions, brand dot, active tab, active AI step, blue panels. **A fill, never text on light.** |
| `brand-hover` | `#00a0b3` | Blue hover | Hover on blue fills |
| `brand-strong` | `#006d7c` | Blue strong | Blue text, links, chapter numbers (`01 /`), focus rings (5.6:1 on paper) |
| `brand-tint` | `#e0f3f4` | Blue tint | Quiet accent surfaces, selection, AI icon tiles |
| `paper` | `#f8f7f3` | Paper | Primary background |
| `cream` | `#fffefa` | Warm white | Cards and raised surfaces |
| `mist` | `#eeefe8` | | Alternate section band |
| `ink` | `#242820` | Ink | Headlines, body, and **all text on blue** |
| `ink-soft` | `#62665c` | Muted | Secondary text |
| `ink-faint` | `#858979` | | De-emphasised half of a headline |
| `forest` | `#252b22` | Forest | Dark feature sections |
| `sage` (+ `sage-ink` `#667153`) | `#e9efdf` | Sage | **Human and knowledge** nodes, outcome boxes |
| `lavender` (+ `lavender-ink` `#817197`) | `#eeebf5` | Lavender | **Tools and integration** nodes |
| `green` | `#587050` | Success | Status dots and checks, always paired with a label or checkmark, never colour alone |
| `line` · `line-strong` | `#dedfd5` · `#cdd0c3` | Dividers | 1px warm-gray borders and rules |

* **Let the neutrals do most of the work**: roughly 70% light neutrals, 20% ink or forest, 10% blue per composition. A starting point, not a quota; a focused campaign panel can go all blue.
* **Make the contrast count**: white on primary blue is only 2.83:1. **Use ink on blue, including in large headlines.** Blue is never text on paper (2.6:1): use `brand-strong`.
* On `forest`: text `#bec3b7`, headline accent `#c0cbae`, chapter number `brand` (5.1:1), borders `#464e3d`. On blue panels: ink text, ink wordmark dot, `#24282088` outlines.
* HEX and RGB are the digital source of truth (the blue is a close visual match to the reference image); proof print conversions with the printer.

## 03 · Typography

Clear words, room to breathe. One expressive family does the heavy lifting: **Manrope**, geometric, open and quietly confident.

* **Weights**: 400, 500 and 600 for everyday layouts; **800 is reserved for the wordmark**. Headings are 500, never bold.
* **Fallback**: Arial when Manrope can't load (the token stack is `Manrope, Arial, sans-serif`). The bundled webfont (`src/fonts/manrope-latin.woff2`, identical to the guide's) is Latin only.
* **Mono companion**: SFMono-Regular → Consolas → Liberation Mono → monospace (`font-mono`), only for chapter numbers, eyebrows and technical metadata. **Never for paragraphs or the wordmark.**
* **Keep essential content at 14px or larger** (prose, lists, FAQ, navigation, tabs, buttons, links). Below 14px only for short supplementary text: mono labels, tags, captions, footer small print and the illustrative workflow card (which uses the guide's component sizes).
* Headlines short, sentence case, focused on the outcome.

| Role | Guide spec (size / weight · line height / tracking) | Token |
| --- | --- | --- |
| Display (h1) | 51 to 87px / 500 · 1.075 / −0.064em; **39 to 59px on mobile** | `text-display` (`nowrap`) |
| Heading (h2) | 32 to 50px / 500 · 1.2 / −0.045em | `text-heading` |
| Title (h3) | 24 to 33px / 500 · 1.35 / −0.035em | `text-title` |
| Body | 15 to 16px / 400 · 1.65 to 1.8 / normal | `text-body` 15, `text-lead` 16 |
| Copy | 14px / 400 · 1.9 | `text-copy`, `text-small` |
| Label (mono) | 10 to 12px / 400 · 1.5 / +0.075em, uppercase | `text-eyebrow`; `text-micro` 8px for tags only |

Headlines usually run as **two short lines** split with `<Lines>` or ` <br />` (keep the space before `<br />` so words never merge when a breakpoint hides the break).

## 04 · Design language

Structured, never stiff. Editorial layouts meet useful little systems: give every idea space, then connect the dots.

* **Rhythm**: 4px base unit (Tailwind spacing `1` = 4px; scale 4 · 8 · 16 · 24 · 32 · 48 · 64). 24px inside cards, 32 to 48px between groups, 64 to 112px between sections (`.section-pad`: 112 → 78 → 66px). Gutters scale from 24px to 88px (`--gutter`); content max 1312px (`.wrap`).
* **Soft edges, light structure**: 1px warm-gray borders (`line`); shadows subtle and functional (`0 12px 30px #262b1904`). Corners: **5px buttons** (`rounded-control`), **8px cards** (`rounded-node`), **11px larger workflow panels** (`rounded-card`); icon tiles 6 to 7px, tags 3px.
* **Icons**: light, simple, useful. 24 × 24 grid, 1.6px stroke, round caps and joins, no fill; always decorative (`aria-hidden`), the control carries the label. Add new ones as a `<symbol>` in `src/components/brand/icon.tsx`. The action arrow is always ↗ (`diagonal`), never a chevron.
* **Illustrations: show the work, not the sci-fi.** Cards, thin connectors, dotted grids and a **visible human handoff**. Blue marks the active AI step, sage marks people or knowledge, lavender marks tools, green marks done. Avoid stock robots, neon glows and decorative complexity.
* **Motion with purpose**: 200ms transitions for controls (Tailwind's default duration is 200ms here) and a subtle 1 to 2px arrow shift on hover. Diagram animation must explain a flow. Honour `prefers-reduced-motion` and provide a pause control for continuous motion (the footer toggle). Never animate layout or hide above-the-fold content.
* Breakpoints: 1100, 800 and 600px (max-width), plus 1550px min-width for the hero.

## 05 · Components

Familiar pieces, a consistent experience: an action, a card or a status should feel like it belongs to the same team.

* **Actions**: primary fill `#00A9BD` with ink label, hover `#00A0B3`, focus `3px #006D7C` outline sitting 5px outside. **One primary action per group**, a clear verb, **minimum 44 × 44px target** (small text controls get an invisible 44px hit area from the `::after` rule at the top of `src/styles/laglabs.css`; add new small links or buttons to that selector list). **Links inside body text are underlined.**
* **Workflow card** anatomy (see the role panels): 01 one descriptive title with a quiet mono label; 02 warm surfaces, fine borders, generous padding; 03 blue highlights the active AI step; 04 human review is part of the story; 05 a labelled status closes the loop. Always mark it as an example (“Example workflow”, “Illustrative workflow”), never as a screenshot or a claim about a shipped product.

Primitives (use these, don't reinvent):

```tsx
<Eyebrow index="05 /">Section label</Eyebrow>            // mono, uppercase, brand-strong index
<Eyebrow spark>Let’s make room for what’s next</Eyebrow>  // ✳ variant
<h2><Lines lines={["First beat.", "Second beat."]} /></h2>
<ButtonLink href="#contact">Build your AI team</ButtonLink>   // blue fill, ink label, ↗
<ButtonLink variant="dark" size="small" href="#contact">Let’s talk</ButtonLink>
<TextLink href={mailto("Subject")}>Ask us <Icon name="diagonal" /></TextLink>
<StatusDot />  <Icon name="check" />  <Wordmark />
```

shadcn/ui is themed through the token mapping in `globals.css` (primary ink, accent blue with ink text, ring `brand-strong`, radius 5px, Manrope), so `bunx shadcn@latest add …` output starts on brand. Prefer the brand primitives on marketing surfaces.

## 06 · Voice, messaging and copy rules

Sound like a partner, not a pitch. Lead with human ambition. Explain the technology through the work it helps people do. Be warm, specific and straightforward.

Positioning line: *laglabs builds custom AI employees for mid-sized companies, connected to your tools, tailored to your business, and managed by us.*

| Do | Don't |
| --- | --- |
| “Give your people more room for what’s next.” | “Replace your workforce with autonomous AI.” |
| “Keep CRM records and follow-ups up to date.” | “Revolutionize your enterprise with next-gen intelligence.” |
| “Let’s find your first AI employee.” | “Guaranteed 10× productivity. Instantly.” |

* **Speak person to person**: “you”, “your team”, “we”. Contractions are welcome. Short sentences, jargon explained.
* **Make the work concrete**: say what gets done. Examples, not superlatives. Only publish outcomes, claims or customer stories you can support (no invented logos, metrics, ROI, certifications, team size or pricing).
* **Keep people in the picture**: talk about capacity, judgment and partnership; make human review and practical boundaries visible.
* **Language to build on**: AI employees · AI teammates · your people · built around your business · more capacity.
* Sentence case everywhere; mono labels in UPPERCASE. Write **AI** in capitals and **laglabs** in lowercase.
* Typography of copy: curly apostrophes and quotes (’ “ ”), arrows as glyphs (→ ↗ ↓ ↑), × for multiplication.

### Dashes are strictly forbidden

**Never use an em dash (—), an en dash (–) or a hyphen used as a dash (“ - ”) in any copy**: page text, headings, buttons, alt text, aria labels, page titles, meta descriptions, Open Graph text, JSON-LD, `llms.txt`, the manifest, emails and social posts. This overrides the guide's own examples, which sometimes use an em dash.

* Rewrite instead of substituting: use a comma, a colon, a full stop (two short sentences), or parentheses.
  * ✗ “We build AI employees that take on the everyday work — so your team can take on what’s next.”
  * ✓ “We build AI employees that take on the everyday work, so your team can take on what’s next.”
* Titles use a pipe: `laglabs | More ambition. Less busywork.` (template `%s | laglabs`).
* Ranges are written out: “2 to 4 weeks”, not “2–4 weeks”.
* Hyphens **inside** words are spelling, not dashes, and stay: mid-sized, follow-ups, in-house, copy-paste.
* Plain-text lists for machines (`llms.txt`) use `*` bullets.
* **Enforced**: `bun run build` runs `scripts/check-copy.ts`, which fails the build and names the file and text if any published copy contains one.

## 07 · In the wild

Different formats, unmistakably us. Keep the same ingredients as the format changes: a clear idea, generous space, Manrope, the wordmark, and **one intentional accent**.

* **Social, square canvas**: one thought, one accent, plenty of space.
* **Campaign, blue-led moment**: ink on blue with a human-centered headline; the wordmark dot turns ink.
* **Email**: export the wordmark as an image with alt text and use Arial when custom fonts are unavailable.
* **Open Graph card** (`src/app/og.png/route.tsx`): paper background, wordmark, two-line headline with the highlighted word in `brand-strong`, the symbol tile.

## 08 · Brand toolkit

The guide embeds every asset so it works offline: wordmark SVGs (ink + blue, warm white + blue, single-colour ink), the symbol (blue tile + ink asterisk), Manrope Latin 200 to 800 with its SIL Open Font License, and `laglabs-tokens.css`. In this repo:

| Guide asset / variable | Here |
| --- | --- |
| `--brand-blue` · `-strong` · `-hover` · `-tint` | `--color-brand` · `-strong` · `-hover` · `-tint` |
| `--brand-paper` · `--brand-white` · `--brand-ink` · `--brand-muted` · `--brand-line` | `--color-paper` · `--color-cream` · `--color-ink` · `--color-ink-soft` · `--color-line` |
| `--brand-forest` · `--brand-sage` · `--brand-green` · `--brand-lavender` | `--color-forest` · `--color-sage` · `--color-green` · `--color-lavender` |
| `--brand-space-*`, `--brand-radius-*`, `--brand-container`, `--brand-gutter`, `--brand-transition` | Tailwind spacing scale, `rounded-control/node/card`, `--container-page`, `--spacing-gutter`, 200ms default transition |
| Symbol SVG | `public/icon.svg`; PNG/ICO copies generated by `src/lib/brand-mark.tsx` (keep hexes in sync; Satori can't read CSS vars) |
| Manrope woff2 + OFL | `src/fonts/` (the static TTFs there exist only for the OG image) |

## Building it in this repo

### Where things live

| What | Where |
| --- | --- |
| Brand guidelines (source of truth) | `docs/brand-guidelines.html` |
| Design tokens (`@theme`) + shadcn mapping | `src/app/globals.css` |
| Component styles (`@layer base` / `@layer components`) | `src/styles/laglabs.css` |
| Brand primitives | `src/components/brand/` |
| Page sections (server components) | `src/components/sections/` |
| All copy (also feeds JSON-LD and llms.txt) | `src/lib/content.ts` |
| Site facts (name, URL, email, titles) | `src/lib/site.ts` |
| Structured data / llms text | `src/lib/structured-data.ts` / `src/lib/llms.ts` |
| Browser behaviour | `src/islands/enhance.ts` |
| Post-build steps | `scripts/strip-runtime.ts`, `scripts/check-copy.ts` |

Never hard-code a value a token covers: use utilities (`bg-paper`, `text-ink-soft`, `border-line`, `font-mono`, `text-heading`, `px-gutter`, `rounded-control`) or CSS vars (`var(--color-paper)`).

### Runtime: no React in the browser

`bun run build` = `islands` (Bun bundles `src/islands/enhance.ts` to `/enhance.js`, about 1.3 KB gzipped) → `next build` (static export) → `strip-runtime` (removes the Next/React runtime) → `check-copy` (dash guard).

* **Components are server components.** Don't add `"use client"` on marketing pages: its JavaScript is stripped, so it would render but never respond.
* **Interactivity is progressive enhancement**: render the complete, accessible initial state on the server (ARIA attributes, `hidden`, `aria-expanded`), then add an `enhanceX()` function in `src/islands/enhance.ts`. The page must work and read fully without it.
* Only scripts with `data-keep` (and JSON-LD) survive. A page that truly needs React in the browser opts out with `export const metadata = { other: { "laglabs:runtime": "react" } }` (it brings back about 175 KB; use sparingly).

### Section anatomy

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

* Backgrounds alternate: paper → mist band (`#e5e6dd` borders) → paper → forest → paper → blue contact panel (ink text). Never two dark or coloured bands in a row.
* Numbered sections continue the `01 / 02 / …` index.
* `reveal` on headings and cards below the fold only, never on the hero.
* Component CSS goes in `src/styles/laglabs.css` inside `@layer components`, using tokens. Don't name a class after a Tailwind utility (`container`, `hidden`, `flex`); the layout wrapper is `.wrap` for that reason.

### Accessibility (non-negotiable)

Semantic landmarks and one `h1`; `aria-labelledby` on every section; visible focus (3px `brand-strong`, 5px offset); content works without JavaScript (native `<details>`, links for navigation, every tab panel in the HTML); keyboard support for every widget; contrast at least AA (`brand-strong` for blue text, ink on blue); essential text at least 14px; touch targets at least 44 × 44px; success never shown by colour alone.

### SEO · GEO · AEO · AIO checklist (every new page or section)

1. **Static and light**: no client components, Server Actions, request-time APIs, rewrites or runtime image optimisation. Route handlers need `export const dynamic = "force-static"`.
2. **Copy lives in `src/lib/content.ts`**, rendered as real HTML text, and follows the copy rules above (no dashes).
3. **One question, one answer**: phrase FAQs as people ask them; answer in the first sentence, 40 to 80 words, self-contained. New FAQ items flow into the `FAQPage` JSON-LD and `llms-full.txt` automatically.
4. **Structured data**: extend the `@graph` in `src/lib/structured-data.ts` (reference entities by `@id`); only facts that are on the page.
5. **New page**: add `export const metadata` (title, description, `alternates.canonical`), add it to `src/app/sitemap.ts`, list it in `llmsTxt()`, link to it.
6. **Headings carry meaning**: h2 is the claim, the eyebrow is the topic. Keep entity names consistent (“laglabs”, “AI employees”, “mid-sized companies”).
7. Keep `robots.ts` allowing search and answer-engine crawlers.
8. **Verify**: `bun run lint && bun run build` (includes the dash guard), then check `out/index.html`, `out/llms.txt`, the JSON-LD, and that the page loads only `/enhance.js`. Serve `out/` (`python3 -m http.server -d out 4174`) and look at 1440, 1000, 700 and 390px, with and without JavaScript and with reduced motion.
