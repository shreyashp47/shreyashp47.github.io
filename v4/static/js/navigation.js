const Navigation = (() => {

  function onScroll() {
    const navbar = document.getElementById("navbar");
    const progress = document.getElementById("scrollProgress");
    const fab = document.getElementById("fabTop");
    const footer = document.querySelector(".footer");
    let ticking = false;
    let fabShown = false;

    // Floating back-to-top: visible once past the hero, hidden again when the
    // footer (which has its own back-to-top link) scrolls into view.
    function setFab(show) {
      if (!fab || show === fabShown) return;
      fabShown = show;
      fab.classList.toggle("show", show);
      fab.setAttribute("aria-hidden", String(!show));
      fab.tabIndex = show ? 0 : -1;
      if (!show && document.activeElement === fab) fab.blur();
    }

    if (fab) {
      fab.addEventListener("click", () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        const logo = document.querySelector(".nav-logo");
        if (logo) logo.focus({ preventScroll: true });
      });
    }

    function update() {
      const y = window.scrollY;
      navbar.classList.toggle("scrolled", y > 50);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      if (fab) {
        const footerVisible = footer && footer.getBoundingClientRect().top < window.innerHeight;
        setFab(y > window.innerHeight * 0.85 && !footerVisible);
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

  // Brief terminal-style toast in a polite live region.
  let toastTimer = 0;
  let toastClear = 0;
  function toast(name) {
    const el = document.getElementById("toast");
    if (!el) return;
    clearTimeout(toastTimer);
    clearTimeout(toastClear);
    el.textContent = "";
    const part = (cls, text) => {
      const s = document.createElement("span");
      s.className = cls;
      if (text) s.textContent = text;
      return s;
    };
    const swatch = part("toast-swatch");
    swatch.setAttribute("aria-hidden", "true");
    const line = document.createElement("span");
    line.append(part("toast-prompt", "$ "), "theme \u2192 ", part("toast-value", name));
    el.append(swatch, line);
    el.classList.add("show");
    toastTimer = setTimeout(() => {
      el.classList.remove("show");
      toastClear = setTimeout(() => { el.textContent = ""; }, 300);
    }, 1800);
  }

  function themeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const label = () => `Switch color theme (current: ${THEMES[Theme.current()].name})`;
    btn.title = label();
    btn.addEventListener("click", () => {
      const t = Theme.next();
      btn.title = label();
      if (t) toast(t.name);
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
