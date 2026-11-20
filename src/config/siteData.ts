/**
 * ============================================================
 *  siteData.ts – VŠECHNY TEXTY WEBU NA JEDNOM MÍSTĚ
 * ============================================================
 *  Pro změnu jakéhokoli textu na webu stačí upravit tento soubor.
 *  Komponenty v /src/components si texty berou odsud.
 *
 *  Poznámky:
 *  - Ikony se zadávají názvem ze seznamu v src/components/icons.ts
 *    (při použití nové ikony ji tam stačí přidat).
 *  - V odstavcích sekce "Rozšiřujeme výrobu" lze použít <strong>…</strong>
 *    pro zvýraznění textu.
 *  - Část `seo` se při buildu propisuje do index.html (meta tagy,
 *    strukturovaná data pro Google/Seznam), robots.txt a sitemap.xml.
 *  - Klíče formuláře (Web3Forms, hCaptcha) jsou v souboru .env.
 * ============================================================
 */

import type { IconName } from '../components/icons.ts';

export const siteData = {
  // --- Značka a divize TKV-GROUP ---
  // Obě divize používají stejnou barevnou paletu TKV-GROUP (src/index.css).
  // brand určuje, která divize je "tento web" (zvýraznění v přepínači divizí).
  // Web truhlárny = stejný kód s brand: 'truhlarna' a vlastními texty.
  brand: `lakovna` as Brand,
  groupName: `TKV-GROUP`,
  divisionsLabel: `Divize TKV-GROUP`,
  divisions: [
    { brand: `lakovna` as Brand, name: `Prášková lakovna`, url: `https://www.tkvgrouplakovna.cz/` },
    { brand: `truhlarna` as Brand, name: `Truhlárna`, url: `http://www.tkv-redice.cz` },
  ],

  // --- SEO (meta tagy, strukturovaná data, sitemap) ---
  seo: {
    lang: `cs`,
    locale: `cs_CZ`,
    // Hlavní adresa webu – VŽDY s https://www. a lomítkem na konci (musí odpovídat .htaccess)
    siteUrl: `https://www.tkvgrouplakovna.cz/`,
    siteName: `TKV-GROUP Prášková lakovna`,
    // Titulek v záložce prohlížeče a ve výsledcích vyhledávání (ideálně do 60 znaků)
    pageTitle: `Prášková lakovna Horní Ředice u Pardubic | TKV-GROUP`,
    // Titulek pro sdílení na sociálních sítích
    title: `TKV-GROUP | Profesionální prášková lakovna`,
    // Popis ve výsledcích vyhledávání (ideálně 120–160 znaků)
    description: `Práškové lakování kovů v Horních Ředicích u Pardubic. Ocel, hliník, nerez i pozink, dílce až 6,1 m, celý vzorník RAL a vlastní doprava. Nezávazná poptávka.`,
    keywords: `prášková lakovna, práškové lakování, lakování kovů, lakovna Pardubice, lakování RAL, Horní Ředice, Holice, Hradec Králové`,
    ogImage: `og-image.jpg`, // soubor v /public, rozměr 1200 × 630 px
    ogImageAlt: `TKV-GROUP – prášková lakovna Horní Ředice`,
    themeColor: `#242222`,
    // Strukturovaná data (schema.org) – firma, adresa, otevírací doba
    business: {
      legalName: `TKV-group s.r.o.`,
      phone: `+420607456789`,
      email: `lakovna@tkv-group.cz`,
      street: `Horní Ředice 18`,
      city: `Horní Ředice`,
      postalCode: `533 75`,
      region: `Pardubický kraj`,
      country: `CZ`,
      latitude: 50.0683696,
      longitude: 15.9621419,
      openingDays: [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`],
      opens: `06:00`,
      closes: `15:00`,
      // Města/oblasti, kde firma působí
      areaServed: [`Horní Ředice`, `Pardubice`, `Holice`, `Hradec Králové`, `Vysoké Mýto`, `Pardubický kraj`, `Královéhradecký kraj`],
      services: [`Práškové lakování`, `Odmašťování a předúprava kovů`, `Lakování dle vzorníku RAL`, `Doprava dílců k lakování`],
      // Další weby firmy (propojení pro vyhledávače)
      sameAs: [`http://www.tkv-redice.cz`],
    },
  },

  // --- Navigace ---
  nav: [
    { label: `Služby`, href: `#sluzby` },
    { label: `Technologie`, href: `#kapacita` },
    { label: `Reference`, href: `#reference` },
    { label: `Kontakt`, href: `#kontakt` },
  ],
  // Horní lišta (jen na počítači): přepínač divizí, telefon, otevírací doba
  topBar: {
    phoneLabel: `Volejte`,
  },
  navbar: {
    logoAlt: `TKV-GROUP s.r.o.`,
    homeLabel: `TKV-GROUP – úvodní strana`,
    menuToggleLabel: `Přepnout menu`,
    navLabel: `Hlavní navigace`,
    mobileCta: `Poptat lakování`,
  },

  // --- Úvodní sekce (hero) ---
  hero: {
    // Fotky na pozadí (názvy souborů ze src/assets/gallery), střídají se po 5 s
    images: [`IMG_16`, `IMG_14`, `IMG_19`],
    // Malý řádek nad hlavním nadpisem (součást nadpisu H1 – důležité pro SEO)
    eyebrow: `Horní Ředice u Pardubic`,
    title: `Prášková lakovna`,
    subtitle: `Práškové lakování je moderní metoda povrchové úpravy kovových materiálů, které zajistí kvalitní, odolný a jednolitý povrch lakovaných dílců.`,
    btnPrimary: `Poptat lakování`,
    btnSecondary: `Kontakt`,
    slideLabel: `Zobrazit fotku`, // + číslo
  },

  // --- Služby ---
  services: [
    {
      id: 1,
      title: `Práškové lakování`,
      desc: `Lakování povrchu práškovou barvou, která se nanáší elektrostaticky na kovové dílce a následně vypaluje ve vytvrzovací peci`,
      icon: `FaSprayCan`,
    },
    {
      id: 2,
      title: `Pro koho lakujeme`,
      desc: `Zabýváme se komerčním lakováním pro firmy, drobné živnostníky i soukromé osoby.`,
      icon: `FaUsers`,
    },
    {
      id: 3,
      title: `Vlastní autodoprava`,
      desc: `V případě potřeby jsme schopni zajistit dopravu dílců k lakování a následně jejich odvezení.`,
      icon: `FaTruck`,
    },
  ] as { id: number; title: string; desc: string; icon: IconName }[],

  // --- Technologie (parametry) ---
  techSection: {
    title: `Technologie`,
    // Text, který se u karty s odkazem zobrazí před odkazem (např. "Vzorník RAL")
    linkPrefix: `Vzorník `,
    cards: [
      {
        id: 1,
        label: `Barevná škála`,
        value: `Vzorník RAL`,
        icon: `FaPalette`,
        tooltip: `Standardizovaný vzorník barev zaručující přesný odstín.`,
        link: `https://cs.wikipedia.org/wiki/Vzorník_barev_RAL`,
      },
      { id: 2, label: `Předúprava`, value: `ODMAŠŤOVÁNÍ`, icon: `FaShieldAlt` },
      { id: 3, label: `Vhodné materiály`, value: `OCEL, HLINÍK, NEREZ, POZINK`, icon: `FaLayerGroup` },
      { id: 4, label: `Vypalování`, value: `160 °C – 200 °C`, icon: `FaTemperatureHigh` },
      { id: 5, label: `Max. hmotnost`, value: `300 kg`, icon: `FaWeightHanging` },
      { id: 6, label: `Max. délka`, value: `6100 mm`, icon: `FaArrowsAltH` },
      { id: 7, label: `Max. šířka`, value: `1300 mm`, icon: `FaExpandAlt` },
      { id: 8, label: `Max. výška`, value: `2000 mm`, icon: `FaArrowsAltV` },
    ] as TechCard[],
  },

  // --- Rozšiřujeme výrobu ---
  newHallSection: {
    badge: `Připravujeme`,
    title: `Rozšiřujeme výrobu`,
    subtitle: `Připravujeme nové technologie pro ještě efektivnější a ekologičtější provoz.`,
    halls: [
      {
        title: `Automatická linka`,
        paragraphs: [
          `Průběžná automatická linka tvořící uzavřený okruh pro díly o velikosti až <strong>3000 x 1700 x 800 mm</strong>.`,
          `Plně automatické mytí s třístupňovým ekologickým odmaštěním (železitý fosfát, vodní oplach, demi voda) zcela nahrazuje staré ruční mytí.`,
          `Nános barvy zajišťuje manipulátor se <strong>6 pistolemi</strong>. Integrované Colorcentrum s cyklonem umožňuje recyklovat <strong>až 95 % barvy</strong>, čímž se radikálně snižuje množství odpadu. Vypalování probíhá v průběžné peci při 180 °C.`,
        ],
      },
      {
        title: `Ruční pracoviště`,
        paragraphs: [
          `Pracoviště s lakovacím boxem a velkokapacitní zavážecí plynovou pecí o rozměrech <strong>6500 x 2000 x 1400 mm</strong>. Je určeno primárně pro nadrozměrné a atypické výrobky.`,
          `Pro snadnou manipulaci s těžkými díly je prostor vybaven moderním <strong>křížovým dopravníkem</strong>.`,
          `Po precizním nanesení barvy lakýrníkem jsou díly zavezeny do pece (vypalování při 180 °C na 20 minut). Následně zůstávají zavěšené na dopravníku k plynulému vychladnutí a kontrole před expedicí.`,
        ],
      },
    ],
  },

  // --- Galerie (fotky jsou v src/assets/gallery, pořadí v components/Gallery.tsx) ---
  gallerySection: {
    title: `Reference`,
    prevLabel: `Předchozí fotky`,
    nextLabel: `Další fotky`,
    autoplayMs: 2500, // automatický posun galerie (ms); 0 = vypnuto
    openLabel: `Zvětšit fotku`,
    lightboxClose: `Zavřít náhled`,
    lightboxPrev: `Předchozí fotka`,
    lightboxNext: `Další fotka`,
    // Fotky jsou v src/assets/gallery. Pořadí v galerii = pořadí v tomto seznamu.
    // "alt" je popis fotky pro vyhledávače a nevidomé – popište, co je na fotce.
    photos: [
      { file: `IMG_03`, alt: `Zastřešené posezení s kovovou konstrukcí a pletivem v antracitové barvě` },
      { file: `IMG_04`, alt: `Hliníková pergola nad terasou restaurace, práškově lakovaná` },
      { file: `IMG_08`, alt: `Fasáda budovy s kovovým opláštěním v tmavém odstínu` },
      { file: `IMG_16`, alt: `Modrá ocelová nosná konstrukce skladové haly` },
      { file: `IMG_15`, alt: `Ocelová skladová plošina se schodištěm v modré barvě` },
      { file: `IMG_06`, alt: `Modré skladové regály s drátěnými dvířky` },
      { file: `IMG_18`, alt: `Detail práškově lakovaného regálového profilu` },
      { file: `IMG_19`, alt: `Lakované kovové police s výsuvnými kolejnicemi` },
      { file: `IMG_20`, alt: `Detail modře lakovaného ocelového sloupku` },
      { file: `IMG_17`, alt: `Knihovní regály s práškově lakovanými kovovými díly` },
      { file: `IMG_01`, alt: `Světle šedé lakované kovové zásuvky a regálový systém` },
      { file: `IMG_05`, alt: `Bílá hliníková pergola nad terasou rodinného domu` },
      { file: `IMG_07`, alt: `Pergola s ocelovými sloupy v rezavě hnědém odstínu` },
      { file: `IMG_09`, alt: `Detail fasády z tahokovu lakovaného ve zlatém odstínu` },
      { file: `IMG_10`, alt: `Perforovaný plech práškově lakovaný v tyrkysové barvě` },
      { file: `IMG_11`, alt: `Balkonové zábradlí s tahokovovou výplní v antracitu` },
      { file: `IMG_12`, alt: `Recepční pult s lakovaným kovovým obkladem` },
      { file: `IMG_14`, alt: `Modré ocelové schodiště skladové plošiny` },
      { file: `IMG_21`, alt: `Kovový plot a vjezdová brána v antracitové barvě` },
      { file: `IMG_22`, alt: `Posuvná brána s perforovanou výplní v antracitu` },
      { file: `IMG_23`, alt: `Lamelový kovový plot v antracitové barvě` },
      { file: `IMG_13`, alt: `Bílé lakované kovové konstrukce v interiéru haly` },
      { file: `IMG_24`, alt: `Expedice lakovaných dílců na návěsu kamionu` },
      { file: `IMG_02`, alt: `Lakované kovové regály s přihrádkami v černé a žluté` },
    ],
  },

  // --- TOP zákazníci (běžící pás) ---
  referencesSection: {
    title: `TOP Zákazníci`,
    items: [
      { name: `Perfolinea`, url: `https://shop.perfolinea.cz/` },
      { name: `PROMAN s.r.o`, url: `https://regaly-proman.cz/` },
      { name: `KOV Projekt s.r.o.`, url: `https://www.kovprojekt.cz/` },
      { name: `Zámečnictví Jan Prorok`, url: `https://zamecnictvi-prace.cz/` },
      { name: `KOVO - Červený s.r.o.`, url: null },
      { name: `Staveko Trade`, url: `https://www.staveko.cz/` },
      { name: `JT Motors s.r.o.`, url: `https://www.jtmotors.cz/jtmotors.html` },
      { name: `GEMATEX s.r.o.`, url: `https://www.engel-gematex.com/` },
      { name: `Wood Metal s.r.o.`, url: null },
      { name: `ESAB`, url: `https://esab.com/cz/eur_cs/` },
      { name: `K2 Mechatronics`, url: `https://k2mechatronics.com` },
    ] as { name: string; url: string | null }[],
  },

  // --- Odkaz na truhlárnu ---
  ctaSection: {
    title: `Hledáte kvalitní truhlářské práce?`,
    subtitle: `Kromě lakování se zabýváme i zakázkovým truhlářstvím.`,
    btnText: `Přejít na TKV Truhlárnu`,
    url: `http://www.tkv-redice.cz`,
  },

  // --- Kontakt + formulář ---
  contactSection: {
    title: `Spojte se s námi`,
    formTitle: `Napište nám`,
    navigateTitle: `Otevřít v navigaci`,
    mapTitle: `Mapa Horní Ředice`,
    icoLabel: `IČO:`,
    dicLabel: `DIČ:`,
    labels: {
      name: `Jméno / Firma`,
      phone: `Telefon`,
      email: `E-mail`,
      message: `Zpráva`,
      submit: `Odeslat zprávu`,
    },
    placeholders: {
      name: `Jan Novák`,
      phone: `+420 123 456 789`,
      email: `jan@novak.cz`,
      message: `Vaše zpráva...`,
    },
    // Stavové hlášky formuláře
    status: {
      sending: `Odesílám zprávu...`,
      captchaMissing: `Prosím, potvrďte, že nejste robot (zaškrtněte políčko).`,
      success: `Děkujeme! Vaše zpráva byla úspěšně odeslána.`,
      parseError: `Chyba při čtení odpovědi od serveru.`,
      errorPrefix: `Něco se pokazilo: `,
      unknownError: `Neznámá chyba`,
      connectionErrorPrefix: `Chyba připojení: `,
    },
  },

  contacts: {
    roman: {
      name: `Roman Jelínek`,
      phone: `+420 607 456 789`,
      email: `lakovna@tkv-group.cz`,
    },
    jakub: {
      name: `Jakub Kašpar`,
      phone: `+420 737 739 061`,
      email: `truhlarna@tkv-group.cz`,
    },
    hala1: {
      name: `Provozovna`,
      adres: `Horní Ředice 18, 533 75`,
      open: `Po-Pá: 6:00 - 15:00`,
      ico: `02016401`,
      dico: `CZ02016401`,
    },
    mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.1066782410313!2d15.9621419!3d50.0683696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470dc937eb733795%3A0x6a2c2628469a4c8a!2sHorn%C3%AD%20%C5%98edice%2018%2C%20533%2075%20Horn%C3%AD%20%C5%98edice!5e0!3m2!1scs!2scz!4v1700000000000!5m2!1scs!2scz`,
  },

  GDPR: {
    agree: `Souhlasím se zpracováním osobních údajů pro účely vyřízení této poptávky.`,
    text: `Vámi zadané údaje použijeme výhradně pro zpětné kontaktování, a to v souladu s GDPR.`,
  },

  // --- Patička ---
  // Plovoucí tlačítko "Zavolat" na mobilu (volá na první kontakt)
  floatingCall: {
    label: `Zavolat`,
  },

  // --- Patička ---
  footer: {
    text: `TKV-GROUP. Všechna práva vyhrazena.`,
    address: `Horní Ředice 18, 533 75`,
    ico: `IČO: 02016401`,
    dico: `DIČ: CZ02016401`,
  },
};

export type Brand = 'lakovna' | 'truhlarna';

export type TechCard = {
  id: number;
  label: string;
  value: string;
  icon: IconName;
  tooltip?: string;
  link?: string;
};
