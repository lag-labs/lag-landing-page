/**
 * Post-build: turn Next's static export into plain HTML + CSS + one tiny script.
 *
 * The site is authored with Next/React server components, so the browser needs
 * none of the React/Next runtime. This removes it from every exported page:
 *   - <script> tags except JSON-LD and ones marked `data-keep`
 *   - script preloads, the inline React Server Component payload
 *   - the RSC .txt payload files and the (now unreferenced) runtime JS chunks
 * All interactivity lives in src/islands/enhance.ts → /enhance.js.
 *
 * A page that genuinely needs React in the browser can opt out with
 * `export const metadata = { other: { "laglabs:runtime": "react" } }`.
 *
 * Usage: bun scripts/strip-runtime.ts [outDir]
 */
import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { load } from "cheerio";

const outDir = process.argv[2] ?? "out";

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

const files = await walk(outDir);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const keepRuntime = new Set<string>();
let removedScripts = 0;

for (const file of htmlFiles) {
  const $ = load(await readFile(file, "utf8"));
  if ($('meta[name="laglabs:runtime"]').attr("content") === "react") {
    keepRuntime.add(file.slice(0, -".html".length));
    continue;
  }

  $("script").each((_, element) => {
    const script = $(element);
    const keep =
      script.attr("data-keep") !== undefined ||
      script.attr("type") === "application/ld+json";
    if (!keep) {
      script.remove();
      removedScripts++;
    }
  });
  $('link[rel="modulepreload"], link[rel="preload"][as="script"]').remove();
  $("[data-keep]").removeAttr("data-keep");

  await writeFile(file, $.html());
}

// React Server Component payloads: `<route>.txt` next to `<route>.html`, and `__next.*`.
const htmlBases = new Set(
  htmlFiles
    .map((file) => file.slice(0, -".html".length))
    .filter((base) => !keepRuntime.has(base)),
);
const rscFiles = files.filter(
  (file) =>
    (/(^|\/)__next\.[^/]*$/.test(file) && keepRuntime.size === 0) ||
    (file.endsWith(".txt") && htmlBases.has(file.slice(0, -".txt".length))) ||
    (file.endsWith("/index.txt") &&
      htmlBases.has(file.slice(0, -"/index.txt".length))),
);

// Runtime JS chunks: nothing references them any more.
const html = (
  await Promise.all(htmlFiles.map((file) => readFile(file, "utf8")))
).join("\n");
const runtimeChunks = files.filter((file) => {
  const url = `/${relative(outDir, file)}`;
  return (
    url.startsWith("/_next/static/") &&
    file.endsWith(".js") &&
    !html.includes(url)
  );
});

await Promise.all([...rscFiles, ...runtimeChunks].map((file) => rm(file)));

// Drop directories left empty (e.g. out/_not-found/).
for (const dir of [
  ...new Set(files.map((file) => file.slice(0, file.lastIndexOf("/")))),
].sort((a, b) => b.length - a.length)) {
  try {
    if ((await stat(dir)).isDirectory() && (await readdir(dir)).length === 0) {
      await rm(dir, { recursive: true });
    }
  } catch {
    // already removed
  }
}

console.log(
  `strip-runtime: ${htmlFiles.length - keepRuntime.size} pages stripped (${keepRuntime.size} kept React), ${removedScripts} scripts, ${rscFiles.length} RSC payloads and ${runtimeChunks.length} runtime chunks removed`,
);
