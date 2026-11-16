import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import { siteData } from './src/config/siteData.ts';

// Doplní SEO meta tagy do index.html z siteData.meta
const siteMetaPlugin = (): Plugin => {
  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const m = siteData.meta;
  const values: Record<string, string> = {
    SITE_LANG: m.lang,
    SITE_PAGE_TITLE: m.pageTitle,
    SITE_TITLE: m.title,
    SITE_DESCRIPTION: m.description,
    SITE_URL: m.url,
    SITE_OG_IMAGE: m.ogImage,
  };
  return {
    name: 'site-meta',
    transformIndexHtml: (html) => html.replace(/%(SITE_[A-Z_]+)%/g, (match, key) => (key in values ? escape(values[key]) : match)),
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetaPlugin()],
});
