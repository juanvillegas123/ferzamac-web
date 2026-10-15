// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const isCloudflare = Boolean(process.env.CF_PAGES);
const isGitHubActions = Boolean(process.env.GITHUB_ACTIONS);

const siteUrl =
  process.env.PUBLIC_SITE_URL ||
  (isCloudflare
    ? 'https://ferzamac.com'
    : 'https://juanvillegas123.github.io/ferzamac-web');

const base =
  process.env.PUBLIC_BASE_PATH !== undefined
    ? process.env.PUBLIC_BASE_PATH
    : isCloudflare
      ? '/'
      : isGitHubActions
        ? '/ferzamac-web'
        : '/';

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
