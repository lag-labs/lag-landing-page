import { markImage } from "@/lib/brand-mark";

// iOS home-screen icon (iOS ignores SVG icons and applies its own rounding).
export const dynamic = "force-static";

export function GET() {
  return markImage(180, { rounded: false });
}
