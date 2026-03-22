import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
  return (
    <footer className="wr-footer">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Giselle Wu</span>
        <div className="footer-links">
          <a href="mailto:giselle.siqi.wu@gmail.com" aria-label="Email">
            <EmailIcon fontSize="small" />
          </a>
          <a href="https://www.linkedin.com/in/giselle-wu-47363b242/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon fontSize="small" />
          </a>
          <a href="https://github.com/oooogiselle" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon fontSize="small" />
          </a>
        </div>
      </div>
    </footer>
  );
}