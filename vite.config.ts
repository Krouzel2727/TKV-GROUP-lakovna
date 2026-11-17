import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { seoPlugin } from './seo/seoPlugin.ts';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools(), seoPlugin()],
});
