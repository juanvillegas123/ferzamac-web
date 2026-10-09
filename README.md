# Ferzamac Web

Sitio web corporativo de **Ferzamac** (Sucre, Bolivia): diseño, construcción, montaje, mantenimiento y consultoría de plantas, equipos y máquinas industriales, más sistemas hospitalarios (agua purificada, aire comprimido medicinal y redes en hospitales).

## Requisitos

- **Node.js:** `>= 22.12.0` (recomendado Node 22 LTS).
- **Gestor de paquetes:** `npm`.

## Stack tecnológico

- **Framework:** Astro 7.x (salida estática, sin adaptador para Cloudflare Pages).
- **Estilos:** Tailwind CSS 4.x con `@tailwindcss/vite` y tokens corporativos definidos en `@theme` (`src/styles/global.css`).
- **Tipografía:** Autohospedada vía Fontsource (`Sora Variable` para títulos y `Manrope Variable` para cuerpo).
- **Verificación:** `@astrojs/check` y TypeScript estricto.
- **Formateo:** Prettier con plugins para Astro y Tailwind CSS.

## Comandos disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor local de desarrollo (http://localhost:4321)
npm run dev

# Comprobar tipos y validar colecciones
npm run check

# Formatear el código con Prettier
npm run format

# Construir sitio estático de producción (./dist)
npm run build

# Previsualizar el build de producción
npm run preview
```

## Reglas y guías de desarrollo

Para convenciones de arquitectura, tokens de color, manejo de datos y privacidad de clientes, consulta [AGENTS.md](AGENTS.md).
