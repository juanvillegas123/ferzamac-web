#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'content');

const collections = ['soluciones', 'proyectos', 'clientes', 'marcas'];

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content, rawFm: '' };

  const rawFm = match[1];
  const body = match[2];
  const frontmatter = {};

  const lines = rawFm.split(/\r?\n/);
  let currentKey = null;

  for (const line of lines) {
    const kvMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value = kvMatch[2].trim();
      currentKey = key;

      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      } else if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      frontmatter[key] = value;
    } else if (currentKey && line.match(/^\s+-\s+/)) {
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      const itemVal = line.replace(/^\s+-\s+/, '').trim().replace(/^["']|["']$/g, '');
      frontmatter[currentKey].push(itemVal);
    }
  }

  return { frontmatter, body, rawFm };
}

const catalogoPath = path.join(rootDir, 'docs', 'catalogo-texto.md');
const catalogoText = fs.existsSync(catalogoPath) ? fs.readFileSync(catalogoPath, 'utf-8') : '';

const marketingTerms = [
  'alta precisión',
  'mínimo',
  'minimo',
  'integral',
  'integrales',
  'óptimo',
  'optimo',
  'líder',
  'lider',
  'municipal',
  'suministro',
];

function analyzeEntry(col, file) {
  const filePath = path.join(contentDir, col, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body, rawFm } = parseFrontmatter(raw);

  const title = frontmatter.title || frontmatter.nombre || file;
  const estado = frontmatter.estado || (col === 'clientes' || col === 'marcas' ? 'n/a' : 'sin-definir');
  const slug = file.replace(/\.(md|mdx)$/, '');

  // Body prohibited content checks
  // Prohibited in body: "[por confirmar]", "catálogo", "catalogo", "pág.", "pág", "pag."
  const bodyViolations = [];
  if (/\[por confirmar\]/i.test(body)) {
    bodyViolations.push('mención de "[por confirmar]" en el cuerpo');
  }
  if (/cat[aá]logo/i.test(body)) {
    bodyViolations.push('mención de "catálogo" en el cuerpo');
  }
  if (/p[aá]g\.?/i.test(body)) {
    bodyViolations.push('mención de "pág." o "página" en el cuerpo');
  }

  // Número con unidad en specs, resumen y cuerpo que deba aparecer en docs/catalogo-texto.md
  const unconfirmedNumbers = [];
  const textToCheckForNumbers = `${frontmatter.resumen || ''} ${body} ${rawFm}`;
  const numberUnitRegex = /\b(\d+(?:[.,]\d+)?)\s*(kg|s|seg|segundos|t|toneladas|tonelada|plg|pulgadas|metros|metro|m|lt|l|litros|bar|bhp|kw|hp|mm|cm|v|w|hz|°|%)\b/gi;
  let match;
  while ((match = numberUnitRegex.exec(textToCheckForNumbers)) !== null) {
    const rawNumber = match[1];
    const fullMatch = match[0];
    // Check if the number appears in docs/catalogo-texto.md (normalizing comma/dot for decimals)
    const rawWithDot = rawNumber.replace(',', '.');
    const rawWithComma = rawNumber.replace('.', ',');
    const inCatalog =
      catalogoText.includes(rawNumber) ||
      catalogoText.includes(rawWithDot) ||
      catalogoText.includes(rawWithComma);

    if (catalogoText && !inCatalog) {
      if (!unconfirmedNumbers.includes(fullMatch)) {
        unconfirmedNumbers.push(fullMatch);
      }
    }
  }

  // Frases de marketing no respaldadas en resumen y cuerpo
  const marketingWarnings = [];
  const textToCheckForMarketing = `${frontmatter.resumen || ''} ${body}`;
  for (const term of marketingTerms) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(textToCheckForMarketing)) {
      if (!marketingWarnings.includes(term)) {
        marketingWarnings.push(term);
      }
    }
  }

  // Pendientes list
  const pendientes = Array.isArray(frontmatter.pendientes) ? frontmatter.pendientes : [];

  // Images analysis
  const hasMainImage = Boolean(frontmatter.imagenPrincipal && frontmatter.imagenPrincipal !== '');
  const notaInterna = frontmatter.notaInterna || frontmatter.imagenNota || null;
  const rawFmHasGaleria = /galeria:\s*(\r?\n\s+-\s+|\s*\[\s*\{|\s*\[\s*["'])/.test(rawFm);
  const rawFmHasEmptyGaleria = /galeria:\s*\[\s*\]/.test(rawFm);
  const hasGallery = rawFmHasGaleria && !rawFmHasEmptyGaleria;

  // Client privacy
  const isPrivateClient = frontmatter.mostrarNombre === false;
  const clientRef = frontmatter.cliente || null;

  return {
    collection: col,
    file,
    slug,
    title,
    estado,
    hasMainImage,
    notaInterna,
    hasGallery,
    pendientes,
    bodyViolations,
    unconfirmedNumbers,
    marketingWarnings,
    isPrivateClient,
    clientRef,
    mostrarNombre: frontmatter.mostrarNombre,
  };
}

console.log('\n============================================================');
console.log('       FERZAMAC WEB · REPORTE DE ESTADO DE CONTENIDO');
console.log('============================================================\n');

let totalEntries = 0;
let totalParcial = 0;
let totalCompleto = 0;
let totalSinImgPrincipal = 0;
let totalSinGaleria = 0;
let totalPrivateClients = 0;
let allViolations = [];
let allUnconfirmedNumbers = [];
let allMarketingWarnings = [];

for (const col of collections) {
  const colPath = path.join(contentDir, col);
  if (!fs.existsSync(colPath)) continue;

  const files = fs
    .readdirSync(colPath)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  if (files.length === 0) {
    console.log(`📁 Colección: ${col.toUpperCase()} (0 entradas)\n`);
    continue;
  }

  console.log(`📁 Colección: ${col.toUpperCase()} (${files.length} entrada${files.length > 1 ? 's' : ''})`);
  console.log('─'.repeat(60));

  for (const file of files) {
    totalEntries++;
    const data = analyzeEntry(col, file);

    if (data.estado === 'parcial') totalParcial++;
    if (data.estado === 'completo') totalCompleto++;
    if (!data.hasMainImage && (col === 'soluciones' || col === 'proyectos')) totalSinImgPrincipal++;
    if (!data.hasGallery && (col === 'soluciones' || col === 'proyectos')) totalSinGaleria++;
    if (col === 'clientes' && data.mostrarNombre === false) totalPrivateClients++;

    if (data.bodyViolations.length > 0) {
      allViolations.push({
        entry: `${col}/${file}`,
        violations: data.bodyViolations,
      });
    }

    if (data.unconfirmedNumbers.length > 0) {
      allUnconfirmedNumbers.push({
        entry: `${col}/${file}`,
        numbers: data.unconfirmedNumbers,
      });
    }

    if (data.marketingWarnings.length > 0) {
      allMarketingWarnings.push({
        entry: `${col}/${file}`,
        warnings: data.marketingWarnings,
      });
    }

    console.log(`• [${data.slug}]`);
    console.log(`  Título:               ${data.title}`);
    if (data.estado !== 'n/a') {
      console.log(`  Estado:               ${data.estado.toUpperCase()}`);
    }

    if (col === 'soluciones' || col === 'proyectos') {
      const imgStatus = data.hasMainImage
        ? `Sí${data.notaInterna ? ` (${data.notaInterna})` : ''}`
        : 'PENDIENTE (no asignada)';
      console.log(`  Foto principal:       ${imgStatus}`);

      const galStatus = data.hasGallery ? 'Con fotos' : 'PENDIENTE / vacía';
      console.log(`  Galería:              ${galStatus}`);
    }

    if (col === 'clientes') {
      console.log(`  mostrarNombre:        ${data.mostrarNombre} (privacidad ${data.mostrarNombre ? 'pública' : 'protegida/anónima'})`);
    }

    if (data.clientRef) {
      console.log(`  Cliente ref:          ${data.clientRef}`);
    }

    console.log(`  Pendientes (${data.pendientes.length}):`);
    if (data.pendientes.length === 0) {
      console.log(`    (ninguno registrado)`);
    } else {
      for (const p of data.pendientes) {
        console.log(`    - ${p}`);
      }
    }

    if (data.bodyViolations.length > 0) {
      console.log(`  ⚠️ VIOLACIONES EN CUERPO: ${data.bodyViolations.join(', ')}`);
    }

    if (data.unconfirmedNumbers.length > 0) {
      console.log(`  ❌ NÚMEROS NO CONFIRMADOS EN CATÁLOGO: ${data.unconfirmedNumbers.join(', ')}`);
    }

    if (data.marketingWarnings.length > 0) {
      console.log(`  ⚠️ ADVERTENCIA MARKETING: ${data.marketingWarnings.join(', ')}`);
    }

    console.log('');
  }
}

console.log('============================================================');
console.log('                   RESUMEN GLOBAL');
console.log('============================================================');
console.log(`Total de fichas analizadas:           ${totalEntries}`);
console.log(`Fichas con estado PARCIAL:            ${totalParcial}`);
console.log(`Fichas con estado COMPLETO:           ${totalCompleto}`);
console.log(`Fichas sin foto principal:            ${totalSinImgPrincipal}`);
console.log(`Fichas sin galería:                   ${totalSinGaleria}`);
console.log(`Clientes con mostrarNombre: false:    ${totalPrivateClients}`);
console.log('============================================================\n');

let hasErrors = false;

if (allViolations.length > 0) {
  hasErrors = true;
  console.error('❌ ERROR: Se detectaron notas internas o menciones prohibidas en cuerpos Markdown:');
  for (const v of allViolations) {
    console.error(`   - ${v.entry}: ${v.violations.join(', ')}`);
  }
  console.error('El cuerpo Markdown no debe incluir [por confirmar], catálogo ni pág.\n');
}

if (allUnconfirmedNumbers.length > 0) {
  hasErrors = true;
  console.error('❌ ERROR: Se detectaron números con unidad no respaldados en docs/catalogo-texto.md:');
  for (const item of allUnconfirmedNumbers) {
    console.error(`   - ${item.entry}: ${item.numbers.join(', ')}`);
  }
  console.error('Todos los números técnicos deben provenir de docs/catalogo-texto.md.\n');
}

if (allMarketingWarnings.length > 0) {
  console.warn('⚠️ ADVERTENCIA: Se detectaron frases de marketing no respaldadas (revisar para evitar adjetivos sin sustento):');
  for (const item of allMarketingWarnings) {
    console.warn(`   - ${item.entry}: ${item.warnings.join(', ')}`);
  }
  console.log('');
}

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ Validación de contenido aprobada (sin menciones prohibidas ni números inventados).\n');
  process.exit(0);
}
