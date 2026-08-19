export type SectorId = 'food-beverages' | 'entertainment' | 'agro-solutions' | 'laundry-care';

export type Currency = 'NGN' | 'USD';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  startingPriceNGN: number;
  unit: string;
  image: string;
  popular?: boolean;
}

export interface SectorDetail {
  id: SectorId;
  shortName: string;
  fullName: string;
  tagline: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    bgAccent: string;
    borderAccent: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
  };
  iconName: string;
  heroImage: string;
  highlights: string[];
  services: ServiceItem[];
  stats: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  managerContact: {
    name: string;
    title: string;
    phone: string;
    whatsapp: string;
  };
}

export interface QuoteConfigItem {
  id: string;
  name: string;
  unitPriceNGN: number;
  unit: string;
  minQty: number;
  maxQty: number;
  step: number;
  category: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  sectorId: SectorId;
  rating: number;
  comment: string;
  avatar: string;
  location: string;
}

export interface BookingFormData {
  sectorId: SectorId;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  serviceType: string;
  preferredDate: string;
  location: string;
  estimatedBudget: string;
  notes: string;
  urgency: 'Standard' | 'Urgent (Within 24h)' | 'Planned Event';
}
