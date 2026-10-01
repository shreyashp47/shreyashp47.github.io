# Shreyash Pattewar — Developer Portfolio

[![Live site](https://img.shields.io/badge/live-shreyashp47.github.io-7c3aed?style=flat-square&logo=githubpages&logoColor=white)](https://shreyashp47.github.io/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/shreyashp47/shreyashp47.github.io/deploy.yml?branch=main&style=flat-square&label=deploy)](https://github.com/shreyashp47/shreyashp47.github.io/actions/workflows/deploy.yml)
[![CI](https://img.shields.io/github/actions/workflow/status/shreyashp47/shreyashp47.github.io/ci.yml?style=flat-square&label=ci)](https://github.com/shreyashp47/shreyashp47.github.io/actions/workflows/ci.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**Live:** https://shreyashp47.github.io/

Personal portfolio of Shreyash Pattewar, a software engineer working on AI and mobile (Android, iOS and AI agents). The current version (**v4**) is a dark, terminal-inspired developer theme built as a static site with plain HTML, CSS and vanilla JavaScript: no framework and no build step.

## Features

- **Terminal-style hero** with a typewriter role animation, resume download and quick links to live apps
- **Three accent themes** (Purple Haze, Matrix Green, Cyber Blue), switchable from the navbar and saved in `localStorage`
- **Skills marquee** grouped by category, with Devicon tech icons
- **Projects grid** with tech-stack tags, GitHub links and Play Store / live-demo links
- **LinkedIn post cards** for recent writing
- **GitHub section** with stats cards (GitHub stats, top languages, streak, LeetCode) and the top repositories loaded live from the GitHub REST API
- **Contact form** via formsubmit.co, sent over AJAX with a fallback to a normal form POST
- **Navigation:** scroll-spy active links, a scroll progress bar and a responsive hamburger menu
- **Accessibility:** skip link, visible focus styles, labelled form fields and icon links, keyboard-accessible dropdowns and menus, live regions, and `prefers-reduced-motion` support (Lighthouse accessibility score: 100)
- **Mobile-first details:** full-width hero and stacked buttons on phones, dropdown menus that fit 320px screens, 44px touch targets on touch devices, and no horizontal overflow from 320px up
- **Performance:** 16 KB WebP profile photo with PNG fallback, lazy-loaded stats cards with reserved dimensions, and a pinned Devicon version
- **SEO:** meta description, Open Graph tags, `robots.txt`, `sitemap.xml` and a custom terminal-style 404 page

## Tech Stack

| Layer | Tools |
|-------|-------|
| Markup | HTML5 |
| Styling | CSS3 with custom properties for theming (no CSS framework) |
| Logic | Vanilla JavaScript (no framework, no bundler) |
| Fonts & icons | Google Fonts (Inter, JetBrains Mono), Font Awesome 6.5.1, Devicon 2.16.0 |
| Quality checks | html-validate, `node --check`, local link checker (GitHub Actions) |
| Hosting | GitHub Pages, deployed with GitHub Actions |
| Local dev | [`serve`](https://www.npmjs.com/package/serve) |

## Project Structure

```
.
├── .github/
│   ├── workflows/deploy.yml       # GitHub Pages deploy (v1–v4)
│   ├── workflows/ci.yml           # PR checks: html-validate, JS syntax, local links
│   ├── scripts/check-links.mjs    # Verifies every local href/src exists
│   └── dependabot.yml             # Monthly action / npm updates
├── .htmlvalidate.json             # html-validate config used by CI
├── AGENTS.md                      # Short conventions for contributors / AI agents
├── PORTFOLIO.md                   # Detailed docs for every version
├── package.json                   # Dev scripts (serve)
└── v4/                            # The live site (published to the site root)
    ├── index.html                 # Page shell, section markup, script/style tags
    ├── 404.html                   # Terminal-style "not found" page
    ├── robots.txt / sitemap.xml   # Crawler hints
    └── static/
        ├── assets/
        │   ├── profile.png        # Profile photo
        │   ├── profile.webp       # Profile photo (WebP)
        │   └── resume.pdf         # Downloadable resume
        ├── css/
        │   ├── base.css           # Reset, variables, typography, layout, reduced motion
        │   ├── components.css     # Navbar, hero, cards, marquee, forms, footer
        │   └── responsive.css     # Breakpoints (1024 / 900 / 768 / 480px)
        └── js/
            ├── config.js          # All site content (single source of truth)
            ├── themes.js          # Accent theme definitions + persistence
            ├── effects.js         # Typewriter, reveal-on-scroll, visual effects
            ├── render.js          # Renders config.js content + GitHub data into the DOM
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
```

Recommended workflow: make changes on a feature branch, let CI pass on the pull request, then merge into `main` to deploy.

## Editing Content

All content lives in **`v4/static/js/config.js`**: name, tagline, bio, social links, email, resume path, skills, projects and LinkedIn posts. `render.js` builds the page from this object, so most updates need no HTML changes.

- **Add a project:** append an object to `projects` with `title`, `description`, `tech`, `github` and `demo` (use `""` when there is no demo).
- **Add a skill:** add it to the matching category array in `skills`.
- **Replace the resume or photo:** overwrite the files in `v4/static/assets/`.

**Cache busting:** `index.html` loads CSS and JS with `?v=N` query strings. After changing a stylesheet or script, bump its `?v=` number so returning visitors get the new file instead of a cached copy from GitHub Pages.

## Theming

Themes are defined in `v4/static/js/themes.js`, and each one sets CSS custom properties used across the stylesheets. The navbar toggle cycles through the themes, and the chosen theme is saved in `localStorage`. `themes.js` loads in `<head>` so the saved theme is applied before first paint. To add a theme, add an entry to the themes list with its accent colors.

## Deployment & Versions

The site deploys to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), using `peaceiris/actions-gh-pages` to publish to the `gh-pages` branch.

- **Automatic:** pushing to `main` or `v4-developer-theme` publishes the `v4/` directory as the site root.
- **Manual:** open **Actions → Deploy to GitHub Pages → Run workflow** and choose a version.

| Version | Branch | Stack | Status |
|---------|--------|-------|--------|
| **v4** | `main`, `v4-developer-theme` | Static HTML / CSS / vanilla JS: developer dark theme | **Current** |
| v3 | `v3-android-studio` | React + Vite: Android Studio IDE theme | Archived |
| v2 | `v2-vscode-theme` | React + Vite: VS Code IDE theme | Archived |
| v1 | `v1-classic` | Static HTML / CSS / JS: original classic site | Archived |

v2 and v3 are built with `npm ci && npm run build` in CI. v1 and v4 are published as-is. See [PORTFOLIO.md](PORTFOLIO.md) for detailed documentation of each version.

## Credits

Third-party services and assets used by the site:

- [Font Awesome](https://fontawesome.com/): UI and social icons
- [Devicon](https://devicon.dev/): technology icons
- [Google Fonts](https://fonts.google.com/): Inter and JetBrains Mono
- [github-readme-stats](https://github.com/anuraghazra/github-readme-stats): GitHub stats and top-languages cards
- [GitHub Readme Streak Stats](https://streak-stats.demolab.com/): contribution streak card
- [LeetCard](https://github.com/JacobLinCool/LeetCode-Stats-Card): LeetCode stats card
- [FormSubmit](https://formsubmit.co/): contact form delivery
- [GitHub REST API](https://docs.github.com/en/rest): live repository list

## Copyright

© 2026 Shreyash Pattewar. All rights reserved.
