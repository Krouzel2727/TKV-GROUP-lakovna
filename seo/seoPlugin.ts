import type { Plugin } from 'vite';
import { siteData } from '../src/config/siteData.ts';

/**
 * Vite plugin, který ze siteData.seo vygeneruje:
 *  - SEO hlavičku v index.html (title, description, canonical, Open Graph,
 *    Twitter, ikony, theme-color, strukturovaná data JSON-LD),
 *  - robots.txt, sitemap.xml a site.webmanifest (jen při buildu).
 */

const seo = siteData.seo;
const b = seo.business;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const abs = (path: string) => new URL(path, seo.siteUrl).href;

// Strukturovaná data pro Google/Seznam (https://schema.org)
export const jsonLd = () => {
  const orgId = `${seo.siteUrl}#organizace`;
  const businessId = `${seo.siteUrl}#lakovna`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: 'TKV-GROUP',
        legalName: b.legalName,
        url: seo.siteUrl,
        logo: abs('icon-512.png'),
        taxID: siteData.contacts.hala1.ico,
        vatID: siteData.contacts.hala1.dico,
        sameAs: b.sameAs,
      },
      {
        '@type': 'LocalBusiness',
        '@id': businessId,
        name: seo.siteName,
        description: seo.description,
        url: seo.siteUrl,
        image: abs(seo.ogImage),
        logo: abs('icon-512.png'),
        telephone: b.phone,
        email: b.email,
        parentOrganization: { '@id': orgId },
        address: {
          '@type': 'PostalAddress',
          streetAddress: b.street,
          addressLocality: b.city,
          postalCode: b.postalCode,
          addressRegion: b.region,
          addressCountry: b.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: b.latitude, longitude: b.longitude },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.contacts.hala1.adres)}`,
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: b.openingDays, opens: b.opens, closes: b.closes },
        ],
        areaServed: b.areaServed.map((name) => ({ '@type': 'Place', name })),
        contactPoint: [siteData.contacts.roman, siteData.contacts.jakub].map((p) => ({
          '@type': 'ContactPoint',
          name: p.name,
          telephone: p.phone.replace(/\s+/g, ''),
          email: p.email,
          contactType: 'customer service',
          availableLanguage: 'cs',
        })),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Služby',
          itemListElement: b.services.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${seo.siteUrl}#web`,
        url: seo.siteUrl,
        name: seo.siteName,
        inLanguage: seo.lang,
        publisher: { '@id': orgId },
      },
    ],
  };
};

const headHtml = () =>
  [
    `<title>${esc(seo.pageTitle)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="keywords" content="${esc(seo.keywords)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${esc(seo.siteUrl)}" />`,
    `<meta name="theme-color" content="${esc(seo.themeColor)}" />`,
    `<meta name="geo.region" content="CZ-53" />`,
    `<meta name="geo.placename" content="${esc(b.city)}" />`,
    `<meta name="geo.position" content="${b.latitude};${b.longitude}" />`,
    `<meta name="ICBM" content="${b.latitude}, ${b.longitude}" />`,
    // Ikony
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,
    // Open Graph (Facebook, WhatsApp, LinkedIn…)
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${esc(seo.locale)}" />`,
    `<meta property="og:site_name" content="${esc(seo.siteName)}" />`,
    `<meta property="og:url" content="${esc(seo.siteUrl)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${esc(abs(seo.ogImage))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    // X (Twitter)
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(abs(seo.ogImage))}" />`,
    // Strukturovaná data
    `<script type="application/ld+json">${JSON.stringify(jsonLd()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');

const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`;

const sitemapXml = () => {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${seo.siteUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
};

const webManifest = () =>
  JSON.stringify(
    {
      name: seo.siteName,
      short_name: 'TKV Lakovna',
      lang: seo.lang,
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: seo.themeColor,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  );

export const seoPlugin = (): Plugin => ({
  name: 'tkv-seo',
  transformIndexHtml: (html) =>
    html.replace('%SITE_LANG%', esc(seo.lang)).replace('<!--seo-head-->', headHtml()),
  // Ve vývojovém režimu obsluhuje i manifest
  configureServer(server) {
    server.middlewares.use('/site.webmanifest', (_req, res) => {
      res.setHeader('Content-Type', 'application/manifest+json');
      res.end(webManifest());
    });
  },
  generateBundle() {
    // Soubory generujeme jen do klientského buildu (ne do SSR buildu pro předgenerování)
    if (this.environment.config.consumer === 'server') return;
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() });
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
    this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: webManifest() });
  },
});
