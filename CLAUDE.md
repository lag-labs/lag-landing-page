@AGENTS.md

## Project conventions

- Before adding or changing anything visual, or any metadata/SEO surface, follow the `laglabs-design` skill (`.claude/skills/laglabs-design/SKILL.md`).
- The site must stay a fully static export: `bun run lint && bun run build` must pass and produce `out/`.
- Use Bun (`bun`, `bunx`), not npm/pnpm/yarn.
