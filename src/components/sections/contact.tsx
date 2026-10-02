import { Icon } from "@/components/brand/icon";
import { Eyebrow, Headline, Lines } from "@/components/brand/primitives";
import { contact } from "@/lib/content";
import { mailto, site } from "@/lib/site";
import { CopyEmail } from "./copy-email";

// Direct email is the conversion path: no form backend, nothing simulated.
export function Contact() {
  const href = mailto(contact.subject);
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <div className="contact-top">
          <Eyebrow spark>{contact.eyebrow}</Eyebrow>
          <span className="contact-note">{contact.note}</span>
        </div>
        <div className="contact-main">
          <h2 id="contact-title">
            <Headline heading={contact.heading} />
          </h2>
          <a
            className="contact-arrow"
            href={href}
            aria-label={contact.arrowLabel}
          >
            <Icon name="diagonal" />
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            <Lines lines={contact.body} />
          </p>
          <div className="contact-email">
            <a href={href}>{site.email}</a>
            <CopyEmail />
          </div>
        </div>
      </div>
    </section>
  );
}
