export default function Nav() {
  return (
    <header className="wr-nav">
      <a className="brand" href="#top">HOME</a>
      <nav>
        <a href="#projects">WORKS</a>
        <a href="#about">ABOUT</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a>
        <a href="#contact">CONTACT</a>
      </nav>
    </header>
  );
}
