// src/components/SkillCard.jsx
export default function SkillCard({ item }) {
  return (
    <div className="skill-card">
      <h3 className="skill-category">{item.category}</h3>

      <ul className="skill-list two-col">
        {item.items.map((s) => (
          <li key={s.name} className="skill">
            <span className="skill-icon" aria-hidden="true">✓</span>
            <div className="skill-text">
              <div className="skill-name">{s.name}</div>
              <div className="skill-level">{s.level}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
