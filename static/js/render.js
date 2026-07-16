const Render = (() => {
  const C = CONFIG;

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
      { icon: "fab fa-github", url: C.githubUrl },
      { icon: "fab fa-linkedin-in", url: C.linkedinUrl },
      { icon: "fab fa-twitter", url: C.twitterUrl },
      { icon: "fab fa-medium-m", url: C.mediumUrl },
      { icon: "fab fa-stack-overflow", url: C.stackoverflowUrl },
      { icon: "fab fa-instagram", url: C.instagramUrl },
      { icon: "fas fa-envelope", url: `mailto:${C.email}` },
    ];
    links.forEach(s => {
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `<i class="${s.icon}"></i>`;
      socials.appendChild(a);
    });
  }

  function footer() {
    document.getElementById("footerText").innerHTML =
      `// &copy; ${new Date().getFullYear()} ${C.name} &mdash; built with &lt;3 and a lot of coffee`;
  }

  function skills() {
    const container = document.getElementById("skillsContainer");
    let idx = 0;
    Object.entries(C.skills).forEach(([, techList]) => {
      const track = document.createElement("div");
      track.className = `skills-marquee ${idx % 2 === 0 ? "" : "reverse"}`;
      const inner = document.createElement("div");
      inner.className = "skills-marquee-track";

      const iconMap = {
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

      [...techList, ...techList, ...techList].forEach(tech => {
        const cls = iconMap[tech] || `devicon-${tech.toLowerCase().replace(/ /g, "-")}-plain colored`;
        const item = document.createElement("div");
        item.className = "skill-marquee-item";
        item.innerHTML = `<i class="${cls}"></i><span>${tech}</span>`;
        inner.appendChild(item);
      });

      track.appendChild(inner);
      container.appendChild(track);
      idx++;
    });
  }

  function projects() {
    const container = document.getElementById("projectsContainer");
    C.projects.forEach(proj => {
      const card = document.createElement("div");
      card.className = "project-card reveal";

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
        const icon = techIcons[t] ? `<i class="${techIcons[t]}"></i> ` : "";
        return `<span class="tech-badge">${icon}${t}</span>`;
      }).join("");
      let links = `<a href="${proj.github}" target="_blank" rel="noopener" class="btn btn-small"><i class="fab fa-github"></i> source</a>`;
      if (proj.demo) {
        const isPlayStore = proj.demo.includes("play.google.com");
        const icon = isPlayStore ? "fab fa-google-play" : "fas fa-external-link-alt";
        const label = isPlayStore ? "Play Store" : "demo";
        links += `<a href="${proj.demo}" target="_blank" rel="noopener" class="btn btn-small btn-primary"><i class="${icon}"></i> ${label}</a>`;
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
    C.linkedinPosts.forEach(post => {
      const card = document.createElement("div");
      card.className = "blog-card reveal";
      card.innerHTML = `
        <p class="blog-date">// ${post.date}</p>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
          <span><i class="fas fa-heart"></i> ${post.likes}</span>
          <a href="${post.url}" target="_blank" rel="noopener" class="btn btn-small">read <i class="fas fa-arrow-right"></i></a>
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
      { icon: "fab fa-twitter", value: `@${C.twitterUrl.split("/").pop()}`, url: C.twitterUrl },
      { icon: "fab fa-medium-m", value: "medium.com/@shreyashp47", url: C.mediumUrl },
      { icon: "fab fa-stack-overflow", value: "Stack Overflow", url: C.stackoverflowUrl },
      { icon: "fab fa-instagram", value: "@shreyashpattewar_", url: C.instagramUrl },
      { icon: "fas fa-envelope", value: C.email, url: `mailto:${C.email}` },
    ];
    items.forEach(d => {
      const a = document.createElement("a");
      a.href = d.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "contact-detail-item";
      a.innerHTML = `<i class="${d.icon}"></i> <span>${d.value}</span>`;
      container.appendChild(a);
    });
  }

  function githubStats() {
    const container = document.getElementById("githubStats");
    const urls = [
      `https://github-readme-stats.vercel.app/api?username=${C.githubUsername}&show_icons=true&theme=radical&hide_border=true`,
      `https://github-readme-streak-stats.herokuapp.com/?user=${C.githubUsername}&theme=radical&hide_border=true`,
      `https://github-readme-stats.vercel.app/api/top-langs/?username=${C.githubUsername}&layout=compact&theme=radical&hide_border=true`,
    ];
    urls.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "GitHub Stats";
      img.loading = "lazy";
      container.appendChild(img);
    });
    if (C.leetcodeUsername) {
      const leet = document.createElement("img");
      leet.src = `https://leetcard.jacoblin.cool/${C.leetcodeUsername}?theme=dark&font=JetBrains%20Mono&ext=heatmap&hide_border=true`;
      leet.alt = "LeetCode Stats";
      leet.loading = "lazy";
      container.appendChild(leet);
    }
  }

  function githubRepos() {
    const grid = document.getElementById("repoGrid");
    fetch(`https://api.github.com/users/${C.githubUsername}/repos?sort=stars&per_page=6`)
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
        repos.forEach(repo => {
          const color = langColors[repo.language] || "#7c3aed";
          const card = document.createElement("div");
          card.className = "repo-card reveal";
          card.innerHTML = `
            <h3 class="repo-name"><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
            <p class="repo-desc">${repo.description || "No description provided."}</p>
            <div class="repo-meta">
              ${repo.language ? `<span class="repo-lang" style="color:${color}">${repo.language}</span>` : ""}
              <span>⭐ ${repo.stargazers_count}</span>
              <span>🍴 ${repo.forks_count}</span>
            </div>
          `;
          grid.appendChild(card);
          Effects.observe(card);
        });
      })
      .catch(() => { grid.innerHTML = `<p class="loading-text">// error: failed to fetch repositories</p>`; });
  }

  function contactForm() {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", () => {
        const btn = form.querySelector(".btn");
        btn.textContent = "sending...";
        btn.disabled = true;
      });
    }
  }

  return { hero, about, footer, skills, projects, blog, contact, githubStats, githubRepos, contactForm };
})();
