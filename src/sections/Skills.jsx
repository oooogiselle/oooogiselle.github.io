// src/sections/Skills.jsx
import { skills } from "../data/skillData";
import SkillCard from "../components/SkillCard";
import Reveal from "../components/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="skills-sec">
      {/* decorative accent, no motion */}
      <div className="skills-bg-layer" aria-hidden="true">
        <div className="skills-blob" />
      </div>

      <Reveal>
        <h2 className="sec-title">
          <span className="glyph" aria-hidden="true">❯</span> stack
        </h2>
      </Reveal>

      <div className="skills-grid">
        {skills.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.06} style={{ height: "100%" }}>
            <SkillCard item={group} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
