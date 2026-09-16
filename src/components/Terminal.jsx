// src/components/Terminal.jsx
// A real, typeable shell — optional, never the only way through. Every
// destination it reaches is also reachable from the nav cards and the top nav,
// so a reviewer who refuses to type loses nothing.
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies } from "../data/caseStudies";

const SECTIONS = [
  ["work", "#work", "three case studies"],
  ["archive", "#projects", "older projects"],
  ["stack", "#skills", "languages and tools"],
  ["experience", "#experience", "roles since 2023"],
  ["contact", "#contact", "email and links"],
];

const BANNER = [
  { kind: "accent", text: "type a command to explore" },
  { kind: "out", text: "try 'ls' to see everything, or 'help' for the full list" },
];

// Navigation is a hash change, exactly like clicking a nav card: App owns which
// view that opens. The terminal never reaches for the DOM of another section.
function go(hash) {
  if (window.location.hash === hash) {
    // same address twice still has to act like a command
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = hash;
  }
  return true;
}

// `onShell` reports whether the shell is in use. The landing hands the whole
// window over to the terminal once it is, because at a third of the panel a
// `help` or an `ls` scrolls out of sight — and a reviewer should never have to
// scroll inside a box to read what they just asked for.
export default function Terminal({ onShell, compact = false, cwd = "~" }) {
  const [lines, setLines] = useState(compact ? [] : BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // A view has room for one line, so the compact shell keeps only the latest.
  const push = useCallback(
    (...entries) =>
      setLines((l) => (compact ? entries.slice(-1) : [...l, ...entries])),
    [compact]
  );

  // the banner is the resting state; anything past it means the shell is live
  useEffect(() => {
    if (!compact) onShell?.(lines.length > BANNER.length);
  }, [lines, onShell, compact]);

  // keep the newest output in view
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = useCallback(
    (raw) => {
      const input = raw.trim();
      push({ kind: "in", text: input });
      if (!input) return;

      const [cmd, ...rest] = input.split(/\s+/);
      const arg = rest.join(" ").toLowerCase();

      switch (cmd.toLowerCase()) {
        case "help":
          if (compact) {
            push({
              kind: "out",
              text: "cd <section> · cd .. · open <project> · cat resume · theme",
            });
            break;
          }
          push(
            { kind: "out", text: "ls                list everything" },
            { kind: "out", text: "cd <section>      open a section ('cd ..' comes back)" },
            { kind: "out", text: "open <project>    open a case study" },
            { kind: "out", text: "cat <file>        read about.md or resume" },
            { kind: "out", text: "theme             toggle light / dark" },
            { kind: "out", text: "clear             clear the screen" }
          );
          break;

        case "ls":
          if (compact) {
            push({
              kind: "out",
              text: `sections: ${SECTIONS.map(([n]) => n).join(" ")} · work: ${caseStudies
                .map((c) => c.id)
                .join(" ")}`,
            });
            break;
          }
          push({ kind: "accent", text: "sections/" });
          SECTIONS.forEach(([name, , hint]) =>
            push({ kind: "out", text: `  ${name.padEnd(12)} ${hint}` })
          );
          push({ kind: "accent", text: "work/" });
          caseStudies.forEach((c) =>
            push({ kind: "out", text: `  ${c.id.padEnd(12)} ${c.org}` })
          );
          break;

        case "cd": {
          const hit = SECTIONS.find(([name]) => name === arg);
          if (!arg) push({ kind: "out", text: "usage: cd <section>" });
          else if (arg === ".." || arg === "~" || arg === "/") {
            go("#top");
            push({ kind: "out", text: "→ ~/giselle-wu" });
          } else if (hit && go(hit[1]))
            push({ kind: "out", text: `→ ${hit[0]}` });
          else push({ kind: "err", text: `no such section: ${arg}` });
          break;
        }

        case "open": {
          const hit = caseStudies.find(
            (c) => c.id === arg || c.name.toLowerCase().includes(arg)
          );
          if (!arg) push({ kind: "out", text: "usage: open <project>" });
          else if (hit && go(`#${hit.id}`))
            push({ kind: "out", text: `→ ${hit.name}` });
          else push({ kind: "err", text: `no such project: ${arg}` });
          break;
        }

        case "cat":
          if (arg === "resume" || arg === "resume.pdf") {
            window.open("/resume.pdf", "_blank", "noopener");
            push({ kind: "out", text: "opening resume.pdf…" });
          } else if (arg === "about.md" || arg === "about") {
            push({
              kind: "out",
              text: "Fourth-year at Dartmouth, CS + Computer Engineering, '27.",
            });
            push({
              kind: "out",
              text: "Currently building ZebraMD at DALI Lab.",
            });
          } else {
            push({ kind: "err", text: `no such file: ${arg || "?"}` });
          }
          break;

        case "theme":
          window.dispatchEvent(new CustomEvent("gw-theme-toggle"));
          push({ kind: "out", text: "theme toggled." });
          break;

        case "clear":
          setLines(compact ? [] : BANNER);
          return;

        default:
          push({
            kind: "err",
            text: `command not found: ${cmd} — try 'help'`,
          });
      }
    },
    [push, compact]
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(value);
      if (value.trim()) setHistory((h) => [value.trim(), ...h]);
      setValue("");
      setHIndex(-1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIndex + 1, history.length - 1);
      if (history[next] !== undefined) { setHIndex(next); setValue(history[next]); }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIndex - 1;
      if (next < 0) { setHIndex(-1); setValue(""); }
      else { setHIndex(next); setValue(history[next]); }
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const names = [
        "help", "ls", "cd", "open", "cat", "theme", "clear",
        ...SECTIONS.map((s) => s[0]),
        ...caseStudies.map((c) => c.id),
      ];
      const parts = value.split(/\s+/);
      const last = parts[parts.length - 1].toLowerCase();
      const hit = last && names.find((n) => n.startsWith(last) && n !== last);
      if (hit) { parts[parts.length - 1] = hit; setValue(parts.join(" ")); }
      return;
    }
    if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setLines(compact ? [] : BANNER);
      return;
    }
    if (e.key === "Escape") {
      // the way back out of the shell, and the only Escape on the landing —
      // App binds Escape to "return to the front page" only inside a view
      e.preventDefault();
      setLines(compact ? [] : BANNER);
      setValue("");
    }
  };

  const ps1 = `giselle@portfolio:${cwd}$`;

  // The one-line shell every view carries, so `cd ..` is always available —
  // landing on a page with no prompt left typing as a one-way trip.
  if (compact) {
    return (
      <div
        className="term term-compact"
        onClick={() => inputRef.current?.focus()}
        role="group"
        aria-label="Terminal navigator"
      >
        <label className="term-prompt">
          <span className="term-ps1" aria-hidden="true">{ps1}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Type a command"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </label>
        <p className="term-line term-compact-out" aria-live="polite">
          {lines[0]?.text || "cd .. to go back · help"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="term"
      onClick={() => inputRef.current?.focus()}
      role="group"
      aria-label="Terminal navigator"
    >
      <div className="term-body" ref={bodyRef}>
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <p className="term-line term-in" key={i}>
              <span className="term-ps1">giselle@portfolio:~$</span> {l.text}
            </p>
          ) : (
            <p className={`term-line term-${l.kind}`} key={i}>{l.text}</p>
          )
        )}
      </div>

      <label className="term-prompt">
        <span className="term-ps1" aria-hidden="true">giselle@portfolio:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Type a command"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </label>
      <p className="term-hint">tab to autocomplete · ↑↓ history · ctrl+l to clear</p>

      {/* announce output to screen readers without moving focus */}
      <p className="sr-only" aria-live="polite">
        {lines.length ? lines[lines.length - 1].text : ""}
      </p>
    </div>
  );
}
