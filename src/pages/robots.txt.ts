import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site ? new URL('sitemap-index.xml', site).href : null;

  const content = [
    'User-agent: *',
    'Allow: /',
    '',
    sitemapUrl
      ? `Sitemap: ${sitemapUrl}`
      : '# TODO: PUBLIC_SITE_URL no configurada; agregar línea Sitemap cuando se defina el dominio final',
    '',
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
