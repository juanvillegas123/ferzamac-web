// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.PUBLIC_SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
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
