// Verify that every local href/src in the given HTML files exists on disk.
// Usage: node .github/scripts/check-links.mjs v4/index.html [more.html ...]
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: check-links.mjs <file.html> [...]');
  process.exit(2);
}

const SKIP = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\$\{)/i; // schemes (http:, data:, mailto:...), protocol-relative, anchors, templates
let missing = 0;
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const baseDir = dirname(resolve(file));
  const siteRoot = baseDir; // site is served from the HTML file's directory
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
    const raw = m[1].trim();
    if (!raw || SKIP.test(raw)) continue;
    const path = decodeURIComponent(raw.split(/[?#]/)[0]);
    if (!path) continue;
    const target = path.startsWith('/') ? join(siteRoot, path) : join(baseDir, path);
    checked++;
    if (!existsSync(target)) {
      console.error(`${file}: missing local reference "${raw}" -> ${target}`);
      missing++;
    }
  }
}

console.log(`Checked ${checked} local reference(s) in ${files.length} file(s); ${missing} missing.`);
process.exit(missing ? 1 : 0);
