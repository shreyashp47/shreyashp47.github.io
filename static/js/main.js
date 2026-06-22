document.addEventListener("DOMContentLoaded", () => {

  const C = CONFIG;

  /* ===== POPULATE FROM CONFIG ===== */
  document.getElementById("heroName").textContent = C.name;
  document.getElementById("heroTagline").textContent = C.tagline;

  const aboutText = document.getElementById("aboutText");
  C.bio.split("\n\n").forEach(p => {
    const para = document.createElement("p");
    para.textContent = p;
    aboutText.appendChild(para);
  });

  const socialLinks = [
    { icon: "fab fa-github", url: C.githubUrl, label: "GitHub" },
    { icon: "fab fa-linkedin-in", url: C.linkedinUrl, label: "LinkedIn" },
    { icon: "fab fa-twitter", url: C.twitterUrl, label: "Twitter" },
    { icon: "fas fa-envelope", url: `mailto:${C.email}`, label: "Email" },
  ];
  function renderSocials(containerId, linkStyle, exclude = []) {
    const container = document.getElementById(containerId);
    socialLinks.forEach(s => {
      if (exclude.includes(s.label)) return;
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noopener";
      if (linkStyle === "row") {
        a.innerHTML = `<i class="${s.icon}"></i>`;
        a.setAttribute("aria-label", s.label);
      } else {
        a.className = "contact-social-link";
        a.innerHTML = `<i class="${s.icon}"></i> ${s.label}`;
      }
      container.appendChild(a);
    });
  }
  renderSocials("aboutSocials", "row");
  renderSocials("contactSocials", "column", ["GitHub", "Email"]);

  const contactDetails = document.getElementById("contactDetails");
  if (contactDetails) {
    const details = [
      { icon: "fab fa-github", label: "GitHub", value: C.githubUsername, url: C.githubUrl },
      { icon: "fas fa-envelope", label: "Email", value: C.email, url: `mailto:${C.email}` },
    ];
    details.forEach(d => {
      const a = document.createElement("a");
      a.href = d.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "contact-detail-item";
      a.innerHTML = `<i class="${d.icon}"></i> <span>${d.value}</span>`;
      contactDetails.appendChild(a);
    });
  }

  const footerText = document.getElementById("footerText");
  footerText.innerHTML = `&copy; ${new Date().getFullYear()} ${C.name}. Built with &hearts;`;

  function getSkillIcon(tech) {
    const deviconMap = {
      "Kotlin": "devicon-kotlin-plain colored",
      "Java": "devicon-java-plain colored",
      "Swift": "devicon-swift-plain colored",
      "Dart": "devicon-dart-plain colored",
      "Flutter": "devicon-flutter-plain colored",
      "Python": "devicon-python-plain colored",
      "Firebase": "devicon-firebase-plain colored",
      "Git": "devicon-git-plain colored",
      "Docker": "devicon-docker-plain colored",
      "Figma": "devicon-figma-plain colored",
      "OpenAI": "fas fa-microchip",
      "MCP": "fas fa-plug",
      "LangChain": "fas fa-link",
      "SQLite": "fas fa-database",
      "Realm": "fas fa-server",
      "Swagger": "devicon-swagger-plain colored",
      "Jetpack Compose": "fas fa-mobile-alt",
      "Notion": "fas fa-sticky-note",
    };
    const cls = deviconMap[tech] || `devicon-${tech.toLowerCase().replace(/ /g, "-")}-plain colored`;
    return `<i class="${cls}"></i>`;
  }

  /* ===== SKILLS MARQUEE ===== */
  const skillsContainer = document.getElementById("skillsContainer");
  let rowIdx = 0;
  Object.entries(C.skills).forEach(([category, techList]) => {
    const row = document.createElement("div");
    row.className = `skills-marquee ${rowIdx % 2 === 0 ? "" : "reverse"}`;

    const track = document.createElement("div");
    track.className = "skills-marquee-track";

    const allItems = [...techList, ...techList, ...techList];
    allItems.forEach(tech => {
      const item = document.createElement("div");
      item.className = "skill-marquee-item";
      item.innerHTML = `${getSkillIcon(tech)}<span>${tech}</span>`;
      track.appendChild(item);
    });

    row.appendChild(track);
    skillsContainer.appendChild(row);
    rowIdx++;
  });

  /* ===== PROJECTS ===== */
  const projectsContainer = document.getElementById("projectsContainer");
  C.projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "project-card reveal";

    let techHtml = proj.tech.map(t => `<span class="tech-badge">${t}</span>`).join("");

    let linksHtml = `<a href="${proj.github}" target="_blank" rel="noopener" class="btn btn-small"><i class="fab fa-github"></i> Code</a>`;
    if (proj.demo) {
      linksHtml += `<a href="${proj.demo}" target="_blank" rel="noopener" class="btn btn-small btn-primary"><i class="fas fa-external-link-alt"></i> Live</a>`;
    }

    card.innerHTML = `
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-desc">${proj.description}</p>
      <div class="project-tech">${techHtml}</div>
      <div class="project-links">${linksHtml}</div>
    `;
    projectsContainer.appendChild(card);
  });

  /* ===== BLOG / LINKEDIN POSTS ===== */
  const blogContainer = document.getElementById("blogContainer");
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
    blogContainer.appendChild(card);
  });

  /* ===== GITHUB STATS ===== */
  const githubStats = document.getElementById("githubStats");
  const statImgs = [
    `https://github-readme-stats.vercel.app/api?username=${C.githubUsername}&show_icons=true&theme=tokyonight&hide_border=true`,
    `https://github-readme-stats.vercel.app/api/top-langs/?username=${C.githubUsername}&layout=compact&theme=tokyonight&hide_border=true`,
    `https://github-readme-streak-stats.herokuapp.com/?user=${C.githubUsername}&theme=tokyonight&hide_border=true`,
  ];
  statImgs.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "GitHub Stats";
    img.loading = "lazy";
    githubStats.appendChild(img);
  });

  /* ===== GITHUB REPOS (direct from API) ===== */
  const repoGrid = document.getElementById("repoGrid");
  if (repoGrid) {
    fetch(`https://api.github.com/users/${C.githubUsername}/repos?sort=stars&per_page=6`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(repos => {
        repoGrid.innerHTML = "";
        repos.forEach(repo => {
          const langColor = getLanguageColor(repo.language);
          const card = document.createElement("div");
          card.className = "repo-card reveal";
          card.innerHTML = `
            <h3 class="repo-name"><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
            <p class="repo-desc">${repo.description || "No description provided."}</p>
            <div class="repo-meta">
              ${repo.language ? `<span class="repo-lang" style="color: ${langColor}">${repo.language}</span>` : ""}
              <span>⭐ ${repo.stargazers_count}</span>
              <span>🍴 ${repo.forks_count}</span>
            </div>
          `;
          repoGrid.appendChild(card);
          revealObserver.observe(card);
        });
      })
      .catch(() => {
        repoGrid.innerHTML = `<p class="loading-text">Could not load repositories.</p>`;
      });
  }

  function getLanguageColor(lang) {
    const colors = {
      Python: "#3572A5",
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Java: "#b07219",
      Kotlin: "#A97BFF",
      Swift: "#F05138",
      Dart: "#00B4AB",
      Go: "#00ADD8",
      Rust: "#dea584",
      "C++": "#f34b7d",
      Ruby: "#701516",
      Shell: "#89e051",
      Dockerfile: "#384d54",
    };
    return colors[lang] || "#f97316";
  }

  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const btn = contactForm.querySelector(".btn");
      btn.textContent = "Sending...";
      btn.disabled = true;
    });
  }

  /* ===== TYPEWRITER ===== */
  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    const phrases = [
      "Mobile & AI Developer",
      "Android & LLM Enthusiast",
      "Building Apps & AI Agents",
      "Open Source Contributor"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, isDeleting ? 40 : 80);
    }
    type();
  }

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.pageYOffset > 50);
  });

  /* ===== MOBILE HAMBURGER ===== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ===== SCROLL REVEAL ===== */
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
