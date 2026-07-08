const Navigation = (() => {

  function init() {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.pageYOffset > 50);
    });

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

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme") || "0";
        const next = (parseInt(current) + 1) % 3;
        html.setAttribute("data-theme", next.toString());

        const t = THEMES[next];
        const r = html.style;
        r.setProperty("--accent-1", t.accent1);
        r.setProperty("--accent-1-rgb", t.accent1rgb);
        r.setProperty("--accent-2", t.accent2);
        r.setProperty("--accent-2-rgb", t.accent2rgb);
        r.setProperty("--accent-green", t.green);
        r.setProperty("--accent-green-rgb", t.greenrgb);
        r.setProperty("--accent-orange", t.orange);
        r.setProperty("--border", t.border);
        r.setProperty("--border-light", t.borderLight);

        localStorage.setItem("v4-theme", next);
      });

      const saved = localStorage.getItem("v4-theme");
      if (saved !== null) {
        const idx = parseInt(saved);
        const t = THEMES[idx];
        document.documentElement.setAttribute("data-theme", idx.toString());
        const r = document.documentElement.style;
        r.setProperty("--accent-1", t.accent1);
        r.setProperty("--accent-1-rgb", t.accent1rgb);
        r.setProperty("--accent-2", t.accent2);
        r.setProperty("--accent-2-rgb", t.accent2rgb);
        r.setProperty("--accent-green", t.green);
        r.setProperty("--accent-green-rgb", t.greenrgb);
        r.setProperty("--accent-orange", t.orange);
        r.setProperty("--border", t.border);
        r.setProperty("--border-light", t.borderLight);
      }
    }
  }

  return { init };
})();
