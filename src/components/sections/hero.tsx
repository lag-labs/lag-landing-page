import { Icon } from "@/components/brand/icon";
import {
  ButtonLink,
  Eyebrow,
  StatusDot,
  TextLink,
} from "@/components/brand/primitives";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Eyebrow spark>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title">
            More ambition. <br />
            Less{" "}
            <span className="accent-word">
              busywork
              <svg viewBox="0 0 430 18" aria-hidden="true">
                <path d="M4 12C100 0 271 0 426 10" />
              </svg>
            </span>
            .
          </h1>
          <p className="hero-description">
            {hero.description.before}
            <strong>{hero.description.strong}</strong>
            {hero.description.after}
          </p>
          <div className="hero-actions">
            <ButtonLink href="#contact">{hero.primaryCta}</ButtonLink>
            <TextLink href="#possibilities">
              {hero.secondaryCta} <span aria-hidden="true">↓</span>
            </TextLink>
          </div>
          <p className="hero-note">
            <StatusDot /> {hero.note}
          </p>
        </div>

        <WorkforceVisual />
      </div>
      <div className="wrap hero-bottom">
        <span>
          Built around <strong>your business.</strong>
        </span>
        {hero.bottom.map((item) => (
          <span key={item}>
            <Icon name="check" /> {item}
          </span>
        ))}
        <span className="managed-label">
          Managed by laglabs <Icon name="spark" />
        </span>
      </div>
    </section>
  );
}

/** Illustrative workflow: knowledge + tools → AI employee → results + human. */
function WorkforceVisual() {
  return (
    <div className="workforce-visual" aria-label={hero.visualLabel} role="img">
      <div className="visual-grid" aria-hidden="true" />
      <div className="visual-topline" aria-hidden="true">
        <span>HUMAN + AI. BETTER TOGETHER.</span>
        <span className="crosshair">+</span>
      </div>
      <svg
        className="connection-lines"
        viewBox="0 0 560 500"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="connection"
          d="M125 154H185Q215 154 215 188V214Q215 246 250 246H280"
        />
        <path
          className="connection"
          d="M425 105V149Q425 177 393 177H350Q322 177 322 210V246H280"
        />
        <path
          className="connection"
          d="M110 332H181Q215 332 215 298V280Q215 246 250 246H280"
        />
        <path
          className="connection connection-accent"
          d="M280 246H370Q403 246 403 279V316H445"
        />
        <path className="connection" d="M280 246V364Q280 400 242 400H185" />
        <circle className="flow-dot flow-dot-one" r="4" />
        <circle className="flow-dot flow-dot-two" r="4" />
        <circle cx="185" cy="400" r="4" fill="#a3aeb2" />
      </svg>
      <div className="visual-node request-node" aria-hidden="true">
        <span className="node-icon tile-blue">
          <Icon name="mail" />
        </span>
        <div>
          <span className="micro-label">INCOMING</span>
          <strong>A new opportunity</strong>
        </div>
      </div>
      <div className="visual-node context-node" aria-hidden="true">
        <span className="node-icon tile-sage">
          <Icon name="file" />
        </span>
        <div>
          <strong>Your knowledge.</strong>
          <span>Your way of working.</span>
        </div>
      </div>
      <div className="visual-node tools-node" aria-hidden="true">
        <span className="node-icon tile-lavender">
          <Icon name="grid" />
        </span>
        <div>
          <strong>Your tools</strong>
          <span>Already connected.</span>
        </div>
      </div>
      <div className="ai-core" aria-hidden="true">
        <div className="core-ring ring-one" />
        <div className="core-ring ring-two" />
        <div className="core-face">
          <svg className="core-mark" aria-hidden="true">
            <use href="#i-mark" />
          </svg>
          <span>AI, on your team.</span>
        </div>
      </div>
      <div className="visual-node result-node" aria-hidden="true">
        <div className="result-heading">
          <span className="status-dot" /> Moving work forward
        </div>
        {["Request qualified", "CRM updated", "Follow-up prepared"].map(
          (row, i) => (
            <div key={row} className="result-row">
              <Icon name="check" /> {row} <span>0{i + 1}</span>
            </div>
          ),
        )}
      </div>
      <div className="human-node" aria-hidden="true">
        <span className="human-avatar">
          <Icon name="person" />
        </span>
        <div>
          Human judgment.<strong>Always in the loop.</strong>
        </div>
      </div>
      <div className="visual-caption" aria-hidden="true">
        <span className="crosshair">+</span>
        <span>ILLUSTRATIVE WORKFLOW · REAL POSSIBILITIES</span>
      </div>
    </div>
  );
}
