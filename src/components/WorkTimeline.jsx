// src/components/WorkTimeline.jsx
import Reveal from "./Reveal";
import { ITEMS } from "../data/experience";

export default function ExperienceTimeline() {
  return (
    <section className="timeline-sec" id="experience">
      <Reveal>
        <h2 className="sec-title">
          <span className="glyph" aria-hidden="true">❯</span> experience
        </h2>
      </Reveal>

      <div className="timeline">
        {ITEMS.map((it, i) => (
          <Reveal
            key={it.id}
            as="article"
            className={`tl-item ${i % 2 === 0 ? "left" : "right"}`}
            delay={Math.min(i, 4) * 0.04}
          >
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-card">
              <p className="tl-range">{it.range}</p>
              <span className="tl-company">{it.company}</span>
              <p className="tl-location"><em>{it.location}</em></p>
              <p className="tl-role">{it.role}</p>
              {it.bullets?.length > 0 && (
                <ul className="tl-bullets">
                  {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
