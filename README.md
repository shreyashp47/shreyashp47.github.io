# Shreyash Pattewar — Developer Portfolio

[![Live site](https://img.shields.io/badge/live-shreyashp47.github.io-7c3aed?style=flat-square&logo=githubpages&logoColor=white)](https://shreyashp47.github.io/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/shreyashp47/shreyashp47.github.io/deploy.yml?branch=main&style=flat-square&label=deploy)](https://github.com/shreyashp47/shreyashp47.github.io/actions/workflows/deploy.yml)
[![CI](https://img.shields.io/github/actions/workflow/status/shreyashp47/shreyashp47.github.io/ci.yml?style=flat-square&label=ci)](https://github.com/shreyashp47/shreyashp47.github.io/actions/workflows/ci.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Live:** https://shreyashp47.github.io/ and https://shreyashpattewar.web.app/ (the same site, deployed to both)

Personal portfolio of Shreyash Pattewar, an AI engineer building LLM agents and AI-powered apps, with an Android background. The current version (**v4**) is a dark, terminal-inspired developer theme built as a static site with plain HTML, CSS and vanilla JavaScript: no framework and no build step.

## Features

- **Terminal-style hero** with a typewriter role animation, resume download and three labelled dropdowns: `ai` (AI projects, with an "all ai projects" link that opens the projects section filtered), `apps` (Google Play) and `sites` (live websites)
- **Four accent themes** inspired by editor color schemes (Tokyo Night, Dracula, Gruvbox, Sunset): each visit starts with a random one; switch with the navbar toggle or by pressing <kbd>T</kbd>, and a toast confirms it as `$ export THEME=dracula`
- **Developer touches:** the <kbd>T</kbd> theme shortcut, the `export THEME=…` toast, and a styled greeting in the browser console (with the clone command and contact email) for anyone who opens DevTools
- **Skills marquee** grouped by category (AI & LLMs first), with local SVG and Font Awesome icons
- **Projects grid**, AI work first: each card has an 800×400 screenshot, a `live` / `play store` / `source` status chip, tech tags and GitHub / demo links. Filter chips (all, ai, android, web) sit above the grid, which starts with 6 cards (4 on phones) and a "show all" button
- **LinkedIn post cards** for recent writing (stacked compact cards on phones, excerpts clamped to 3 lines) with links to more posts on LinkedIn and Medium
- **GitHub section** with stats cards (GitHub stats, top languages, streak, LeetCode) colored from the active theme and recolored when it changes, plus a link to all repositories
- **Contact form** via formsubmit.co, sent over AJAX with a fallback to a normal form POST; on phones the social links become a compact tile grid
- **Motion:** hero terminal entrance with line-by-line reveal, circular theme-switch transition (View Transitions API), sliding nav indicator, cursor spotlight on cards, drawing section rules, rotating avatar ring, all disabled under `prefers-reduced-motion`
- **Navigation:** scroll-spy active links, a scroll progress bar and a responsive hamburger menu
- **Accessibility:** skip link, visible focus styles, labelled form fields and icon links, keyboard-accessible dropdowns and menus, live regions, and `prefers-reduced-motion` support (Lighthouse accessibility score: 100)
- **Mobile-first details:** full-width text buttons with the three dropdowns in equal thirds on phones (two rows at 769–900px), dropdown menus that fit 320px screens, 44px touch targets on touch devices, and no horizontal overflow from 320px up
- **Performance:** 16 KB WebP profile photo with PNG fallback, lazy-loaded WebP project screenshots (about 130 KB for all ten), and lazy-loaded stats cards with reserved dimensions
- **SEO:** content pre-rendered into the HTML (visible to crawlers and link previews without JavaScript), JSON-LD (`ProfilePage`, `Person`, `WebSite`, projects), Open Graph profile and X card tags with a 1200×630 preview image, `rel="me"` profile links, canonical URL, favicons and web manifest, `robots.txt`, `sitemap.xml`, `llms.txt` and a custom 404 page

## Tech Stack

| Layer | Tools |
|-------|-------|
| Markup | HTML5 |
| Styling | CSS3 with custom properties for theming (no CSS framework) |
| Logic | Vanilla JavaScript (no framework, no bundler) |
| Fonts & icons | Google Fonts (Inter, JetBrains Mono), Font Awesome 6.5.1, local SVG skill icons |
| Quality checks | html-validate, `node --check`, local link checker (GitHub Actions) |
| Hosting | GitHub Pages and Firebase Hosting (identical mirror), both deployed with GitHub Actions |
| Local dev | [`serve`](https://www.npmjs.com/package/serve) |

## Project Structure

```
.
├── .github/
│   ├── workflows/deploy.yml       # GitHub Pages deploy (v1–v4) + Firebase mirror (v4)
│   ├── workflows/ci.yml           # PR checks: html-validate, JS syntax, local links
│   ├── scripts/check-links.mjs    # Verifies every local href/src exists
│   └── dependabot.yml             # Monthly action / npm updates
├── .htmlvalidate.json             # html-validate config used by CI
├── .firebaserc / firebase.json    # Firebase Hosting: project shreyashpattewar, serves v4/
├── AGENTS.md                      # Short conventions for contributors / AI agents
├── PORTFOLIO.md                   # Detailed docs for every version
├── package.json                   # Dev scripts (serve, prerender)
├── scripts/prerender.mjs          # Writes config.js content, JSON-LD and llms.txt into v4/
└── v4/                            # The live site (published to the site root)
    ├── index.html                 # Page shell, section markup, script/style tags
    ├── 404.html                   # Terminal-style "not found" page
    ├── robots.txt / sitemap.xml   # Crawler hints
    ├── llms.txt                   # Generated plain-text profile for AI tools
    └── static/
        ├── assets/
        │   ├── icons/             # Colored SVG skill icons
        │   ├── projects/          # 800×400 WebP project screenshots
        │   ├── og-image.png       # 1200×630 link-preview image (contains the tagline)
        │   ├── profile.png        # Profile photo
        │   ├── profile.webp       # Profile photo (WebP)
        │   └── resume.pdf         # Downloadable resume
        ├── css/
        │   ├── base.css           # Reset, variables, typography, layout, reduced motion
        │   ├── components.css     # Navbar, hero, cards, marquee, forms, footer
        │   ├── responsive.css     # Breakpoints (1024 / 900 / 768 / 480px)
        │   └── motion.css         # Entrance, hover and theme-switch animations
        └── js/
            ├── config.js          # All site content (single source of truth)
            ├── themes.js          # Accent theme definitions + persistence; fires `themechange`
            ├── effects.js         # Typewriter, reveal-on-scroll, visual effects
            ├── render.js          # Renders config.js content, project filters and themed stats cards
            ├── navigation.js      # Scroll-spy, mobile menu, dropdowns, progress bar
            └── main.js            # Entry point: wires everything up on load
```

## Getting Started

Requires [Node.js](https://nodejs.org/) (only for the local static server).

```bash
git clone https://github.com/shreyashp47/shreyashp47.github.io.git
cd shreyashp47.github.io
npm install
npm run dev        # serves v4/ at http://localhost:3000
```

Since the site is plain static files, you can also open it with any static file server pointed at `v4/`.

## Quality Checks

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every pull request and on pushes to branches other than `main`. To run the same checks locally:

```bash
npx --yes html-validate@8 v4/index.html v4/404.html          # HTML validation (.htmlvalidate.json)
for f in v4/static/js/*.js; do node --check "$f"; done         # JS syntax
node .github/scripts/check-links.mjs v4/index.html v4/404.html # local href/src exist
npm run prerender:check                                         # pre-rendered HTML matches config.js
```

Recommended workflow: make changes on a feature branch, let CI pass on the pull request, then merge into `main` to deploy.

## Editing Content

All content lives in **`v4/static/js/config.js`**: name, tagline, bio, social links, email, resume path, skills, projects and LinkedIn posts. `render.js` builds the page from this object, so most updates need no HTML changes.

- **Add a project:** add an object to `projects` with `title`, `description`, `tech`, `github` and `demo` (use `""` when there is no source or demo), `tags` (any of `ai`, `android`, `web`; they drive the filter chips) and `image` (an 800×400 WebP in `v4/static/assets/projects/`). An optional `note` shows a short line on the card, such as a cold-start warning. The status chip is derived from the links: no demo means `source`, a Google Play link means `play store`, anything else means `live`.
- **Project order:** cards appear in the order of the `projects` array, and the first 6 (4 on phones) show before "show all". The order is AI-first on purpose.
- **Hero dropdowns:** the `ai`, `apps` and `sites` menus are plain HTML in `index.html`, so update them there when a project is added or removed.
- **Add a skill:** add it to the matching category array in `skills`, and give it an icon in `SKILL_ICONS` in `render.js` (`svg:<name>` for a file in `static/assets/icons/`, otherwise a Font Awesome class).
- **Replace the resume or photo:** overwrite the files in `v4/static/assets/`.
- **Change the tagline:** update `tagline` in `config.js`, the static hero and meta tags in `index.html` and `site.webmanifest`, regenerate `og-image.png` (the tagline is part of the image), and bump the `?v=` on its `og:image` / `twitter:image` URLs so LinkedIn and X fetch the new one.

**After editing `config.js`, run `npm run prerender`.** It writes the content into `index.html` (between `<!-- prerender:… -->` markers) and regenerates the JSON-LD and `v4/llms.txt`, using the same templates as `render.js`. CI fails if you forget (`npm run prerender:check`). Don't hand-edit between the markers.

**Cache busting:** `index.html` loads CSS and JS with `?v=N` query strings. After changing a stylesheet or script, bump its `?v=` number so returning visitors get the new file instead of a cached copy from GitHub Pages.

## Theming

Themes are defined in `v4/static/js/themes.js`, and each one sets CSS custom properties used across the stylesheets. Every visit starts with a random theme. The navbar toggle (palette icon) or the <kbd>T</kbd> key (ignored while typing in a form field) cycles through the themes, and a theme picked this way is kept in `sessionStorage`, so it survives reloads in that tab but the next visit is random again. Switching dispatches a `themechange` event on `document`, which `render.js` uses to recolor the third-party stats cards. `themes.js` loads in `<head>` so the theme is applied before first paint. To add a theme, add an entry to `THEMES` with an `id` (shown in the toast), a `name`, its accent colors and `onAccent`, the text color used on accent fills such as the primary button. Use a dark `onAccent` for light accents. The background colors are fixed in `base.css` and are not part of a theme.

## Deployment & Versions

The site is served from two places, always with identical content, by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

- **GitHub Pages** (https://shreyashp47.github.io/): `peaceiris/actions-gh-pages` publishes to the `gh-pages` branch.
- **Firebase Hosting** (https://shreyashpattewar.web.app/): the `firebase` job deploys the same `v4/` folder with `FirebaseExtended/action-hosting-deploy` to project `shreyashpattewar` (config in `firebase.json`: long caching for versioned CSS/JS, one day for images, no-cache for HTML). It needs the repo secret `FIREBASE_SERVICE_ACCOUNT_SHREYASHPATTEWAR`, created once with `firebase init hosting:github`. Manual deploy: `firebase deploy --only hosting`.

- **Automatic:** pushing to `main` publishes the `v4/` directory as the site root on both hosts, so every change shows up on both URLs.
- **Manual:** open **Actions → Deploy to GitHub Pages → Run workflow** and choose a version.

| Version | Branch | Stack | Status |
|---------|--------|-------|--------|
| **v4** | `main` | Static HTML / CSS / vanilla JS: developer dark theme | **Current** |
| v3 | `v3-android-studio` | React + Vite: Android Studio IDE theme | Archived |
| v2 | `v2-vscode-theme` | React + Vite: VS Code IDE theme | Archived |
| v1 | `v1-classic` | Static HTML / CSS / JS: original classic site | Archived |

v2 and v3 are built with `npm ci && npm run build` in CI. v1 and v4 are published as-is. See [PORTFOLIO.md](PORTFOLIO.md) for detailed documentation of each version.

## Credits

Third-party services and assets used by the site:

- [Font Awesome](https://fontawesome.com/): UI and social icons
- [Google Fonts](https://fonts.google.com/): Inter and JetBrains Mono
- [github-readme-stats](https://github.com/anuraghazra/github-readme-stats): GitHub stats and top-languages cards
- [GitHub Readme Streak Stats](https://streak-stats.demolab.com/): contribution streak card
- [LeetCard](https://github.com/JacobLinCool/LeetCode-Stats-Card): LeetCode stats card
- [FormSubmit](https://formsubmit.co/): contact form delivery

## Copyright

© 2026 Shreyash Pattewar. All rights reserved.
