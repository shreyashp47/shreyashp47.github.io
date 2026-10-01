document.addEventListener("DOMContentLoaded", () => {
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

  Effects.typewriter();
  Effects.scrollReveal();

  Navigation.init();
});
