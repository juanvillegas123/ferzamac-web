import { SITE } from './site';

/**
 * Builds a WhatsApp chat URL with an optional prefilled message.
 * If no phone number is configured in SITE.whatsapp, falls back to '/contacto'.
 *
 * @param message Optional prefilled text for the chat.
 * @param targetNumber Optional phone number override (defaults to SITE.whatsapp).
 * @returns Formatted WhatsApp link or '/contacto' fallback.
 */
export function getWhatsAppLink(
  message?: string,
  targetNumber: string = SITE.whatsapp
): string {
  const numberToUse = targetNumber || SITE.whatsapp;
  if (!numberToUse) {
    return '/contacto';
  }

  const cleanNumber = numberToUse.replace(/\D/g, '');
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
