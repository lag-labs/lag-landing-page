import { markImage, pngToIco } from "@/lib/brand-mark";

// Crawlers and older browsers request /favicon.ico regardless of <link> tags.
export const dynamic = "force-static";

export async function GET() {
  const png = await markImage(48).arrayBuffer();
  return new Response(await pngToIco(png, 48), {
    headers: { "Content-Type": "image/x-icon" },
  });
}
