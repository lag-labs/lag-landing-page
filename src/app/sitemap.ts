import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// lastmod = last commit that touched the page's content, so it only moves when
// the page really changes (search engines ignore lastmod that churns on every build).
function contentUpdatedAt() {
  try {
    const iso = execSync(
      "git log -1 --format=%cI -- src/lib/content.ts src/lib/site.ts src/components/sections",
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (iso) return new Date(iso);
  } catch {
    // Not a git checkout (e.g. Docker build context): fall back to build time.
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: contentUpdatedAt(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
