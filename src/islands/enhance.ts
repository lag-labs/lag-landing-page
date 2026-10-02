// Progressive enhancement for the static site: the only JavaScript shipped.
// Bundled by Bun to /enhance.js (see `islands` in package.json). Everything
// here enhances server-rendered markup; the page is complete without it.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* Mobile navigation (≤600px). The `js` class is set by an inline head script. */
function enhanceNav() {
  const button = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const nav = document.querySelector<HTMLElement>(".primary-nav");
  if (!button || !nav) return;

  const isOpen = () => button.getAttribute("aria-expanded") === "true";
  const setOpen = (open: boolean) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  button.addEventListener("click", () => setOpen(!isOpen()));
  nav.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;
    if (event.key === "Escape") {
      setOpen(false);
      button.focus();
    }
    // Keep keyboard focus inside the expanded navigation.
    if (event.key === "Tab") {
      const lastLink = nav.querySelector<HTMLElement>("a:last-child");
      if (event.shiftKey && document.activeElement === button) {
        event.preventDefault();
        lastLink?.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        button.focus();
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (isOpen() && !(event.target as Element).closest(".site-header"))
      setOpen(false);
  });
  window
    .matchMedia("(max-width: 600px)")
    .addEventListener("change", () => setOpen(false));
}

/* ARIA tabs: click, ←/→ (wrapping), Home/End; selection follows focus. */
function enhanceTabs() {
  for (const list of document.querySelectorAll<HTMLElement>(
    '[role="tablist"]',
  )) {
    const tabs = [...list.querySelectorAll<HTMLElement>('[role="tab"]')];
    const panelFor = (tab: HTMLElement) =>
      document.getElementById(tab.getAttribute("aria-controls") ?? "");

    const select = (tab: HTMLElement, { focus = false } = {}) => {
      for (const item of tabs) {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = panelFor(item);
        if (!panel) continue;
        panel.hidden = !selected;
        panel.classList.toggle("is-entering", selected);
      }
      if (focus) tab.focus();
    };

    for (const tab of tabs) {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (event) => {
        const index = tabs.indexOf(tab);
        const next = {
          ArrowRight: (index + 1) % tabs.length,
          ArrowLeft: (index - 1 + tabs.length) % tabs.length,
          Home: 0,
          End: tabs.length - 1,
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        select(tabs[next], { focus: true });
      });
    }
  }
}

/* Footer control to pause decorative motion (WCAG 2.2.2). */
function enhanceMotionToggle() {
  const button = document.querySelector<HTMLButtonElement>(".motion-toggle");
  if (!button) return;
  button.hidden = false;
  button.addEventListener("click", () => {
    const paused = document.documentElement.classList.toggle("motion-paused");
    button.setAttribute("aria-pressed", String(paused));
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = paused ? "▷" : "Ⅱ";
    button.replaceChildren(paused ? "Resume motion " : "Pause motion ", icon);
  });
}

/* Fade `.reveal` blocks in on scroll; never hides content already in view. */
function enhanceReveal() {
  if (!("IntersectionObserver" in window) || reducedMotion.matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08 },
  );

  for (const element of document.querySelectorAll(".reveal")) {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add("will-reveal");
      observer.observe(element);
    }
  }

  // Find-in-page and keyboard navigation must never land on invisible content.
  document.addEventListener("focusin", (event) => {
    (event.target as Element)
      .closest(".will-reveal")
      ?.classList.add("is-visible");
  });
}

/* Copy-to-clipboard next to the email link (secure contexts only). */
function enhanceCopyEmail() {
  const button = document.querySelector<HTMLButtonElement>(".copy-email");
  const status = document.querySelector<HTMLElement>(".copy-status");
  const email = button?.dataset.email;
  if (
    !button ||
    !status ||
    !email ||
    !navigator.clipboard ||
    !window.isSecureContext
  ) {
    return;
  }

  let timeout: number | undefined;
  button.hidden = false;
  button.addEventListener("click", async () => {
    window.clearTimeout(timeout);
    try {
      await navigator.clipboard.writeText(email);
      status.textContent = "Email copied.";
    } catch {
      status.textContent = "Please select and copy the address.";
    }
    timeout = window.setTimeout(() => {
      status.textContent = "";
    }, 4000);
  });
}

/* The footer year is rendered at build time; keep it current between deploys. */
function enhanceYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

// The menu and tabs hide content behind the `js` class. If they can't be wired
// up, drop the class so the page falls back to its no-JavaScript layout.
try {
  enhanceNav();
  enhanceTabs();
} catch {
  document.documentElement.classList.remove("js");
}

// Extras: one failing must not take the others down.
for (const enhance of [
  enhanceMotionToggle,
  enhanceReveal,
  enhanceCopyEmail,
  enhanceYear,
]) {
  try {
    enhance();
  } catch {
    // The page is complete without it.
  }
}
