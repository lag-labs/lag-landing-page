/**
 * Post-build copy guard. Fails the build if published text contains a dash
 * used as punctuation: em dash (—), en dash (–), their relatives (figure dash,
 * horizontal bar, minus sign, two- and three-em dashes), a double hyphen
 * ("--") or a spaced hyphen (" - ").
 * Hyphens inside words ("mid-sized", "follow-ups") are spelling and allowed.
 *
 * Checks everything a person, search engine or LLM can read: HTML text
 * (including text inside SVGs), alt/title/aria-label/placeholder attributes,
 * <title> and <meta> content, JSON-LD, llms.txt, llms-full.txt, the web
 * manifest, and the strings in our own scripts (messages set by /enhance.js).
 *
 * Usage: bun scripts/check-copy.ts [outDir]
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { load } from "cheerio";

const outDir = process.argv[2] ?? "out";
const forbidden =
  /[\u2012-\u2015\u2212\u2e3a\u2e3b\ufe58]|(?:^|\s)(?:-{1,2}|[\u2010\u2011])(?:\s|$)|\w--\w/;

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
  $("script, style, noscript").remove();
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

// Our own scripts (not Next's chunks): any string may end up on the page.
const stringLiteral = /(["'`])((?:\\.|(?!\1)[^\\\n])*)\1/g;
for (const file of files.filter(
  (f) => f.endsWith(".js") && !relative(outDir, f).startsWith("_next/"),
)) {
  for (const [, , literal] of (await readFile(file, "utf8")).matchAll(
    stringLiteral,
  )) {
    check(
      file,
      "string",
      literal.replace(/\\u([0-9a-f]{4})/gi, (_, hex) =>
        String.fromCharCode(Number.parseInt(hex, 16)),
      ),
    );
  }
}

if (problems.length > 0) {
  console.error(
    `check-copy: ${problems.length} forbidden dash(es) in published copy. Rewrite with a comma, colon, period or parentheses:\n  ${problems.join("\n  ")}`,
  );
  process.exit(1);
}
console.log(
  "check-copy: no dashes, double hyphens or spaced hyphens in published copy",
);
