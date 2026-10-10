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

  // Simple key-value extractor for typical frontmatter lines
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
      // array items
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      const itemVal = line.replace(/^\s+-\s+/, '').trim().replace(/^["']|["']$/g, '');
      frontmatter[currentKey].push(itemVal);
    }
  }

  return { frontmatter, body, rawFm };
}

function analyzeEntry(col, file) {
  const filePath = path.join(contentDir, col, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, rawFm } = parseFrontmatter(raw);

  const title = frontmatter.title || frontmatter.nombre || file;
  const estado = frontmatter.estado || (col === 'clientes' || col === 'marcas' ? 'n/a' : 'sin-definir');
  const slug = file.replace(/\.(md|mdx)$/, '');

  // Por confirmar occurrences
  const totalRaw = raw;
  const unconfirmedMatches = (totalRaw.match(/\[por confirmar\]/gi) || []).length;

  // Images analysis
  const hasMainImage = Boolean(frontmatter.imagenPrincipal && frontmatter.imagenPrincipal !== '');
  const imageNote = frontmatter.imagenNota || null;
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
    imageNote,
    hasGallery,
    unconfirmedMatches,
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
let totalUnconfirmedCount = 0;
let totalPrivateClients = 0;

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
    totalUnconfirmedCount += data.unconfirmedMatches;
    if (col === 'clientes' && data.mostrarNombre === false) totalPrivateClients++;

    console.log(`• [${data.slug}]`);
    console.log(`  Título:               ${data.title}`);
    if (data.estado !== 'n/a') {
      console.log(`  Estado:               ${data.estado.toUpperCase()}`);
    }

    if (col === 'soluciones' || col === 'proyectos') {
      const imgStatus = data.hasMainImage
        ? `Sí${data.imageNote ? ` (${data.imageNote})` : ''}`
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

    console.log(`  [por confirmar]:      ${data.unconfirmedMatches} mención${data.unconfirmedMatches !== 1 ? 'es' : ''}`);
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
console.log(`Menciones totales [por confirmar]:    ${totalUnconfirmedCount}`);
console.log(`Clientes con mostrarNombre: false:    ${totalPrivateClients}`);
console.log('============================================================\n');
