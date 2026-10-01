const Render = (() => {
  const C = CONFIG;

  const esc = (str) => String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  // Staggers reveal animations for items in the same grid.
  const stagger = (el, i) => el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 70}ms`);

  // Opens external links in a new tab; mailto links stay in place.
  function linkAttrs(a, url) {
    a.href = url;
    if (!url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
  }

  function hero() {
    document.getElementById("heroName").textContent = `> ${C.name}`;
    document.getElementById("heroTagline").textContent = `> "${C.tagline}"`;
  }

  function about() {
    const container = document.getElementById("aboutText");
    const lines = C.bio.split("\n\n");
    lines.forEach((p, i) => {
      const line = document.createElement("p");
      line.innerHTML = `<span class="prompt">${i === 0 ? '└─$' : '   '}</span> <span class="cmd">echo</span> <span class="str">"${p.replace(/\n/g, '\\n')}"</span>`;
      container.appendChild(line);
      if (i < lines.length - 1) {
        const br = document.createElement("br");
        container.appendChild(br);
      }
    });

    const socials = document.getElementById("aboutSocials");
    const links = [
      { icon: "fab fa-github", url: C.githubUrl, label: "GitHub" },
      { icon: "fab fa-linkedin-in", url: C.linkedinUrl, label: "LinkedIn" },
      { icon: "fab fa-x-twitter", url: C.twitterUrl, label: "X (Twitter)" },
      { icon: "fab fa-medium-m", url: C.mediumUrl, label: "Medium" },
      { icon: "fab fa-stack-overflow", url: C.stackoverflowUrl, label: "Stack Overflow" },
      { icon: "fab fa-instagram", url: C.instagramUrl, label: "Instagram" },
      { icon: "fas fa-envelope", url: `mailto:${C.email}`, label: "Email" },
    ];
    links.forEach(s => {
      const a = document.createElement("a");
      linkAttrs(a, s.url);
      a.setAttribute("aria-label", s.label);
      a.title = s.label;
      a.innerHTML = `<i class="${s.icon}" aria-hidden="true"></i>`;
      socials.appendChild(a);
    });
  }

  function footer() {
    document.getElementById("footerText").innerHTML =
      `// &copy; ${new Date().getFullYear()} ${C.name} &mdash; built with &lt;3 and a lot of coffee`;
  }

  const SKILL_ICONS = {
    Kotlin: "devicon-kotlin-plain colored",
    Java: "devicon-java-plain colored",
    Swift: "devicon-swift-plain colored",
    Dart: "devicon-dart-plain colored",
    Flutter: "devicon-flutter-plain colored",
    Python: "devicon-python-plain colored",
    Firebase: "devicon-firebase-plain colored",
    Git: "devicon-git-plain colored",
    Docker: "devicon-docker-plain colored",
    Figma: "devicon-figma-plain colored",
    OpenAI: "fas fa-microchip",
    MCP: "fas fa-plug",
    LangChain: "fas fa-link",
    SQLite: "fas fa-database",
    Realm: "fas fa-server",
    Swagger: "devicon-swagger-plain colored",
    "Jetpack Compose": "fas fa-mobile-alt",
    TypeScript: "devicon-typescript-plain colored",
    "CI/CD": "fas fa-sync-alt",
    Notion: "fas fa-sticky-note",
  };

  function skills() {
    const container = document.getElementById("skillsContainer");
    Object.entries(C.skills).forEach(([category, techList], idx) => {
      // Screen readers get a plain list; the animated marquee is decorative.
      const list = document.createElement("ul");
      list.className = "visually-hidden";
      list.setAttribute("aria-label", category);
      list.innerHTML = techList.map(t => `<li>${esc(t)}</li>`).join("");
      container.appendChild(list);

      const track = document.createElement("div");
      track.className = `skills-marquee${idx % 2 ? " reverse" : ""}`;
      track.setAttribute("aria-hidden", "true");
      const inner = document.createElement("div");
      inner.className = "skills-marquee-track";

      // One "set" must be wider than the viewport; two identical sets make the -50% loop seamless.
      const set = [];
      while (set.length < 10) set.push(...techList);
      inner.style.setProperty("--marquee-duration", `${set.length * 3.5}s`);

      [...set, ...set].forEach((tech, i) => {
        const cls = SKILL_ICONS[tech] || `devicon-${tech.toLowerCase().replace(/ /g, "-")}-plain colored`;
        const item = document.createElement("div");
        item.className = `skill-marquee-item${i >= techList.length ? " dup" : ""}`;
        item.innerHTML = `<i class="${cls}"></i><span>${esc(tech)}</span>`;
        inner.appendChild(item);
      });

      track.appendChild(inner);
      container.appendChild(track);
    });
  }

  function projects() {
    const container = document.getElementById("projectsContainer");
    C.projects.forEach((proj, i) => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      stagger(card, i % 3);

      const techIcons = {
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
      const techHtml = proj.tech.map(t => {
        const icon = techIcons[t] ? `<i class="${techIcons[t]}" aria-hidden="true"></i> ` : "";
        return `<span class="tech-badge">${icon}${t}</span>`;
      }).join("");
      let links = `<a href="${proj.github}" target="_blank" rel="noopener" class="btn btn-small btn-ghost"><i class="fab fa-github" aria-hidden="true"></i> source</a>`;
      if (proj.demo) {
        const isPlayStore = proj.demo.includes("play.google.com");
        const icon = isPlayStore ? "fab fa-google-play" : "fas fa-external-link-alt";
        const label = isPlayStore ? "Play Store" : "demo";
        links += `<a href="${proj.demo}" target="_blank" rel="noopener" class="btn btn-small btn-primary"><i class="${icon}" aria-hidden="true"></i> ${label}</a>`;
      }

      let testingHtml = "";
      if (proj.testing) {
        testingHtml = `
          <details class="project-testing">
            <summary class="testing-summary"><i class="fab fa-google-play"></i> // open_testing.kt</summary>
            <div class="testing-content">
              <p>> join tester group: <a href="${proj.testing.group}" target="_blank" rel="noopener">Google Groups</a></p>
              <p>> install from <a href="${proj.testing.playStore}" target="_blank" rel="noopener">Google Play</a></p>
              <p>> report issues: <a href="${proj.github}/issues" target="_blank" rel="noopener">GitHub Issues</a></p>
            </div>
          </details>`;
      }

      card.innerHTML = `
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tech">${techHtml}</div>
        <div class="project-links">${links}</div>
        ${testingHtml}
      `;
      container.appendChild(card);
    });
  }

  function blog() {
    const container = document.getElementById("blogContainer");
    C.linkedinPosts.forEach((post, i) => {
      const card = document.createElement("article");
      card.className = "blog-card reveal";
      stagger(card, i);
      card.innerHTML = `
        <p class="blog-date">// ${post.date}</p>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
          <span><i class="fas fa-heart" aria-hidden="true"></i> ${post.likes}</span>
          <a href="${post.url}" target="_blank" rel="noopener" class="btn btn-small btn-ghost">read <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function contact() {
    const container = document.getElementById("contactDetails");
    if (!container) return;
    const items = [
      { icon: "fab fa-github", value: C.githubUsername, url: C.githubUrl },
      { icon: "fab fa-linkedin-in", value: C.linkedinUrl.replace("https://", ""), url: C.linkedinUrl },
      { icon: "fab fa-x-twitter", value: `@${C.twitterUrl.split("/").pop()}`, url: C.twitterUrl },
      { icon: "fab fa-medium-m", value: "medium.com/@shreyashp47", url: C.mediumUrl },
      { icon: "fab fa-stack-overflow", value: "Stack Overflow", url: C.stackoverflowUrl },
      { icon: "fab fa-instagram", value: "@shreyashpattewar_", url: C.instagramUrl },
      { icon: "fas fa-envelope", value: C.email, url: `mailto:${C.email}` },
    ];
    items.forEach(d => {
      const a = document.createElement("a");
      linkAttrs(a, d.url);
      a.className = "contact-detail-item";
      a.innerHTML = `<i class="${d.icon}" aria-hidden="true"></i> <span>${esc(d.value)}</span><i class="fas fa-arrow-right contact-arrow" aria-hidden="true"></i>`;
      container.appendChild(a);
    });
  }

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
            stagger(card, i % 3);
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

  return { hero, about, footer, skills, projects, blog, contact, githubStats, githubRepos, contactForm };
})();
