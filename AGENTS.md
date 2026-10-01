# Project Conventions

## Versions
- **main** — Current: v4 static developer dark theme (HTML/CSS/vanilla JS) in `v4/`. The only branch that auto-deploys
- **v4-developer-theme** — Original v4 snapshot (archived)
- **v3-android-studio** — React + Vite Android Studio IDE theme (archived)
- **v2-vscode-theme** — React + Vite VS Code IDE theme (archived)
- **v1-classic** — Original static HTML/CSS/JS portfolio (archived)

## Editing v4
- All site content (bio, projects, skills, LinkedIn posts, social links) lives in `v4/static/js/config.js`; `render.js` renders it.
- When changing any CSS/JS file, bump its `?v=` cache-busting query param in `v4/index.html`.
- After changing `config.js` or the templates in `render.js`, run `npm run prerender` (updates pre-rendered HTML between `<!-- prerender:* -->` markers, JSON-LD and `v4/llms.txt`). Never hand-edit between markers; CI checks this.
- Don't change site text/content unless asked; keep layouts working down to 320px and touch targets ~44px.
- Work on a feature branch; pushing to `main` deploys immediately.

## CI
- `.github/workflows/ci.yml` runs html-validate, `node --check` on JS, and a local link check on PRs / non-main pushes
- Run locally: `npx --yes html-validate@8 v4/index.html v4/404.html && node .github/scripts/check-links.mjs v4/index.html v4/404.html`

## Deploy
- **Auto**: Push to `main` → publishes the `v4/` directory to the site root (https://shreyashp47.github.io/)
- **Manual**: GitHub Actions → "Deploy to GitHub Pages" → pick v1, v2, v3, or v4 (built from the branches above)

## Commands
- `npm run dev` — Serve v4 locally (port 3000)
- `npm run dev:v1` — Serve a local `v1/` folder (port 3001); `v1/` is gitignored, so check out `v1-classic` into it first

## Docs
- `README.md` — overview; `PORTFOLIO.md` — detailed per-version docs

## Remote
- `origin` → https://github.com/shreyashp47/shreyashp47.github.io.git
