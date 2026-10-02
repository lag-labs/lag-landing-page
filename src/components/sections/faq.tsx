import { Icon } from "@/components/brand/icon";
import { Eyebrow, Headline, TextLink } from "@/components/brand/primitives";
import { faq } from "@/lib/content";
import { mailto } from "@/lib/site";

// Native <details>: answers are in the HTML and open without JavaScript,
// which keeps them indexable and quotable (mirrored in the FAQPage JSON-LD).
export function Faq() {
  return (
    <section className="faq section-pad" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="reveal">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title">
            <Headline heading={faq.heading} />
          </h2>
          <TextLink href={mailto()}>
            {faq.cta} <Icon name="diagonal" />
          </TextLink>
        </div>
        <div className="faq-list">
          {faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
