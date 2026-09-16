# Design System — giselle wu portfolio

**Terminal, done with restraint.** Terminal as a typographic and structural
system, never a simulated shell. A reviewer must never type a command to reach
the work.

**The page does not scroll, and neither does a view.** The landing is the
screen; every other section is a view you switch to from it, addressed by hash
so ordinary links and the back button still work.

**Every view fits one screen, with one deliberate exception: the archive.**
Nine cards with pictures run ~240px past a screen and no amount of trimming
closes that, so the archive pane scrolls — a window scrolling its own contents
is still a page that doesn't. Everything else holds the rule.

This is a design constraint, not an aspiration,
and it is what sizes the type: at a 723px viewport — a normal laptop with
browser chrome — all six views measure zero overflow. The tools, in order of
preference: **more columns** (three for the roles, three for the archive), **one
record at a time** (the work view's pager), **pairing metadata rows**, and only
then type size. Below ~640px of viewport the content wins and the pane scrolls;
that is the release valve, not the plan.

Two traps when compacting: `body` sets `line-height: var(--ch)` — 24px — so
every compact list inherits it until it sets its own leading; and **narrow
columns can make a section taller**, because the text inside wraps (four skill
columns measured deeper than two).

---

## 1. The load-bearing decision: two type registers

The contrast between the two registers *is* the design. Everything else stays
quiet.

| Register | Face | Owns |
|---|---|---|
| **Mono** | JetBrains Mono | nav, name, section labels, metadata rows, file paths, tags, diffs, timestamps, buttons, **everything inside the landing window** |
| **Reading** | Source Serif 4 | case study prose, archive card lines, timeline bullets, modal descriptions |

**The window is the exception, and it is a whole-object one.** The landing panel
is a shell, so its headline and bio are set in mono like the terminal beneath
them — one register from title bar to prompt. Set at `13.5px/1.72`, not the
serif's size: mono is ~20% wider per character and goes dense without the extra
leading. Outside that panel the rule stands.

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
| Landing lede | `clamp(16px, 1.75vw, 20px)` / 1.22 / `-.035em` | mono |
| Landing bio | `12.5px` / 1.7 | mono |
| Terminal | `12px` / 1.6, hint `10.5px` | mono |
| Prose | `17.5px` / 1.62 | serif |
| Section label | `13px` / `.18em` / uppercase | mono |
| Chrome + metadata | `11–12.5px` | mono |
| Tag | `11.5px` | mono |

The window's own scale sits a step below the page's: it is a panel of shell
output, not a hero. Mono at display sizes also sets loose, hence the `-.035em`
on the lede.

---

## 2. Color — three accents, counted

Syntax-highlighting logic: one accent for interactive, one for metadata, one for
emphasis. **Three.** If a fourth is needed, something else is wrong.

| Role | Light | Dark | Used for |
|---|---|---|---|
| Ground | `#FFFFFF` | `#1A1815` | page |
| Sunk | `#F1F5FA` | `#232019` | diffs, recessed blocks |
| Ink | `#171B20` | `#EDE7DA` | headings, `+` lines |
| Ink soft | `#454C56` | `#B8B1A3` | body prose |
| Line / firm | `#E1E7EF` / `#C7D2DF` | `#332F27` / `#464136` | rules, borders |
| **1 · interactive** | `#286983` | `#7FB4C9` | links, hovers, active |
| **2 · metadata** | `#6E6A88` | `#A9A3BE` | mono chrome, paths, `−` lines |
| **3 · emphasis** | `#B4637A` | `#D9909F` | `❯` glyphs, `+` marker, lede rule |

Light mode is **white**, with one exception: a single baby-blue wash across the
first screen (`--bg-grad`, painted on `<body>`). Its stops are in **px, not %**, so
the wash is sized to the first ~980px of the document and is fully gone by the time
the work starts — the rest of the page is flat white. It is the only gradient on the
site; do not add a second, and do not let it run under the case studies.

Dark mode carries **no gradient** (`--bg-grad: none`) and stays a warm low-contrast
inverse — never `#000`, never green on black.

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
  column: role (with org), dates, domain (with status), stack, `not built`.
  Four rows, not six: org/role and domain/status each read as one fact, and the
  two rows saved are most of what let a study fit a screen.
- **One case study at a time.** The work view shows a pager of the three file
  paths and renders the selected one; on a wide screen the study is two columns
  — the record (metadata + diff) left, the prose right.
- **File paths** identify case studies: `work/dali-lab/zebramd`.
- **Archive cards** carry a cropped screenshot, a name, one serif line of what
  the thing is, its stack, and a GitHub link. The image is a 104px band with
  `object-fit: cover`, not a gallery tile — the full 16/10 frame at this column
  width is 230px tall, and three rows of that is two screens. The whole picture
  is in the modal. A project with no screenshot gets an empty recessed band. The name itself is the button that opens the
  modal — nine identically boxed `View Project →` buttons in one grid was the
  most templated element on the page, and a card that never says what the
  project *does* asks a reviewer to click to find out.
- **The stack section cites, it does not rate.** Each skill names the projects
  it was used on (`React — DartBid, TripPlan, Harmonize, this site`). A
  self-assigned level is a claim nobody can check, and the old ratings actively
  contradicted the work above them — `Artificial Intelligence: Basic` sat below
  three LLM case studies. A skill with nothing to point at shows just its name.
- **The top bar has no boundary.** `.wr-nav::before` paints a full-bleed scrim
  (the bar itself is trapped inside the 1120px measure) and both it and its
  blur are faded out by a `mask-image` over the bottom third. No rule, no edge:
  the landing's wash runs unbroken from the top of the page.
- **Featured work sits above the bio.** Strongest evidence inside the 60 seconds
  a reviewer actually spends.
- **Window panel** (`.window`) frames a block of content: a title bar carrying a
  file path, plus three monochrome dots. It is a frame, not a shell — nothing is
  typed into it and it never renders fake command output. The dots are
  deliberately **not** red/yellow/green; that would be three colours more than
  the palette allows.
- **Every view is a window.** The landing holds one; each section opens as one.
  So `cd work` visibly *opens a window*, which is the right answer to "should a
  command open a new window" — a real browser popup gets blocked, breaks the
  back button, and is useless on a phone.
- **The title bar carries the path and the way back**: `❮ ~/giselle-wu / archive`,
  where the first half is the link home. One affordance, in the place a window
  already puts its identity, rather than a separate back link above the panel.
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

With the page view-switched, this is load bearing rather than aspirational: a section
that is not in the top bar or on a landing card is reachable by no other means. The bar
carries all five views; `❮ ~/giselle-wu`, Escape, and the browser back button all
return to the front page.

Running a command hands the whole panel to the shell: the headline and bio fold away so
output is read without scrolling inside a box, and `clear` / Ctrl+L / Escape fold them
back. The window does not change size — the split inside it does.

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

One primitive, used **once**: `Reveal` — fade and rise `12px`, on
IntersectionObserver — wraps the first case study and nothing else. Every
section fading in as the reader reaches it is the default treatment, and it
reads as one; the archive grid was the worst of it, replaying a nine-card
stagger on every filter change. One entrance, then the page is simply there.

No scroll-linked parallax; measured scroll ranges go stale whenever an image
loads or a filtered grid changes height.

Transitions are `.15s` for chrome hover, `.5s` for entrance. Only `opacity` and
`transform` animate.

`prefers-reduced-motion` collapses every transition, stops the caret, and
un-rotates the photo. Anything animating from `opacity: 0` needs an explicit
resting state in that block, or reduced-motion users get invisible content.

---

## 7. Accessibility

- Contrast: ink on ground is ~14:1; the metadata accent clears AA at 5.2:1 on
  the white ground and never carries meaning alone. It was `#797593`, which
  measured 4.45:1 — under AA for normal text, and the terminal's chrome now
  runs as small as 10.5px, so it was darkened rather than enlarged.
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
