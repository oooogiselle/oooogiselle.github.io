// src/components/SkillCard.jsx
export default function SkillCard({ item }) {
  return (
    <div className="skill-card">
      <h3 className="skill-category">{item.category}</h3>

      <ul className="skill-list">
        {item.items.map((s) => (
          <li key={s.name} className="skill">
            <span className="skill-name">{s.name}</span>
            {s.where && <span className="skill-where">{s.where}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
