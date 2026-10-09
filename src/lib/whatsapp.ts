import { SITE } from './site';

/**
 * Builds a WhatsApp chat URL with an optional prefilled message.
 * If no phone number is configured in SITE.whatsapp, falls back to '/contacto'.
 *
 * @param message Optional prefilled text for the chat.
 * @returns Formatted WhatsApp link or '/contacto' fallback.
 */
export function getWhatsAppLink(message?: string): string {
  if (!SITE.whatsapp) {
    return '/contacto';
  }

  const cleanNumber = SITE.whatsapp.replace(/\D/g, '');
  if (!cleanNumber) {
    return '/contacto';
  }

  const query = message ? `?text=${encodeURIComponent(message.trim())}` : '';
  return `https://wa.me/${cleanNumber}${query}`;
}

/**
 * Checks whether a corporate WhatsApp number is actively configured.
 */
export function hasWhatsApp(): boolean {
  return Boolean(SITE.whatsapp && SITE.whatsapp.trim().length > 0);
}
