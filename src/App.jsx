import "./index.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Footer from "./components/Footer";
import WorkTimeline from "./components/WorkTimeline";
import Contact from "./sections/Contact";
import AboutMe from "./components/AboutMe";
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App() {
  return (
    <ParallaxProvider>
      <>
        {/* skip link — first focusable element on the page */}
        <a href="#about" className="skip-link">Skip to content</a>
        <div className="wr">
          <Nav />
          <Hero />
          <AboutMe />
          <Projects />
          <Skills />
          <WorkTimeline />
          <Contact />
          <Footer />
        </div>
      </>
    </ParallaxProvider>
  );
}