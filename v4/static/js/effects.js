const Effects = (() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("visible");
          observer.unobserve(el);
          // Once the entrance finishes, switch to snappy hover transitions (no stagger delay).
          const delay = parseFloat(getComputedStyle(el).getPropertyValue("--reveal-delay")) || 0;
          setTimeout(() => el.classList.add("settled"), 750 + delay);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  function scrollReveal() {
    document.querySelectorAll(".section-title").forEach(el => el.classList.add("reveal"));
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  function observe(el) {
    observer.observe(el);
  }

  function typewriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    const phrases = [
      "Software Engineer — AI & Mobile",
      "Mobile + AI Developer",
      "Mobile Apps & AI Agents",
      "Open Source Contributor"
    ];
    if (reducedMotion) { el.textContent = phrases[0]; return; }
    let idx = 0, char = 0, deleting = false;

    function type() {
      const phrase = phrases[idx];
      el.textContent = deleting ? phrase.substring(0, char - 1) : phrase.substring(0, char + 1);
      deleting ? char-- : char++;

      if (!deleting && char === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
      if (deleting && char === 0) { deleting = false; idx = (idx + 1) % phrases.length; setTimeout(type, 500); return; }
      setTimeout(type, deleting ? 40 : 80);
    }
    type();
  }

  return { scrollReveal, typewriter, observe };
})();
