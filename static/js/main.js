document.addEventListener("DOMContentLoaded", () => {

  // Render content
  Render.hero();
  Render.about();
  Render.footer();
  Render.skills();
  Render.projects();
  Render.blog();
  Render.contact();
  Render.githubStats();
  Render.githubRepos();
  Render.contactForm();

  // Attach effects
  Effects.typewriter();
  Effects.scrollReveal();
  Effects.smoothScroll();
  Effects.cursorGlow();
  Effects.cardTilt();

  // Bootstrap navigation
  Navigation.init();
});
