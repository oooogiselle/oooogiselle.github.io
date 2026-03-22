// src/components/Hero.jsx
import { useEffect, useRef } from "react";

export default function Hero() {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    el.style.width = "0";
    requestAnimationFrame(() => {
      el.style.transition = "width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s";
      el.style.width = "100%";
    });
  }, []);

  return (
    <section id="top" className="wr-hero">
      <div className="hero-type">
        <p className="hero-eyebrow">Portfolio — 2026</p>

        <h1 className="hero-name">
          <span className="hero-name-line" style={{ "--delay": "0s" }}>GISELLE</span>
          <span className="hero-name-line" style={{ "--delay": "0.1s" }}>WU</span>
        </h1>

        <div className="hero-rule-wrap">
          <div className="hero-rule" ref={lineRef} />
        </div>

        <div className="hero-descriptors">
          <span style={{ "--delay": "0.55s" }}>Software</span>
          <span className="hero-dot" style={{ "--delay": "0.65s" }}>·</span>
          <span style={{ "--delay": "0.72s" }}>Hardware</span>
          <span className="hero-dot" style={{ "--delay": "0.82s" }}>·</span>
          <span style={{ "--delay": "0.89s" }}>Design</span>
        </div>

        <div className="hero-footer-row">
          <p className="hero-school" style={{ "--delay": "1s" }}>Dartmouth College</p>
          <a className="hero-scroll" href="#about" style={{ "--delay": "1.1s" }}>Scroll ↓</a>
        </div>
      </div>
    </section>
  );
}