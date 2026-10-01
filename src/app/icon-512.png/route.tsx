import { markImage } from "@/lib/brand-mark";

// Raster icon for the web manifest and structured-data logo.
export const dynamic = "force-static";

export function GET() {
  return markImage(512);
}
