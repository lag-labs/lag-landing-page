import { cn } from "@/lib/utils";

/**
 * laglabs line icons: 24×24, 1.6 stroke, round caps/joins, no fill.
 * Rendered once as an SVG sprite (<IconSprite />, in the root layout) and
 * referenced with <Icon name="…" />. To add an icon, draw it on the same
 * 24-unit grid and add a <symbol> below.
 */
export type IconName =
  | "arrow"
  | "diagonal"
  | "check"
  | "mail"
  | "spark"
  | "grid"
  | "person"
  | "shield"
  | "sliders"
  | "loop"
  | "chat"
  | "file"
  | "copy"
  | "mark";

export function IconSprite() {
  return (
    <svg
      className="icon-library"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </symbol>
      <symbol id="i-diagonal" viewBox="0 0 24 24">
        <path d="M6 18 18 6M6 6h12v12" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="m5 12 4 4L19 6" />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </symbol>
      <symbol id="i-spark" viewBox="0 0 24 24">
        <path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z" />
      </symbol>
      <symbol id="i-grid" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </symbol>
      <symbol id="i-person" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
      </symbol>
      <symbol id="i-shield" viewBox="0 0 24 24">
        <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </symbol>
      <symbol id="i-sliders" viewBox="0 0 24 24">
        <path d="M4 7h5m5 0h6M4 17h10m5 0h1" />
        <circle cx="11.5" cy="7" r="2.5" />
        <circle cx="16.5" cy="17" r="2.5" />
      </symbol>
      <symbol id="i-loop" viewBox="0 0 24 24">
        <path d="M20 7a9 9 0 0 0-15-1L3 8m0-5v5h5M4 17a9 9 0 0 0 15 1l2-2m0 5v-5h-5" />
      </symbol>
      <symbol id="i-chat" viewBox="0 0 24 24">
        <path d="M21 11a8 8 0 0 1-8 8H7l-4 3V11a9 9 0 0 1 18 0Z" />
        <path d="M7 10h10M7 14h6" />
      </symbol>
      <symbol id="i-file" viewBox="0 0 24 24">
        <path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h6" />
      </symbol>
      <symbol id="i-copy" viewBox="0 0 24 24">
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </symbol>
      <symbol id="i-mark" viewBox="0 0 64 64">
        <path
          d="M27 3h10v19l13.4-13.4 7 7L44 29h19v10H44l13.4 13.4-7 7L37 46v18H27V46L13.6 59.4l-7-7L20 39H1V29h19L6.6 15.6l7-7L27 22Z"
          fill="currentColor"
          stroke="none"
        />
      </symbol>
    </svg>
  );
}

type IconProps = {
  name: IconName;
  className?: string;
};

/** Icons are always decorative: put the accessible name on the parent control. */
export function Icon({ name, className }: IconProps) {
  return (
    <svg className={cn("icon", className)} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
