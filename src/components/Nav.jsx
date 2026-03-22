// src/components/Nav.jsx
import { useEffect, useState } from "react";

export default function Nav() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("gw-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("gw-theme", theme);
  }, [theme]);

  return (
    <header className="wr-nav">
      <a className="brand" href="#top">HOME</a>
      <nav>
        <a href="#projects">WORKS</a>
        <a href="#about">ABOUT</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
        <a href="#contact">CONTACT</a>
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