/** Pause control for decorative motion (WCAG 2.2.2); wired up by src/islands/enhance.ts. */
export function MotionToggle() {
  return (
    <button className="motion-toggle" type="button" aria-pressed="false" hidden>
      Pause motion <span aria-hidden="true">Ⅱ</span>
    </button>
  );
}
