# Shreyash Pattewar — Portfolio

> **Website:** https://shreyashp47.github.io/  
> **Role:** Android Developer — 7+ years, 30+ apps

---

## Table of Contents

- [Version Registry](#version-registry)
- [Global](#global)
  - [Owner Info](#owner-info)
  - [Deployment](#deployment)
  - [Git Branches](#git-branches)
  - [License](#license)
- [v3 — Android Studio Theme (current)](#v3--android-studio-theme-current)
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
- [v1 — Classic Static Site](#v1--classic-static-site)

---

## Version Registry

| Version | Branch | Stack | Status |
|---------|--------|-------|--------|
| **v3** | `main` | React + Vite | **current** |
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
| Resume | `public/Shreyash_Pattewar_Android_Resume.pdf` |
| GitHub | https://github.com/shreyashp47 |

### Deployment

#### Automatic
Push to `main` → GitHub Actions builds and deploys current version to `gh-pages`.

#### Manual
1. Go to GitHub Actions → "Deploy to GitHub Pages" workflow
2. Click "Run workflow"
3. Choose version from dropdown

#### Workflow File (`.github/workflows/deploy.yml`)
- **Triggers:** `push` on `main`, `workflow_dispatch`
- On push: auto-deploys whichever version is on `main`
- On manual dispatch: prompts for version selection
- Uses `peaceiris/actions-gh-pages@v4`

### Git Branches

| Branch | Description |
|--------|-------------|
| `main` | v3 — React + Vite Android Studio theme |
| `v2-vscode-theme` | v2 — React + Vite VS Code IDE theme |
| `v1-classic` | v1 — Static HTML/CSS/JS portfolio |
| `gh-pages` (remote) | GitHub Pages deployment branch |
| `update-portfolio-content` | Feature branch for content updates |

### License

© 2026 Shreyash Pattewar. All rights reserved.

---

---

# v3 — Android Studio Theme (current)

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

# v1 — Classic Static Site

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

Copy the block below when adding v3, v4, etc. Fill in every section.

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
