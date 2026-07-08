# Project Conventions

## Versions
- **v1-classic** — Original static HTML/CSS/JS portfolio
- **v2-vscode-theme** — React + Vite VS Code IDE theme (preserved)
- **v3-android-studio** — React + Vite Android Studio IDE theme
- **v4-developer-theme** — Static dev-portfolio dark theme
- **main** — Current: v4 (developer dark theme) at `/v4/`

## Deploy
- **Auto**: Push to `main` or `v4-developer-theme` → builds & deploys v4
- **Manual**: GitHub Actions → "Deploy to GitHub Pages" → pick v1, v2, v3, or v4

## Commands
- `npm run dev` — Serve v4 locally (port 3000)
- `npm run dev:v1` — Serve v1 locally (port 3001)

## Remote
- `origin` → https://github.com/shreyashp47/shreyashp47.github.io.git
