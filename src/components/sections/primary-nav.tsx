import { ButtonLink } from "@/components/brand/primitives";
import { nav } from "@/lib/content";

/**
 * Inline links on desktop; a disclosure menu at ≤600px once JavaScript runs
 * (behaviour in src/islands/enhance.ts). The `js` class is added to <html> by
 * an inline head script, so without JavaScript the links simply stay visible.
 * `base` prefixes the section anchors: pass "/" on pages other than home.
 */
export function PrimaryNav({ base = "" }: { base?: string }) {
  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="primary-nav"
        aria-label="Open navigation"
      >
        <span />
        <span />
      </button>
      <nav
        className="primary-nav"
        id="primary-nav"
        aria-label="Main navigation"
      >
        {nav.map((item) => (
          <a key={item.href} href={`${base}${item.href}`}>
            {item.label}
          </a>
        ))}
        <ButtonLink variant="dark" size="small" href={`${base}#contact`}>
          Let’s talk
        </ButtonLink>
      </nav>
    </>
  );
}
