const Render = (() => {
  const C = CONFIG;

  function hero() {
    document.getElementById("heroName").textContent = C.name;
    document.getElementById("heroTagline").textContent = C.tagline;
  }

  function about() {
    const container = document.getElementById("aboutText");
    C.bio.split("\n\n").forEach(p => {
      const para = document.createElement("p");
      para.textContent = p;
      container.appendChild(para);
    });

    const socials = document.getElementById("aboutSocials");
    const links = [
      { icon: "fab fa-github", url: C.githubUrl },
      { icon: "fab fa-linkedin-in", url: C.linkedinUrl },
      { icon: "fab fa-twitter", url: C.twitterUrl },
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
      `&copy; ${new Date().getFullYear()} ${C.name}. Built with &hearts;`;
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

      const techHtml = proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join("");
      let links = `<a href="${proj.github}" target="_blank" rel="noopener" class="btn btn-small"><i class="fab fa-github"></i> Code</a>`;
      if (proj.demo) {
        links += `<a href="${proj.demo}" target="_blank" rel="noopener" class="btn btn-small btn-primary"><i class="fas fa-external-link-alt"></i> Live</a>`;
      }

      card.innerHTML = `
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tech">${techHtml}</div>
        <div class="project-links">${links}</div>
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
        <p class="blog-date">${post.date}</p>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
          <span><i class="fas fa-heart"></i> ${post.likes}</span>
          <a href="${post.url}" target="_blank" rel="noopener" class="btn btn-small">Read on LinkedIn <i class="fas fa-arrow-right"></i></a>
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
      `https://github-readme-stats.vercel.app/api?username=${C.githubUsername}&show_icons=true&theme=tokyonight&hide_border=true`,
      `https://github-readme-streak-stats.herokuapp.com/?user=${C.githubUsername}&theme=tokyonight&hide_border=true`,
      `https://github-readme-stats.vercel.app/api/top-langs/?username=${C.githubUsername}&layout=compact&theme=tokyonight&hide_border=true`,
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
      leet.src = `https://leetcard.jacoblin.cool/${C.leetcodeUsername}?theme=dark&font=Inter&ext=heatmap&hide_border=true`;
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
          const color = langColors[repo.language] || "#f97316";
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
      .catch(() => { grid.innerHTML = `<p class="loading-text">Could not load repositories.</p>`; });
  }

  function contactForm() {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", () => {
        const btn = form.querySelector(".btn");
        btn.textContent = "Sending...";
        btn.disabled = true;
      });
    }
  }

  return { hero, about, footer, skills, projects, blog, contact, githubStats, githubRepos, contactForm };
})();
