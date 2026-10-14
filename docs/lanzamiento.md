# Guía de Lanzamiento y Pendientes Externos — Ferzamac Web

Este documento detalla todas las configuraciones, credenciales, autorizaciones y pasos requeridos fuera del código fuente para poner el sitio web de **Ferzamac** en producción de forma segura y completa.

---

## 1. Variables de Entorno y Configuración de Dominio

En el entorno de producción (Cloudflare Pages u otro hosting estático) se deben definir las siguientes variables de entorno:

| Variable | Descripción | Ejemplo / Valor de Producción | Impacto en el Código |
|---|---|---|---|
| `PUBLIC_SITE_URL` | URL absoluta canónica del sitio web | `https://ferzamac.com` | Activa automáticamente la etiqueta `<link rel="canonical">`, las URLs completas de Open Graph / Twitter Cards, la directiva `Sitemap:` en `/robots.txt` y la generación de `sitemap-index.xml`. Si no se define, se emite un comentario TODO en el HTML y se omite el sitemap. |
| `PUBLIC_FORM_ENDPOINT` | Endpoint receptor de cotizaciones de Formspree | `https://formspree.io/f/xv...` | Permite el envío asíncrono (AJAX) del formulario de cotización técnica. Si no se define, el formulario hace un fallback accesible abriendo el cliente de correo predeterminado (`mailto:info@ferzamac.com`). |
| `PUBLIC_ENABLE_STYLEGUIDE` | Visibilidad de `/guia-de-estilo` | `false` (o no definida) | El script posbuild elimina automáticamente `/guia-de-estilo` de la carpeta `dist/` para que no sea accesible públicamente en producción. Solo se conserva si esta variable es explícitamente `"true"`. |
| `NODE_VERSION` | Versión del runtime en el servidor de compilación | `22` (o `>=22.12.0`) | Asegura compatibilidad con Astro 7.x y los paquetes de Node nativos. |

---

## 2. Datos Corporativos Pendientes en `src/lib/site.ts`

El archivo `src/lib/site.ts` centraliza todos los datos de contacto y metadatos de la empresa. Actualmente cuenta con datos verificados y marcadores `TODO` explícitos para lo que requiere validación por gerencia:

1. **WhatsApp de Contacto:**
   - Actualmente configurado con el número telefónico documentado: `+591 72877116` (`59172877116`).
   - *Pendiente:* Confirmar si existe un número de WhatsApp corporativo específico para atención comercial o si se mantiene el actual.
2. **Correo Electrónico Oficial:**
   - Configurado con `info@ferzamac.com`.
   - *Pendiente:* Validar que el buzón esté activo y cuente con reenvío a los ingenieros responsables de cotizaciones.
3. **Horario de Atención:**
   - Pendiente de confirmación (ej. *Lunes a Viernes 08:00 – 12:00 y 14:00 – 18:00*).
   - Una vez confirmado, agregarlo a `SITE.schedule` para que se refleje en el footer y en la página de contacto.
4. **Redes Sociales:**
   - Pendientes de confirmación oficial (LinkedIn corporativo, Facebook institucional). Mientras no existan URLs oficiales, los campos permanecen vacíos y no se emiten enlaces ficticios ni etiquetas `sameAs` en JSON-LD.

---

## 3. Logos de Clientes y Marcas (`public/` y `src/content/`)

1. **Logos de Clientes Autorizados:**
   - Actualmente autorizados y publicados con logo: **EMAPA**, **NAABOL**, **ENDE Corporación**, **ELAPAS**, **EBA**, **ENVIBOL** y **CNS**.
   - *Pendiente:* Si se desea visibilizar clientes adicionales (ej. YLB, Caja Bancaria Estatal de Salud, Hospitales Departamentales, Municipio de La Guardia), se debe obtener autorización expresa y cambiar `mostrarNombre: true` en sus respectivas fichas de `src/content/clientes/`.
2. **Logos de Marcas Aliadas / Suministradas:**
   - Marcas registradas con las que se trabaja: **Atlas Copco**, **EFCO**, **ELMEC**, **Energy Power Perú**, **Honda**, **Metabo**, **Schulz**, **Sultec**.
   - *Pendiente:* Reemplazar los archivos rasterizados/temporales por versiones vectoriales SVG de alta definición en `public/images/marcas/` o confirmar permisos de uso de marca en el sitio institucional.

---

## 4. Localización y Google Maps (`src/components/ui/LocationMap.astro`)

- **Dirección legal:** Calle René Moreno Nº 162, Sucre, Bolivia.
- **Estado actual del mapa:** El componente de mapa interactivo está configurado con una búsqueda centrada en Ferzamac Sucre y un enlace accesible a Google Maps.
- **Pendiente externo:**
  1. Verificar si Ferzamac cuenta con su ficha verificada en **Google Business Profile (Google Mi Negocio)** en dicha dirección.
  2. Obtener el enlace exacto con `place_id` o las coordenadas geográficas precisas (latitud y longitud) para fijar el pin exacto en el mapa.

---

## 5. Cifras Institucionales y Misión / Visión

En `src/pages/index.astro` y `src/pages/nosotros.astro`:
- Las cifras de trayectoria (años en el mercado, metros cúbicos/toneladas procesadas, cantidad total de plantas construidas) están omitidas deliberadamente para cumplir con la regla de **cero datos inventados** (`docs/pending.csv`).
- *Pendiente:* La gerencia de Ferzamac debe proporcionar las cifras auditables (ej. "Más de X años de experiencia", "Más de Y proyectos industriales en los 9 departamentos").

---

## 6. Fotografía Técnica de Alta Resolución

- En las fichas técnicas creadas a partir del catálogo impreso, algunas fotos provienen de escaneos o recortes de baja resolución.
- *Pendiente:* Conforme se realicen inspecciones o mantenimiento en plantas, sustituir las imágenes de referencia por fotografías de alta resolución en obra (mínimo 1600 px de ancho, formato 16:9 o 4:3) respetando la política de privacidad de los clientes.

---

## 7. Pasos de Despliegue en Cloudflare Pages

Cloudflare Pages es la plataforma recomendada en la arquitectura del proyecto por su velocidad global, costo cero en nivel estático y soporte nativo de cabeceras de seguridad.

### Paso 1: Conectar el Repositorio
1. Iniciar sesión en el panel de **Cloudflare**.
2. Navegar a **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Seleccionar el repositorio de GitHub: `juanvillegas123/ferzamac-web`.

### Paso 2: Configurar Parámetros de Compilación
En la pantalla de configuración del build:
- **Project name:** `ferzamac-web`
- **Production branch:** `main`
- **Framework preset:** `Astro`
- **Build command:** `npm run build`
- **Build output directory:** `dist`

### Paso 3: Configurar Variables de Entorno (Environment Variables)
En **Settings** → **Environment variables** (tanto para Production como para Preview):
- `NODE_VERSION`: `22`
- `PUBLIC_SITE_URL`: `https://ferzamac.com` (o el subdominio de Cloudflare asignado temporalmente, ej. `https://ferzamac-web.pages.dev`)
- `PUBLIC_FORM_ENDPOINT`: Endpoint de Formspree (ej. `https://formspree.io/f/xyz...`)
- `PUBLIC_ENABLE_STYLEGUIDE`: `false`

### Paso 4: Despliegue y Verificación de Cabeceras
1. Presionar **Save and Deploy**.
2. Cloudflare Pages compilará el sitio estático y desplegará los activos.
3. El archivo `dist/_headers` (generado automáticamente a partir de `public/_headers`) aplicará de inmediato:
   - Content-Security-Policy (CSP)
   - Strict-Transport-Security (HSTS)
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: SAMEORIGIN
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy restrictiva

### Paso 5: Asignar Dominio Personalizado
1. En la pestaña **Custom domains**, hacer clic en **Set up a domain**.
2. Ingresar `ferzamac.com` y `www.ferzamac.com`.
3. Seguir el asistente de DNS de Cloudflare para activar el certificado SSL/TLS universal automático.
