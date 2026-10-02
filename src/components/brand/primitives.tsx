import { type ComponentProps, Fragment, type ReactNode } from "react";
import type { Heading } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

/** Lowercase wordmark with the brand square. Pass `href="/"` on pages other than home. */
export function Wordmark({
  className,
  href = "#top",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <a
      className={cn("wordmark", className)}
      href={href}
      aria-label={`${site.name} home`}
    >
      {site.name}
      <span className="brand-dot" aria-hidden="true" />
    </a>
  );
}

/** Mono, uppercase label above headings. `index` renders "01 /" in brand colour. */
export function Eyebrow({
  index,
  spark,
  className,
  children,
}: {
  index?: string;
  spark?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("eyebrow", className)}>
      {spark ? (
        <span className="tiny-spark" aria-hidden="true">
          ✳
        </span>
      ) : null}
      {index ? <span className="section-index">{index}</span> : null} {children}
    </p>
  );
}

/** Joins lines with <br>, keeping a real space so text extraction reads naturally. */
// No wrapper element: section CSS styles every <span> inside some headings.
export function Lines({ lines }: { lines: readonly ReactNode[] }) {
  return lines.map((line, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered copy
    <Fragment key={i}>
      {i > 0 ? (
        <>
          {" "}
          <br />
        </>
      ) : null}
      {line}
    </Fragment>
  ));
}

/**
 * Headline from content, joined like <Lines>. `accent` (a phrase inside one
 * line) is handed to `mark` so each section can style it its own way.
 */
export function Headline({
  heading,
  mark = (phrase) => <span>{phrase}</span>,
}: {
  heading: Heading;
  mark?: (phrase: string) => ReactNode;
}) {
  const { lines, accent } = heading;
  return (
    <Lines
      lines={lines.map((line) => {
        if (!accent || !line.includes(accent)) return line;
        const [before, after] = line.split(accent);
        return (
          <>
            {before}
            {mark(accent)}
            {after}
          </>
        );
      })}
    />
  );
}

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "brand" | "dark";
  size?: "default" | "small";
  icon?: boolean;
};

/** Primary call-to-action. Possibility blue for the main action, dark for navigation. */
export function ButtonLink({
  variant = "brand",
  size = "default",
  icon = true,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "button",
        variant === "brand" ? "button-primary" : "button-dark",
        size === "small" && "button-small",
        className,
      )}
      {...props}
    >
      {children} {icon ? <Icon name="diagonal" /> : null}
    </a>
  );
}

/** Small bold link with a trailing icon or glyph. */
export function TextLink({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a className={cn("text-link", className)} {...props}>
      {children}
    </a>
  );
}

export function StatusDot() {
  return <span className="status-dot" aria-hidden="true" />;
}
