const Navigation = (() => {

  function onScroll() {
    const navbar = document.getElementById("navbar");
    const progress = document.getElementById("scrollProgress");
    let ticking = false;

    function update() {
      const y = window.scrollY;
      navbar.classList.toggle("scrolled", y > 50);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function mobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if (!hamburger || !navLinks) return;

    function setOpen(open) {
      hamburger.classList.toggle("active", open);
      navLinks.classList.toggle("open", open);
      hamburger.setAttribute("aria-expanded", String(open));
    }

    hamburger.addEventListener("click", () => setOpen(!navLinks.classList.contains("open")));
    navLinks.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !hamburger.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) { setOpen(false); hamburger.focus(); }
    });
  }

  // Highlight the nav link for the section currently in view.
  function scrollSpy() {
    const links = new Map();
    document.querySelectorAll('.nav-link[href^="#"]').forEach(a => links.set(a.getAttribute("href").slice(1), a));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        const link = links.get(entry.target.id);
        if (link) { link.classList.add("active"); link.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));
  }

  function dropdowns() {
    const all = document.querySelectorAll(".dropdown");

    function close(dd) {
      dd.classList.remove("open");
      dd.querySelector(".dropdown-btn").setAttribute("aria-expanded", "false");
    }

    all.forEach(dd => {
      const btn = dd.querySelector(".dropdown-btn");
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = !dd.classList.contains("open");
        all.forEach(close);
        dd.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", String(open));
      });
      dd.addEventListener("focusout", (e) => {
        if (!dd.contains(e.relatedTarget)) close(dd);
      });
      dd.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dd.classList.contains("open")) { close(dd); btn.focus(); }
      });
    });

    document.addEventListener("click", (e) => {
      all.forEach(dd => { if (!dd.contains(e.target)) close(dd); });
    });
  }

  function themeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const label = () => `Switch color theme (current: ${THEMES[Theme.current()].name})`;
    btn.title = label();
    btn.addEventListener("click", () => {
      Theme.next();
      btn.title = label();
      btn.classList.remove("spin");
      void btn.offsetWidth;
      btn.classList.add("spin");
    });
  }

  function init() {
    onScroll();
    mobileMenu();
    scrollSpy();
    dropdowns();
    themeToggle();
  }

  return { init };
})();
