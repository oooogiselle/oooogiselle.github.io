// src/components/AboutMe.jsx
import { useLayoutEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import aboutMe from "../../aboutme.JPG";

export default function AboutMe() {
  const sectionRef = useRef(null);
  const [range, setRange] = useState({ start: 0, end: 0 });

  useLayoutEffect(() => {
    function calc() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const h = rect.height;
      const vh = window.innerHeight;
      const end = top + h / 2 - vh / 2;
      const start = end - vh * 0.9;
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
    <section id="about" className="about-me" ref={sectionRef}>
      <Parallax
        startScroll={range.start}
        endScroll={range.end}
        translateX={[-160, 0]}
        translateY={[20, 0]}
        scale={[0.96, 1]}
        opacity={[0, 1]}
        easing="easeOutCubic"
        shouldAlwaysCompleteAnimation
        style={{ flex: 1, minWidth: 320, display: "flex", justifyContent: "center" }}
      >
        <div className="photo">
          <img src={aboutMe} className="main-pic" alt="Giselle Wu" />
        </div>
      </Parallax>

      <Parallax
        startScroll={range.start}
        endScroll={range.end}
        translateX={[160, 0]}
        opacity={[0, 1]}
        easing="easeOutCubic"
        shouldAlwaysCompleteAnimation
        style={{ flex: 1, minWidth: 320 }}
      >
        <div className="introduction-text">
          <h1>Dartmouth College | CS Modified with Engineering</h1>
          <p>
            Hi, I'm Giselle — a junior at Dartmouth building at the intersection of
            software, hardware, and design. Currently an Engineering Intern at Siemens EDA,
            I've also done FPGA work building a VGA Tamagotchi game from scratch in VHDL,
            researched ionospheric data at Lynch Rocket Lab, and built full-stack apps
            used by real people.
          </p>
          <p>
            Outside of tech, I perform with Sheba Dance Troupe, run, travel, and spend
            time in the Makerspace and the Ceramics Studio.
            I care about building things that are functional, beautiful, and actually fun to use.
          </p>
          <Parallax
            startScroll={range.start}
            endScroll={range.end}
            translateY={[10, 0]}
            opacity={[0, 1]}
            easing="easeOutCubic"
            shouldAlwaysCompleteAnimation
          >
            <a href="#contact" className="about-btn">Say Hi</a>
          </Parallax>
        </div>
      </Parallax>
    </section>
  );
}