import { Eyebrow, Headline } from "@/components/brand/primitives";
import { intro } from "@/lib/content";

export function Intro() {
  return (
    <section className="intro section-pad" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <Eyebrow index={intro.index} className="section-label">
          {intro.eyebrow}
        </Eyebrow>
        <div className="intro-content reveal">
          <h2 id="intro-title">
            <Headline
              heading={intro.heading}
              mark={(phrase) => <span className="muted-ink">{phrase}</span>}
            />
          </h2>
          <div className="intro-bottom">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
