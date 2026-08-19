import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  UtensilsCrossed, 
  Sprout, 
  Shirt, 
  ShieldCheck, 
  MessageCircle, 
  Calculator,
  ChevronRight,
  Award
} from 'lucide-react';
import { SectorId } from '../types';
import { COMPANY_INFO, SECTORS } from '../data/conglomerateData';
import { generateWhatsAppUrl } from '../utils/formatters';

interface HeroProps {
  currentSector: SectorId;
  onSelectSector: (sector: SectorId) => void;
  onOpenCalculator: (sector?: SectorId) => void;
  onOpenBooking: (sector?: SectorId) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentSector,
  onSelectSector,
  onOpenCalculator,
  onOpenBooking,
}) => {
  const sectorPills: { id: SectorId; title: string; icon: React.ReactNode; color: string; badge: string }[] = [
    {
      id: 'food-beverages',
      title: 'Food & Beverages',
      icon: <UtensilsCrossed className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
      badge: 'Catering & Beverages',
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
      badge: 'Events & Media',
    },
    {
      id: 'agro-solutions',
      title: 'Agro Solutions',
      icon: <Sprout className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
      badge: 'Farming & Produce',
    },
    {
      id: 'laundry-care',
      title: 'Laundry & Care',
      icon: <Shirt className="w-4 h-4 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
      badge: 'Express Dry Cleaning',
    },
  ];

  const handlePillClick = (id: SectorId) => {
    onSelectSector(id);
    const element = document.getElementById('sectors-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappGeneralUrl = generateWhatsAppUrl(
    `Hello King Sheezy Global! I would like to make an inquiry regarding your corporate services.`
  );

  return (
    <section id="hero-section" className="relative pt-36 sm:pt-44 pb-24 sm:pb-32 overflow-hidden bg-slate-950 border-b border-slate-800/90">
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[400px] bg-emerald-600/10 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-7">
          
          {/* Accreditation Pill Badge */}
          <div 
            id="hero-accreditation-badge"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 shadow-md backdrop-blur-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              CAC Incorporated Conglomerate • <span className="text-amber-400 font-mono font-bold">{COMPANY_INFO.cacNumber}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.08]"
          >
            One Standard of Excellence. <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Four Dynamic Industries.
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            id="hero-subtitle"
            className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
          >
            <strong className="text-white font-semibold">{COMPANY_INFO.name}</strong> operates market-leading divisions across premium food & beverage catering, experiential entertainment production, sustainable commercial agriculture, and luxury fabric care across Nigeria.
          </p>

          {/* Interactive Sector Jump Cards with Crisp Borders */}
          <div className="w-full max-w-4xl pt-4">
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Our Subsidiaries</span>
              <span className="text-[11px] text-amber-400/90 font-medium">Click to Explore Details</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {sectorPills.map((pill) => {
                const isSelected = currentSector === pill.id;
                return (
                  <button
                    key={pill.id}
                    id={`hero-pill-${pill.id}`}
                    onClick={() => handlePillClick(pill.id)}
                    className={`group p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border ${pill.color}`}>
                        {pill.icon}
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-300'}`} />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-amber-300 transition-colors">
                        {pill.title}
                      </span>
                      <span className="text-[11px] text-slate-400 block line-clamp-1">
                        {pill.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              id="hero-explore-btn"
              onClick={() => {
                const element = document.getElementById('sectors-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Explore All Subsidiaries</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-calculator-btn"
              onClick={() => onOpenCalculator(currentSector)}
              className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Instant Pricing Estimator</span>
            </button>

            <a
              id="hero-whatsapp-chat-btn"
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

        </div>

        {/* Highlight Metrics Banner */}
        <div 
          id="hero-metrics-strip"
          className="mt-20 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {COMPANY_INFO.stats.slice(0, 4).map((stat, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-center hover:border-slate-700 transition-colors shadow-lg"
            >
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
