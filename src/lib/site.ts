/**
 * Ferzamac site configuration and contact information.
 * All pending data is left with explicit visible TODOs. Never invent data.
 */

export interface NavItem {
  label: string;
  href: string;
}

export const SITE = {
  name: 'Ferzamac',
  tagline: 'Ingeniería, montaje y mantenimiento industrial y hospitalario',
  city: 'Sucre, Bolivia',

  // Contact details
  // TODO: confirmar con el cliente (viene del sitio actual, no está confirmado)
  address: 'Calle René Moreno Nº 162, Sucre, Bolivia',

  // TODO: confirmar con el cliente (viene del sitio actual, no está confirmado)
  phone: '(+591) 72877116',
  phoneRaw: '+59172877116',

  // TODO: número de WhatsApp corporativo pendiente de confirmación
  whatsapp: null as string | null, // Ejemplo futuro: '59172877116'

  // TODO: correo electrónico corporativo pendiente de confirmación
  email: null as string | null,

  // TODO: horarios de atención pendientes de confirmación
  schedule: null as string | null,

  // Form endpoint (e.g., Formspree)
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Industrial', href: '/industrial' },
  { label: 'Hospitalaria', href: '/hospitalaria' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
] as const;
