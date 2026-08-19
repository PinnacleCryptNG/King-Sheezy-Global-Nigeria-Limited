import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Sprout, 
  Shirt, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  MessageCircle, 
  PhoneCall, 
  ChevronDown
} from 'lucide-react';
import { SectorId, Currency } from '../types';
import { SECTORS, COMPANY_INFO } from '../data/conglomerateData';
import { formatCurrency, generateWhatsAppUrl } from '../utils/formatters';

interface SectorExplorerProps {
  currentSector: SectorId;
  onSelectSector: (sector: SectorId) => void;
  currency: Currency;
  onOpenCalculator: (sector: SectorId) => void;
  onOpenBooking: (sector: SectorId, serviceName?: string) => void;
}

export const SectorExplorer: React.FC<SectorExplorerProps> = ({
  currentSector,
  onSelectSector,
  currency,
  onOpenCalculator,
  onOpenBooking,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const sector = SECTORS[currentSector];

  const sectorTabs: { id: SectorId; title: string; icon: React.ReactNode; colorClass: string; activeClass: string }[] = [
    {
      id: 'food-beverages',
      title: 'Food & Beverages',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      colorClass: 'text-amber-400',
      activeClass: 'bg-amber-500/10 border-amber-500/80 text-amber-300 shadow-lg shadow-amber-500/10',
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      icon: <Sparkles className="w-4 h-4" />,
      colorClass: 'text-purple-400',
      activeClass: 'bg-purple-500/10 border-purple-500/80 text-purple-300 shadow-lg shadow-purple-500/10',
    },
    {
      id: 'agro-solutions',
      title: 'Agro Solutions',
      icon: <Sprout className="w-4 h-4" />,
      colorClass: 'text-emerald-400',
      activeClass: 'bg-emerald-500/10 border-emerald-500/80 text-emerald-300 shadow-lg shadow-emerald-500/10',
    },
    {
      id: 'laundry-care',
      title: 'Laundry & Care',
      icon: <Shirt className="w-4 h-4" />,
      colorClass: 'text-cyan-400',
      activeClass: 'bg-cyan-500/10 border-cyan-500/80 text-cyan-300 shadow-lg shadow-cyan-500/10',
    },
  ];

  const handleWhatsAppSectorInquiry = (serviceName?: string) => {
    const text = serviceName
      ? `Hello King Sheezy Global! I would like to inquire about "${serviceName}" under ${sector.fullName}.`
      : `Hello King Sheezy Global! I am interested in services provided by ${sector.fullName}.`;
    window.open(generateWhatsAppUrl(text, sector.managerContact.phone), '_blank');
  };

  return (
    <section id="sectors-section" className="py-24 sm:py-32 bg-slate-900/40 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
            <span>Corporate Subsidiaries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Explore Our Business Divisions
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Select an industry sector below to view specialized capabilities, transparent rate cards, and instant booking options.
          </p>
        </div>

        {/* Subsidiary Selection Tabs */}
        <div 
          id="sector-navigation-tabs"
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-slate-950 border border-slate-800 backdrop-blur-xl mb-14 shadow-2xl"
        >
          {sectorTabs.map((tab) => {
            const isActive = currentSector === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => onSelectSector(tab.id)}
                className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isActive 
                    ? tab.activeClass 
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className={isActive ? tab.colorClass : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span className="truncate">{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Sector Content Showcase */}
        <div 
          id={`sector-content-${currentSector}`}
          className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden transition-all duration-300"
        >
          {/* Background Ambient Glow */}
          <div className={`absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br ${sector.colorScheme.bgAccent} rounded-full blur-[140px] opacity-30 pointer-events-none`} />

          {/* Sector Header & Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14 pb-10 border-b border-slate-800/80 relative z-10">
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${sector.colorScheme.badgeBg}`}>
                  {sector.fullName}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {COMPANY_INFO.name} Subsidiary
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit']">
                {sector.tagline}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {sector.description}
              </p>

              {/* Highlights checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                {sector.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Sector Key Stats & Direct Contact */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {sector.stats.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                    <p className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">{s.value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Division Desk Contact Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Division Coordinator</p>
                  <p className="text-sm font-bold text-white mt-0.5">{sector.managerContact.name}</p>
                  <p className="text-xs text-amber-400/90">{sector.managerContact.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    id={`sector-manager-wa-${currentSector}`}
                    onClick={() => handleWhatsAppSectorInquiry()}
                    className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <a
                    href={`tel:${sector.managerContact.phone}`}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                    title="Call Sector Desk"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Action Buttons for this Sector */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  id={`sector-estimate-btn-${currentSector}`}
                  onClick={() => onOpenCalculator(currentSector)}
                  className="w-full py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Estimate Pricing</span>
                </button>
                <button
                  id={`sector-book-btn-${currentSector}`}
                  onClick={() => onOpenBooking(currentSector)}
                  className="w-full py-3 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-amber-500/10"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Core Services Portfolio */}
          <div className="space-y-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  Featured Services & Deliverables
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Turnkey solutions customized for private clients, events, and corporate enterprises.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800 w-fit">
                {sector.services.length} Core Services Available
              </span>
            </div>

            {/* Services Grid with Mathematically Aligned Padding & Borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sector.services.map((service) => (
                <div 
                  key={service.id}
                  id={`service-card-${service.id}`}
                  className="group rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-slate-950/60"
                >
                  {/* Service Image & Category Badge */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-white border border-slate-700">
                        {service.category}
                      </span>
                      {service.popular && (
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                          Most Requested
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3.5 right-3.5 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Starting from</p>
                      <p className="text-sm sm:text-base font-extrabold text-amber-400 font-['Outfit']">
                        {formatCurrency(service.startingPriceNGN, currency)}{' '}
                        <span className="text-xs font-normal text-slate-400">/ {service.unit}</span>
                      </p>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h5 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                        {service.name}
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                      {service.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 flex items-center gap-2.5">
                      <button
                        id={`btn-book-${service.id}`}
                        onClick={() => onOpenBooking(currentSector, service.name)}
                        className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5"
                      >
                        <span>Request Service</span>
                      </button>
                      <button
                        id={`btn-wa-${service.id}`}
                        onClick={() => handleWhatsAppSectorInquiry(service.name)}
                        className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors"
                        title="Chat about this service on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Specific FAQ Accordion */}
          <div className="mt-14 pt-10 border-t border-slate-800/80 relative z-10">
            <h4 className="text-lg sm:text-xl font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
              <span>{sector.shortName} — Frequently Answered Questions</span>
            </h4>
            <div className="space-y-2.5">
              {sector.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden"
                  >
                    <button
                      id={`sector-faq-btn-${idx}`}
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-amber-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
