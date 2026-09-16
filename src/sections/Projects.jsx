import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

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
      <h2 className="sec-title">
        <span className="glyph" aria-hidden="true">❯</span> archive
      </h2>

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

      <div className="projects-grid">
        {filtered.map((p) => (
          /* no entrance here: nine cards fading in one after another was the
             most generic motion on the page, and the filter re-ran it on every
             tab change */
          <div className="project-wrap" key={p.id}>
            <ProjectCard item={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
