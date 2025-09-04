// src/sections/Skills.jsx
import { useLayoutEffect, useRef, useState } from "react";
import { skills } from "../data/skillData";
import SkillCard from "../components/SkillCard";
import { Parallax } from "react-scroll-parallax";

export default function Skills() {
  const secRef = useRef(null);
  const [range, setRange] = useState({ start: 0, end: 0 });

  // Compute the scroll window; end is BEFORE center so it "locks" early
  useLayoutEffect(() => {
    function calc() {
      const el = secRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const h = el.offsetHeight;
      const vh = window.innerHeight;

      const ahead = 0.18;                  // 18% of viewport before center
      const end = top + h / 2 - vh / 2 - vh * ahead;
      const start = end - vh * 0.9;        // begin ~0.9 viewport earlier
      setRange({ start, end });
    }
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
    };
  }, []);

  return (
    <section id="skills" className="skills-sec" ref={secRef}>
      {/* floating accent background */}
      <Parallax
        startScroll={range.start}
        endScroll={range.end}
        translateY={[-30, 0]}
        opacity={[0.25, 0.5]}
        className="skills-bg-layer"
        shouldAlwaysCompleteAnimation
      >
        <div className="skills-blob" />
      </Parallax>

      {/* title */}
      <Parallax
        startScroll={range.start}
        endScroll={range.end}
        translateY={[-16, 0]}
        opacity={[0.9, 1]}
        easing="easeOutCubic"
        shouldAlwaysCompleteAnimation
      >
        <div className="skills-title">
          <h1>SKILLS</h1>
        </div>
      </Parallax>

      {/* cards */}
      <div className="skills-grid">
        {skills.map((group, i) => (
          <Parallax
            key={group.id}
            startScroll={range.start}
            endScroll={range.end}
            translateY={[22, 0]}
            translateX={i % 2 ? [26, 0] : [-26, 0]}
            scale={[0.97, 1]}
            opacity={[0.85, 1]}
            easing="easeOutCubic"
            shouldAlwaysCompleteAnimation
            style={{ height: "100%" }}
          >
            <SkillCard item={group} />
          </Parallax>
        ))}
      </div>
    </section>
  );
}
