# AGENTS.md — Portfolio

## Stack

- **Frontend:** HTML + CSS + Vanilla JS (no frameworks, no build step)
- **Config:** Embedded as `CONFIG` JS object inline in `index.html`
- **Runtime:** Static site — open `index.html` in a browser
- **Hosting:** GitHub Pages (`shreyashp47/shreyashp47` repo)
- **Deprecated (removed):** Flask backend, Jinja2 templating, Python deps

## Commands

```bash
# No build step needed. Just open the file:
open index.html
```

## Architecture

- **`index.html`** — single self-contained page. All content is in a `CONFIG` JS object at the bottom of `<body>`. Edit it to update name, bio, skills, projects, links, and LinkedIn posts.
- **`static/css/style.css`** — design system via `:root` variables. Orange/amber accent scheme.
- **`static/js/main.js`** — reads `CONFIG` to render all sections, fetches GitHub repos directly from `api.github.com`, handles typewriter + scroll reveal + contact form.
- **`static/assets/`** — `resume.pdf`, `profile.png`
- **`README.md`** — GitHub profile README (also in this repo, must stay for profile to work)

## Key conventions

- CSS design system in `:root` variables (see `--accent-orange`, `--accent-amber`)
- Scroll reveal: add `.reveal` class to any element; JS Intersection Observer adds `.visible`
- Skills use Devicon classes — names derived from config strings (lowercased, spaces → hyphens). Some mobile icons (Flutter, Swift) may need manual class overrides.
- GitHub repo cards fetched client-side from `api.github.com` (unauthenticated, 60 req/hr limit)
- Contact form submits to FormSubmit.co — works with no signup; sends to shreyashp47@gmail.com

## Gotchas

- Typewriter phrases are hardcoded in `main.js` — not config-driven.
- Resume PDF at `static/assets/resume.pdf` — must exist or CTA link breaks.
- Profile image at `static/assets/profile.png` — update the `<img>` src if format changes.
- GitHub API is unauthenticated (60 req/hr). For higher limits, add a token in the fetch headers.
- Subject is a mobile + AI developer (Android/iOS with Kotlin, Swift, Flutter, plus LLM agents, MCP servers, and Python-based AI projects). Content in the `CONFIG` object reflects this — don't treat as a web dev portfolio.
