// src/components/AboutMe.jsx
import { useLayoutEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import aboutMe from "../../aboutme.JPG";

export default function AboutMe() {
  const sectionRef = useRef(null);
  const [range, setRange] = useState({ start: 0, end: 0 });

  // compute the scroll position where the section center = viewport center
  useLayoutEffect(() => {
    function calc() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const h = rect.height;
      const vh = window.innerHeight;

      const end = top + h / 2 - vh / 2;   // settle point
      const start = end - vh * 0.9;       // begin ~0.9 viewport earlier
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
      {/* Photo: fly in from left, settle at center */}
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

      {/* Text: fly in from right, settle at center */}
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
            Hi! I'm Giselle, a junior at Dartmouth College. I’m passionate about the
            intersection of software, hardware, and design, and I focus on crafting tech
            that’s functional, beautiful, and user-friendly. My project interests include
            game and social media design. Outside of working, you can find me dancing
            with Sheba Dance Troupe, running, or making clothes and teddy bears in the
            Makerspace.
          </p>

          {/* CTA: lift from bottom */}
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
