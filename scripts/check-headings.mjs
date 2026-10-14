import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error(
    '❌ [a11y-check] Error: La carpeta dist/ no existe. Ejecuta "npm run build" primero.'
  );
  process.exit(1);
}

function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(distDir);

if (htmlFiles.length === 0) {
  console.error(
    '❌ [a11y-check] Error: No se encontraron archivos HTML en dist/.'
  );
  process.exit(1);
}

let hasErrors = false;
let pagesChecked = 0;
let totalH1Count = 0;
let imagesWithoutAlt = 0;

console.log(
  `🔍 [a11y-check] Auditando ${htmlFiles.length} páginas HTML en dist/...`
);

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const html = fs.readFileSync(filePath, 'utf-8');

  pagesChecked++;

  // 1. Verificar conteo de etiquetas <h1>
  // Match <h1 ...>...</h1>
  const h1Matches = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;
  totalH1Count += h1Count;

  if (h1Count === 0) {
    console.error(`❌ [a11y-check] ${relPath}: FALTA ETIQUETA <h1> (tiene 0)`);
    hasErrors = true;
  } else if (h1Count > 1) {
    console.error(
      `❌ [a11y-check] ${relPath}: MÚLTIPLES <h1> ENCONTRADOS (${h1Count}):`
    );
    h1Matches.forEach((m, i) =>
      console.error(
        `    [${i + 1}] ${m.replace(/\s+/g, ' ').substring(0, 80)}...`
      )
    );
    hasErrors = true;
  }

  // 2. Verificar que todas las etiquetas <img> tengan atributo alt
  // Regex para capturar tags <img>
  const imgMatches = html.match(/<img\b[^>]*>/gi) || [];
  for (const imgTag of imgMatches) {
    if (!/\balt\s*=/i.test(imgTag)) {
      console.warn(
        `⚠️ [a11y-check] ${relPath}: <img> sin atributo alt: ${imgTag.substring(0, 60)}...`
      );
      imagesWithoutAlt++;
    }
  }
}

if (imagesWithoutAlt > 0) {
  console.warn(
    `⚠️ [a11y-check] Advertencia: Se encontraron ${imagesWithoutAlt} imagen(es) sin atributo alt.`
  );
}

if (hasErrors) {
  console.error(
    '\n❌ [a11y-check] Falla de validación: Se detectaron páginas que violan la regla de exactamente un solo <h1>.'
  );
  process.exit(1);
} else {
  console.log(`\n✅ [a11y-check] Verificación superada con éxito:`);
  console.log(`   - Páginas auditadas: ${pagesChecked}`);
  console.log(
    `   - Todas las páginas cuentan con exactamente 1 etiqueta <h1> única.`
  );
  console.log(`   - Cero conflictos de títulos primarios.\n`);
}
