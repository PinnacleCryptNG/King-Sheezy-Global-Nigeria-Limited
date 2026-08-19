import { Currency } from '../types';
import { COMPANY_INFO, EXCHANGE_RATE_USD_NGN } from '../data/conglomerateData';

export function formatCurrency(amountNGN: number, currency: Currency): string {
  if (currency === 'USD') {
    const usd = amountNGN / EXCHANGE_RATE_USD_NGN;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(usd);
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amountNGN);
}

export function generateWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = customPhone || COMPANY_INFO.headquarters.whatsapp;
  const cleanedPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}
