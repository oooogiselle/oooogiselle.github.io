# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Read `DESIGN.md` before changing anything visual.** It holds the design system —
two type registers, three counted accents, the diff component, the forbidden list.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally (port 4173 used throughout)
npm run lint     # eslint over src/ (dist, assets, _originals ignored)
```

No test suite and no test tooling — do not invent test commands.

`npm run deploy` (gh-pages) exists but is **not** the live path. `.github/workflows/deploy.yml`
builds on every push to `main` and publishes through `actions/deploy-pages`. Nothing
committed under `dist/` affects what ships.

## Architecture

Single-page static portfolio (React 19 + Vite). No router, no backend, no data fetching.

**Runtime dependencies are `react` and `react-dom`, deliberately.** MUI, Emotion,
`framer-motion`, and `react-scroll-parallax` were all removed, taking the bundle from
130 KB to ~69 KB gzipped. Before adding a library, check whether ~30 lines covers it —
that's how `Reveal`, `icons`, `Diff`, and `Terminal` exist.

`src/App.jsx` is the whole page, in fixed order:

```
Nav → Landing → Featured → Projects(archive) → Skills → WorkTimeline → Contact → Footer
```

Anchors: `#top` `#work` `#projects` `#skills` `#experience` `#contact`, plus one per
case study (`#fuse-ai`, `#zebramd`, `#ask-in-context`). The terminal and the landing
cards both navigate by these — **changing an `id` breaks both.**

### The landing

Two columns (`.landing`), grid areas `"body photo"`:

- **Left** — a `.window` panel (title bar + `~/giselle-wu`) holding the headline, a
  short bio, and a live `<Terminal />`. Outside the window: "or just click a button",
  the 2×2 `.nav-cards`, and a resume/social row.
- **Right** — one photo, sticky, tilted 1.1°, with a layered card behind it and a mono
  caption chip carrying the site's single blinking cursor.

Above 861px the landing is **pinned to one viewport** (`height: calc(100svh - …)`).
Inside the window, `.window-intro` yields first (`flex: 0 1 auto`, scrolls) while
`.term` holds a floor (`flex: 1 0 auto; min-height: 168px`). That asymmetry is load
bearing: when they were equal, the terminal got clipped out of existence. Below 861px
the lock releases and the grid reorders to `"photo" "body"`.

### Content lives in `src/data/`

- `caseStudies.js` — the three featured studies. Each needs a `diff` (`before`/`after`);
  optional `notBuilt` renders an extra metadata row. **`notBuilt` is empty on all three
  and is the highest-value missing content on the site.**
- `projects.js` — the archive. `category` must match a tab in `TABS` in `Projects.jsx`.
- `experience.js` — timeline roles (moved out of the component so its `length` is
  importable by the landing cards).
- `skillData.js` — skill groups.

The landing card counts read from `.length` on these, so they can't go stale.

### Terminal

`src/components/Terminal.jsx` is a real shell: `help`, `ls`, `cd <section>`,
`open <project>`, `cat about.md|resume`, `theme`, `clear`, plus Tab completion, ↑↓
history, Ctrl+L. It is **additive** — every destination is also reachable from the nav
cards, because a reviewer on a phone will not type. Keep it that way.

`theme` dispatches a `gw-theme-toggle` window event that `Nav` listens for, so the
terminal and the toggle can't disagree. `Nav` owns theme state
(`localStorage["gw-theme"]`, `data-theme` on `<html>`); `src/context/` is **dead code**.

### Animation

One primitive: `Reveal` — fade + rise once via IntersectionObserver; the transition is
CSS (`.reveal` / `.reveal.is-visible`).

**Do not reintroduce scroll-linked parallax.** The old version measured pixel scroll
ranges that went stale whenever an image loaded, a font swapped, or the projects filter
changed the grid height.

`Reveal` writes `transform` on its own node, so anything with a `:hover` transform must
be a **child** of it — `.project-wrap` in `Projects.jsx` is the worked example.

### Gotchas that already bit once

- **`[hidden]` needs the `!important` rule in `index.css`.** Any component `display:`
  rule outranks the UA stylesheet's `[hidden] { display: none }`, and the element stays
  on screen. This silently broke a panel toggle.
- `position: static` on `.landing-photo` destroys the caption chip's positioning
  context — it must stay `relative`.
- `eslint.config.js` enables `react/jsx-uses-vars`; without it, core `no-unused-vars`
  can't see identifiers used only in JSX and reports false positives.

### Assets

Runtime files live in `public/`, referenced by absolute path. **Optimize before adding:**
originals were 23 MB, now 0.4 MB of WebP. Thumbnails are pre-cropped to **840×525**
(the 16/10 box) and the landing photo to **840×560**, so `<img>` declares exact
`width`/`height` and layout shift stays zero. Set `width`/`height`/`loading`/`decoding`
on every new image. Uncompressed sources are in `_originals/` (outside `public/`, never
deployed). `vite.config.js` sets `base: '/'`.

### Repo hygiene

- `dist/` and a root `assets/` directory are committed despite `.gitignore` — stale
  output from an older gh-pages deploy. Don't edit them; a diff in `dist/` isn't a real
  change.
- Dead files nothing imports: `src/components/Header.jsx`, `Sidebar.jsx`,
  `src/sections/Info.jsx`, `src/data/works.js`, all of `src/context/`.
- Root-level duplicate images (`dino.JPG`, `harmonize.jpg`, …) predate `public/`.
