# Shreyash Pattewar — Portfolio

**🌐 [shreyashp47.github.io](https://shreyashp47.github.io/)**

Android Developer with 7+ years of experience building 30+ high-impact apps for enterprise clients.

Built with **React + Vite**, featuring a VS Code-inspired IDE theme.

## Sections

- **Home** — Landing page with typing animation & quick stats
- **About** — Bio, focus areas, education, certifications & awards
- **Projects** — Personal & enterprise apps with links
- **Skills** — Tech stack categorized with proficiency bars
- **Experience** — Work history timeline
- **GitHub** — Live repos, contribution graph & stats
- **Contact** — Social links & email
- **README** — This page

## Tech Stack

React 18, Vite, JavaScript, CSS (Custom Properties for theming)

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Switch Between v1 & v2

Two versions are preserved as branches:

| Version | Branch | Description |
|---------|--------|-------------|
| **v1 (classic)** | `v1-classic` | Original static HTML/CSS/JS site |
| **v2 (current)** | `main` / `v2` | React + Vite VS Code IDE theme |

### Via GitHub Actions (no code needed)

1. Go to **Actions** tab → **Deploy to GitHub Pages** workflow
2. Click **Run workflow**
3. Choose **v1** or **v2** from the dropdown
4. Site updates at **shreyashp47.github.io**

### Via CLI

```bash
# Deploy v1
git checkout main && git reset --hard v1-classic && git push origin main --force

# Deploy v2
git checkout main && git reset --hard v2 && git push origin main --force
```

## License

© 2026 Shreyash Pattewar. All rights reserved.
