// src/components/Hero.jsx
import { Parallax } from "react-scroll-parallax";

export default function Hero() {
  return (
    <section id="top" className="wr-hero">
      {/* background layer (slow) */}
      <Parallax speed={-20} className="hero-bg-layer" aria-hidden>
        <div className="hero-bg-glow" />
      </Parallax>

      <div className="hero-grid">
        {/* left caption */}
        <Parallax speed={-8} opacity={[1, 0.6]}>
          <p className="side-caption left">
            A COLLECTION OF COMPUTER SCIENCE &amp; ENGINEERING PROJECTS
          </p>
        </Parallax>

        {/* center visual */}
        <Parallax speed={-14} scale={[1.02, 1]} opacity={[1, 0.9]}>
          <div className="hero-visual">
            <iframe
              src="/hero-cube.html"
              title="Hero Cube"
              style={{ width: "100%", height: "70vh", border: 0 }}
            />
          </div>
        </Parallax>

        {/* right caption */}
        <Parallax speed={-4} opacity={[1, 0.7]}>
          <p className="side-caption right">
            GISELLE WU @ DARTMOUTH COLLEGE — 2025
          </p>
        </Parallax>
      </div>

      {/* scroll hint → new page feel */}
      <a className="scroll" href="#about">SCROLL TO EXPLORE<br /><span>↓</span></a>
    </section>
  );
}
