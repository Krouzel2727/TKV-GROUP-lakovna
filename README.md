# TKV-GROUP – Prášková lakovna

Zdrojový kód webu **https://www.tkvgrouplakovna.cz**.

Technologie: React 19 + TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Icons, kontaktní formulář přes Web3Forms s ochranou hCaptcha.

Web je postavený na **společném designovém systému TKV-GROUP**, který je připravený i pro web truhlárny (stejný kód, jiná akcentní barva).

## Spuštění

Potřebujete Node.js 20.19+ (doporučeno 22 LTS).

```bash
npm install        # instalace závislostí
cp .env.example .env   # (pokud .env chybí) a vyplnit klíče formuláře
npm run dev        # vývojový server na http://localhost:5173
npm run build      # produkční build do složky dist/ (včetně předgenerovaného HTML)
npm run preview    # náhled produkčního buildu
```

## Úprava textů – `src/config/siteData.ts`

**Všechny texty webu jsou v jednom souboru `src/config/siteData.ts`**: navigace, úvodní sekce, služby, technologie, rozšíření výroby, reference, kontakty, formulář včetně stavových hlášek, GDPR, patička i SEO (sekce `seo`).

- Ikony se zadávají názvem (např. `FaTruck`) ze seznamu v `src/components/icons.ts`. Novou ikonu z [react-icons / Font Awesome](https://react-icons.github.io/react-icons/icons/fa/) tam stačí doplnit (do webu se přibalí jen použité ikony).
- Fotky galerie, jejich pořadí a popisky (alt texty pro vyhledávače) jsou v `gallerySection.photos`, fotky na pozadí úvodu v `hero.images`. Nová fotka: soubor do `src/assets/gallery/` (WebP) + řádek do `photos`.
- V odstavcích sekce „Rozšiřujeme výrobu“ lze použít `<strong>…</strong>`.
- U zákazníků lze odkaz vynechat (`url: null`), pak se název zobrazí bez odkazu.

## Kontaktní formulář – `.env`

| Proměnná | Význam |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key z [web3forms.com](https://web3forms.com) – kam chodí zprávy |
| `VITE_HCAPTCHA_SITE_KEY` | Veřejný site key z [hCaptcha](https://dashboard.hcaptcha.com) |

Hodnoty se vkládají při buildu, takže po změně `.env` je potřeba web znovu sestavit.

## SEO a vyhledávače

Co web pro vyhledávače dělá automaticky (vše se nastavuje v `siteData.seo`):

- **Předgenerované HTML (prerender)**: při `npm run build` se celá stránka vyrenderuje do `dist/index.html`, takže roboti (i Seznam, který nespouští JavaScript) vidí celý obsah. Postará se o to `src/entry-server.tsx` a `scripts/prerender.mjs`.
- **Meta tagy**: title, description, canonical, Open Graph/Twitter, ikony, theme-color (`seo/seoPlugin.ts`).
- **Strukturovaná data (JSON-LD)**: firma, provozovna s adresou, GPS, otevírací dobou, kontakty a oblastí působnosti. Ověření: [Rich Results Test](https://search.google.com/test/rich-results).
- **robots.txt, sitemap.xml, site.webmanifest** se generují při buildu.
- **`public/.htaccess`** (Apache): přesměrování na `https://www.`, komprese, cache a bezpečnostní hlavičky. **Po nasazení ověřte**, že `http://tkvgrouplakovna.cz` přesměruje na `https://www.tkvgrouplakovna.cz/`. Pokud by vznikla smyčka přesměrování, postup je popsaný přímo v souboru.
- **Rychlost**: fotky se při buildu zmenšují do variant 400/800/1280/1920 px (WebP), prohlížeč si vybere nejmenší vhodnou. hCaptcha se načítá až u formuláře.

**Co je potřeba udělat ručně po nasazení** (bez toho vyhledávače web nemusí najít):

1. [Google Search Console](https://search.google.com/search-console): přidat doménu, odeslat `https://www.tkvgrouplakovna.cz/sitemap.xml` a požádat o indexaci.
2. [Seznam Webmaster](https://search.seznam.cz/webmaster): přidat web a sitemapu.
3. [Firemní profil Google](https://business.google.com) (Google Mapy) a [Firmy.cz](https://www.firmy.cz): firma se stejnou adresou, telefonem a odkazem na web.
4. Odkaz z webu truhlárny (tkv-redice.cz) na lakovnu a naopak.

## Struktura

```
index.html                 šablona stránky (SEO hlavičku doplní seo/seoPlugin.ts)
vite.config.ts             konfigurace Vite
seo/seoPlugin.ts           meta tagy, JSON-LD, robots.txt, sitemap.xml, manifest
scripts/prerender.mjs      předgenerování HTML po buildu
public/                    og-image, ikony webu, .htaccess
src/
  config/siteData.ts       ★ všechny texty a nastavení SEO
  index.css                barvy, písmo a animace (Tailwind @theme)
  App.tsx                  pořadí sekcí
  main.tsx                 start aplikace v prohlížeči
  entry-server.tsx         vykreslení stránky při buildu (prerender)
  utils/animations.ts      animace nájezdů
  utils/images.ts          responzivní varianty fotek
  fonts.css                písmo nadpisů
  assets/                  logo a fotky (gallery/)
  components/
    Navbar.tsx             horní menu + mobilní menu
    Hero.tsx               úvod se střídajícími se fotkami
    Services.tsx           3 karty služeb
    TechSpecs.tsx          parametry technologie (#kapacita)
    NewHall.tsx            Rozšiřujeme výrobu
    Gallery.tsx            galerie (mřížka) se zvětšeným náhledem
    References.tsx         běžící pás TOP zákazníků
    CtaSection.tsx         odkaz na TKV Truhlárnu
    Contact.tsx            kontakty, mapa, formulář
    Footer.tsx             patička
    FloatingCall.tsx       plovoucí tlačítko „Zavolat“ (mobil)
    ui.tsx, buttons.ts     sdílené prvky designového systému
    DynamicIcon.tsx        vykreslení ikony podle názvu
    icons.ts               seznam ikon použitelných v siteData
```

## Designový systém TKV-GROUP (lakovna + truhlárna)

Obě divize sdílejí jeden vizuální jazyk, liší se jen **akcentní barvou**:

| Divize | Akcent | Text na světlém | `siteData.brand` |
|---|---|---|---|
| Prášková lakovna | #92d050 (zelená z loga) | #3f6e12 | `lakovna` |
| Truhlárna | #f39a1e (oranžová z webu tkv-redice.cz) | #94500a | `truhlarna` |

- **Barvy** jsou v `src/index.css` (`@theme`): neutrální základ (ink, body, muted, line, concrete, graphite, steel) + akcent `primary` / `primary-strong` / `primary-soft` / `on-primary`. Všechny kombinace splňují kontrast WCAG AA.
- **Přepnutí divize:** `brand` v `siteData.ts` (propisuje se jako `data-brand` na `<html>`). Atribut `data-brand` lze dát i na jednu sekci (tak je zobrazen proklik na truhlárnu).
- **Náhled stylu truhlárny při vývoji:** `npm run dev` a otevřít `http://localhost:5173/?brand=truhlarna`.
- **Písma:** nadpisy *Barlow Condensed 700* (self-hosted, `src/fonts.css`), text systémové písmo zařízení (nic se nestahuje).
- **Tvarosloví:** hranaté prvky se zkoseným rohem (`chamfer`) podle loga, technická mřížka na tmavých sekcích (`bg-blueprint`), číslované sekce (`01 — Služby`).
- **Sdílené komponenty:** `src/components/ui.tsx` (Container, Eyebrow, SectionHeader) a `src/components/buttons.ts` (tlačítka).

Web truhlárny = kopie tohoto projektu, `brand: 'truhlarna'`, vlastní texty v `siteData.ts` a fotky v `src/assets/gallery`.

## Nasazení

Po `npm run build` nahrajte **obsah** složky `dist/` do kořene webhostingu, včetně skrytého souboru `.htaccess`. Web je statický, žádný server ani databázi nepotřebuje.
