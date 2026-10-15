import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const enableStyleguide = process.env.PUBLIC_ENABLE_STYLEGUIDE === 'true';

if (!enableStyleguide) {
  const styleguideDir = path.join(distDir, 'guia-de-estilo');
  const styleguideHtml = path.join(distDir, 'guia-de-estilo.html');

  let removed = false;
  if (fs.existsSync(styleguideDir)) {
    fs.rmSync(styleguideDir, { recursive: true, force: true });
    removed = true;
  }
  if (fs.existsSync(styleguideHtml)) {
    fs.unlinkSync(styleguideHtml);
    removed = true;
  }

  if (removed) {
    console.log(
      '🧹 [postbuild] /guia-de-estilo eliminado de dist/ para producción (PUBLIC_ENABLE_STYLEGUIDE no activa).'
    );
  } else {
    console.log('ℹ️ [postbuild] No se encontró guia-de-estilo en dist/.');
  }
} else {
  console.log(
    'ℹ️ [postbuild] PUBLIC_ENABLE_STYLEGUIDE="true": conservando /guia-de-estilo en dist/.'
  );
}

// Crear dist/sitemap.xml como copia física de sitemap-index.xml para máxima compatibilidad
const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const sitemapClassic = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, sitemapClassic);
  console.log(
    '📄 [postbuild] dist/sitemap.xml generado como alias directo de sitemap-index.xml.'
  );
}
