// src/sections/Landing.jsx
// Left column: a framed window holding the bio and a working terminal, with the
// four jump cards sitting outside it. Right column: one photo.
//
// The terminal is optional by construction — every destination it reaches is
// also one click away on a card, so a reviewer who won't type loses nothing.
import { GitHubIcon, LinkedInIcon, EmailIcon } from "../components/icons";
import Terminal from "../components/Terminal";
import { caseStudies } from "../data/caseStudies";
import { projects } from "../data/projects";
import { ITEMS as experience } from "../data/experience";

// Counts come from the data so they can't drift out of date.
const CARDS = [
  ["#work", "Selected work", `${caseStudies.length} case studies`],
  ["#projects", "Archive", `${projects.length} older projects`],
  ["#experience", "Experience", `${experience.length} roles since 2023`],
  ["#contact", "Contact", "get in touch"],
];

export default function Landing() {
  return (
    <section className="landing" id="top">
      <div className="landing-col">
        <div className="window">
          <div className="window-bar">
            <span className="window-dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span className="window-path">~/giselle-wu</span>
          </div>

          <div className="window-body">
            <div className="window-intro">
            <h1 className="hero-lede">
              <span>Engineer. Creator.</span>
              <strong>Lifelong Learner.</strong>
            </h1>

            <div className="prose landing-prose">
              <p>
                Hi there! I'm Giselle Wu, a fourth-year at Dartmouth studying computer
                science and engineering, graduating in June 2027.
              </p>
              <p>
                I'm drawn to the space where technology meets people, figuring out what
                someone actually needs, then building it. I've chased that through
                internships and personal projects. I'm currently a developer at DALI
                Lab, and I spent this past summer interning at Visa, after a term at
                Siemens EDA.
              </p>
            </div>

            </div>

            <Terminal />
          </div>
        </div>

        <p className="or-click">or just click a button</p>

        <nav className="nav-cards" aria-label="Jump to section">
          {CARDS.map(([href, title, desc]) => (
            <a className="nav-card" href={href} key={href}>
              <span className="nav-card-title">{title}</span>
              <span className="nav-card-desc">{desc}</span>
            </a>
          ))}
        </nav>

        <div className="landing-links">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
          <span className="landing-links-icons">
            <a href="https://github.com/oooogiselle" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon size="small" />
            </a>
            <a href="https://www.linkedin.com/in/giselle-wu-47363b242/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size="small" />
            </a>
            <a href="mailto:giselle.siqi.wu@gmail.com" aria-label="Email">
              <EmailIcon size="small" />
            </a>
          </span>
        </div>
      </div>

      <figure className="landing-photo">
        <img src="/aboutme.webp" alt="Giselle Wu" width="840" height="560" decoding="async" />
        {/* the one blinking cursor on the site */}
        <figcaption>
          hi, i'm giselle<span className="caret" aria-hidden="true">_</span>
        </figcaption>
      </figure>
    </section>
  );
}
