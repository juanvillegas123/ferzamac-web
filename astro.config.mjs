// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const siteUrl =
  process.env.PUBLIC_SITE_URL || 'https://juanvillegas123.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/ferzamac-web';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: base,
  integrations: [
    ...(siteUrl
      ? [
          sitemap({
            filter: (page) =>
              !page.includes('/guia-de-estilo') && !page.includes('/404'),
          }),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
