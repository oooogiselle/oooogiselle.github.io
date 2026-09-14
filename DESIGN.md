# Design System — giselle wu portfolio

**Terminal, done with restraint.** Terminal as a typographic and structural
system, never a simulated shell. Navigation is ordinary links, scroll, and the
back button. A reviewer must never type a command to reach the work.

---

## 1. The load-bearing decision: two type registers

The contrast between the two registers *is* the design. Everything else stays
quiet.

| Register | Face | Owns |
|---|---|---|
| **Mono** | JetBrains Mono | nav, name, section labels, metadata rows, file paths, tags, diffs, timestamps, buttons |
| **Reading** | Source Serif 4 | case study prose, bio, timeline bullets, modal descriptions |

**Never set long prose in mono.** Mono is ~20% wider per character, so it eats
vertical space and reads as padded past about two lines.

**Never set chrome in the serif.** A serif label reads as content and breaks the
distinction the whole system rests on.

```css
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
--font-read: "Source Serif 4", Iowan Old Style, Georgia, serif;
```

### Two grids, not one

This is how 400–600 word case studies coexist with a character grid.

- **Chrome** snaps to a strict rail: `13ch` label columns, `--ch: 24px` vertical
  rhythm. Mono makes misalignment visible, so alignment here is absolute.
- **Prose** gets its own `--measure: 66ch` and flows freely *inside* that frame.

Labels align rigidly. Paragraphs do not have to. Nobody notices an unsnapped
paragraph; everybody notices an unsnapped label.

### Type scale

| Token | Size | Register |
|---|---|---|
| Name | `clamp(38px, 8vw, 76px)` / 700 / `-.045em` | mono |
| Case name | `clamp(20px, 3vw, 27px)` / 700 | mono |
| Lede | `clamp(19px, 2.2vw, 24px)` / 1.5 | serif |
| Prose | `17.5px` / 1.62 | serif |
| Section label | `13px` / `.18em` / uppercase | mono |
| Chrome + metadata | `12–12.5px` | mono |
| Tag | `11.5px` | mono |

---

## 2. Color — three accents, counted

Syntax-highlighting logic: one accent for interactive, one for metadata, one for
emphasis. **Three.** If a fourth is needed, something else is wrong.

| Role | Light | Dark | Used for |
|---|---|---|---|
| Ground | `#FBF8F2` | `#1A1815` | page |
| Sunk | `#F3EFE6` | `#232019` | diffs, recessed blocks |
| Ink | `#1F1D1A` | `#EDE7DA` | headings, `+` lines |
| Ink soft | `#4A463F` | `#B8B1A3` | body prose |
| Line / firm | `#E0D9CC` / `#CFC6B5` | `#332F27` / `#464136` | rules, borders |
| **1 · interactive** | `#286983` | `#7FB4C9` | links, hovers, active |
| **2 · metadata** | `#797593` | `#A9A3BE` | mono chrome, paths, `−` lines |
| **3 · emphasis** | `#B4637A` | `#D9909F` | `❯` glyphs, `+` marker, lede rule |

Warm paper, not white. Dark mode is a **warm low-contrast inverse** — never
`#000`, never green on black.

**Photographs are never desaturated.** No grayscale, no duotone, no
colour-on-hover reveal. The palette's restraint is carried by the interface;
photos of people stay in full colour.

Emphasis is rationed: roughly **one emphasis mark per viewport**. Prose gets
weight and the interactive accent only — metadata and emphasis accents never
enter body copy.

---

## 3. Signature move: the diff

Each case study carries a unified diff stating what the work changed.

```
work/siemens-eda/fuse-ai                          2 changes
− a prompt reached Fuse with no way to choose a tool
+ prompts route to the right internal tool automatically
```

**Why this and not a file tree or a man page:** it is the only one that fixes a
*content* problem rather than adding a presentation layer. A diff cannot be
written without stating a before state, so the form makes the omission
impossible. The portfolio's original failure was describing what was *built* and
never what *changed*.

**No red, no green.** Removals take the metadata violet and recede; additions
take ink at `600` weight and assert. Same information, without the cliché, and it
survives any form of color blindness because weight carries the signal.

Rules:
- Every featured case study has exactly one diff. Never two.
- Diff lines are statements about the world, never about the stack.
- Keep each line under ~60 characters so it does not wrap on a phone.

---

## 4. Structure

- **Section headings** are mono, uppercase, `.18em` tracking, prefixed with a
  `❯` glyph in the emphasis accent: `❯ selected work`, `❯ archive`, `❯ stack`,
  `❯ experience`.
- **Metadata renders as terminal output** — a `<dl>` with a fixed `13ch` label
  column: org, role, dates, domain, status, stack, `not built`.
- **File paths** identify case studies: `work/dali-lab/zebramd`.
- **Featured work sits above the bio.** Strongest evidence inside the 60 seconds
  a reviewer actually spends.
- **Window panel** (`.window`) frames a block of content: a title bar carrying a
  file path, plus three monochrome dots. It is a frame, not a shell — nothing is
  typed into it and it never renders fake command output. The dots are
  deliberately **not** red/yellow/green; that would be three colours more than
  the palette allows. Used once, on the landing.
- **Terminal** (`.term`) is a real, typeable shell living at the foot of the landing
  window. It is **additive, never required** — every destination it reaches is also on
  a nav card, because a reviewer on a phone will not type. It does navigation only:
  no fake output, no joke commands, no simulated filesystem.
- **Nav cards** (`.nav-cards`) are the primary navigation: a 2×2 grid *outside* the
  window, under the line "or just click a button". Descriptions are counts derived from
  the data (`3 case studies`, `9 older projects`), because a count is a promise about
  what is behind the click.
- **Landing is two columns** — content left, one sticky photo right, with a mono
  caption chip. Grid areas reorder to `head → photo → body` under 860px.

---

## 4a. Amended: the typeable shell

The original brief forbade typed navigation outright. That was overridden deliberately —
the terminal is wanted. The constraint that survives, and that must hold:

> **Nothing may be reachable only by typing.** The cards and top nav stay, always.

Still forbidden inside the terminal: joke commands, `sudo` gags, fake filesystem output,
anything that pretends to do something it doesn't. Unknown input returns
`command not found: x — try 'help'` and nothing more.

Accessibility is not optional here: the input is labelled, output is announced through
an `aria-live` region, and focus is never stolen on page load.

---

## 5. Forbidden

These are the defaults, and they read as costume:

- Green on black, CRT scanlines, screen curvature, phosphor glow, Matrix rain
- Typewriter animation on anything a reviewer must read
- Fake commands, `sudo` jokes, ASCII banners, `whoami` intros
- Requiring typed input to navigate
- More than **one** blinking cursor — the site's single allowance is the landing
  photo caption. (The terminal input's caret is the browser's native text cursor,
  not a decorative one.)

---

## 6. Motion

One primitive: `Reveal` — fade and rise `12px`, once, on IntersectionObserver.
No scroll-linked parallax; measured scroll ranges go stale whenever an image
loads or a filtered grid changes height.

Transitions are `.15s` for chrome hover, `.5s` for entrance. Only `opacity` and
`transform` animate.

`prefers-reduced-motion` collapses every transition, stops the caret, and
un-rotates the photo. Anything animating from `opacity: 0` needs an explicit
resting state in that block, or reduced-motion users get invisible content.

---

## 7. Accessibility

- Contrast: ink on ground is ~14:1; the metadata accent is reserved for
  ≥12.5px text and never carries meaning alone.
- The diff's `−`/`+` signal is carried by **weight and position**, not color.
- Focus is always visible: `2px` interactive-accent outline, `2px` offset.
- Every image declares `width`/`height`; layout shift is zero by construction.
- The modal traps Tab, locks background scroll, and restores focus to its
  trigger.
- Mono strings in chrome stay under ~28 characters so they never wrap; genuinely
  wide blocks get their own `overflow-x: auto`. The page body never scrolls
  sideways.

---

## 8. Budget

Runtime dependencies are `react` and `react-dom`. Images are WebP, pre-cropped
to the exact box that renders them. Before adding a library, check whether ~30
lines of local code covers it — that is how `Reveal`, `icons`, and `Diff` exist.

Current: **~69 KB JS gzip, ~4.4 KB CSS gzip, 0.4 MB images.**

---

## 9. Layout rules that already broke once

- **`[hidden]` must be forced.** `[hidden] { display: none !important; }` lives in the
  base layer. Any component `display:` rule outranks the UA default and leaves hidden
  content on screen.
- **In a height-locked flex column, decide what yields.** On the landing, `.window-intro`
  shrinks and scrolls (`flex: 0 1 auto`) while `.term` keeps a floor
  (`flex: 1 0 auto; min-height: 168px`). When both were `flex: 1` with `overflow: hidden`
  above them, the terminal was clipped out of existence and rendered invisible.
- **Sticky/absolute pairings.** `.landing-photo` must stay `position: relative` — making
  it `static` removes the positioning context its caption chip depends on.
