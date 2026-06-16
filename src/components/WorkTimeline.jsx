// src/components/WorkTimeline.jsx
import { useMemo } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

export default function ExperienceTimeline() {
  const items = useMemo(() => ([
    { id:1, range:"Jun 2026 - Present",   company:"Visa",              role:"SWE Intern", location:"Foster City, CA",
      bullets:["Building on the campaign solutions team"] },
    { id:2, range:"Mar 2026 – Present",   company:"DALI Lab",          role:"Fullstack Developer", location:"Hanover, NH",
      bullets:["Building ZebraMD, a client-facing full-stack app with React and Node","Working in cross-functional design + engineering teams"] },
    { id:3, range:"Jan 2026 – Present",   company:"Siemens EDA",       role:"Engineering Intern", location:"Santa Clara, CA",
      bullets:["EDA tooling and engineering workflows for electronic design automation"] },
    { id:4, range:"May 2025 – Present",   company:"Harold Edward Cable Makerspace", role:"Trainee", location:"Hanover, NH",
      bullets:["CAD, 3D printing, and laser cutting for mechanical fabrication projects"] },
    { id:5, range:"Jan 2024 – Jan 2025",  company:"Lynch Rocket Lab",   role:"Data Analytics Intern", location:"Hanover, NH",
      bullets:["Processed ionospheric data from the Swarm-Over-Poker satellite campaign","Built a MATLAB pipeline for 3D regridding and visualization of auroral structures"] },
    { id:6, range:"Jun 2024 – Aug 2024",  company:"INTSIG",             role:"Returning Data Analytics Intern", location:"Shanghai, China",
      bullets:["Expanded prior analytics work; data reporting and pipeline improvements"] },
    { id:7, range:"Jun 2023 – Aug 2023",  company:"INTSIG",             role:"Data Analytics Intern", location:"Shanghai, China",
      bullets:["Data analysis and reporting using Python and SQL"] },
  ]), []);

  return (
    <section className="timeline-sec" id="experience">
      <Parallax translateY={[-20, 10]} opacity={[0.85, 1]} easing="easeOutCubic">
        <h2 className="timeline-title">Timeline of Experience</h2>
      </Parallax>

      <div className="timeline">
        {items.map((it, i) => (
          <motion.article
            key={it.id}
            className={`tl-item ${i % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.04 }}
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
          </motion.article>
        ))}
      </div>
    </section>
  );
}
