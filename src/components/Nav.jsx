// src/components/Nav.jsx
import { useEffect, useState } from "react";

export default function Nav() {
  const [theme, setTheme] = useState(() => {
    // light is the site's default look; dark is opt-in via the toggle
    return localStorage.getItem("gw-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gw-theme", theme);
  }, [theme]);

  // the terminal's `theme` command routes through here so both stay in sync
  useEffect(() => {
    const flip = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    window.addEventListener("gw-theme-toggle", flip);
    return () => window.removeEventListener("gw-theme-toggle", flip);
  }, []);

  return (
    <header className="wr-nav">
      <a className="brand" href="#top">giselle wu</a>
      {/* Every view has to be reachable without typing, so the bar carries all
          five: the terminal is additive, never the only route. `about` is gone
          — it pointed at nothing, and the bio lives on the front page, which
          the brand link already returns to. */}
      <nav>
        <a href="#work">work</a>
        <a href="#projects">archive</a>
        <a href="#skills">stack</a>
        <a href="#experience">experience</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
        <a href="#contact">contact</a>
      </nav>
      <button
        className="theme-toggle"
        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        <span className="theme-toggle-track">
          <span className="theme-toggle-thumb">
            {theme === "dark" ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="4"/>
                <line x1="12" y1="20" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="2" y1="12" x2="4" y2="12"/>
                <line x1="20" y1="12" x2="22" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </span>
        </span>
      </button>
    </header>
  );
}