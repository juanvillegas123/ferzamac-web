# Catálogo de Componentes y Plantillas (F1 · Sistema de Diseño)

Este documento describe la biblioteca de componentes reutilizables y plantillas implementadas en la fase **F1** para el sitio web de **Ferzamac**.

---

## 1. Componentes de UI (`src/components/ui/`)

| Componente | Ruta | Props principales | Descripción |
|---|---|---|---|
| **Button** | `src/components/ui/Button.astro` | `variant?: 'primary' \| 'secondary'`, `size?: 'sm' \| 'md' \| 'lg'`, `href?: string`, `type?: string` | Botón accesible o enlace estilizado. Primario en `ink` con texto blanco, secundario con borde `ink`. |
| **Badge** | `src/components/ui/Badge.astro` | `variant?: 'neutral' \| 'industrial' \| 'hospitalaria'` | Etiqueta con punto de acento. Texto siempre en `ink` sobre fondo tenue específico; nunca texto verde/celeste sobre fondo blanco. |
| **SectionHeading** | `src/components/ui/SectionHeading.astro` | `eyebrow?: string`, `title: string`, `intro?: string`, `align?: 'left' \| 'center'` | Encabezado estándar para secciones. Título en tipografía Sora semibold. |
| **Breadcrumbs** | `src/components/ui/Breadcrumbs.astro` | `items: { label: string, href?: string }[]` | Lista semántica de navegación accesible con `aria-current="page"` (sin microdatos duplicados). |
| **SpecTable** | `src/components/ui/SpecTable.astro` | `rows: { label: string, value: string }[]`, `caption?: string` | Tabla técnica semántica con filas alternadas en `surface`. Apilable en móvil sin scroll horizontal (`flex flex-col sm:table-row`). |
| **Gallery** | `src/components/ui/Gallery.astro` | `images: { src: ImageMetadata, alt: string, caption?: string }[]`, `columns?: 2 \| 3 \| 4` | Galería responsive con `<Picture>` y visor ampliado nativo con `<dialog>` accesible por teclado (cierre con Escape y retorno de foco). `alt` obligatorio. |
| **VideoFrame** | `src/components/ui/VideoFrame.astro` | `src: string`, `poster?: string`, `orientation?: 'wide' \| 'vertical'`, `caption?: string` | Reproductor controlado por `IntersectionObserver`. Respeta `prefers-reduced-motion`. Dimensiones fijas para CLS 0. |
| **AreaCard** | `src/components/ui/AreaCard.astro` | `title: string`, `href: string`, `area: 'industrial' \| 'hospitalaria'`, `description: string`, `highlights: string[]` | Tarjeta destacada de división técnica con borde superior de color de área y lista de especialidades. |
| **SolutionCard** | `src/components/ui/SolutionCard.astro` | `title: string`, `href: string`, `area: 'industrial' \| 'hospitalaria'`, `summary: string`, `specs?: { label: string, value: string }[]`, `image?: ImageMetadata` | Ficha resumen de equipo o servicio con acento de área superior y mini-tabla de especificaciones. |
| **ProjectCard** | `src/components/ui/ProjectCard.astro` | `title: string`, `href: string`, `area: 'industrial' \| 'hospitalaria'`, `location?: string`, `summary: string`, `image?: ImageMetadata`, `scope?: string[]` | Tarjeta de caso real de proyecto con foto 16:9, ubicación y resumen de alcance de trabajo. |

---

## 2. Componentes de Secciones (`src/components/sections/`)

| Componente | Ruta | Props principales | Descripción |
|---|---|---|---|
| **PageHeader** | `src/components/sections/PageHeader.astro` | `title: string`, `breadcrumbs?: BreadcrumbItem[]`, `intro?: string`, `area?: 'industrial' \| 'hospitalaria'` | Cabecera para páginas internas con H1, migas de pan y descripción técnica. |
| **Hero** | `src/components/sections/Hero.astro` | `title?: string`, `subtitle?: string`, `primaryCta?: object`, `secondaryCta?: object`, `backgroundImage?: ImageMetadata` | Hero principal con imagen estática optimizada de `src/assets/images/home/`, overlay `ink-deep` al 75% y dos botones. |
| **StatsStrip** | `src/components/sections/StatsStrip.astro` | `stats?: { value?: string \| number, label: string }[]` | Franja de cifras clave. Condicional: solo renderiza si recibe ítems con números confirmados; no muestra nada si está vacía. |
| **AreasSplit** | `src/components/sections/AreasSplit.astro` | `class?: string` | Cuadrícula con dos `AreaCard` (Industrial y Hospitalaria) para bifurcar el tráfico en Home. |
| **ProcessSteps** | `src/components/sections/ProcessSteps.astro` | `class?: string` | Secuencia de 4 pasos metodológicos: Diseño → Fabricación → Instalación → Mantenimiento. |
| **EngineeringShowcase** | `src/components/sections/EngineeringShowcase.astro` | `title?: string`, `intro?: string`, `images?: object[]` | Sección técnica con cuadrícula de modelos 3D y fotografías de calderería. |
| **FeaturedProjects** | `src/components/sections/FeaturedProjects.astro` | `title?: string`, `intro?: string`, `projects?: FeaturedProjectItem[]` | Cuadrícula de 3 a 4 proyectos destacados utilizando `ProjectCard`. |
| **BrandsStrip** | `src/components/sections/BrandsStrip.astro` | `marcas?: { nombre: string, logo: string, mostrar: boolean }[]` | Franja de marcas con las que trabajan en escala de grises. Solo renderiza marcas con `mostrar: true`. |
| **CtaBanner** | `src/components/sections/CtaBanner.astro` | `title?: string`, `description?: string`, `ctaText?: string`, `whatsappMessage?: string` | Banner de llamado a la acción con enlace directo a WhatsApp (o `/contacto` si no hay número). |

---

## 3. Plantillas de Layout (`src/layouts/`)

| Plantilla | Ruta | Props principales | Descripción |
|---|---|---|---|
| **BaseLayout** | `src/layouts/BaseLayout.astro` | `title?: string`, `description?: string`, `image?: string`, `noindex?: boolean` | Estructura base en español, metaetiquetas SEO, favicons de `/logo/`, skip link accesible, Header, Footer y WhatsAppButton. |
| **DetailLayout** | `src/layouts/DetailLayout.astro` | `title: string`, `description?: string`, `breadcrumbs: BreadcrumbItem[]`, `intro?: string`, `area: 'industrial' \| 'hospitalaria'` | Plantilla para fichas técnicas: PageHeader, grilla 8/4 cols con slots para descripción, `specs`, `multimedia` y barra lateral sticky desde `lg` con CTA de cotización. |

---

## 4. Ejemplos de uso mínimo

### Ejemplo: Botón primario y secundario
```astro
---
import Button from '../components/ui/Button.astro';
---
<Button href="/contacto" variant="primary" size="md">
  Solicitar cotización
</Button>
<Button href="/industrial" variant="secondary" size="md">
  Ver catálogo
</Button>
```

### Ejemplo: Tabla de especificaciones (`SpecTable`)
```astro
---
import SpecTable from '../components/ui/SpecTable.astro';

const rows = [
  { label: 'Presión de diseño', value: '15 Bar (217 psi)' },
  { label: 'Material del cuerpo', value: 'Acero SA-516 Grado 70' },
];
---
<SpecTable caption="Especificaciones técnicas" rows={rows} />
```

### Ejemplo: Galería con visor modal (`Gallery`)
```astro
---
import Gallery from '../components/ui/Gallery.astro';
import foto1 from '../assets/images/fotogramas/cajon-noqueo-vacuno-sopachuy-estructura.png';

const images = [
  { src: foto1, alt: 'Estructura metálica instalada', caption: 'Montaje de cajón de noqueo' },
];
---
<Gallery images={images} columns={3} />
```

### Ejemplo: Ficha técnica con `DetailLayout`
```astro
---
import DetailLayout from '../layouts/DetailLayout.astro';
import SpecTable from '../components/ui/SpecTable.astro';
import Gallery from '../components/ui/Gallery.astro';
---
<DetailLayout
  title="Caldero pirotubular industrial"
  breadcrumbs={[{ label: 'Industrial', href: '/industrial' }, { label: 'Caldero' }]}
  area="industrial"
  intro="Generador de vapor diseñado para plantas de alimentos."
>
  <p>Descripción técnica del equipo...</p>

  <div slot="specs">
    <SpecTable rows={[{ label: 'Capacidad', value: '1500 BHP' }]} />
  </div>

  <div slot="multimedia">
    <Gallery images={[]} />
  </div>
</DetailLayout>
```
