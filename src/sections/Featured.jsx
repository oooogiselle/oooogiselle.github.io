// src/sections/Featured.jsx
// Featured work sits above the bio: strongest evidence inside the 60 seconds a
// reviewer actually spends. Each entry is a scannable mono metadata block plus
// a diff, with the prose in the reading face underneath for whoever commits.
import { caseStudies } from "../data/caseStudies";
import Diff from "../components/Diff";
import Reveal from "../components/Reveal";

export default function Featured() {
  return (
    <section className="section featured-sec" id="work">
      <Reveal>
        <h2 className="sec-title">
          <span className="glyph" aria-hidden="true">❯</span> selected work
        </h2>
      </Reveal>

      <div className="case-list">
        {caseStudies.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i, 3) * 0.06}>
            <article className="case" id={c.id}>
              <header className="case-head">
                <p className="case-path">{c.path}</p>
                <h3 className="case-name">{c.name}</h3>
              </header>

              {/* metadata as terminal output — strict two-column character grid */}
              <dl className="meta">
                <div><dt>org</dt><dd>{c.org}</dd></div>
                <div><dt>role</dt><dd>{c.role}</dd></div>
                <div><dt>dates</dt><dd>{c.dates}</dd></div>
                <div><dt>domain</dt><dd>{c.domain}</dd></div>
                <div><dt>status</dt><dd>{c.status}</dd></div>
                <div className="meta-wide">
                  <dt>stack</dt>
                  <dd>
                    {c.stack.map((s) => (
                      <span className="tag" key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
                {c.notBuilt && (
                  <div className="meta-wide">
                    <dt>not built</dt>
                    <dd>{c.notBuilt}</dd>
                  </div>
                )}
              </dl>

              <Diff path={c.path} before={c.diff.before} after={c.diff.after} />

              <div className="prose">
                {c.body.map((p, j) => <p key={j}>{p}</p>)}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
