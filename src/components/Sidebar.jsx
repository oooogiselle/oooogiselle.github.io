export default function Sidebar({ active, setActive }) {
  const btn = (name, label) => (
    <li>
      <button
        onClick={() => setActive(name)}
        className={active === name ? "active" : ""}
        id={`${name}-btn`}
      >
        {label}
      </button>
    </li>
  );

  return (
    <aside className="sidebar">
      <nav className="nav">
        <ul>
          {btn("projects", "Projects")}
          {btn("info", "Info")}
          {btn("contact", "Contact")}
        </ul>
      </nav>
      <div className="vertical-text">PORTFOLIO</div>
    </aside>
  );
}
