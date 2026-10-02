@AGENTS.md

## Project conventions

- Before adding or changing anything visual, or any metadata/SEO surface, follow the `laglabs-design` skill (`.claude/skills/laglabs-design/SKILL.md`).
- The site must stay a fully static export: `bun run lint && bun run build` must pass and produce `out/`.
- Use Bun (`bun`, `bunx`), not npm/pnpm/yarn.
- Copy never contains an em dash (—), en dash (–), double hyphen ("--") or a hyphen used as a dash (" - "). Rewrite with a comma, colon, period or parentheses. `bun run build` fails if one is published (`scripts/check-copy.ts`).
- The brand guidelines in `docs/brand-guidelines.html` are the source of truth for design and voice.
