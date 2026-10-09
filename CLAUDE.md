# AGENTS.md — Ferzamac Web

> Lee este archivo completo antes de tocar código. Si un pedido contradice algo de aquí, avisa y pregunta antes de seguir. Detalles de contenido: `docs/`. Reglas de contenido: `src/content/AGENTS.md`.

## 1. Proyecto

- **Qué es:** rediseño del sitio corporativo de **Ferzamac** (Sucre, Bolivia): diseño, construcción, montaje, mantenimiento y consultoría de plantas, equipos y máquinas industriales, más un **área hospitalaria** (agua purificada, aire comprimido, sistemas en hospitales).
- **Objetivo:** que un comprador industrial o un hospital entienda en 10 segundos qué hace Ferzamac, vea trabajo real y pida cotización por WhatsApp o formulario.
- **Idioma del sitio:** español (Bolivia). Un solo idioma.
- **Sitio actual** (hecho en Wix, solo referencia): tiene texto de relleno, hero cortado y un menú con "More" que esconde Proyectos. No copiar su estructura.
- **Contacto (confirmar):** Calle René Moreno Nº 162, Sucre · tel. (+591) 72877116. WhatsApp, correo y horarios: pendientes. Viven en `src/lib/site.ts`; mientras falten, deja `TODO` visible en el código, nunca datos inventados.

## 2. Stack (decidido)

| Capa | Decisión |
|---|---|
| Framework | **Astro 7.x** (línea estable actual), salida estática |
| Estilos | **Tailwind CSS 4.3.x** con `@tailwindcss/vite`. Tokens en `@theme` dentro de `src/styles/global.css`. **Prohibido Bootstrap**, jQuery y librerías de componentes visuales pesadas |
| Lenguaje | TypeScript estricto |
| Runtime | Node 22 o superior, gestor **npm** |
| Contenido | Content collections (`src/content.config.ts`, loader `glob`), Markdown/MDX. Importar Zod desde `astro/zod` |
| Imágenes | `astro:assets` (`<Image>` / `<Picture>`) con sharp |
| JS en cliente | Mínimo: scripts vanilla. Nada de React ni otros frameworks sin justificarlo |
| Fuentes | Fontsource autohospedado: **Sora** (títulos) y **Manrope** (texto) |
| Íconos | Lucide, como SVG en línea |
| Formulario | Formspree (endpoint en `PUBLIC_FORM_ENDPOINT`) + botón de WhatsApp |
| Mapa | Enlace a Google Maps o Leaflet/OpenStreetMap. Sin iframes pesados |
| SEO | `@astrojs/sitemap` + JSON-LD escrito a mano |
| Hosting | Cloudflare Pages, **estático, sin adaptador de Cloudflare** |

Al inicializar usa las versiones estables vigentes, fíjalas en `package.json` y **no las degrades**. Si una API cambió, consulta la documentación oficial de la versión instalada en lugar de usar memoria.

## 3. Comandos

```bash
npm install
npm run dev        # servidor local
npm run build      # build de producción
npm run preview    # previsualizar el build
npm run check      # astro check (tipos y contenido)
npm run format     # prettier
```

**Una tarea no está terminada hasta que `npm run check` y `npm run build` pasan sin errores.**

## 4. Estructura

```
ferzamac-web/
├── AGENTS.md
├── README.md
├── astro.config.mjs · tsconfig.json · package.json
├── docs/
│   ├── inventory.csv        # qué imagen/video/texto va en qué página
│   ├── site-pages.csv       # páginas, títulos H1 y frases objetivo SEO
│   ├── text-fixes.csv       # errores de ortografía del catálogo
│   └── pending.csv          # datos y permisos pendientes
├── public/
│   ├── logo/                # logo-ferzamac.svg, logo-ferzamac-blanco.svg, favicon*
│   ├── video/               # clips MP4/WebM ya optimizados
│   ├── og-default.jpg · robots.txt
├── src/
│   ├── assets/images/       # fotos procesadas por Astro: proyectos/, soluciones/, home/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Nav, WhatsAppButton
│   │   ├── sections/        # Hero, AreasSplit, Proceso, Marcas, CtaCotizar...
│   │   ├── ui/              # Button, Card, SpecTable, Gallery, Badge, VideoFrame
│   │   └── seo/             # SEO.astro, JsonLd.astro
│   ├── content/             # soluciones/, proyectos/, clientes/, marcas/
│   ├── content.config.ts
│   ├── layouts/             # BaseLayout, DetailLayout
│   ├── lib/                 # site.ts (contacto), seo.ts, whatsapp.ts
│   ├── pages/               # ver sección 5
│   └── styles/global.css
```

## 5. Rutas (provisionales; la fuente de verdad es `docs/site-pages.csv`)

- `/` · `/nosotros` · `/contacto` · `/404`
- `/industrial` y `/industrial/[slug]` (equipos y servicios de mantenimiento; filtrar por `tipo`)
- `/hospitalaria` y `/hospitalaria/[slug]`
- `/consultoria` y `/consultoria/estudios-y-diseno-de-plantas`
- `/proyectos` y `/proyectos/[slug]`

Slugs en español, kebab-case, sin tildes ni ñ (`planta-cuatro-canadas`).

**Menú (6 ítems, todos visibles):** Inicio · Industrial · Hospitalaria · Proyectos · Nosotros · Contacto, más botón destacado **Solicitar cotización**. Sin menús ocultos.

**Home, en este orden:** hero con propuesta clara y 2 botones (Industrial / Hospitalaria) → franja de cifras (solo con datos confirmados) → dos tarjetas de área → 3 o 4 proyectos destacados → proceso (Diseño → Fabricación → Instalación → Mantenimiento) → sección de ingeniería y diseño 3D → marcas con las que trabajan → banner de cotización → footer con contacto.

## 6. Diseño

**Tokens** (definir en `@theme`):

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#0A4D5C` | Texto, títulos, botones principales (texto blanco encima) |
| `ink-deep` | `#06323C` | Hero, footer, bandas oscuras |
| `industrial` | `#00B020` | Acento del área Industrial |
| `hospitalaria` | `#1DA1D2` | Acento del área Hospitalaria |
| `surface` | `#F4F8F9` | Fondos alternos |
| `line` | `#D9E4E7` | Bordes y separadores |
| `muted` | `#4F6D75` | Texto secundario (≈5,5:1 sobre blanco) |

Los tres primeros colores de marca vienen del cliente; `ink-deep`, `surface`, `line` y `muted` son derivados propuestos: valida su contraste al implementar.

**Reglas de color y contraste**
- Verde y celeste sobre blanco rinden ≈3:1: **solo íconos, bordes, subrayados y textos grandes en negrita**. Nunca texto pequeño.
- Sobre `ink-deep` el verde y el celeste sí alcanzan ≈4,6:1 y pueden usarse como texto.
- Botón principal: fondo `ink`, texto blanco. Botón secundario: borde `ink`.
- Cada área tiene su color: Industrial = verde, Hospitalaria = celeste. Se aplica a etiquetas, líneas de acento y hover de esa sección.

**Estilo:** sobrio y técnico, con mucho aire, grilla de 12 columnas, radios pequeños (4–8 px), títulos en Sora semibold, tablas de especificaciones como elemento protagonista, fotos con proporción fija (16:9 o 4:3).

**Evitar:** gradientes morados, sombras exageradas, íconos genéricos dentro de círculos de colores, emojis en la interfaz, carruseles automáticos, animaciones largas, texto en mayúsculas sostenidas.

**Hero:** imagen estática (foto del caldero de Huacareta, ya mejorada, con capa `ink-deep` al 70–80 %). **No usar video como hero.** Los videos viven dentro de las páginas de proyecto.

**Logo:** `public/logo/`. Versión en color sobre fondos claros, versión blanca sobre `ink-deep`. Altura en header ~44 px.

**Imágenes de baja resolución:** no muestres una imagen a un ancho mayor que sus píxeles nativos. Si es insuficiente para ese uso, déjala pequeña o márcala con `TODO: imagen insuficiente` y no la pongas a pantalla completa.

## 7. Contenido

Colecciones (`src/content.config.ts`):

- **soluciones:** `title`, `area` (`industrial` | `hospitalaria` | `consultoria`), `tipo` (`diseno-construccion` | `mantenimiento` | `consultoria`), `resumen` (≤160 caracteres), `specs` (lista `{label, value}`), `imagenPrincipal`, `galeria`, `video?`, `proyectosRelacionados`, `seo` (`title`, `description`, `keyword`), `estado` (`completo` | `parcial`), `orden`.
- **proyectos:** `title`, `cliente` (referencia), `ubicacion`, `area`, `resumen`, `alcance` (lista), `resultado?`, `galeria`, `videos` (`src`, `poster`, `orientacion`), `solucionesRelacionadas`, `destacado`, `estado`.
- **clientes:** `nombre`, `sector`, `ciudad`, **`mostrarNombre` (boolean, `false` por defecto)**, `logo?`.
- **marcas:** `nombre`, `logo`, `mostrar` (boolean).

**Reglas**
1. **No inventes datos técnicos.** Usa solo lo que está en `docs/inventory.csv` y en el contenido de la colección. Lo que falte se marca `[por confirmar]` y sale en `docs/pending.csv`.
2. **Clientes:** si `mostrarNombre` es `false`, publica el proyecto sin nombrar al cliente ("hospital de Sucre"). Esto aplica a hospitales, CNS, YLB, EBA, ENVIBOL, Caja Bancaria Estatal de Salud y el municipio de La Guardia hasta que haya permiso.
3. **Marcas (Atlas Copco, Schulz, Kaeser, Honda, etc.):** son marcas con las que trabajan, no clientes. Título: "Marcas con las que trabajamos". No insinuar distribución autorizada.
4. **Ortografía:** corrige según `docs/text-fixes.csv`. Reescribe textos largos con tono profesional y claro; mínimo ~300 palabras útiles por página de solución cuando haya datos suficientes, sin relleno.
5. **Páginas P59–P63 del catálogo** (matadero de Sopachuy): sin datos técnicos disponibles. Publicar con nombre y foto, sin especificaciones.
6. **Sin stock** (manos con engranajes, hombre con casco): descartado.

## 8. Multimedia

- **Imágenes:** nombres de archivo descriptivos en kebab-case (`ensacadora-saco-valvulado-santa-cruz.jpg`). `alt` descriptivo y específico en cada una.
- **Video:** `muted loop playsinline preload="none"` con `poster`. Máximo ~3 MB por clip. Entregar MP4 (H.264) y WebM. Sin audio. Videos verticales en marco vertical junto al texto, nunca estirados a todo el ancho.
- **Video de naranjas (Huacareta):** 4 clips panorámicos ~920×366 (o su versión mejorada).
- **Video de la cámara de frío (Sopachuy):** 1 clip vertical.
- Los originales sin procesar no se suben al repo.

## 9. SEO

- Un `<h1>` único por página, tomado de `docs/site-pages.csv`.
- `title` ≤ 60 caracteres y `description` ≤ 155; canonical absoluta; Open Graph y Twitter card.
- JSON-LD: `Organization` + `LocalBusiness` en el sitio, `Service` en cada solución, `BreadcrumbList` en páginas internas.
- Enlaces internos solución ↔ proyecto y áreas ↔ detalle. Texto de enlace descriptivo.
- `sitemap.xml` y `robots.txt` generados.
- Las frases objetivo de `site-pages.csv` son **hipótesis** y se validan con Search Console antes de fijarlas.
- NAP (nombre, dirección, teléfono) idéntico en footer, contacto y JSON-LD.

## 10. Accesibilidad y rendimiento

- WCAG AA: contraste, foco visible, navegación por teclado, `alt` en imágenes, etiquetas en formularios, un `<main>` por página.
- Lighthouse móvil objetivo: **≥ 95** en rendimiento, accesibilidad, buenas prácticas y SEO.
- Imágenes con `loading="lazy"` salvo la principal de cada página, que lleva `fetchpriority="high"`.
- Sin CLS: define dimensiones en imágenes y videos.
- Astro 7 cambió `compressHTML` a `'jsx'`: revisa espacios entre elementos en línea tras compilar.

## 11. Reglas duras

**Siempre**
- Seguir los tokens y componentes existentes antes de crear nuevos.
- Código, nombres de archivo y comentarios técnicos en **inglés**; textos de interfaz y contenido en **español**.
- Componentes en PascalCase, utilidades en camelCase, archivos de contenido en kebab-case.
- Hacer commits pequeños con mensajes claros (`feat:`, `fix:`, `content:`, `docs:`).

**Nunca**
- Usar Bootstrap, jQuery o dependencias nuevas sin explicar por qué en el commit.
- Inventar cifras, capacidades, clientes, certificaciones o testimonios.
- Subir logos de marcas de terceros sin SVG ni permiso confirmado.
- Modificar los archivos de `docs/` salvo para actualizar su estado.
- Usar `localStorage` para nada que el sitio necesite para funcionar.

**Pregunta antes de**
- Cambiar la paleta, la tipografía o el stack.
- Agregar una página nueva fuera de `docs/site-pages.csv`.
- Eliminar contenido existente.

## 12. Flujo de trabajo y fases

Para cambios grandes: primero un plan breve, luego la implementación en pasos pequeños.

- [ ] **F0 · Base:** proyecto Astro 7 + Tailwind 4, tokens, fuentes, layout, header/footer, logo.
- [ ] **F1 · Sistema de diseño:** componentes `ui/` y `sections/`, plantillas `DetailLayout`.
- [ ] **F2 · Contenido:** `content.config.ts`, colecciones y carga de las 8 fichas de proyecto y las fichas de solución completas.
- [ ] **F3 · Páginas:** home, áreas, proyectos, consultoría, nosotros, contacto.
- [ ] **F4 · SEO, accesibilidad y rendimiento:** JSON-LD, sitemap, Lighthouse.
- [ ] **F5 · Despliegue:** Cloudflare Pages, dominio, Search Console y perfil de Google Business.

**Definición de terminado de una página:** H1 único · `title` y `description` · imágenes con `alt` y dimensiones · CTA de cotización con WhatsApp prellenado ("Hola, quiero cotizar {título}") · enlaces internos · `npm run check` y `npm run build` sin errores.

## 13. Pendientes abiertos

Ver `docs/pending.csv`. Los principales: años de trayectoria y cantidad de proyectos, permiso para nombrar clientes, WhatsApp/correo/horarios, logos de marcas en SVG, y confirmar si la ensacadora de la p. 16 del catálogo es la misma de la p. 15.
