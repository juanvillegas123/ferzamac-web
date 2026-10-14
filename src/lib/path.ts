const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Ensures an internal link or asset path is prefixed with the configured base path.
 * Supports both subpath hosting (e.g. GitHub Pages: /ferzamac-web/)
 * and root domain hosting (e.g. Cloudflare Pages: /).
 */
export function pathWithBase(path: string): string {
  if (!path) return path;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const clean = path.startsWith('/') ? path : `/${path}`;

  // If base is empty, just return clean path
  if (!BASE) {
    return clean;
  }

  // Avoid duplicate base prefixes
  if (clean === BASE || clean.startsWith(`${BASE}/`)) {
    return clean;
  }

  return clean === '/' ? `${BASE}/` : `${BASE}${clean}`;
}
