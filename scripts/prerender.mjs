/**
 * Předgenerování HTML (prerender) – spouští se automaticky v `npm run build`.
 *
 * 1. Načte serverový build aplikace (dist-ssr/entry-server.js).
 * 2. Vyrenderuje celou stránku do HTML a vloží ji do dist/index.html.
 * 3. Smaže pomocnou složku dist-ssr.
 *
 * Výsledek: vyhledávače i návštěvníci dostanou hned kompletní obsah stránky,
 * React ho v prohlížeči pak jen „oživí“ (hydratace).
 */
import { readFile, writeFile, rm, access } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const indexPath = path.join(distDir, 'index.html');

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await readFile(indexPath, 'utf8');
if (!template.includes('<!--app-html-->')) {
  throw new Error('V dist/index.html chybí značka <!--app-html-->');
}

const appHtml = render();
const html = template.replace('<!--app-html-->', appHtml);
await writeFile(indexPath, html);

// Kontrola: všechny odkazy na /assets/ musí existovat v klientském buildu
const missing = [];
for (const [, file] of html.matchAll(/["\s,](\/assets\/[^"\s,]+)/g)) {
  try {
    await access(path.join(distDir, file));
  } catch {
    missing.push(file);
  }
}
if (missing.length) {
  throw new Error(`Předgenerované HTML odkazuje na neexistující soubory:\n${[...new Set(missing)].join('\n')}`);
}

await rm(ssrDir, { recursive: true, force: true });
console.log(`✓ Prerender hotový: ${(appHtml.length / 1024).toFixed(1)} kB HTML vloženo do dist/index.html`);
