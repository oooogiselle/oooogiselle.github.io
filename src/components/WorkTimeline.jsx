// src/components/ExperienceTimeline.jsx
import { useMemo, useRef, useState, useLayoutEffect } from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

export default function ExperienceTimeline() {
  const items = useMemo(() => ([
    { id:1, range:"May 2025 – Present", company:"Harold Edward Cable Makerspace", role:"Trainee", location:"Hanover, NH" },
    { id:2, range:"May 2025 – Present", company:"Jacobson Lab", role:"URAD Intern", location:"Hanover, NH" },
    { id:3, range:"Jan 2024 – Jan 2025", company:"Lynch Rocket Lab", role:"Data Analytics Intern", location:"Hanover, NH" },
    { id:4, range:"Jun 2024 – Aug 2024", company:"INTSIG", role:"Returning Data Analytics Intern", location:"Shanghai, China" },
    { id:5, range:"Jun 2023 – Aug 2023", company:"INTSIG", role:"Data Analytics Intern", location:"Shanghai, China" },
  ]), []);

  const secRef = useRef(null);
  const [range, setRange] = useState({ start: 0, end: 0 });

  // compute a window where items "slide to a stop" just before center
  useLayoutEffect(() => {
    const calc = () => {
      const el = secRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const h = r.height;
      const vh = window.innerHeight;
      const settleOffset = 80; // lock a bit before the center
      const end = top + h / 2 - vh / 2 - settleOffset;
      const start = Math.max(0, end - vh * 0.9);
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

  return (
    <section className="timeline-sec" id="experience" ref={secRef}>
      <Parallax translateY={[-20, 10]} opacity={[0.85, 1]} easing="easeOutCubic">
        <h2 className="timeline-title">Timeline of Experience</h2>
      </Parallax>

      <div className="timeline">
        {items.map((it, i) => (
          <Parallax
            key={it.id}
            startScroll={range.start}
            endScroll={range.end}
            translateY={[30, 0]}                        // soft parallax up → lock
            translateX={i % 2 ? [48, 0] : [-48, 0]}     // alternate sides
            scale={[0.98, 1]}
            opacity={[0.85, 1]}
            easing="easeOutCubic"
            style={{ height: "100%" }}
          >
            <motion.article
              className={`tl-item ${i % 2 === 0 ? "left" : "right"}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.05 }}
            >
              <span className="tl-dot" aria-hidden />
              <div className="tl-card">
                <p className="tl-range">{it.range}</p>
                <a className="tl-company" href="#" onClick={(e)=>e.preventDefault()}>{it.company}</a>
                <p className="tl-location"><em>{it.location}</em></p>
                <p className="tl-role">{it.role}</p>
              </div>
            </motion.article>
          </Parallax>
        ))}
      </div>
    </section>
  );
}
