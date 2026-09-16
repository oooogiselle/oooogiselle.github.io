import { useEffect, useRef, useState } from "react";
import "./index.css";
import Nav from "./components/Nav";
import Landing from "./sections/Landing";
import Featured from "./sections/Featured";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import WorkTimeline from "./components/WorkTimeline";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Terminal from "./components/Terminal";
import { caseStudies } from "./data/caseStudies";

// The page does not scroll. The landing is the whole screen, and every other
// section is a view you switch to from it — nav, cards, or the terminal.
//
// The hash is still the address: `#work`, `#projects`, `#fuse-ai`… so ordinary
// links, the browser back button, and a pasted URL all keep working, and the
// terminal navigates by setting the same hash everything else does. That is
// why there's no router here — this is the whole of it.
const SECTION_VIEWS = {
  "#work": "work",
  "#projects": "projects",
  "#skills": "skills",
  "#experience": "experience",
  "#contact": "contact",
};

function viewFor(hash) {
  const h = (hash || "").toLowerCase();
  if (SECTION_VIEWS[h]) return SECTION_VIEWS[h];
  // a case study is a place inside the work view, not a view of its own
  if (caseStudies.some((c) => `#${c.id}` === h)) return "work";
  return "top";
}

const VIEW_LABEL = {
  work: "selected work",
  projects: "archive",
  skills: "stack",
  experience: "experience",
  contact: "contact",
};

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const paneRef = useRef(null);
  const view = viewFor(hash);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Escape is the way back, the same as `cd ..` in the terminal
  useEffect(() => {
    if (view === "top") return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      // the project modal owns Escape while it is open
      if (document.querySelector(".modal")) return;
      window.location.hash = "#top";
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [view]);

  // A view opens at its top, unless the hash names a case study inside it.
  // Focus follows, so a keyboard or screen-reader user lands in the new view
  // rather than back at the top of the nav.
  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    // Every view is built to fit its pane, so a view always opens at the top —
    // a case-study hash selects which study the work view shows, it does not
    // scroll to one.
    pane.scrollTop = 0;
    // focus the pane itself, not the back link: a programmatically focused
    // link paints a focus ring on every view change. `tabIndex={-1}` keeps it
    // out of the tab order while still taking focus here.
    if (view !== "top") pane.focus({ preventScroll: true });
  }, [hash, view]);

  return (
    <>
      {/* skip link — first focusable element on the page */}
      <a href="#work" className="skip-link">Skip to content</a>
      <div className="wr">
        <Nav />

        <main
          className={`view view--${view}`}
          ref={paneRef}
          id="main"
          tabIndex={-1}
          /* one view at a time: the key remounts the pane so a section always
             opens in its resting state */
          key={view}
        >
          {view === "top" ? (
            <Landing />
          ) : (
            /* A command opens a window. Not a browser window — a popup breaks
               the back button and dies on a phone — but the same panel the
               landing is built from, so `cd work` visibly opens one. The title
               bar carries the path and the way back, which is why there is no
               separate back link above it. */
            <div className="window view-window">
              <div className="window-bar">
                <span className="window-dots" aria-hidden="true">
                  <i /><i /><i />
                </span>
                <a
                  className="window-path window-path-back"
                  href="#top"
                  aria-label={`Back to the front page from ${VIEW_LABEL[view]}`}
                >
                  <span aria-hidden="true">❮</span> ~/giselle-wu
                </a>
                <span className="window-path window-path-here">/ {VIEW_LABEL[view]}</span>
              </div>

              <div className="window-body view-window-body">
                {view === "work" && <Featured activeId={hash.slice(1).toLowerCase()} />}
                {view === "projects" && <Projects />}
                {view === "skills" && <Skills />}
                {view === "experience" && <WorkTimeline />}
                {view === "contact" && (
                  <>
                    <Contact />
                    <Footer />
                  </>
                )}

                {/* every view carries a prompt, so `cd ..` is always to hand —
                    the terminal used to exist only on the landing, which made
                    typing your way in a one-way trip */}
                <Terminal compact cwd={`~/${VIEW_LABEL[view].replace(/ /g, "-")}`} />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
