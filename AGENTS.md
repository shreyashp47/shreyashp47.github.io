# Project Conventions

## Versions
- **main** / **v4-developer-theme** — Current: v4 static developer dark theme (HTML/CSS/vanilla JS) in `v4/`
- **v3-android-studio** — React + Vite Android Studio IDE theme (archived)
- **v2-vscode-theme** — React + Vite VS Code IDE theme (archived)
- **v1-classic** — Original static HTML/CSS/JS portfolio (archived)

## Editing v4
- All site content (bio, projects, skills, LinkedIn posts, social links) lives in `v4/static/js/config.js`; `render.js` renders it.
- When changing any CSS/JS file, bump its `?v=` cache-busting query param in `v4/index.html`.

## Deploy
- **Auto**: Push to `main` or `v4-developer-theme` → publishes the `v4/` directory to the site root (https://shreyashp47.github.io/)
- **Manual**: GitHub Actions → "Deploy to GitHub Pages" → pick v1, v2, v3, or v4 (built from the branches above)

## Commands
- `npm run dev` — Serve v4 locally (port 3000)
- `npm run dev:v1` — Serve a local `v1/` folder (port 3001); `v1/` is gitignored, so check out `v1-classic` into it first

## Docs
- `README.md` — overview; `PORTFOLIO.md` — detailed per-version docs

## Remote
- `origin` → https://github.com/shreyashp47/shreyashp47.github.io.git
