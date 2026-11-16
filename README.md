# TKV-GROUP – Prášková lakovna

Zdrojový kód webu **https://www.tkvgrouplakovna.cz**.

Technologie: React 19 + TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Icons, kontaktní formulář přes Web3Forms s ochranou hCaptcha.

## Spuštění

Potřebujete Node.js 20.19+ (doporučeno 22 LTS).

```bash
npm install        # instalace závislostí
cp .env.example .env   # (pokud .env chybí) a vyplnit klíče formuláře
npm run dev        # vývojový server na http://localhost:5173
npm run build      # produkční build do složky dist/
npm run preview    # náhled produkčního buildu
```

## Úprava textů – `src/config/siteData.ts`

**Všechny texty webu jsou v jednom souboru `src/config/siteData.ts`**: navigace, úvodní sekce, služby, technologie, rozšíření výroby, reference, kontakty, formulář včetně stavových hlášek, GDPR, patička i SEO meta tagy (`meta` se při buildu propisuje do `index.html`).

- Ikony se zadávají názvem z [react-icons / Font Awesome](https://react-icons.github.io/react-icons/icons/fa/), např. `FaTruck`.
- V odstavcích sekce „Rozšiřujeme výrobu“ lze použít `<strong>…</strong>`.
- U zákazníků lze odkaz vynechat (`url: null`), pak se název zobrazí bez odkazu.

## Kontaktní formulář – `.env`

| Proměnná | Význam |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key z [web3forms.com](https://web3forms.com) – kam chodí zprávy |
| `VITE_HCAPTCHA_SITE_KEY` | Veřejný site key z [hCaptcha](https://dashboard.hcaptcha.com) |

Hodnoty se vkládají při buildu, takže po změně `.env` je potřeba web znovu sestavit.

## Struktura

```
index.html                 šablona stránky (meta tagy z siteData.meta)
vite.config.ts             konfigurace Vite + doplnění meta tagů
public/og-image.jpg        náhledový obrázek pro sociální sítě
src/
  config/siteData.ts       ★ všechny texty
  index.css                barvy, písmo a animace (Tailwind @theme)
  App.tsx                  pořadí sekcí
  utils/animations.ts      animace nájezdů
  assets/                  logo, favicona, fotky galerie (gallery/)
  components/
    Navbar.tsx             horní menu + mobilní menu
    Hero.tsx               úvod se střídajícími se fotkami
    Services.tsx           3 karty služeb
    TechSpecs.tsx          parametry technologie (#kapacita)
    NewHall.tsx            Rozšiřujeme výrobu
    Gallery.tsx            galerie s posuvníkem a zvětšením (pořadí fotek zde)
    References.tsx         běžící pás TOP zákazníků
    CtaSection.tsx         odkaz na TKV Truhlárnu
    Contact.tsx            kontakty, mapa, formulář
    Footer.tsx             patička
    DynamicIcon.tsx        vykreslení ikony podle názvu
```

## Barvy

Definované v `src/index.css` (`@theme`): `primary` #92d050, `dark` #242222, `bgLight` #f1f5f9, `textMain` #595959, `textLight` #a6a6a6.

## Nasazení

Po `npm run build` nahrajte **obsah** složky `dist/` do kořene webhostingu. Web je statický, žádný server ani databázi nepotřebuje.
