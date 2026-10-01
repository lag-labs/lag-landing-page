# laglabs — landing page

Website for [laglabs.ai](https://laglabs.ai): custom AI employees for mid-sized companies.

Next.js 16 (App Router, **static export**) · Tailwind CSS v4 · shadcn/ui (Base UI) · Biome · Bun · cheerio.

```bash
bun install
bun dev            # http://localhost:3000
bun run build      # static site in out/ (islands → next build → strip-runtime)
bun run lint       # biome check
bun run lint:fix   # biome check --write
```

Preview the production build: `python3 -m http.server -d out 4174`.

## Structure

- `src/lib/content.ts` — all page copy. Sections, JSON-LD and `llms.txt` render from it.
- `src/lib/site.ts` — name, URL, email, descriptions.
- `src/components/sections/` — page sections (all server components).
- `src/islands/enhance.ts` — the only browser JavaScript (menu, tabs, copy button, reveals, motion toggle), bundled by Bun to `/enhance.js`.
- `scripts/strip-runtime.ts` — post-build step that removes the React/Next runtime from the export (≈1.3 KB of JS shipped instead of ≈200 KB).
- `src/components/brand/` — brand primitives (icons, wordmark, eyebrow, buttons, links).
- `src/app/globals.css` — design tokens and shadcn theme mapping; `src/styles/laglabs.css` — component styles.
- `.claude/skills/laglabs-design/SKILL.md` — **the design language**: tokens, primitives, section anatomy, voice, motion, a11y and the SEO/GEO/AEO checklist. Read it before adding anything.
- `docs/` — brand & messaging rationale.

## Search & answer engines

Everything is prerendered HTML. The build also emits:

| File | Purpose |
| --- | --- |
| `/robots.txt` | Allows search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) |
| `/sitemap.xml` | Canonical URLs; `lastmod` = last git commit touching the page content |
| `/llms.txt`, `/llms-full.txt` | Plain-text summary and full content for LLMs ([llmstxt.org](https://llmstxt.org)) |
| `/og.png` | 1200×630 social card |
| `/manifest.webmanifest`, `/icon.svg`, `/favicon.ico`, `/apple-touch-icon.png`, `/icon-512.png` | App metadata and icons |
| JSON-LD in `index.html` | Organization, WebSite, WebPage, Service (+ role catalog), FAQPage |

## Performance

Lighthouse 13, mobile profile (simulated slow 4G, 4× CPU slowdown), median of 3 runs, measured on 2026-10-01 against the previous hand-written static site:

| Metric | Previous site | This repo without `strip-runtime` | **This repo (shipped)** |
| --- | --- | --- | --- |
| Performance score | 100 | 98 | **100** |
| JavaScript transferred | 2.5 KB | 156.4 KB | **1.6 KB** |
| JS execution time | 13 ms | 125 ms | **11 ms** |
| Total transfer (gzip) | 45.7 KB | 222.8 KB | **55.0 KB** |
| Requests | 5 | 11 | **6** |
| Largest Contentful Paint | 1.20 s | 2.48 s | **1.35 s** |
| Total Blocking Time | 0 ms | 22 ms | **0 ms** |
| Cumulative Layout Shift | 0 | 0 | **0** |
| Accessibility / Best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | **100 / 100 / 100** |

Live on laglabs.ai (same GitHub Pages CDN): LCP 1.15 s → **1.05 s**, TBT 20 ms → **0 ms**, JS 2.1 KB → **1.4 KB**.

Keep it that way: no client components on marketing pages, all behaviour in `src/islands/enhance.ts` (see the design skill).

## Deploy

**GitHub Pages** (live at [laglabs.ai](https://laglabs.ai)) — `.github/workflows/pages-deploy.yml` lints, builds and publishes `out/` on every push to `main`. The repo's Pages source is **GitHub Actions** with custom domain `laglabs.ai` (HTTPS enforced); `public/CNAME` and `public/.nojekyll` are copied into the build. The repo is public (required for Pages on the free plan), so keep private material such as pricing and research out of it.

DNS (Cloudflare, DNS only): `A @` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; `AAAA @` → `2606:50c0:8000::153` … `8003::153`; `CNAME www` → `lag-labs.github.io`.

**Docker** — static files served by nginx:

```bash
docker build -t lag-landing-page .
docker run -d --name lag-landing-page -p 3000:8080 lag-landing-page
```

## Contact

All CTAs are `mailto:` links to **hello@laglabs.ai** (no form backend, no tracking). Change it in `src/lib/site.ts`.

## Credits

Font: [Manrope](https://github.com/sharanda/manrope), SIL Open Font License — see `src/fonts/OFL-Manrope.txt`. The static TTF weights in `src/fonts/` (used only for the OG image) are instances of the same font.
