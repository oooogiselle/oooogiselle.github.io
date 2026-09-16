// src/components/WorkTimeline.jsx
import { ITEMS } from "../data/experience";

export default function ExperienceTimeline() {
  return (
    <section className="timeline-sec" id="experience">
      <h2 className="sec-title">
        <span className="glyph" aria-hidden="true">❯</span> experience
      </h2>

      <div className="timeline">
        {ITEMS.map((it, i) => (
          <article key={it.id} className={`tl-item ${i % 2 === 0 ? "left" : "right"}`}>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-card">
              <p className="tl-range">{it.range}</p>
              {/* company, role and place on one line: three stacked lines per
                  role is 48px each, and seven of those do not fit a screen */}
              <p className="tl-who">
                <span className="tl-company">{it.company}</span>
                <span className="tl-role">{it.role}</span>
                <span className="tl-location">{it.location}</span>
              </p>
              {it.bullets?.length > 0 && (
                <ul className="tl-bullets">
                  {it.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
