import { EmailIcon, GitHubIcon, LinkedInIcon } from "../components/icons";

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <h3 className="contact-title">Get in touch</h3>
        <p className="contact-subtitle">
          Looking for new grad roles where the problem arrives badly defined — forward deployed engineering, applied AI, early product.
        </p>
        <a href="mailto:giselle.siqi.wu@gmail.com" className="contact-email">
          giselle.siqi.wu@gmail.com
        </a>
        <div className="contact-info">
          <a
            href="mailto:giselle.siqi.wu@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <EmailIcon size="large" />
          </a>
          <a
            href="https://www.linkedin.com/in/giselle-wu-47363b242/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size="large" />
          </a>
          <a
            href="https://github.com/oooogiselle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon size="large" />
          </a>
        </div>
      </div>
    </section>
  );
}
