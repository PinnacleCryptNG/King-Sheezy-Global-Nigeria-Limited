import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Youtube
} from 'lucide-react';
import { COMPANY_INFO, SECTORS } from '../data/conglomerateData';
import { SectorId } from '../types';

interface FooterProps {
  onSelectSector: (sector: SectorId) => void;
  onOpenCalculator: (sector?: SectorId) => void;
  onOpenCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectSector,
  onOpenCalculator,
  onOpenCatalog,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectorClick = (id: SectorId) => {
    onSelectSector(id);
    const element = document.getElementById('sectors-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs sm:text-sm relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800/80">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-black text-lg shadow-lg shadow-amber-500/20 border border-amber-400/40">
                KS
              </div>
              <div>
                <span className="text-lg font-black text-white font-['Outfit'] tracking-tight block">
                  {COMPANY_INFO.name}
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {COMPANY_INFO.cacNumber} • Est. {COMPANY_INFO.yearEstablished}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.tagline}. Powering sustainable agriculture, luxury catering, premier event productions, and precision fabric care across Nigeria.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a 
                href={COMPANY_INFO.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={COMPANY_INFO.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={COMPANY_INFO.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={COMPANY_INFO.socials.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={COMPANY_INFO.socials.youtube} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Subsidiaries Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Our 4 Pillars</p>
            <ul className="space-y-2 text-xs">
              {(Object.keys(SECTORS) as SectorId[]).map((id) => (
                <li key={id}>
                  <button
                    onClick={() => handleSectorClick(id)}
                    className="hover:text-amber-400 transition-colors text-left text-slate-300"
                  >
                    {SECTORS[id].fullName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Quick Tools</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={onOpenCatalog} className="hover:text-amber-400 transition-colors">
                  Full Service Directory & Rates
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCalculator()} className="hover:text-amber-400 transition-colors">
                  Instant Pricing Estimator
                </button>
              </li>
              <li>
                <a href="#about-section" className="hover:text-amber-400 transition-colors">
                  About King Sheezy Standard
                </a>
              </li>
              <li>
                <a href="#testimonials-section" className="hover:text-amber-400 transition-colors">
                  Verified Client Reviews
                </a>
              </li>
              <li>
                <a href="#faq-section" className="hover:text-amber-400 transition-colors">
                  Knowledge Base & FAQs
                </a>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-amber-400 transition-colors">
                  Corporate Branch Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Headquarters Contacts */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">Operations Desk</p>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Admiralty Way, Lekki Phase 1, Lagos</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.headquarters.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.headquarters.email}</span>
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Support Desk Live 24/7
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400/80" />
            <span>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Registered under CAC Nigeria ({COMPANY_INFO.cacNumber}).</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800 active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
