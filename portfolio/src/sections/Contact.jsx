import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <h3 className="contact-title">Get in touch</h3>
        <p className="contact-subtitle">
          I’d love to connect! Feel free to reach out by email, or find me on LinkedIn and GitHub.
        </p>
        <div className="contact-info">
          <a
            href="mailto:giselle.siqi.wu@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <EmailIcon fontSize="large" />
          </a>
          <a
            href="https://www.linkedin.com/in/giselle-wu-47363b242/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="large" />
          </a>
          <a
            href="https://github.com/oooogiselle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon fontSize="large" />
          </a>
        </div>
      </div>
    </section>
  );
}
