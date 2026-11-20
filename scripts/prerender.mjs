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
import { readFile, writeFile, rm, access, readdir } from 'node:fs/promises';
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

// Přednačtení písma nadpisů (je hned v úvodu stránky) – zkrátí dobu, než se nadpis zobrazí správným písmem
const fontPreloads = (await readdir(path.join(distDir, 'assets')))
  .filter((f) => /^barlow-condensed-latin(-ext)?-700-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const html = template.replace('<!--app-html-->', appHtml).replace('</title>', `</title>\n    ${fontPreloads}`);
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
