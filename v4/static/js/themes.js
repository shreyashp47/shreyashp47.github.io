// Accent palettes inspired by popular editor themes. The dark backgrounds stay fixed;
// onAccent is the text color on accent fills (all four accents are light, so dark text).
const THEMES = [
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    accent1: "#7aa2f7",
    accent1rgb: "122, 162, 247",
    accent2: "#bb9af7",
    accent2rgb: "187, 154, 247",
    green: "#9ece6a",
    greenrgb: "158, 206, 106",
    orange: "#ff9e64",
    onAccent: "#0a0a0f",
    border: "rgba(122, 162, 247, 0.12)",
    borderLight: "rgba(122, 162, 247, 0.25)",
  },
  {
    id: "dracula",
    name: "Dracula",
    accent1: "#bd93f9",
    accent1rgb: "189, 147, 249",
    accent2: "#ff79c6",
    accent2rgb: "255, 121, 198",
    green: "#50fa7b",
    greenrgb: "80, 250, 123",
    orange: "#ffb86c",
    onAccent: "#0a0a0f",
    border: "rgba(189, 147, 249, 0.12)",
    borderLight: "rgba(189, 147, 249, 0.25)",
  },
  {
    id: "gruvbox",
    name: "Gruvbox",
    accent1: "#fabd2f",
    accent1rgb: "250, 189, 47",
    accent2: "#8ec07c",
    accent2rgb: "142, 192, 124",
    green: "#b8bb26",
    greenrgb: "184, 187, 38",
    orange: "#fe8019",
    onAccent: "#0a0a0f",
    border: "rgba(250, 189, 47, 0.12)",
    borderLight: "rgba(250, 189, 47, 0.25)",
  },
  {
    id: "sunset",
    name: "Sunset",
    accent1: "#fb7185",
    accent1rgb: "251, 113, 133",
    accent2: "#fbbf24",
    accent2rgb: "251, 191, 36",
    green: "#34d399",
    greenrgb: "52, 211, 153",
    orange: "#f59e0b",
    onAccent: "#0a0a0f",
    border: "rgba(251, 113, 133, 0.12)",
    borderLight: "rgba(251, 113, 133, 0.25)",
  },
];

const Theme = (() => {
  const KEY = "v4-theme";

  function apply(idx) {
    const t = THEMES[idx];
    if (!t) return;
    const html = document.documentElement;
    const r = html.style;
    html.setAttribute("data-theme", String(idx));
    r.setProperty("--accent-1", t.accent1);
    r.setProperty("--accent-1-rgb", t.accent1rgb);
    r.setProperty("--accent-2", t.accent2);
    r.setProperty("--accent-2-rgb", t.accent2rgb);
    r.setProperty("--accent-green", t.green);
    r.setProperty("--accent-green-rgb", t.greenrgb);
    r.setProperty("--accent-orange", t.orange);
    r.setProperty("--on-accent", t.onAccent);
    r.setProperty("--border", t.border);
    r.setProperty("--border-light", t.borderLight);
  }

  function current() {
    return parseInt(document.documentElement.getAttribute("data-theme"), 10) || 0;
  }

  function next() {
    const idx = (current() + 1) % THEMES.length;
    apply(idx);
    // A theme picked with the toggle sticks for this tab's session only.
    try { sessionStorage.setItem(KEY, idx); } catch (e) { /* storage unavailable */ }
    // Lets themed third-party images (GitHub stats) refresh their colors.
    document.dispatchEvent(new CustomEvent("themechange", { detail: THEMES[idx] }));
    return THEMES[idx];
  }

  // Runs in <head> so the theme is applied before first paint: the visitor's pick
  // from this session if there is one, otherwise a random theme on every visit.
  document.documentElement.classList.add("js");
  let initial = Math.floor(Math.random() * THEMES.length);
  try {
    const picked = parseInt(sessionStorage.getItem(KEY), 10);
    if (THEMES[picked]) initial = picked;
    localStorage.removeItem(KEY); // older versions kept the pick forever
  } catch (e) { /* storage unavailable */ }
  apply(initial);

  return { apply, current, next };
})();
