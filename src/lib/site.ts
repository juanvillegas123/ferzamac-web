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

  // Google Maps pin referencial para Ferzamac en Sucre
  mapsUrl: 'https://maps.google.com/?q=Ferzamac,+Calle+Ren%C3%A9+Moreno+162,+Sucre,+Bolivia',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Ferzamac%2C%20Calle%20Ren%C3%A9%20Moreno%20162%2C%20Sucre%20Bolivia&t=m&z=16&output=embed&iwloc=near',

  phone: '(+591) 72877116',
  phoneRaw: '+59172877116',

  // Número oficial de WhatsApp corporativo
  whatsapp: '59172877116',

  // Correo electrónico corporativo confirmado
  email: 'info@ferzamac.com',

  // Horarios de atención referenciales
  schedule: 'Lunes a Viernes: 08:00 - 18:30 | Sábados: 08:30 - 12:30',

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
