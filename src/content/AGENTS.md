# AGENTS.md — Contenido (`src/content/`)

Reglas que aplican solo al trabajar en esta carpeta. Complementan el `AGENTS.md` de la raíz.

## Antes de escribir una ficha

1. Busca la fila en `docs/inventory.csv` (columna **Destino**) y en `docs/site-pages.csv`. De ahí salen las fotos, los textos y el estado.
2. Usa solo los datos que aparecen ahí. Todo lo demás es `[por confirmar]` y se registra en `docs/pending.csv`.

## Formato

- Un archivo por ficha, nombre en kebab-case sin tildes: `ensacadora-saco-valvulado.md`.
- Front matter completo según el esquema de `src/content.config.ts`. Si falta un campo obligatorio, `npm run check` debe fallar: no lo rellenes con datos falsos.
- `resumen`: máximo 160 caracteres, sin repetir el título.
- `specs`: una fila por dato, con unidad (`Capacidad de tolva` → `1000 kg`). Nada de párrafos dentro de la tabla.

## Estilo de redacción

- Español de Bolivia, tono profesional, claro y directo. Frases cortas.
- Evita frases genéricas ("líderes en el mercado", "alta calidad") y cualquier afirmación que no se pueda comprobar con el inventario.
- Describe lo que se ve en las fotos y lo que dicen los datos; no completes con suposiciones.
- Corrige la ortografía según `docs/text-fixes.csv`.

## Clientes y permisos

- `mostrarNombre: false` por defecto. Mientras sea `false`, escribe "hospital de Sucre", "planta de lácteos en Oruro", etc.
- Las marcas de terceros se mencionan solo como "marcas con las que trabajamos".

## Estado

- `estado: parcial` si falta algún dato; `completo` solo si la ficha no depende de nada pendiente.
- Al terminar una ficha, actualiza su fila en `docs/pending.csv` si cerraste o abriste un pendiente.
