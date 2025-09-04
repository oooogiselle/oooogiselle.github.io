import { useMemo, useState, useLayoutEffect, useRef } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

const TABS = ["All", "Software", "Hardware", "Research"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const sectionRef = useRef(null);
  const [range, setRange] = useState({ start: 0, end: 0 });

  // settle a bit BEFORE center
  useLayoutEffect(() => {
    const calc = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const h = rect.height;
      const vh = window.innerHeight;

      const settleOffset = 80;                 // px before center
      const end = top + h / 2 - vh / 2 - settleOffset;
      const start = Math.max(0, end - vh * 0.9); // start ~0.9 viewport earlier
      setRange({ start, end });
    };
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter(
      (p) => (p.category || "").toLowerCase() === active.toLowerCase()
    );
  }, [active]);

  return (
    <section className="section projects-sec" id="projects" ref={sectionRef}>
      <Parallax translateY={[-20, 10]} opacity={[0.85, 1]} easing="easeOutCubic">
        <h1 className="projects-heading">Projects</h1>
      </Parallax>

      <Parallax translateY={[-10, 6]} opacity={[0.9, 1]} easing="easeOutCubic">
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
      </Parallax>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <Parallax
            key={p.id}
            startScroll={range.start}
            endScroll={range.end}
            translateY={[40, 0]}                        // stop at 0 (locks)
            translateX={i % 2 ? [40, 0] : [-40, 0]}     // alternate sides
            scale={[0.98, 1]}
            opacity={[0.85, 1]}
            easing="easeOutCubic"
            style={{ height: "100%" }}
          >
            <motion.div
              className="project-wrap"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
            >
              <ProjectCard item={p} />
            </motion.div>
          </Parallax>
        ))}
      </div>
    </section>
  );
}
