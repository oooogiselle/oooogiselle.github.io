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

Single-page static portfolio (React 19 + Vite). No backend, no data fetching, and no
router library — but the page **is** view-switched, in about 40 lines of `App.jsx`.

**The page never scrolls.** `html`, `body`, `#root` and `.wr` are all `height: 100%`,
`body` is `overflow: hidden`, and the only scroll container on the page is `.view` — the
pane under the top bar. Break any link in that height chain and every `height: 100%`
below it collapses to auto and the whole page starts scrolling again.

**Runtime dependencies are `react` and `react-dom`, deliberately.** MUI, Emotion,
`framer-motion`, and `react-scroll-parallax` were all removed, taking the bundle from
130 KB to ~69 KB gzipped. Before adding a library, check whether ~30 lines covers it —
that's how `Reveal`, `icons`, `Diff`, and `Terminal` exist.

`src/App.jsx` renders the top bar and **one view, inside a window panel**
(`.view-window` — the same `.window` chrome the landing uses, whose title bar carries
`❮ ~/giselle-wu / <view>` and doubles as the back link). Because the panel supplies the
padding, `.section` sets `padding: 0`; a section that adds its own is what pushed the
archive back over a screen.

`src/App.jsx` renders the top bar and **one view**:

```
Nav + one of: Landing | Featured | Projects(archive) | Skills | WorkTimeline | Contact+Footer
```

**Every view is built to fit one screen except the archive** (see DESIGN.md §4), which
scrolls its pane because the card thumbnails are worth ~240px more than a screen holds. `Featured` takes an
`activeId` and renders a single case study behind a pager of the three paths; the
timeline and the stack rely on column counts at `min-width: 1120px`. If you add content,
check the fit at a 723px viewport before shipping — the quickest way is a temporary
`<script>` in `index.html` that reports `.view` `scrollHeight - clientHeight` per hash.

**The hash is the address.** `viewFor(hash)` maps `#work` `#projects` `#skills`
`#experience` `#contact` to their views; anything else — including `#top` and a bare
URL — is the landing. A case study hash (`#fuse-ai`, `#zebramd`, `#ask-in-context`)
opens the **work** view with that study selected — a case study is a place inside a
view, not a view of its own, and no view ever scrolls to an anchor. Nav links, landing cards and the terminal
all navigate by setting that hash, so ordinary links, the back button and a pasted URL
keep working — **changing an `id` breaks all three.**

Two things that bit during the rework:

- **Never `scrollIntoView` inside the pane.** It walks every scrollable ancestor and
  will scroll the document — which happily moves the top bar off screen even though
  `body` is `overflow: hidden`. Adjust `pane.scrollTop` by the rect delta instead.
- **Every view must be reachable without typing** (DESIGN.md §4a). The top bar carries
  all five. `stack` has no landing card, so if it ever leaves the bar it becomes
  terminal-only, which the brief forbids.

### The landing

Two columns (`.landing`), grid areas `"body photo"`:

- **Left** — a `.window` panel (title bar + `~/giselle-wu`) holding the headline, a
  short bio, and a live `<Terminal />`. Outside the window: "or just click a button",
  the 2×2 `.nav-cards`, and a resume/social row.
- **Right** — one photo, sticky, tilted 1.1°, with a layered card behind it and a mono
  caption chip carrying the site's single blinking cursor.

Above 861px the landing fills its pane exactly (`min-height: 100%`), which is one
screen because the pane is one screen.
Inside the window the height splits **two-thirds intro, one-third terminal**: `.term`
takes a fixed share (`flex: 0 0 30%; min-height: 148px`) and `.window-intro` takes what
is left (`flex: 1 1 auto`) and scrolls if it still doesn't fit. Both halves have been
wrong before — when the terminal grew into the leftover (`flex: 1 0 auto`) it ate half
the window and clipped the bio mid-sentence; when the two were equal the terminal got
squeezed out of existence. A short viewport (≲870px tall) still clips the last line or
two of the bio into the intro's scroll. Below 861px wide the lock releases and the grid
reorders to `"photo" "body"`. `.view--top` is `overflow-y: auto`, not `hidden`: on a
phone the landing is genuinely taller than the screen, and clipping it would hide half
the navigation.

### Content lives in `src/data/`

- `caseStudies.js` — the three featured studies. Optional `image`/`imageAlt` render a
  picture at the foot of the prose column; all three are `null` today (Fuse AI and
  Ask-in-Context are internal tools and stay that way — ZebraMD is the one that can have
  a screenshot, and needs an 840×525 `.webp` in `public/` first). Each needs a `diff`
  (`before`/`after`);
  optional `notBuilt` renders an extra metadata row. **`notBuilt` is empty on all three
  and is the highest-value missing content on the site.**
- `projects.js` — the archive. `category` must match a tab in `TABS` in `Projects.jsx`.
  `summary` is the single line the card shows; `description` is the long version and
  only the modal reads it.
- `experience.js` — timeline roles (moved out of the component so its `length` is
  importable by the landing cards).
- `skillData.js` — skill groups. Each item is `{ name, where }`, where `where` names
  the projects that skill was used on — evidence, not a self-assigned level. An empty
  `where` renders as just the name; `R`, `Git`, `PyTorch`, `Flutter`, `Graphic Design`
  and `Ceramics` are currently bare for want of something on this site to cite.

The landing card counts read from `.length` on these, so they can't go stale.

### Terminal

`src/components/Terminal.jsx` is a real shell: `help`, `ls`, `cd <section>` (and
`cd ..` to come back), `open <project>`, `cat about.md|resume`, `theme`, `clear`, plus
Tab completion, ↑↓ history, Ctrl+L. It navigates by setting `location.hash` — the same
thing a nav card does — and never touches another section's DOM. Escape does the same
job as `cd ..` from anywhere. It is **additive** — every destination is also reachable from the nav
cards, because a reviewer on a phone will not type. Keep it that way.

**Shell mode.** `Terminal` reports through `onShell` whether anything past the banner is
on screen; when it is, `Landing` puts `.is-shell` on `.window-body`, which hides
`.window-intro` and hands the whole panel to the terminal. At a third of the panel an
`ls` scrolled out of sight, and a reviewer should never have to scroll inside a box to
read what they just asked for. `clear`, Ctrl+L and Escape all restore the banner and
the intro; the title bar shows `esc to go back` while the shell is live. The intro is
hidden by a **class**, not the `hidden` attribute — see the `[hidden]` gotcha below.

`theme` dispatches a `gw-theme-toggle` window event that `Nav` listens for, so the
terminal and the toggle can't disagree. `Nav` owns theme state
(`localStorage["gw-theme"]`, `data-theme` on `<html>`); `src/context/` is **dead code**.

### Animation

One primitive: `Reveal` — fade + rise once via IntersectionObserver; the transition is
CSS (`.reveal` / `.reveal.is-visible`). It is used in exactly **one** place — the first
case study, via the `Frame` wrapper in `Featured.jsx`. Section titles, the archive grid,
the stack and the timeline all render plainly on purpose. Don't wrap new sections in it.

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
  context — it must stay `relative`. The `≤860px` block had exactly this bug: the chip
  escaped to the page and rendered on top of the timeline. Restoring `relative` there
  also needs `top: auto`, because the base rule is `position: sticky; top: 96px` and a
  `relative` element still honours that `top`, shoving the photo down onto the window.
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
