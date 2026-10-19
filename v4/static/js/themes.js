const THEMES = [
  {
    name: "Purple Haze",
    accent1: "#7c3aed",
    accent1rgb: "124, 58, 237",
    accent2: "#06b6d4",
    accent2rgb: "6, 182, 212",
    green: "#10b981",
    greenrgb: "16, 185, 129",
    orange: "#f59e0b",
    border: "rgba(124, 58, 237, 0.12)",
    borderLight: "rgba(124, 58, 237, 0.25)",
  },
  {
    name: "Matrix Green",
    accent1: "#10b981",
    accent1rgb: "16, 185, 129",
    accent2: "#34d399",
    accent2rgb: "52, 211, 153",
    green: "#10b981",
    greenrgb: "16, 185, 129",
    orange: "#f59e0b",
    border: "rgba(16, 185, 129, 0.12)",
    borderLight: "rgba(16, 185, 129, 0.25)",
  },
  {
    name: "Cyber Blue",
    accent1: "#3b82f6",
    accent1rgb: "59, 130, 246",
    accent2: "#8b5cf6",
    accent2rgb: "139, 92, 246",
    green: "#10b981",
    greenrgb: "16, 185, 129",
    orange: "#f59e0b",
    border: "rgba(59, 130, 246, 0.12)",
    borderLight: "rgba(59, 130, 246, 0.25)",
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
