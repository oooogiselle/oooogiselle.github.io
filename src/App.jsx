import "./index.css";
import Nav from "./components/Nav";
import Landing from "./sections/Landing";
import Featured from "./sections/Featured";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import WorkTimeline from "./components/WorkTimeline";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* skip link — first focusable element on the page */}
      <a href="#work" className="skip-link">Skip to content</a>
      <div className="wr">
        <Nav />
        <Landing />
        <Featured />
        <Projects />
        <Skills />
        <WorkTimeline />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
