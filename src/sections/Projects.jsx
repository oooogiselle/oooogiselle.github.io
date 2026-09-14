import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";

const TABS = ["All", "Software", "Hardware", "Research"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter(
      (p) => (p.category || "").toLowerCase() === active.toLowerCase()
    );
  }, [active]);

  return (
    <section className="section projects-sec" id="projects">
      <Reveal>
        <h2 className="sec-title">
          <span className="glyph" aria-hidden="true">❯</span> archive
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="projects-tabs" role="tablist" aria-label="Project filters">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={active === tab}
              className={`projects-pill ${active === tab ? "is-active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <Reveal
            key={p.id}
            /* cap the stagger so a full 9-card grid never trails badly */
            delay={Math.min(i, 5) * 0.05}
            amount={0.15}
            style={{ height: "100%" }}
          >
            {/* .project-wrap stays on its own node: it owns the :hover lift,
                and framer writes an inline transform that would outrank it */}
            <div className="project-wrap">
              <ProjectCard item={p} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
