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
      "AI Engineer — LLM agents & apps",
      "Tool calling · MCP · local LLMs",
      "Voice AI · streaming chat",
      "Android apps on Google Play"
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

  // A hello for anyone who opens DevTools, in the current theme's colors.
  function consoleGreeting() {
    const css = getComputedStyle(document.documentElement);
    const a1 = css.getPropertyValue("--accent-1").trim(), a2 = css.getPropertyValue("--accent-2").trim();
    console.log(
      `%c> ${CONFIG.name}%c\n${CONFIG.tagline}.\n\n$ git clone ${CONFIG.githubUrl}/${CONFIG.githubUsername}.github.io\n$ press T to switch themes · say hi at ${CONFIG.email}`,
      `font: 700 16px "JetBrains Mono", monospace; color: ${a1};`,
      `font: 12px "JetBrains Mono", monospace; line-height: 1.6; color: ${a2};`
    );
  }

  return { scrollReveal, typewriter, observe, consoleGreeting };
})();
