import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const soluciones = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/soluciones' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      area: z.enum(['industrial', 'hospitalaria', 'consultoria']),
      tipo: z.enum([
        'diseno-construccion',
        'mantenimiento',
        'consultoria',
        'suministro',
      ]),
      resumen: z.string().max(160),
      specs: z
        .array(
          z.object({
            label: z.string(),
            value: z.string(),
          })
        )
        .default([]),
      imagenPrincipal: image().optional(),
      imagenPrincipalAlt: z.string().optional(),
      notaInterna: z.string().optional(),
      galeria: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .optional()
        .default([]),
      videos: z
        .array(
          z.object({
            src: z.string(),
            poster: image().optional(),
            orientacion: z
              .enum(['horizontal', 'vertical'])
              .default('horizontal'),
            caption: z.string().optional(),
          })
        )
        .optional()
        .default([]),
      proyectosRelacionados: z
        .array(reference('proyectos'))
        .optional()
        .default([]),
      pendientes: z.array(z.string()).default([]),
      seo: z.object({
        title: z.string().max(60),
        description: z.string().max(155),
        keyword: z.string(),
      }),
      estado: z.enum(['completo', 'parcial']),
      orden: z.number().default(0),
    }),
});

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/proyectos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cliente: reference('clientes').optional(),
      ubicacion: z.string(),
      area: z.enum(['industrial', 'hospitalaria', 'consultoria']),
      resumen: z.string().max(160),
      alcance: z.array(z.string()),
      resultado: z.string().optional(),
      imagenPrincipal: image().optional(),
      imagenPrincipalAlt: z.string().optional(),
      notaInterna: z.string().optional(),
      galeria: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .optional()
        .default([]),
      videos: z
        .array(
          z.object({
            src: z.string(),
            poster: image().optional(),
            orientacion: z
              .enum(['horizontal', 'vertical'])
              .default('horizontal'),
            caption: z.string().optional(),
          })
        )
        .optional()
        .default([]),
      solucionesRelacionadas: z
        .array(reference('soluciones'))
        .optional()
        .default([]),
      pendientes: z.array(z.string()).default([]),
      destacado: z.boolean().default(false),
      estado: z.enum(['completo', 'parcial']),
    }),
});

const clientes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/clientes' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      sector: z.string(),
      ciudad: z.string(),
      mostrarNombre: z.boolean().default(false),
      logo: image().optional(),
    }),
});

const marcas = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/marcas' }),
  schema: ({ image }) =>
    z.object({
      nombre: z.string(),
      logo: image().optional(),
      mostrar: z.boolean().default(false),
    }),
});

export const collections = {
  soluciones,
  proyectos,
  clientes,
  marcas,
};
