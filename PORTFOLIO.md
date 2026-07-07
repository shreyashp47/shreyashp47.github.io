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
- [v2 — React + Vite (current)](#v2--react--vite-current)
  - [Tech Stack](#v2-tech-stack)
  - [Commands](#v2-commands)
  - [Project Structure](#v2-project-structure)
  - [Architecture & Features](#v2-architecture--features)
  - [Components](#v2-components)
  - [Hooks](#v2-hooks)
  - [Data Layer](#v2-data-layer)
  - [Themes](#v2-themes)
  - [Keyboard Shortcuts](#v2-keyboard-shortcuts)
  - [Interactive Terminal](#v2-interactive-terminal)
  - [HTML Entry Point](#v2-html-entry-point)
  - [Responsive Breakpoints](#v2-responsive-breakpoints)
- [v1 — Classic Static Site](#v1--classic-static-site)
  - [Tech Stack](#v1-tech-stack)
  - [Project Structure](#v1-project-structure)
  - [Architecture & Features](#v1-architecture--features)
  - [Components](#v1-components)
  - [HTML Entry Point](#v1-html-entry-point)
- [Template — Adding a New Version](#template--adding-a-new-version)

---

## Version Registry

| Version | Branch | Stack | Status |
|---------|--------|-------|--------|
| **v2** | `main` / `v2` | React + Vite | **current** |
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
| `main` / `v2` | v2 — React + Vite portfolio |
| `v1-classic` | v1 — Static HTML/CSS/JS portfolio |
| `gh-pages` (remote) | GitHub Pages deployment branch |
| `update-portfolio-content` | Feature branch for content updates |

### License

© 2026 Shreyash Pattewar. All rights reserved.

---

---

# v2 — React + Vite (current)

<a id="v2-tech-stack"></a>
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

**Zero external CSS frameworks.** Theming is powered entirely by CSS Custom Properties.

<a id="v2-commands"></a>
### Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

<a id="v2-project-structure"></a>
### Project Structure

```
.
├── .github/workflows/deploy.yml   # GitHub Actions deploy config
├── AGENTS.md                       # AI assistant conventions
├── README.md                       # Project README
├── PORTFOLIO.md                    # This file
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── vite.config.js                  # Vite configuration
├── public/
│   └── Shreyash_Pattewar_Android_Resume.pdf
├── dist/                           # Production build output
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.css             # Minified CSS bundle
│   │   └── index-*.js              # Minified JS bundle
│   └── Shreyash_Pattewar_Android_Resume.pdf
└── src/
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Root IDE shell component
    ├── index.css                   # Global styles & themes
    ├── data/
    │   └── content.js              # All portfolio data
    ├── hooks/
    │   ├── useTypingAnimation.js   # Typewriter effect hook
    │   └── useTheme.js             # Theme persistence hook
    └── components/
        ├── Terminal.jsx            # Interactive terminal emulator
        ├── ThemeSwitcher.jsx        # Theme selection overlay
        ├── CommandPalette.jsx       # Quick file search (Ctrl+P)
        └── views/
            ├── Home.jsx            # Landing page with typing animation
            ├── About.jsx           # Bio, focus areas, education, certs, awards
            ├── Projects.jsx        # Project showcase grid
            ├── Skills.jsx          # Skill categories with progress bars
            ├── Experience.jsx      # Work history timeline
            ├── Github.jsx          # Live GitHub integration
            ├── Contact.jsx         # Social links
            └── Readme.jsx          # Portfolio README page
```

<a id="v2-architecture--features"></a>
### Architecture & Features

#### Layout (CSS Grid)

The page mimics VS Code's IDE layout:

```
┌─────────────────────────────────────────┐
│ Title Bar                   30px         │
├────┬──────────┬─────────────────────────┤
│    │          │                         │
│ A  │ Sidebar  │    Editor Area          │
│ c  │ (220px)  │    (1fr)                │
│ t  │          │                         │
│ i  │          │                         │
│ v  │          │                         │
│ i  │          │                         │
│ t  │          │                         │
│ y  │          │                         │
│    │          │                         │
│ 48 │          │                         │
│ px │          │                         │
├────┴──────────┴─────────────────────────┤
│ Status Bar                   22px         │
├─────────────────────────────────────────┤
│ Terminal (togglable)                     │
└─────────────────────────────────────────┘
```

#### Features

- **IDE-like Interface**: Activity bar, sidebar file explorer, editor tabs, status bar
- **File Tabs**: Open/close tabs with fallback logic
- **Mobile Responsive**: Slide-in sidebar with backdrop overlay at <1024px
- **Keyboard Shortcuts**: VS Code-inspired keybindings (Ctrl+P, Ctrl+`, Ctrl+B)
- **Theming**: 6 dark themes via CSS custom properties
- **Interactive Terminal**: In-browser terminal emulator
- **Command Palette**: Quick file navigation (Ctrl+P)
- **Live GitHub Integration**: Fetches real repo data from GitHub API
- **Typewriter Effect**: Animated subtitle on the home page
- **Theme Persistence**: Saves selection to `localStorage`

<a id="v2-components"></a>
### Components

#### `App.jsx` — Root IDE Shell

**State:** `activeFile`, `sidebarOpen`, `terminalOpen`, `paletteOpen`, `themeSwitcherOpen`, `isMobile`, `mobileSidebar`, `openTabs`

**Key functions:**
- `openFile(fileId)` — Adds tab and sets it active
- `closeTab(fileId)` — Removes tab, falls back to adjacent tab

**Activity bar:** Explorer (files), Search (palette), Terminal, Theme palette, GitHub link

**Status bar:** Branch name, language, Prettier, theme name, cursor position, encoding, mobile hamburger

**View mapping:**

| File ID | Component | Title |
|---------|-----------|-------|
| `home` | `Home` | Home.jsx |
| `about` | `About` | About.jsx |
| `projects` | `Projects` | Projects.jsx |
| `skills` | `Skills` | Skills.jsx |
| `experience` | `Experience` | Experience.jsx |
| `github` | `Github` | Github.jsx |
| `contact` | `Contact` | Contact.jsx |
| `readme` | `Readme` | README.md |

#### `Terminal.jsx` — Interactive Terminal

- Green `$` prompt, red error text, green command echo
- Command history navigation (ArrowUp/ArrowDown)
- Auto-scroll to bottom
- Togglable visibility

#### `ThemeSwitcher.jsx` — Theme Selection

Overlay listing all themes. Highlights active one. Calls `onSelect(id)` on click.

#### `CommandPalette.jsx` — Quick File Search

VS Code-style quick open. Filters files by name/ID as you type. Shows file icon + name + language label. Enter opens first result, Escape closes.

#### View Components

| Component | Description |
|-----------|-------------|
| `Home.jsx` | Avatar (initials), name, typing animation subtitle, 4 quick stats, CTA buttons |
| `About.jsx` | Multi-paragraph bio (bold highlights), 4 focus area cards, education table, certifications, awards, social links |
| `Projects.jsx` | 2-column grid of project cards with type/period, title, description, tech tags, links |
| `Skills.jsx` | 6 skill categories in a 2-column grid with progress bars + tag cloud |
| `Experience.jsx` | Vertical timeline with date, role, company, description, tech tags |
| `Github.jsx` | Fetches 12 repos from GitHub API, stats cards, contribution graph, repo grid with loading/error states |
| `Contact.jsx` | 7 social platform cards (icon, platform name, handle) |
| `Readme.jsx` | About section, skill tag badges, connect links, dynamic year |

<a id="v2-hooks"></a>
### Hooks

#### `useTypingAnimation.js`
Cycles through an array of strings with a typewriter effect.
- **Params:** `words`, `typingSpeed` (60ms), `deletingSpeed` (40ms), `pauseTime` (2000ms)
- **Returns:** `displayText`

#### `useTheme.js`
Manages theme state with localStorage persistence.
- **Storage key:** `portfolio-theme`
- **Default:** `'default'` (Default Dark+)
- **Returns:** `{ theme, setTheme }`
- Sets `document.documentElement.dataset.theme`

<a id="v2-data-layer"></a>
### Data Layer

All content centralized in `src/data/content.js` as named exports:

| Export | Type | Description |
|--------|------|-------------|
| `personal` | Object | Name, role, email, phone, location, resume URL |
| `taglines` | String[] | Typing animation phrases |
| `bio` | String | Multi-paragraph markdown-formatted bio |
| `focusAreas` | Object[] | Focus cards with title, description, icon |
| `quickStats` | Object[] | Stat counters |
| `education` | Object[] | Education entries |
| `social` | Object[] | Social platform links |
| `skills` | Object[] | Skill categories × items with percentage + color |
| `skillTags` | String[] | Skill tags |
| `experience` | Object[] | Work experience entries |
| `projects` | Object[] | Project entries |
| `certifications` | Object[] | Certification entries |
| `awards` | Object[] | Award entries |
| `blogPosts` | Object[] | Blog post entries |
| `files` | Object[] | File entries for sidebar/tabs |
| `themes` | Object[] | Theme entries |

<a id="v2-themes"></a>
### Themes

6 dark themes via CSS Custom Properties on `[data-theme="..."]` selectors.

| Theme | `data-theme` value | Description |
|-------|--------------------|-------------|
| Default Dark+ | *(empty string)* | VS Code default dark |
| Rose Pine | `rose-pine` | Soft rose/pine tones |
| Tokyo Night | `tokyo-night` | Deep blue/purple night |
| Catppuccin | `catppuccin` | Warm pastel dark |
| Nord | `nord` | Arctic, bluish cold |
| Gruvbox | `gruvbox` | Retro earthy dark |

Variables per theme: `--bg`, `--bg2`, `--bg3`, `--bg4`, `--title`, `--border`, `--text`, `--dim`, `--bright`, `--blue`, `--blue2`, `--green`, `--gcm`, `--yellow`, `--orange`, `--purple`, `--pink`, `--red`.

<a id="v2-keyboard-shortcuts"></a>
### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + P` | Toggle command palette |
| `Ctrl/Cmd + `` ` | Toggle terminal |
| `Ctrl/Cmd + B` | Toggle sidebar |
| `Escape` | Close palette / theme switcher |

<a id="v2-interactive-terminal"></a>
### Interactive Terminal

Opened via `Ctrl+`` ` or the activity bar terminal button.

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

Sections: home, about, projects, skills, experience, github, contact, readme.

<a id="v2-html-entry-point"></a>
### HTML Entry Point (`index.html`)

- **Title:** "Shreyash Pattewar | Mobile & AI Developer"
- **Meta:** "Android & iOS developer exploring LLMs and AI agents"
- **Favicon:** Inline SVG — dark square with cyan "SP"
- **Fonts:** JetBrains Mono (300–600), Syne (700, 800) from Google Fonts
- **Icons:** Font Awesome 6.5.1 via CDN
- **Mounts:** `<div id="root">` with Vite module script

<a id="v2-responsive-breakpoints"></a>
### Responsive Breakpoints

| Breakpoint | Target | Behavior |
|-----------|--------|----------|
| <1024px | Tablet | Sidebar becomes slide-in overlay, grids stack |
| <768px | Mobile | Full-width buttons, smaller text, stacked layouts |

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
