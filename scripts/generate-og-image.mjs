import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function generateOgImage() {
  const heroPath = path.resolve(
    'src/assets/images/home/hero-generacion-vapor-huacareta.jpg'
  );
  const logoPath = path.resolve('public/logo/logo-ferzamac-blanco.svg');
  const outputPath = path.resolve('public/og-default.jpg');

  if (!fs.existsSync(heroPath)) {
    throw new Error(`Hero image not found at ${heroPath}`);
  }
  if (!fs.existsSync(logoPath)) {
    throw new Error(`Logo not found at ${logoPath}`);
  }

  const width = 1200;
  const height = 630;

  // 1. Resize and crop hero image to 1200x630
  const heroResized = await sharp(heroPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Create dark ink-deep overlay (#06323C at 78% opacity)
  const overlaySvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#06323C" fill-opacity="0.80"/>
      <rect x="80" y="520" width="80" height="4" fill="#00B020" rx="2"/>
      <text x="80" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="700" fill="#FFFFFF">
        Ingeniería, montaje y mantenimiento
      </text>
      <text x="80" y="495" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="600" fill="#1DA1D2">
        Plantas, equipos industriales y sistemas hospitalarios
      </text>
      <text x="80" y="555" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#D9E4E7">
        Sucre, Bolivia · (+591) 72877116 · ferzamac.ind@gmail.com
      </text>
    </svg>
  `);

  // 3. Render white logo SVG to high-res PNG for compositing
  const logoPng = await sharp(logoPath).resize({ width: 340 }).png().toBuffer();

  // 4. Composite base hero + overlay + logo
  await sharp(heroResized)
    .composite([
      { input: overlaySvg, top: 0, left: 0 },
      { input: logoPng, top: 90, left: 80 },
    ])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log(
    `✅ og-default.jpg generated successfully at ${outputPath} (1200x630)`
  );
}

generateOgImage().catch((err) => {
  console.error('Error generating og-default.jpg:', err);
  process.exit(1);
});
