# Shreyash Pattewar — Portfolio

> **Website:** https://shreyashp47.github.io/  
> **Current version:** v4 — Developer Dark Theme (static HTML/CSS/JS)

---

## Table of Contents

- [Version Registry](#version-registry)
- [Global](#global)
  - [Owner Info](#owner-info)
  - [Deployment](#deployment)
  - [Git Branches](#git-branches)
  - [License](#license)
- [v4 — Developer Dark Theme (current)](#v4--developer-dark-theme-current)
  - [Tech Stack](#v4-tech-stack)
  - [Commands](#v4-commands)
  - [Project Structure](#v4-project-structure)
  - [Architecture & Data Flow](#v4-architecture--data-flow)
  - [Files](#v4-files)
  - [Themes](#v4-themes)
  - [External Services](#v4-external-services)
  - [Responsive Breakpoints](#v4-responsive-breakpoints)
  - [Quality Checks (CI)](#v4-quality-checks)
- [v3 — Android Studio Theme (archived)](#v3--android-studio-theme-archived)
  - [Tech Stack](#v3-tech-stack)
  - [Commands](#v3-commands)
  - [Project Structure](#v3-project-structure)
  - [Architecture & Features](#v3-architecture--features)
  - [Components](#v3-components)
  - [Hooks](#v3-hooks)
  - [Data Layer](#v3-data-layer)
  - [Keyboard Shortcuts](#v3-keyboard-shortcuts)
  - [Interactive Terminal](#v3-interactive-terminal)
  - [HTML Entry Point](#v3-html-entry-point)
  - [Responsive Breakpoints](#v3-responsive-breakpoints)
- [v2 — VS Code Theme (archived)](#v2--vs-code-theme-archived)
- [v1 — Classic Static Site (archived)](#v1--classic-static-site-archived)

---

## Version Registry

| Version | Branch | Stack | Status |
|---------|--------|-------|--------|
| **v4** | `main` | Static HTML/CSS/JS | **current** |
| **v3** | `v3-android-studio` | React + Vite | archived |
| **v2** | `v2-vscode-theme` | React + Vite | archived |
| **v1** | `v1-classic` | Static HTML/CSS/JS | archived |

---

## Global

Info that applies across all versions.

### Owner Info

| Field | Value |
|-------|-------|
| Name | Shreyash Pattewar |
| Email | spattewar47@gmail.com |
| Phone | +91-9011559148 |
| Location | Pune, India |
| Resume | `v4/static/assets/resume.pdf` |
| GitHub | https://github.com/shreyashp47 |

### Deployment

#### Automatic
Push to `main` → GitHub Actions publishes the `v4/` directory to the `gh-pages` branch (served at the site root).

#### Manual
1. Go to GitHub Actions → "Deploy to GitHub Pages" workflow
2. Click "Run workflow"
3. Choose version from dropdown (v1, v2, v3 or v4). v1–v3 are checked out from their archive branches; v2/v3 are built with `npm ci && npm run build` and their `dist/` is published.

#### Workflow File (`.github/workflows/deploy.yml`)
- **Triggers:** `push` on `main`, `workflow_dispatch`
- On push: deploys v4 (the `v4/` directory, no build step)
- On manual dispatch: prompts for version selection (default `v4`)
- Uses `peaceiris/actions-gh-pages@v4`
- One deploy at a time (`concurrency: pages-deploy`, queued rather than cancelled), 15-minute timeout
- The version step also outputs `publish_dir` (`v1-site`, `v2-site/dist`, `v3-site/dist` or `v4`) and fails on an unknown version

### Git Branches

| Branch | Description |
|--------|-------------|
| `main` | v4 — static developer dark theme (current) |
| `v4-developer-theme` | v4 — original snapshot of the developer dark theme (archived, does not deploy) |
| `v3-android-studio` | v3 — React + Vite Android Studio theme |
| `v2-vscode-theme` | v2 — React + Vite VS Code IDE theme |
| `v1-classic` | v1 — Static HTML/CSS/JS portfolio |
| `gh-pages` (remote) | GitHub Pages deployment branch |

### License

© 2026 Shreyash Pattewar. All rights reserved.

---

---

# v4 — Developer Dark Theme (current)

Static, framework-free site in `v4/`, published as-is to the GitHub Pages root. Dark, terminal-inspired design with switchable accent themes.

<a id="v4-tech-stack"></a>
### Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| HTML5 / CSS3 | — | Markup and styling (CSS custom properties, no framework) |
| Vanilla JS | — | All logic, no bundler or build step |
| Font Awesome | 6.5.1 | UI and social icons (CDN) |
| Devicon | 2.16.0 | Technology icons (jsDelivr CDN, pinned) |
| Inter / JetBrains Mono | — | Body and code fonts (Google Fonts) |
| serve | ^14.2.6 | Local static server (dev only) |

<a id="v4-commands"></a>
### Commands

```bash
npm install
npm run dev       # serve v4/ on http://localhost:3000
npm run preview   # same as dev
```

<a id="v4-project-structure"></a>
### Project Structure

```
v4/
├── index.html                # Page shell and section markup
├── 404.html                  # Terminal-style not-found page (served by GitHub Pages)
├── robots.txt                # Allows all crawlers, points to sitemap
├── sitemap.xml               # Single root URL
└── static/
    ├── assets/               # profile.png (fallback), profile.webp (400×400, ~16 KB), resume.pdf
    ├── css/
    │   ├── base.css          # Reset, variables, typography, layout, reduced motion
    │   ├── components.css    # Navbar, hero, cards, marquee, forms, footer
    │   ├── responsive.css    # Media queries
    │   └── motion.css        # Animations (entrance, hover, theme switch); neutralised by reduced motion
    └── js/
        ├── config.js         # All site content
        ├── themes.js         # Accent themes + localStorage persistence
        ├── effects.js        # Typewriter, scroll reveal
        ├── render.js         # DOM rendering from CONFIG + GitHub data
        ├── navigation.js     # Scroll progress, mobile menu, scroll-spy, dropdowns, theme toggle
        └── main.js           # Entry point
```

<a id="v4-architecture--data-flow"></a>
### Architecture & Data Flow

1. `index.html` provides the static shell: navbar, sections (`#hero`, `#about`, `#skills`, `#projects`, `#blog`, `#github`, `#contact`) and empty containers (`#skillsContainer`, `#projectsContainer`, `#blogContainer`, `#githubStats`, `#repoGrid`, …).
2. `themes.js` loads in `<head>` and applies the saved theme before first paint.
3. At the end of `<body>`, scripts load in order: `config.js` → `effects.js` → `render.js` → `navigation.js` → `main.js`.
4. `config.js` defines a global `CONFIG` object (single source of truth for content).
5. `render.js` reads `CONFIG` and fills each container: hero, about/bio, socials, skills marquee, project cards, LinkedIn post cards, contact details, footer, and GitHub stats cards. It fetches `https://api.github.com/users/<githubUsername>/repos` and shows the top repos sorted by stars, then by most recent push.
6. The contact form posts to formsubmit.co over AJAX (`/ajax/` endpoint) with status shown in a live region, and falls back to a regular form POST.
7. `navigation.js` and `effects.js` add interactivity: scroll progress, scroll-spy, mobile menu, dropdowns, theme toggle, typewriter and reveal-on-scroll (the typewriter shows static text and CSS disables animations under `prefers-reduced-motion`).

CSS/JS are referenced with `?v=N` cache-busting query strings, so bump them when a file changes.

<a id="v4-files"></a>
### Files

| File | Description |
|------|-------------|
| `config.js` | `name`, `tagline`, `bio`, social URLs, `email`, `resumePath`, `githubUsername`, `leetcodeUsername`, `skills` (by category), `projects`, `linkedinPosts` |
| `themes.js` | Theme definitions, `apply`/`next`, persistence in `localStorage` |
| `effects.js` | Scroll reveal (IntersectionObserver) and hero typewriter (static text under reduced motion) |
| `render.js` | All DOM rendering, skill icon mapping (Devicon), GitHub repo fetch, contact form submission |
| `navigation.js` | Scroll progress bar, mobile hamburger menu, scroll-spy, accessible dropdowns, theme toggle button |
| `main.js` | Bootstraps the modules on page load |

<a id="v4-themes"></a>
### Themes

| Theme | Description |
|-------|-------------|
| Purple Haze | Purple accent (first in the list) |
| Matrix Green | Green accent |
| Cyber Blue | Blue accent |

<a id="v4-external-services"></a>
### External Services

| Service | Use |
|---------|-----|
| GitHub REST API | Live repository list |
| github-readme-stats | Stats and top-languages cards |
| streak-stats.demolab.com | Contribution streak card |
| leetcard.jacoblin.cool | LeetCode stats card |
| formsubmit.co | Contact form delivery |

<a id="v4-responsive-breakpoints"></a>
### Responsive Breakpoints

Defined in `responsive.css`:

| Query | Changes |
|-------|---------|
| `max-width: 1024px` | Projects grid to 2 columns, hero card widens to 88vw |
| `max-width: 900px` | Nav links collapse into the hamburger menu |
| `max-width: 768px` | Single-column layout, full-width hero card, stacked CTA buttons, dropdown menus span the CTA row so they fit 320px screens |
| `max-width: 480px` | Tighter gutters (16px) and smaller hero type |
| `pointer: coarse` | Touch targets enlarged to ~44px (theme toggle, hamburger, back-to-top, social icons, small buttons) |

Verified with no horizontal overflow at 320, 360, 390, 414 and 768px. Lighthouse (mobile): Accessibility 100, Best Practices 100, SEO 100.

<a id="v4-quality-checks"></a>
### Quality Checks (CI)

`.github/workflows/ci.yml` runs on pull requests and on pushes to non-`main` branches:

| Check | Command |
|-------|---------|
| HTML validation | `npx --yes html-validate@8 v4/index.html v4/404.html` (config: `.htmlvalidate.json`) |
| JS syntax | `node --check` on each `v4/static/js/*.js` |
| Local links | `node .github/scripts/check-links.mjs v4/index.html v4/404.html` |

`.github/dependabot.yml` opens monthly update PRs for GitHub Actions and npm.

---

---

# v3 — Android Studio Theme (archived)

Preserved on the `v3-android-studio` branch. The documentation below describes that branch.

<a id="v3-tech-stack"></a>
### Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | ^18.3.1 | UI library |
| Vite | ^6.0.0 | Build tool & dev server |
| React DOM | ^18.3.1 | DOM rendering |
| Pure CSS | — | All styling (no frameworks) |
| Font Awesome | 6.5.1 | Icons (CDN) |
| JetBrains Mono | — | Code font (Google Fonts) |
| Syne | — | Heading font (Google Fonts) |

**Darcula-inspired theme** with CSS Custom Properties (`--as-*` variables).

<a id="v3-commands"></a>
### Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

<a id="v3-project-structure"></a>
### Project Structure

```
.
├── .github/workflows/deploy.yml
├── AGENTS.md
├── README.md
├── PORTFOLIO.md
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── Shreyash_Pattewar_Android_Resume.pdf
├── dist/
└── src/
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Root AS IDE shell component
    ├── index.css                   # Global styles (Darcula theme)
    ├── data/
    │   └── content.js              # All portfolio data
    ├── hooks/
    │   ├── useTypingAnimation.js   # Typewriter effect hook
    │   └── useTheme.js             # Theme persistence hook
    └── components/
        ├── Terminal.jsx            # Interactive terminal emulator
        ├── ThemeSwitcher.jsx        # Theme selection overlay
        ├── CommandPalette.jsx       # Quick file search (Ctrl+P)
        └── views/                  # 8 view components (same as v2)
```

<a id="v3-architecture--features"></a>
### Architecture & Features

#### Layout (CSS Grid)

The page mimics Android Studio / IntelliJ IDEA's layout:

```
┌──────────────────────────────────────────┐
│ Menu Bar (File, Edit, View, ...)   28px   │
├──────────────────────────────────────────┤
│ Toolbar (nav, build, run)         30px   │
├──────────┬───────────────────────────────┤
│          │                               │
│ Project  │  Editor Area                  │
│ Panel    │  (tabs + content)             │
│ (240px)  │                               │
│          │                               │
├──────────┴───────────────────────────────┤
│ Tool Window Bar (Terminal, TODO, etc) 26px│
├──────────────────────────────────────────┤
│ Status Bar                        22px   │
└──────────────────────────────────────────┘
```

#### Features

- **Menu Bar**: 13 menu items (File, Edit, View, Navigate, Code, Analyze, Refactor, Build, Run, Tools, VCS, Window, Help)
- **Toolbar**: Navigation arrows, project toggle, build/run/debug buttons
- **Project Panel**: File tree on the left with folder icons
- **Editor Tabs**: Open/close tabs with fallback logic
- **Tool Window Bar**: Bottom panel with Terminal, TODO, Logcat, Build, Run toggles
- **Mobile Responsive**: Menu-only on mobile, nav panel as slide-in overlay
- **Interactive Terminal**: In-browser terminal emulator
- **Command Palette**: Quick file navigation (Ctrl+P)
- **Live GitHub Integration**: Fetches real repo data from GitHub API
- **Typewriter Effect**: Animated subtitle on the home page

<a id="v3-components"></a>
### Components

#### `App.jsx` — Root IDE Shell

**State:** `activeFile`, `navOpen`, `terminalOpen`, `paletteOpen`, `themeSwitcherOpen`, `isMobile`, `mobileNav`, `openTabs`, `activeMenu`

**Key functions:**
- `openFile(fileId)` — Adds tab and sets it active, closes mobile nav
- `closeTab(e, id)` — Removes tab, falls back to adjacent tab

**Menu bar:** Android Studio-style menu items with highlight on click

**Toolbar:** Grouped buttons for navigation, project, build, run, debug, stop, search, theme, GitHub

**View mapping:**

| File ID | Component | Title |
|---------|-----------|-------|
| `home` | `Home` | Home.tsx |
| `about` | `About` | About.tsx |
| `projects` | `Projects` | Projects.tsx |
| `skills` | `Skills` | Skills.tsx |
| `experience` | `Experience` | Experience.tsx |
| `github` | `Github` | Github.tsx |
| `contact` | `Contact` | Contact.tsx |
| `readme` | `Readme` | README.md |

#### `Terminal.jsx` — Interactive Terminal
Same as v2. Green `$` prompt, command history, auto-scroll.

#### `ThemeSwitcher.jsx` — Theme Selection
Same as v2. Lists all themes, highlights active.

#### `CommandPalette.jsx` — Quick File Search
Same as v2. VS Code-style quick open with file filtering.

#### View Components
Same 8 view components as v2 (Home, About, Projects, Skills, Experience, Github, Contact, Readme). All receive `onNavigate` prop for programmatic navigation.

<a id="v3-hooks"></a>
### Hooks

#### `useTypingAnimation.js`
Cycles through an array of strings with a typewriter effect (same as v2).

#### `useTheme.js`
Manages theme state with localStorage persistence (same as v2).

<a id="v3-data-layer"></a>
### Data Layer

All content centralized in `src/data/content.js` as named exports (same as v2 — 16 exports).

<a id="v3-keyboard-shortcuts"></a>
### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + P` | Toggle command palette |
| `Ctrl/Cmd + `` ` | Toggle terminal |
| `Escape` | Close palette / theme switcher / menu |

<a id="v3-interactive-terminal"></a>
### Interactive Terminal

Opened via `Ctrl+`` ` or the Tool Window Bar button.

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `clear` | Clear terminal output |
| `whoami` | Display portfolio owner info |
| `ls` | List all available sections |
| `cat <section>` / `open <section>` | Navigate to a section |
| `pwd` | Print current "working directory" |
| `date` | Show current date and time |
| `echo <text>` | Echo back text |
| `neofetch` | Display system-like info about the developer |

<a id="v3-html-entry-point"></a>
### HTML Entry Point (`index.html`)

- **Title:** "Shreyash Pattewar | Mobile & AI Developer"
- **Meta:** "Android & iOS developer exploring LLMs and AI agents"
- **Favicon:** Inline SVG — dark square with cyan "SP"
- **Fonts:** JetBrains Mono (300–600), Syne (700, 800) from Google Fonts
- **Icons:** Font Awesome 6.5.1 via CDN
- **Mounts:** `<div id="root">` with Vite module script

<a id="v3-responsive-breakpoints"></a>
### Responsive Breakpoints

| Breakpoint | Target | Behavior |
|-----------|--------|----------|
| <1024px | Tablet | Single column, toolbar hidden, tw-bar hidden, nav as overlay, menu truncates |
| <768px | Mobile | Compact padding, stacked buttons |
| <480px | Small mobile | Tighter spacing, 2-col stats

---

---

# v2 — VS Code Theme (archived)

Preserved on the `v2-vscode-theme` branch. Full documentation available in PORTFOLIO.md on that branch.

---

---

# v1 — Classic Static Site (archived)

Preserved on the `v1-classic` branch.

<a id="v1-tech-stack"></a>
### Tech Stack

| Tool | Purpose |
|------|---------|
| HTML5 | Structure |
| CSS3 | Styling (3 separate files: base, components, responsive) |
| Vanilla JS | Logic (6 files: config, effects, main, navigation, render, themes) |
| Google Fonts | Typography |
| Font Awesome | Icons |

**No frameworks, no build step.** Pure static site.

<a id="v1-project-structure"></a>
### Project Structure

```
.
├── SS/
│   ├── Screenshot 2026-06-22 at 12.18.42 PM.png
│   └── Screenshot 2026-06-22 at 12.30.29 PM.png
├── Sensor-App/
│   └── privacy-policy.html
├── index.html
└── static/
    ├── css/
    │   ├── base.css              # Reset, typography, layout
    │   ├── components.css        # UI components
    │   └── responsive.css        # Media queries
    └── js/
        ├── config.js             # Portfolio data/config
        ├── effects.js            # Animations & effects
        ├── main.js               # Entry point
        ├── navigation.js         # Navigation logic
        ├── render.js             # DOM rendering
        └── themes.js             # Theme switching
```

<a id="v1-architecture--features"></a>
### Architecture & Features

#### Layout

Traditional single-page layout with smooth scrolling navigation. Header with nav links, content sections stacked vertically, footer.

#### Features

- **Single-page scrolling:** All sections on one page with anchor navigation
- **Theme switcher:** Light/dark theme toggle
- **Smooth scroll:** Animated scroll between sections
- **Responsive:** Separate responsive stylesheet for mobile/tablet
- **Project showcase:** Cards with links to GitHub, live demos, Play Store
- **Skill bars:** Animated progress bars on scroll
- **Contact form:** Functional contact form (or mailto fallback)
- **Privacy policy page:** Separate page in `Sensor-App/`

<a id="v1-components"></a>
### Components

#### CSS Files

| File | Description |
|------|-------------|
| `base.css` | CSS reset, variables, typography, grid layout |
| `components.css` | Navigation bar, hero, about cards, skill bars, project cards, timeline, contact form, footer |
| `responsive.css` | Breakpoint adjustments for tablet/mobile |

#### JS Files

| File | Description |
|------|-------------|
| `config.js` | All portfolio data as JS objects (personal info, skills, projects, experience, social links) |
| `effects.js` | Scroll-triggered animations, typewriter effect, particle/background effects |
| `main.js` | Initializes app, renders content, sets up event listeners |
| `navigation.js` | Smooth scroll, active section highlighting, mobile hamburger menu |
| `render.js` | DOM manipulation — builds sections from `config.js` data |
| `themes.js` | Theme toggle, CSS variable swapping, localStorage persistence |

#### Sections

| Section | Description |
|---------|-------------|
| Home/Hero | Avatar, name, tagline, CTA buttons |
| About | Bio, stats, focus areas |
| Skills | Categories with animated progress bars |
| Projects | Card grid with tech tags and links |
| Experience | Timeline of work history |
| Contact | Contact form, social links, email |

<a id="v1-html-entry-point"></a>
### HTML Entry Point (`index.html`)

- **Title:** "Shreyash Pattewar | Android Developer"
- **Meta:** Standard meta tags for description, keywords, viewport
- **Favicon:** Static image file
- **Fonts:** Google Fonts (same as v2)
- **Icons:** Font Awesome via CDN
- **Structure:** `<nav>`, `<section id="home">`, `<section id="about">`, etc., `<footer>`
- **Scripts:** Loaded at bottom of body (config → effects → render → navigation → themes → main)

---

---

## Template — Adding a New Version

Copy the block below when adding v5, etc. Fill in every section.

```
# v<N> — <Framework/Description>

### Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| ... | ... | ... |

### Commands

```bash
# dev, build, preview commands
```

### Project Structure

```
# tree-style listing of all files
```

### Architecture & Features

#### Layout

[Describe the layout strategy — CSS Grid, Flexbox, framework-specific]

#### Features

- [List key features]

### Components

#### Root Component

**State:** [key state variables]
**Key functions:** [important methods]

**View mapping:**

| Route/ID | Component | Description |
|----------|-----------|-------------|
| ... | ... | ... |

#### Shared/Utility Components

| Component | Description |
|-----------|-------------|
| ... | ... |

#### View Components

| Component | Description |
|-----------|-------------|
| ... | ... |

### Hooks / Utilities

#### `<hook-name>`
- **Params:** ...
- **Returns:** ...
- **Purpose:** ...

### Data Layer

| Export | Type | Description |
|--------|------|-------------|
| ... | ... | ... |

### Themes

| Theme | Identifier | Description |
|-------|------------|-------------|
| ... | ... | ... |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| ... | ... |

### Interactive Features

[List any interactive elements — terminal, command palette, search, etc.]

### HTML Entry Point (`index.html`)

- **Title:** ...
- **Meta:** ...
- **Favicon:** ...
- **Fonts:** ...
- **Icons:** ...
- **Mounts:** ...

### Responsive Breakpoints

| Breakpoint | Target | Behavior |
|-----------|--------|----------|
| ... | ... | ... |

### Noteworthy Implementation Details

[Any interesting patterns, performance considerations, or architecture decisions]
```

---

> **To add a new version:** Paste the template above under the v1 section, fill each subsection, and add an entry to the [Version Registry](#version-registry) table at the top.
