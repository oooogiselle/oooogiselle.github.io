// src/sections/Skills.jsx
import { skills } from "../data/skillData";
import SkillCard from "../components/SkillCard";

export default function Skills() {
  return (
    <section id="skills" className="skills-sec">
      {/* decorative accent, no motion */}
      <div className="skills-bg-layer" aria-hidden="true">
        <div className="skills-blob" />
      </div>

      <h2 className="sec-title">
        <span className="glyph" aria-hidden="true">❯</span> stack
      </h2>

      <div className="skills-grid">
        {skills.map((group) => (
          <SkillCard key={group.id} item={group} />
        ))}
      </div>
    </section>
  );
}
