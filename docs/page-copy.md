# Matriz de trazabilidad de textos públicos (Page Copy)

> Este documento registra cada bloque de texto público visible en las páginas del sitio web de Ferzamac y su fuente autorizada única (`docs/catalogo-texto.md`, colecciones de contenido en `src/content/` o datos de contacto en `src/lib/site.ts`).
> Prohibido incluir adjetivos de marketing sin respaldo, cifras inventadas o procesos no documentados.

| Página | Bloque de texto | Texto publicado | Origen |
|---|---|---|---|
| `/` (Home) | Hero — H1 | "Diseño, construcción, montaje y mantenimiento de plantas y equipos" | Catálogo pág. 2 ("diseño, construcción, montaje, mantenimiento preventivo, correctivo...") |
| `/` (Home) | Hero — Subtítulo | "Plantas, equipos y máquinas industriales, puesta en marcha y servicios de consultoría técnica." | Catálogo pág. 2 ("puesta en marcha de plantas, equipos y máquinas industriales. Asimismo de servicios de consultoría...") |
| `/` (Home) | Hero — Botón 1 | "Ver proyectos" (enlace a `/proyectos`) | Interfaz / navegación |
| `/` (Home) | Hero — Botón 2 | "Solicitar cotización" (enlace a `/contacto`) | Interfaz / navegación |
| `/` (Home) | Presentación institucional | "Ferzamac es una empresa con sede en Bolivia especializada en diseño, construcción, montaje, mantenimiento preventivo y correctivo y puesta en marcha de plantas, equipos y máquinas industriales. También ofrece consultoría en auditoría técnica industrial, valoración, dimensionamiento y memoria de cálculo." | Texto de bienvenida provisional (a aprobar por el cliente / Catálogo pág. 2) |
| `/` (Home) | AreasSplit — Título sección | "Divisiones técnicas" | Interfaz / navegación |
| `/` (Home) | AreasSplit — Tarjeta Industrial (Título) | "Área Industrial" | Catálogo pág. 2 / navegación |
| `/` (Home) | AreasSplit — Tarjeta Industrial (Descripción) | "Diseño, construcción, montaje, mantenimiento preventivo y correctivo de plantas, equipos y máquinas industriales." | Catálogo pág. 2 literal |
| `/` (Home) | AreasSplit — Tarjeta Industrial (Puntos) | "Plantas y equipos industriales", "Maquinaria y calderería", "Mantenimiento preventivo y correctivo" | Catálogo pág. 2 y pág. 35 |
| `/` (Home) | AreasSplit — Tarjeta Hospitalaria (Título) | "Área Hospitalaria" | Catálogo pág. 18 / navegación |
| `/` (Home) | AreasSplit — Tarjeta Hospitalaria (Descripción) | "Plantas de tratamiento de agua purificada, sistemas de aire comprimido y mantenimiento de plantas para hemodiálisis." | Catálogo págs. 18, 23 y 41 |
| `/` (Home) | AreasSplit — Tarjeta Hospitalaria (Puntos) | "Tratamiento de agua purificada", "Sistemas de aire comprimido", "Plantas para hemodiálisis" | Catálogo págs. 18, 23 y 41 |
| `/` (Home) | FeaturedProjects — Título sección | "Proyectos destacados" | Interfaz / navegación |
| `/` (Home) | FeaturedProjects — Tarjetas | Títulos, ubicaciones y resúmenes de proyectos con `destacado: true` (Huacareta y Sopachuy) | Colección `proyectos` (`src/content/proyectos/`) |
| `/` (Home) | ProcessSteps — Título sección | "Proceso de trabajo" | Interfaz / navegación |
| `/` (Home) | ProcessSteps — Pasos 1 a 5 | 1. "Diseño", 2. "Construcción", 3. "Montaje", 4. "Mantenimiento preventivo y correctivo", 5. "Puesta en marcha" (sin descripciones no documentadas) | Catálogo pág. 2 literal |
| `/` (Home) | EngineeringShowcase — Título sección | "Diseño de plantas y equipos" | Catálogo pág. 2 y pág. 5 |
| `/` (Home) | EngineeringShowcase — Pies de foto | "Render de diseño" (para las 3 imágenes de `src/assets/images/home/`) | Especificación de usuario / Catálogo |
| `/` (Home) | CtaBanner — Título | "¿Requiere cotización técnica para su planta o equipo?" | Interfaz de contacto |
| `/` (Home) | CtaBanner — Botón | "Solicitar cotización" (enlace a `/contacto`) | Interfaz / navegación |
| `/` (Home) | ContactForm rápido | "Solicite información técnica o cotización", "Envíenos sus requerimientos para coordinar con nuestro equipo técnico en Sucre, Bolivia." | Interfaz de contacto rápido |
| `/proyectos` | PageHeader — H1 | "Proyectos ejecutados" | Catálogo pág. 4, 11, 16, 19, 22, 24, etc. |
| `/proyectos` | PageHeader — Intro | "Registro de instalaciones, montajes y equipamiento industrial y hospitalario ejecutados por Ferzamac." | Catálogo pág. 1 y pág. 2 |
| `/proyectos` | Grilla de proyectos | Títulos, resumen, ubicación y etiquetas de cada proyecto | Colección `proyectos` (`src/content/proyectos/`) |
| `/proyectos/[slug]` | DetailLayout — H1 | Título del proyecto (`project.data.title`) | Colección `proyectos` |
| `/proyectos/[slug]` | DetailLayout — Ubicación | Valor textual de `project.data.ubicacion` (solo el nombre de la localidad) | Colección `proyectos` |
| `/proyectos/[slug]` | DetailLayout — Alcance | Lista literal de partidas o equipos registrados (en dos columnas para listas amplias como Sopachuy) | Colección `proyectos` |
| `/proyectos/[slug]` | DetailLayout — Barra lateral | "¿Necesita un proyecto similar?", "Consulte con nuestro equipo.", botón "Solicitar cotización" | `src/layouts/DetailLayout.astro` |
| `/industrial` | PageHeader — H1 | "Área Industrial" | Catálogo pág. 2 y navegación |
| `/industrial` | PageHeader — Intro | "Diseño, construcción, montaje, mantenimiento preventivo y correctivo de plantas, equipos y máquinas industriales." | Catálogo pág. 2 literal |
| `/industrial` | Grilla de soluciones | Títulos, resumen, especificaciones documentadas e imágenes de soluciones industriales | Colección `soluciones` (`src/content/soluciones/`) |
| `/industrial/[slug]` | DetailLayout — H1 | Título de la solución (`solution.data.title`) | Colección `soluciones` |
| `/industrial/[slug]` | DetailLayout — Specs | Tabla de especificaciones técnicas documentadas en el catálogo | Colección `soluciones` |
| `/industrial/[slug]` | DetailLayout — Barra lateral | "Solicitar cotización de {title}", "Consulte con nuestro equipo.", botón "Solicitar cotización" | `src/layouts/DetailLayout.astro` |
| `/nosotros` | PageHeader — H1 | "Nosotros" | Navegación / Catálogo |
| `/nosotros` | Perfil empresarial | "Ferzamac es una empresa con sede en Bolivia especializada en diseño, construcción, montaje, mantenimiento preventivo y correctivo y puesta en marcha de plantas, equipos y máquinas industriales. También ofrece consultoría en auditoría técnica industrial, valoración, dimensionamiento y memoria de cálculo." | Texto de bienvenida provisional (a aprobar por el cliente / Catálogo pág. 2) |
| `/nosotros` | Misión | "Poner a disposición de nuestros clientes la aplicación de la ingeniería integrada con el objeto de optimizar procesos a través de la automatización, con perspectiva económica, sostenible y segura." | Texto institucional literal |
| `/nosotros` | Visión | "Ser reconocidos a nivel nacional como la empresa líder en brindar servicios y equipos innovadores y de excelente calidad, de forma transparente, humana y sostenible, generando valor a nuestros clientes y grupos de interés." | Texto institucional literal |
| `/nosotros` | Equipo de trabajo — Título | "Nuestro equipo de trabajo" | Catálogo pág. 3 literal |
| `/nosotros` | Equipo de trabajo — Lista | "Ingeniería Industrial", "Ingeniería Mecánica", "Ingeniería Mecatrónica", "Ingeniería Eléctrica y Electrónica", "Especialistas en Automatización de Procesos", "Personal técnico especializado" | Catálogo pág. 3 literal |
| `/contacto` | PageHeader — H1 | "Contacto" | Navegación |
| `/contacto` | Datos de contacto | Dirección: "Calle René Moreno Nº 162, Sucre, Bolivia", Teléfono: "(+591) 72877116" | `src/lib/site.ts` |
| `/contacto` | LocationMap | Ubicación de taller y oficinas en Sucre, con carga diferida de Google Maps bajo demanda | `src/components/ui/LocationMap.astro` y `site.ts` |
| `/contacto` | ContactForm | Formulario con campos de nombre, teléfono, correo y mensaje con honeypot y fallback accesible | `src/components/ui/ContactForm.astro` |
| `/hospitalaria` | PageHeader — H1 | "Área Hospitalaria" | Catálogo pág. 18 |
| `/hospitalaria` | Descripción | "Diseño, construcción, montaje y puesta en marcha de planta de tratamiento de agua purificada, instalación de sistemas de aire comprimido y mantenimiento de plantas de agua para hemodiálisis." | Catálogo págs. 18, 23 y 41 |
| `/hospitalaria` | Aviso provisional | "Contenido en preparación" (si no hay fichas publicadas en esta área) | Interfaz provisional (`noindex`) |
| `/consultoria` | PageHeader — H1 | "Consultoría técnica" | Catálogo pág. 2 y pág. 29 |
| `/consultoria` | Descripción | "Servicios de consultoría en auditoría técnica de tipo industrial, valoración, dimensionamiento y elaboración de memoria de cálculo, entre otros." | Catálogo pág. 2 literal |
| `/consultoria` | Aviso provisional | "Contenido en preparación" (si no hay fichas publicadas en esta área) | Interfaz provisional (`noindex`) |
