// src/sections/Featured.jsx
// Featured work sits above the bio: strongest evidence inside the 60 seconds a
// reviewer actually spends. Each entry is a scannable mono metadata block plus
// a diff, with the prose in the reading face underneath for whoever commits.
import { caseStudies } from "../data/caseStudies";
import Diff from "../components/Diff";
import Reveal from "../components/Reveal";

// the first study arrives with the page's single entrance; the rest are simply
// there, because by then the reader has scrolled to them deliberately
function Frame({ animate, children }) {
  return animate ? <Reveal>{children}</Reveal> : children;
}

// One study on screen at a time, because three of them stacked is four
// screens of scrolling and the page has to fit. The paths above act as the
// pager — they are links to the same hashes the terminal's `open` sets, so
// there is no second navigation model to keep in sync.
export default function Featured({ activeId }) {
  const active = caseStudies.find((c) => c.id === activeId) || caseStudies[0];

  return (
    <section className="section featured-sec" id="work">
      <h2 className="sec-title">
        <span className="glyph" aria-hidden="true">❯</span> selected work
      </h2>

      <nav className="case-switch" aria-label="Case studies">
        {caseStudies.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className={`case-switch-item ${c.id === active.id ? "is-active" : ""}`}
            aria-current={c.id === active.id ? "true" : undefined}
          >
            {c.path}
          </a>
        ))}
      </nav>

      <div className="case-list">
        {[active].map((c, i) => (
          <Frame key={c.id} animate={i === 0}>
            <article className="case" id={c.id}>
              <header className="case-head">
                <p className="case-path">{c.path}</p>
                <h3 className="case-name">{c.name}</h3>
              </header>

              {/* Two columns on a wide screen: the record on the left, the
                  account of it on the right. Stacked, one study runs about a
                  screen and a half; side by side it fits. */}
              <div className="case-body">
                <div className="case-record">
                  {/* Metadata as terminal output — strict character grid.
                      Paired onto four rows rather than six: org/role and
                      domain/status each read as one fact. */}
                  <dl className="meta">
                    <div><dt>role</dt><dd>{c.role}, {c.org}</dd></div>
                    <div><dt>dates</dt><dd>{c.dates}</dd></div>
                    <div><dt>domain</dt><dd>{c.domain} · {c.status}</dd></div>
                    <div className="meta-wide">
                      <dt>stack</dt>
                      <dd>
                        {c.stack.map((s) => (
                          <span className="tag" key={s}>{s}</span>
                        ))}
                      </dd>
                    </div>
                    {c.link && (
                      <div>
                        <dt>live</dt>
                        <dd>
                          <a
                            className="meta-link"
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {c.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                          </a>
                        </dd>
                      </div>
                    )}
                    {c.notBuilt && (
                      <div className="meta-wide">
                        <dt>not built</dt>
                        <dd>{c.notBuilt}</dd>
                      </div>
                    )}
                  </dl>

                  <Diff path={c.path} before={c.diff.before} after={c.diff.after} />
                </div>

                <div className="prose">
                  {c.body.map((p, j) => <p key={j}>{p}</p>)}

                  {c.image && (
                    <figure className="case-figure">
                      <img
                        src={c.image}
                        alt={c.imageAlt || c.name}
                        width="840"
                        height="525"
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  )}
                </div>
              </div>
            </article>
          </Frame>
        ))}
      </div>
    </section>
  );
}
