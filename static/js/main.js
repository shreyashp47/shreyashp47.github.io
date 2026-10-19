document.addEventListener("DOMContentLoaded", () => {
  Render.hero();
  Render.about();
  Render.footer();
  Render.skills();
  Render.projects();
  Render.projectFilters();
  Render.blog();
  Render.contact();
  Render.githubStats();
  Render.contactForm();

  Effects.typewriter();
  Effects.scrollReveal();

  Navigation.init();
});
