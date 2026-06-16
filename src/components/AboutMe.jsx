// src/components/AboutMe.jsx
import { useLayoutEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
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
          <p className="about-eyebrow">Dartmouth College · CS minor in Engineering</p>
          <h2 className="about-greeting">Hi, I'm Giselle.</h2>
          <p>
            I'm an undergrad at Dartmouth studying Computer Science and Computer
            Engineering. I'm drawn to the space where deep engineering meets real
            design — building things that work under the hood <em>and</em> feel good
            to use, instead of trading one for the other.
          </p>
          <p>
            You can see it in my <a href="#projects">projects</a>: a clinical AI
            chatbot that pulls live patient data into context to make rare-disease
            information actually navigable; a course-registration marketplace modeled
            like a stock exchange, down to the price charts and bid/ask feed; a
            Tamagotchi game I built straight onto an FPGA in VHDL. The throughline is
            taking a hard technical problem and making something people can actually
            use on top of it.
          </p>
          <p>
            Right now I'm focused on applied AI, full-stack product work, and getting
            sharper at frontend craft and UI/UX. I'm currently a SWE intern at Visa
            and a full-stack developer at DALI Lab.
          </p>
          <p>
            When I'm not building, you'll find me performing with Sheba Dance Troupe,
            training for a half marathon, or in the ceramics studio. Ask me about
            dance, running, ceramics, or where to travel next :)
          </p>
          <Parallax
            startScroll={range.start}
            endScroll={range.end}
            translateY={[10, 0]}
            opacity={[0, 1]}
            easing="easeOutCubic"
            shouldAlwaysCompleteAnimation
          >
            <div className="about-cta-row">
              <a href="#contact" className="about-btn">Say Hi</a>
              <a href="#projects" className="about-btn">See Projects</a>
              <a
                href="https://github.com/oooogiselle"
                target="_blank"
                rel="noopener noreferrer"
                className="about-icon-btn"
                aria-label="GitHub"
              >
                <GitHubIcon fontSize="small" />
              </a>
              <a
                href="https://www.linkedin.com/in/giselle-wu-47363b242/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-icon-btn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="small" />
              </a>
            </div>
          </Parallax>
        </div>
      </Parallax>
    </section>
  );
}