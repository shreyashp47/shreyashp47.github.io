const Effects = (() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  function scrollReveal() {
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }

  function observe(el) {
    observer.observe(el);
  }

  function typewriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;
    const phrases = [
      "Mobile & AI Developer",
      "Android & LLM Enthusiast",
      "Building Apps & AI Agents",
      "Open Source Contributor"
    ];
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

  function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
      });
    });
  }

  function cursorGlow() {
    const glow = document.getElementById("cursor-glow");
    if (!glow) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
    });
    function animate() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  function cardTilt() {
    document.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".project-card, .repo-card, .blog-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const mx = (x / rect.width - 0.5) * 2;
      const my = (y / rect.height - 0.5) * -2;
      card.style.transform = `perspective(800px) rotateY(${mx * 6}deg) rotateX(${my * 6}deg)`;
    });
    document.addEventListener("mouseout", (e) => {
      const card = e.target.closest(".project-card, .repo-card, .blog-card");
      if (!card) return;
      const related = e.relatedTarget;
      if (related && (card === related || card.contains(related))) return;
      card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    });
  }

  return { scrollReveal, typewriter, smoothScroll, observe, cursorGlow, cardTilt };
})();
