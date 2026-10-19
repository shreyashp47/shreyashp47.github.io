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
    "JavaScript": "fab fa-js",
    "Node.js": "fab fa-node-js",
    "Chrome Extension": "fab fa-chrome",
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

    // Phones show the short platform label (compact tiles); wider screens show the handle.
    contact: () => SOCIALS.map(s => {
      const email = s.url.startsWith("mailto:");
      return `<a ${linkAttrs(s.url, true)} class="contact-detail-item${email ? " contact-detail-item--email" : ""}"><i class="${s.icon}" aria-hidden="true"></i> ` +
        `<span class="contact-value">${esc(s.value)}</span>` +
        (email ? "" : `<span class="contact-label">${esc(s.label)}</span>`) +
        `<i class="fas fa-arrow-right contact-arrow" aria-hidden="true"></i></a>`;
    }).join(""),

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
      const isPlayStore = proj.demo && proj.demo.includes("play.google.com");
      if (proj.demo) {
        const icon = isPlayStore ? "fab fa-google-play" : "fas fa-external-link-alt";
        const label = isPlayStore ? "Play Store" : "demo";
        links += `<a ${linkAttrs(proj.demo)} class="btn btn-small btn-primary"><i class="${icon}" aria-hidden="true"></i> ${label}</a>`;
      }
      // At-a-glance availability chip on the thumbnail, derived from the links.
      const [status, statusIcon] = !proj.demo ? ["source", "fas fa-code"] : isPlayStore ? ["play store", "fab fa-google-play"] : ["live", "fas fa-circle"];
      const thumb = proj.image
        ? `<div class="project-thumb"><img src="${esc(proj.image)}" alt="${esc(proj.title)} screenshot" width="800" height="400" loading="lazy" decoding="async">` +
          `<span class="project-status project-status--${status.replace(" ", "-")}"><i class="${statusIcon}" aria-hidden="true"></i> ${status}</span></div>`
        : "";
      const note = proj.note ? `<p class="project-note"><i class="fas fa-hourglass-half" aria-hidden="true"></i> ${esc(proj.note)}</p>` : "";
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
      return `<article class="project-card reveal" data-tags="${esc((proj.tags || []).join(" "))}"${stagger(i % 3)}>` +
        thumb +
        `<h3 class="project-title">${esc(proj.title)}</h3>` +
        `<p class="project-desc">${esc(proj.description)}</p>` +
        `<div class="project-tech">${techHtml}</div>` +
        note +
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

  // Third-party stat cards, colored from the active theme and recolored when it changes.
  function githubStats() {
    const container = document.getElementById("githubStats");
    const hex = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim().replace("#", "");
    const cards = () => {
      const a1 = hex("--accent-1"), a2 = hex("--accent-2"), bg = hex("--bg-secondary"), text = "d4d4d8", muted = hex("--text-muted");
      const list = [
        { src: `https://github-readme-stats.vercel.app/api?username=${C.githubUsername}&show_icons=true&hide_border=true&hide=contribs&bg_color=${bg}&title_color=${a1}&icon_color=${a2}&text_color=${text}&ring_color=${a1}`, alt: "GitHub stats", w: 467, h: 165 },
        { src: `https://streak-stats.demolab.com/?user=${C.githubUsername}&hide_border=true&background=${bg}&ring=${a1}&fire=${a2}&currStreakNum=${text}&sideNums=${a1}&currStreakLabel=${a2}&sideLabels=${muted}&dates=${muted}&stroke=${hex("--bg-surface")}`, alt: "GitHub contribution streak", w: 495, h: 195 },
        { src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${C.githubUsername}&layout=compact&hide_border=true&bg_color=${bg}&title_color=${a1}&text_color=${text}`, alt: "Most used languages", w: 300, h: 165 },
      ];
      if (C.leetcodeUsername) {
        list.push({ src: `https://leetcard.jacoblin.cool/${C.leetcodeUsername}?theme=dark&font=JetBrains%20Mono&hide_border=true&colors=${bg},${hex("--bg-surface")},${text},${muted},${a1},${a2},${hex("--accent-green")},${hex("--accent-orange")}`, alt: "LeetCode stats", w: 500, h: 200 });
      }
      return list;
    };
    cards().forEach(c => {
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
    document.addEventListener("themechange", () => {
      const next = cards();
      container.querySelectorAll("img").forEach(img => {
        const c = next.find(n => n.alt === img.alt);
        if (c) img.src = c.src;
      });
    });
  }

  // Filter chips (all / ai / android / web) and a "show all" button so the grid starts compact.
  function projectFilters() {
    const grid = document.getElementById("projectsContainer");
    const bar = document.getElementById("projectFilters");
    if (!grid || !bar) return;
    const cards = [...grid.querySelectorAll(".project-card")];
    // Two rows on desktop (3 columns), four single-column cards on phones.
    const phone = window.matchMedia("(max-width: 768px)");
    const initial = () => phone.matches ? 4 : 6;
    const FILTERS = [["all", "all"], ["ai", "ai"], ["android", "android"], ["web", "web"]];
    const count = (f) => f === "all" ? cards.length : cards.filter(c => c.dataset.tags.split(" ").includes(f)).length;
    let filter = "all";
    let expanded = false;

    bar.innerHTML = FILTERS.filter(([f]) => count(f)).map(([f, label]) =>
      `<button type="button" class="filter-chip" data-filter="${f}" aria-pressed="${f === filter}">${label} <span class="filter-count">${count(f)}</span></button>`
    ).join("");
    const more = document.createElement("button");
    more.type = "button";
    more.className = "btn btn-small btn-ghost projects-more";
    more.innerHTML = `show all ${cards.length} projects <i class="fas fa-chevron-down" aria-hidden="true"></i>`;
    grid.after(more);
    const status = document.getElementById("projectStatus");

    function apply(announce) {
      let shown = 0;
      const limit = initial();
      cards.forEach((card, i) => {
        const match = filter === "all" || card.dataset.tags.split(" ").includes(filter);
        const visible = match && (filter !== "all" || expanded || i < limit);
        card.hidden = !visible;
        if (visible) shown++;
      });
      bar.querySelectorAll(".filter-chip").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === filter)));
      more.hidden = filter !== "all" || expanded || cards.length <= limit;
      if (announce && status) status.textContent = `Showing ${shown} ${filter === "all" ? "" : `${filter} `}projects`;
    }

    function setFilter(f) { filter = f; apply(true); }

    bar.addEventListener("click", (e) => {
      const b = e.target.closest(".filter-chip");
      if (b) setFilter(b.dataset.filter);
    });
    more.addEventListener("click", () => {
      const first = cards[initial()];
      expanded = true;
      apply(true);
      if (first) first.querySelector("a")?.focus({ preventScroll: true });
    });
    phone.addEventListener("change", () => apply(false));
    // Links like the hero's "all ai projects" jump to #projects with a filter preselected.
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-project-filter]");
      if (!link) return;
      setFilter(link.dataset.projectFilter);
      const dd = link.closest(".dropdown");
      if (dd) {
        dd.classList.remove("open");
        dd.querySelector(".dropdown-btn").setAttribute("aria-expanded", "false");
        link.blur();
      }
    });
    apply(false);
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

  return { hero, about, footer, skills, projects, projectFilters, blog, contact, githubStats, contactForm, templates };
})();
