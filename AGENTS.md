# AGENTS.md — Portfolio

## Stack

- **Frontend:** HTML + CSS + Vanilla JS (no frameworks, no build step)
- **Config:** Embedded as `CONFIG` JS object inline in `portfolio/index.html`
- **Runtime:** Static site — open `portfolio/index.html` in a browser
- **Hosting:** GitHub Pages / Netlify / any static file server
- **Deprecated (removed):** Flask backend, Jinja2 templating, Python deps

## Commands

```bash
# No build step needed. Just open the file:
open portfolio/index.html
```

## Architecture

- **`portfolio/index.html`** — single self-contained page. All content is in a `CONFIG` JS object at the bottom of `<body>`. Edit it to update name, bio, skills, projects, links, and LinkedIn posts.
- **`portfolio/static/css/style.css`** — design system via `:root` variables. Orange/amber accent scheme.
- **`portfolio/static/js/main.js`** — reads `CONFIG` to render all sections, fetches GitHub repos directly from `api.github.com`, handles typewriter + scroll reveal + contact form.
- **`portfolio/static/assets/`** — `resume.pdf`, `profile.png`

## Key conventions

- CSS design system in `:root` variables (see `--accent-orange`, `--accent-amber`)
- Scroll reveal: add `.reveal` class to any element; JS Intersection Observer adds `.visible`
- Skills use Devicon classes — names derived from config strings (lowercased, spaces → hyphens). Some mobile icons (Flutter, Swift) may need manual class overrides.
- GitHub repo cards fetched client-side from `api.github.com` (unauthenticated, 60 req/hr limit)
- Contact form submits to Formspree — replace `YOUR_FORM_ID` in `index.html` with a real Formspree endpoint

## Gotchas

- Typewriter phrases are hardcoded in `main.js` — not config-driven.
- Resume PDF at `static/assets/resume.pdf` — must exist or CTA link breaks.
- Profile image at `static/assets/profile.png` — update the `<img>` src if format changes.
- GitHub API is unauthenticated (60 req/hr). For higher limits, add a token in the fetch headers.
- Subject is a mobile + AI developer (Android/iOS with Kotlin, Swift, Flutter, plus LLM agents, MCP servers, and Python-based AI projects). Content in the `CONFIG` object reflects this — don't treat as a web dev portfolio.
