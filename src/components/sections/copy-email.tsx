import { Icon } from "@/components/brand/icon";
import { site } from "@/lib/site";

/** Copy-to-clipboard; revealed by src/islands/enhance.ts where the Clipboard API works. */
export function CopyEmail() {
  return (
    <>
      <button
        className="copy-email"
        type="button"
        aria-label="Copy email address"
        data-email={site.email}
        hidden
      >
        <Icon name="copy" />
      </button>
      <span className="copy-status" role="status" />
    </>
  );
}
