// src/components/Diff.jsx
// The signature element. A unified-diff block stating what the work changed.
//
// Deliberately not red/green: removal takes the muted metadata colour and
// addition takes ink at a heavier weight. Removal recedes, addition asserts —
// which is the same information, without the cliché, and legible to anyone
// who can't distinguish red from green.
export default function Diff({ path, before = [], after = [] }) {
  const count = before.length + after.length;
  return (
    <div className="diff" role="group" aria-label={`What changed: ${path}`}>
      <div className="diff-head">
        <span className="diff-path">{path}</span>
        <span className="diff-count">
          {count} {count === 1 ? "change" : "changes"}
        </span>
      </div>
      <dl className="diff-body">
        {before.map((line) => (
          <div className="diff-row diff-del" key={`-${line}`}>
            <dt aria-label="before">−</dt>
            <dd>{line}</dd>
          </div>
        ))}
        {after.map((line) => (
          <div className="diff-row diff-add" key={`+${line}`}>
            <dt aria-label="after">+</dt>
            <dd>{line}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
