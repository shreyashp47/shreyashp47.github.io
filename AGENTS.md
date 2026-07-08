# Project Conventions

## Versions
- **v1-classic** — Original static HTML/CSS/JS portfolio
- **v2-vscode-theme** — React + Vite VS Code IDE theme (preserved)
- **v3** — React + Vite Android Studio IDE theme
- **main / v4** — Current: Static dev-portfolio dark theme

## Deploy
- **Auto**: Push to `main` → builds & deploys v4
- **Manual**: GitHub Actions → "Deploy to GitHub Pages" → pick v1, v2, v3, or v4

## Commands
- `npm run dev` — Serve v4 locally (port 3000)
- `npm run dev:v1` — Serve v1 locally (port 3001)
- `npm run dev:v3` — Start v3 React dev server
- `npm run build` — Build v3 for production (outputs to `dist/`)

## Remote
- `origin` → https://github.com/shreyashp47/shreyashp47.github.io.git
