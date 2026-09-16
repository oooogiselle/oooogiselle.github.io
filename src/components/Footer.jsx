// Only ever rendered under Contact, which carries the same three links
// directly above it — so this is the copyright line and nothing else.
export default function Footer() {
  return (
    <footer className="wr-footer">
      <div className="footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Giselle Wu</span>
      </div>
    </footer>
  );
}