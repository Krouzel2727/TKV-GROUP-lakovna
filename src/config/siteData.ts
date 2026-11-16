/**
 * ============================================================
 *  siteData.ts – VŠECHNY TEXTY WEBU NA JEDNOM MÍSTĚ
 * ============================================================
 *  Pro změnu jakéhokoli textu na webu stačí upravit tento soubor.
 *  Komponenty v /src/components si texty berou odsud.
 *
 *  Poznámky:
 *  - Ikony se zadávají názvem z knihovny react-icons (sada "Fa"),
 *    přehled: https://react-icons.github.io/react-icons/icons/fa/
 *  - V odstavcích sekce "Rozšiřujeme výrobu" lze použít <strong>…</strong>
 *    pro zvýraznění textu.
 *  - Meta tagy (SEO) z části `meta` se při buildu propisují do index.html.
 *  - Klíče formuláře (Web3Forms, hCaptcha) jsou v souboru .env.
 * ============================================================
 */

export const siteData = {
  // --- SEO / meta tagy (propisují se do index.html) ---
  meta: {
    lang: `cs`,
    pageTitle: `TKV-GROUP | Prášková lakovna`,
    title: `TKV-GROUP | Profesionální prášková lakovna`,
    description: `Moderní práškové lakování a povrchové úpravy kovů. Zajišťujeme kvalitní, odolný a slitý povrch lakovaných dílců. Sídlíme v Horních Ředicích.`,
    url: `https://www.tkvgrouplakovna.cz/`,
    ogImage: `https://www.tkvgrouplakovna.cz/og-image.jpg`,
  },

  // --- Navigace ---
  nav: [
    { label: `Služby`, href: `#sluzby` },
    { label: `Technologie`, href: `#kapacita` },
    { label: `Reference`, href: `#reference` },
    { label: `Kontakt`, href: `#kontakt` },
  ],
  navbar: {
    logoAlt: `TKV-GROUP`,
    menuToggleLabel: `Přepnout menu`,
    mobileCta: `Poptat lakování`,
  },

  // --- Úvodní sekce (hero) ---
  hero: {
    title: `Prášková lakovna`,
    subtitle: `Práškové lakování je moderní metoda povrchové úpravy kovových materiálů, které zajistí kvalitní, odolný a jednolitý povrch lakovaných dílců.`,
    btnPrimary: `Poptat lakování`,
    btnSecondary: `Kontakt`,
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
  ],

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
    goToLabel: `Přejít na posun`, // + číslo, např. "Přejít na posun 3"
    imageAlt: `Realizace`, // + číslo
    lightboxAlt: `Zvětšená realizace`, // + číslo
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
  footer: {
    text: `TKV-GROUP. Všechna práva vyhrazena.`,
    address: `Horní Ředice 18, 533 75`,
    ico: `IČO: 02016401`,
    dico: `DIČ: CZ02016401`,
  },
};

export type TechCard = {
  id: number;
  label: string;
  value: string;
  icon: string;
  tooltip?: string;
  link?: string;
};
