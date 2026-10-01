#!/usr/bin/env node
// Pre-renders portfolio content from v4/static/js/config.js into v4/index.html
// (between <!-- prerender:NAME --> markers) so crawlers and link previews that
// don't run JavaScript still see the bio, skills, projects, posts and contacts.
// Also regenerates the JSON-LD block and v4/llms.txt.
//
//   node scripts/prerender.mjs          # update files
//   node scripts/prerender.mjs --check  # exit 1 if files are out of date (CI)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "v4");
const read = (p) => readFileSync(join(site, p), "utf8");
const check = process.argv.includes("--check");

// Run config.js + render.js in a sandbox and grab the shared templates.
const ctx = vm.createContext({ console });
vm.runInContext(
  `${read("static/js/config.js")}\n${read("static/js/render.js")}\nthis.CONFIG = CONFIG; this.Render = Render;`,
  ctx,
  { filename: "config+render.js" }
);
const { CONFIG: C, Render } = ctx;
const T = Render.templates;

const url = C.siteUrl;
const sameAs = [C.githubUrl, C.linkedinUrl, C.twitterUrl, C.mediumUrl, C.stackoverflowUrl, C.instagramUrl];
const skills = [...new Set(Object.values(C.skills).flat())];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${url}#profilepage`,
      url,
      name: `${C.name} | ${C.jobTitle}`,
      inLanguage: "en",
      mainEntity: { "@id": `${url}#person` },
      isPartOf: { "@id": `${url}#website` },
    },
    {
      "@type": "Person",
      "@id": `${url}#person`,
      name: C.name,
      url,
      image: `${url}static/assets/profile.webp`,
      jobTitle: C.jobTitle,
      worksFor: { "@type": "Organization", name: C.company },
      description: C.tagline,
      email: `mailto:${C.email}`,
      knowsAbout: skills,
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${url}#website`,
      name: C.name,
      url,
      description: C.tagline,
      inLanguage: "en",
      author: { "@id": `${url}#person` },
      publisher: { "@id": `${url}#person` },
    },
    ...C.projects.map((p) => ({
      "@type": "SoftwareSourceCode",
      name: p.title,
      description: p.description,
      codeRepository: p.github,
      ...(p.demo ? { url: p.demo } : {}),
      keywords: p.tech.join(", "),
      author: { "@id": `${url}#person` },
    })),
  ],
};

const blocks = {
  "json-ld": `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>`,
  about: T.about(),
  socials: T.socials(),
  skills: T.skills(false),
  projects: T.projects(),
  blog: T.blog(),
  contact: T.contact(),
};

const llms = `# ${C.name}

> ${C.jobTitle} at ${C.company}. ${C.tagline}.

${C.bio}

## Links

- [Portfolio](${url})
- [GitHub](${C.githubUrl})
- [LinkedIn](${C.linkedinUrl})
- [X](${C.twitterUrl})
- [Medium](${C.mediumUrl})
- [Stack Overflow](${C.stackoverflowUrl})
- [Resume](${url}${C.resumePath})
- Email: ${C.email}

## Skills

${Object.entries(C.skills).map(([cat, list]) => `- ${cat}: ${list.join(", ")}`).join("\n")}

## Projects

${C.projects.map((p) => `- [${p.title}](${p.demo || p.github}): ${p.description} (${p.tech.join(", ")}; source: ${p.github})`).join("\n")}

## Writing

${C.linkedinPosts.map((p) => `- [${p.date}](${p.url}): ${p.excerpt}`).join("\n")}
`;

let html = read("index.html");
for (const [name, content] of Object.entries(blocks)) {
  const re = new RegExp(`(<!-- prerender:${name} -->)[\\s\\S]*?(<!-- /prerender:${name} -->)`);
  if (!re.test(html)) throw new Error(`Missing <!-- prerender:${name} --> markers in v4/index.html`);
  html = html.replace(re, (_, open, close) => `${open}${content}${close}`);
}

const outputs = [["index.html", html], ["llms.txt", llms]];
const stale = outputs.filter(([p, body]) => { try { return read(p) !== body; } catch { return true; } });

if (check) {
  if (stale.length) {
    console.error(`Out of date: ${stale.map(([p]) => `v4/${p}`).join(", ")}. Run: npm run prerender`);
    process.exit(1);
  }
  console.log("Pre-rendered content is up to date.");
} else {
  for (const [p, body] of stale) writeFileSync(join(site, p), body);
  console.log(stale.length ? `Updated ${stale.map(([p]) => `v4/${p}`).join(", ")}` : "Already up to date.");
}
