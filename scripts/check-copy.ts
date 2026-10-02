/**
 * Post-build copy guard. Fails the build if published text contains a dash
 * used as punctuation: em dash (—), en dash (–), or a spaced hyphen (" - ").
 * Hyphens inside words ("mid-sized", "follow-ups") are spelling and allowed.
 *
 * Checks everything a person, search engine or LLM can read: visible HTML
 * text, alt/title/aria-label/placeholder attributes, <title> and <meta>
 * content, JSON-LD, llms.txt, llms-full.txt and the web manifest.
 *
 * Usage: bun scripts/check-copy.ts [outDir]
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { load } from "cheerio";

const outDir = process.argv[2] ?? "out";
const forbidden = /[—–]|(?:^|\s)-(?:\s|$)/;

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return nested.flat();
}

const problems: string[] = [];
const check = (file: string, where: string, text: string | undefined) => {
  if (!text) return;
  for (const line of text.split("\n")) {
    const match = forbidden.exec(line);
    if (!match) continue;
    const start = Math.max(0, match.index - 60);
    const snippet = line.slice(start, match.index + 60).trim();
    problems.push(`${relative(outDir, file)} (${where}): …${snippet}…`);
  }
};

const files = await walk(outDir);

for (const file of files.filter((f) => f.endsWith(".html"))) {
  const $ = load(await readFile(file, "utf8"));
  $('script[type="application/ld+json"]').each((_, el) => {
    const strings: string[] = [];
    JSON.stringify(JSON.parse($(el).text()), (_key, value) => {
      if (typeof value === "string") strings.push(value);
      return value;
    });
    for (const value of strings) check(file, "JSON-LD", value);
  });
  check(file, "title", $("title").text());
  $("meta[content]").each((_, el) =>
    check(
      file,
      `meta ${$(el).attr("name") ?? $(el).attr("property")}`,
      $(el).attr("content"),
    ),
  );
  $("[alt],[title],[aria-label],[placeholder]").each((_, el) => {
    for (const attr of ["alt", "title", "aria-label", "placeholder"])
      check(file, attr, $(el).attr(attr));
  });
  $("script, style, noscript, svg").remove();
  check(
    file,
    "text",
    $("body")
      .text()
      .replace(/[ \t]+/g, " "),
  );
}

for (const file of files.filter((f) =>
  /(llms(-full)?\.txt|manifest\.webmanifest)$/.test(f),
)) {
  check(file, "file", await readFile(file, "utf8"));
}

if (problems.length > 0) {
  console.error(
    `check-copy: ${problems.length} forbidden dash(es) in published copy. Rewrite with a comma, colon, period or parentheses:\n  ${problems.join("\n  ")}`,
  );
  process.exit(1);
}
console.log(
  "check-copy: no em dashes, en dashes or spaced hyphens in published copy",
);
