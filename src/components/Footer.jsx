import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="wr-footer">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Giselle Wu</span>
        <div className="footer-links">
          <a href="mailto:giselle.siqi.wu@gmail.com" aria-label="Email">
            <EmailIcon size="small" />
          </a>
          <a href="https://www.linkedin.com/in/giselle-wu-47363b242/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size="small" />
          </a>
          <a href="https://github.com/oooogiselle" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon size="small" />
          </a>
        </div>
      </div>
    </footer>
  );
}