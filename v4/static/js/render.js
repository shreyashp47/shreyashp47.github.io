const Render = (() => {
  const C = CONFIG;

  const esc = (str) => String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  // Staggers reveal animations for items in the same grid (see [data-stagger] in base.css).
  const stagger = (i) => ` data-stagger="${Math.min(i, 5)}"`;

  // External links open in a new tab; mailto links stay in place. rel="me" ties profiles to this site.
  const linkAttrs = (url, me = false) => url.startsWith("mailto:")
    ? `href="${esc(url)}"`
    : `href="${esc(url)}" target="_blank" rel="noopener${me ? " me" : ""}"`;

  const SOCIALS = [
    { icon: "fab fa-github", url: C.githubUrl, label: "GitHub", value: C.githubUsername },
    { icon: "fab fa-linkedin-in", url: C.linkedinUrl, label: "LinkedIn", value: C.linkedinUrl.replace("https://", "") },
    { icon: "fab fa-x-twitter", url: C.twitterUrl, label: "X (Twitter)", value: `@${C.twitterUrl.split("/").pop()}` },
    { icon: "fab fa-medium-m", url: C.mediumUrl, label: "Medium", value: "medium.com/@shreyashp47" },
    { icon: "fab fa-stack-overflow", url: C.stackoverflowUrl, label: "Stack Overflow", value: "Stack Overflow" },
    { icon: "fab fa-instagram", url: C.instagramUrl, label: "Instagram", value: "@shreyashpattewar_" },
    { icon: "fas fa-envelope", url: `mailto:${C.email}`, label: "Email", value: C.email },
  ];

  // "svg:<name>" → local colored SVG at static/assets/icons/<name>.svg; anything else is a Font Awesome class.
  const SKILL_ICONS = {
    Kotlin: "svg:kotlin",
    Java: "svg:java",
    Swift: "svg:swift",
    Dart: "svg:dart",
    Flutter: "svg:flutter",
    Python: "svg:python",
    Firebase: "svg:firebase",
    Git: "svg:git",
    Docker: "svg:docker",
    Figma: "svg:figma",
    OpenAI: "fas fa-microchip",
    MCP: "fas fa-plug",
    LangChain: "fas fa-link",
    SQLite: "fas fa-database",
    Realm: "fas fa-server",
    Swagger: "svg:swagger",
    "Jetpack Compose": "fas fa-mobile-alt",
    TypeScript: "svg:typescript",
    "CI/CD": "fas fa-sync-alt",
    Notion: "fas fa-sticky-note",
  };

  const TECH_ICONS = {
    "Kotlin": "fab fa-android",
    "Android Sensors": "fab fa-android",
    "Jetpack Compose": "fab fa-android",
    "Room": "fab fa-android",
    "Hilt": "fab fa-android",
    "Python": "fab fa-python",
    "TypeScript": "fab fa-js",
    "Flask": "fas fa-flask",
    "HTML": "fab fa-html5",
    "Tailwind CSS": "fab fa-css3-alt",
    "LLM": "fas fa-brain",
    "MCP": "fas fa-server"
  };

  // HTML templates shared by the browser and scripts/prerender.mjs, so the
  // pre-rendered markup in index.html is identical to what the page renders.
  const templates = {
    about: () => C.bio.split("\n\n").map((p, i) =>
      `<p><span class="prompt">${i === 0 ? "└─$" : "   "}</span> <span class="cmd">echo</span> <span class="str">"${esc(p).replace(/\n/g, "\\n")}"</span></p>`
    ).join("<br>"),

    socials: () => SOCIALS.map(s =>
      `<a ${linkAttrs(s.url, true)} aria-label="${s.label}" title="${s.label}"><i class="${s.icon}" aria-hidden="true"></i></a>`
    ).join(""),

    contact: () => SOCIALS.map(s =>
      `<a ${linkAttrs(s.url, true)} class="contact-detail-item"><i class="${s.icon}" aria-hidden="true"></i> <span>${esc(s.value)}</span><i class="fas fa-arrow-right contact-arrow" aria-hidden="true"></i></a>`
    ).join(""),

    footer: (year) => `// &copy; ${year} ${esc(C.name)} &mdash; built with &lt;3 and a lot of coffee`,

    // withMarquee=false (pre-render) omits the decorative rows so crawlers see each skill once.
    skills: (withMarquee = true) => Object.entries(C.skills).map(([category, techList], idx) => {
      const iconHtml = (tech) => {
        const icon = SKILL_ICONS[tech] || "fas fa-code";
        return icon.startsWith("svg:")
          ? `<img src="static/assets/icons/${icon.slice(4)}.svg" alt="" width="16" height="16" loading="lazy" decoding="async">`
          : `<i class="${icon}"></i>`;
      };
      // One "set" must be wider than the viewport; two identical sets make the -50% loop seamless.
      const set = [];
      while (set.length < 10) set.push(...techList);
      const items = [...set, ...set].map((tech, i) =>
        `<div class="skill-marquee-item${i >= techList.length ? " dup" : ""}">${iconHtml(tech)}<span>${esc(tech)}</span></div>`
      ).join("");
      const labelId = `skills-cat-${idx}`;
      // Visible category label (JSON-key style) heads the screen-reader list; the marquee is decorative.
      return `<div class="skills-group">` +
        `<h3 class="skills-category" id="${labelId}"><span class="skills-category-punct" aria-hidden="true">"</span><span class="skills-category-key">${esc(category)}</span><span class="skills-category-punct" aria-hidden="true">":</span></h3>` +
        `<ul class="visually-hidden" aria-labelledby="${labelId}">${techList.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` +
        (withMarquee ? `<div class="skills-marquee${idx % 2 ? " reverse" : ""}" aria-hidden="true"><div class="skills-marquee-track" data-duration="${set.length * 3.5}">${items}</div></div>` : "") +
        `</div>`;
    }).join(""),

    projects: () => C.projects.map((proj, i) => {
      const techHtml = proj.tech.map(t => {
        const icon = TECH_ICONS[t] ? `<i class="${TECH_ICONS[t]}" aria-hidden="true"></i> ` : "";
        return `<span class="tech-badge">${icon}${esc(t)}</span>`;
      }).join("");
      let links = proj.github ? `<a ${linkAttrs(proj.github)} class="btn btn-small btn-ghost"><i class="fab fa-github" aria-hidden="true"></i> source</a>` : "";
      if (proj.demo) {
        const isPlayStore = proj.demo.includes("play.google.com");
        const icon = isPlayStore ? "fab fa-google-play" : "fas fa-external-link-alt";
        const label = isPlayStore ? "Play Store" : "demo";
        links += `<a ${linkAttrs(proj.demo)} class="btn btn-small btn-primary"><i class="${icon}" aria-hidden="true"></i> ${label}</a>`;
      }
      let testingHtml = "";
      if (proj.testing) {
        testingHtml = `<details class="project-testing">` +
          `<summary class="testing-summary"><i class="fab fa-google-play"></i> // open_testing.kt</summary>` +
          `<div class="testing-content">` +
          `<p>&gt; join tester group: <a ${linkAttrs(proj.testing.group)}>Google Groups</a></p>` +
          `<p>&gt; install from <a ${linkAttrs(proj.testing.playStore)}>Google Play</a></p>` +
          `<p>&gt; report issues: <a ${linkAttrs(`${proj.github}/issues`)}>GitHub Issues</a></p>` +
          `</div></details>`;
      }
      return `<article class="project-card reveal"${stagger(i % 3)}>` +
        `<h3 class="project-title">${esc(proj.title)}</h3>` +
        `<p class="project-desc">${esc(proj.description)}</p>` +
        `<div class="project-tech">${techHtml}</div>` +
        `<div class="project-links">${links}</div>` +
        `${testingHtml}</article>`;
    }).join(""),

    blog: () => C.linkedinPosts.map((post, i) =>
      `<article class="blog-card reveal"${stagger(i)}>` +
      `<p class="blog-date">// ${esc(post.date)}</p>` +
      `<p class="blog-excerpt">${esc(post.excerpt)}</p>` +
      `<div class="blog-meta">` +
      `<span><i class="fas fa-heart" aria-hidden="true"></i> ${post.likes}</span>` +
      `<a ${linkAttrs(post.url)} class="btn btn-small btn-ghost">read <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` +
      `</div></article>`
    ).join(""),
  };

  const fill = (id, html) => {
    const el = document.getElementById(id);
    if (el && el.innerHTML !== html) el.innerHTML = html;
  };

  function hero() {
    // Name/tagline are pre-rendered in index.html for crawlers; only sync if config differs.
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el && el.textContent !== text) el.textContent = text;
    };
    setText("heroName", `> ${C.name}`);
    setText("heroTagline", `> "${C.tagline}"`);
  }

  function about() {
    fill("aboutText", templates.about());
    fill("aboutSocials", templates.socials());
  }

  function footer() {
    fill("footerText", templates.footer(new Date().getFullYear()));
  }

  function skills() {
    fill("skillsContainer", templates.skills());
    document.querySelectorAll(".skills-marquee-track[data-duration]").forEach(t =>
      t.style.setProperty("--marquee-duration", `${t.dataset.duration}s`));
  }

  function projects() { fill("projectsContainer", templates.projects()); }

  function blog() { fill("blogContainer", templates.blog()); }

  function contact() { fill("contactDetails", templates.contact()); }

  function githubStats() {
    const container = document.getElementById("githubStats");
    const cards = [
      { src: `https://github-readme-stats.vercel.app/api?username=${C.githubUsername}&show_icons=true&theme=radical&hide_border=true`, alt: "GitHub stats", w: 467, h: 195 },
      { src: `https://streak-stats.demolab.com/?user=${C.githubUsername}&theme=radical&hide_border=true`, alt: "GitHub contribution streak", w: 495, h: 195 },
      { src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${C.githubUsername}&layout=compact&theme=radical&hide_border=true`, alt: "Most used languages", w: 300, h: 165 },
    ];
    if (C.leetcodeUsername) {
      cards.push({ src: `https://leetcard.jacoblin.cool/${C.leetcodeUsername}?theme=dark&font=JetBrains%20Mono&ext=heatmap&hide_border=true`, alt: "LeetCode stats", w: 500, h: 400 });
    }
    cards.forEach(c => {
      const img = document.createElement("img");
      img.src = c.src;
      img.alt = c.alt;
      img.width = c.w;
      img.height = c.h;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.addEventListener("error", () => img.remove());
      container.appendChild(img);
    });
  }

  function githubRepos() {
    const grid = document.getElementById("repoGrid");
    grid.setAttribute("aria-busy", "true");
    grid.innerHTML = Array.from({ length: 6 }, () => `
      <div class="repo-card skeleton" aria-hidden="true">
        <div class="sk-line sk-title"></div>
        <div class="sk-line"></div>
        <div class="sk-line sk-short"></div>
      </div>`).join("");

    fetch(`https://api.github.com/users/${C.githubUsername}/repos?per_page=100`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(repos => {
        grid.innerHTML = "";
        const langColors = {
          Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
          HTML: "#e34c26", CSS: "#563d7c", Java: "#b07219",
          Kotlin: "#A97BFF", Swift: "#F05138", Dart: "#00B4AB",
          Go: "#00ADD8", Rust: "#dea584", "C++": "#f34b7d",
          Ruby: "#701516", Shell: "#89e051", Dockerfile: "#384d54",
        };
        repos
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6)
          .forEach((repo, i) => {
            const color = langColors[repo.language] || "#7c3aed";
            const card = document.createElement("article");
            card.className = "repo-card reveal";
            card.dataset.stagger = Math.min(i % 3, 5);
            card.innerHTML = `
              <h3 class="repo-name"><i class="far fa-folder" aria-hidden="true"></i> <a href="${esc(repo.html_url)}" target="_blank" rel="noopener">${esc(repo.name)}</a></h3>
              <p class="repo-desc">${esc(repo.description || "No description provided.")}</p>
              <div class="repo-meta">
                ${repo.language ? `<span class="repo-lang"><span class="lang-dot" style="background:${color}"></span>${esc(repo.language)}</span>` : ""}
                <span aria-label="${repo.stargazers_count} stars">⭐ ${repo.stargazers_count}</span>
                <span aria-label="${repo.forks_count} forks">🍴 ${repo.forks_count}</span>
              </div>
            `;
            grid.appendChild(card);
            Effects.observe(card);
          });
      })
      .catch(() => { grid.innerHTML = `<p class="loading-text">// error: failed to fetch repositories</p>`; })
      .finally(() => grid.removeAttribute("aria-busy"));
  }

  function contactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;
    const btn = form.querySelector('button[type="submit"]');
    const label = btn.querySelector(".btn-label");
    const status = document.getElementById("formStatus");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      btn.disabled = true;
      label.textContent = "sending...";
      status.className = "form-status";
      status.textContent = "";

      // Submit in the background so visitors stay on the page; fall back to a normal post on failure.
      fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          if (data.success === false || data.success === "false") throw new Error();
          form.reset();
          status.classList.add("success");
          status.textContent = "// message sent — thanks! I'll get back to you soon.";
          btn.disabled = false;
          label.textContent = "send";
        })
        .catch(() => form.submit());
    });
  }

  return { hero, about, footer, skills, projects, blog, contact, githubStats, githubRepos, contactForm, templates };
})();
