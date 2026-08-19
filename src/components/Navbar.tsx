import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Sprout, 
  Shirt, 
  ChevronDown, 
  Menu, 
  X, 
  Calculator, 
  PhoneCall, 
  MessageCircle, 
  Search,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Currency, SectorId } from '../types';
import { COMPANY_INFO, SECTORS } from '../data/conglomerateData';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentSector: SectorId;
  onSelectSector: (sector: SectorId) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  onOpenCalculator: (initialSector?: SectorId) => void;
  onOpenBooking: (initialSector?: SectorId) => void;
  onOpenCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSector,
  onSelectSector,
  currency,
  onToggleCurrency,
  onOpenCalculator,
  onOpenBooking,
  onOpenCatalog,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorDropdownOpen, setSectorDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectorIcons: Record<SectorId, React.ReactNode> = {
    'food-beverages': <UtensilsCrossed className="w-4 h-4 text-amber-400" />,
    'entertainment': <Sparkles className="w-4 h-4 text-purple-400" />,
    'agro-solutions': <Sprout className="w-4 h-4 text-emerald-400" />,
    'laundry-care': <Shirt className="w-4 h-4 text-cyan-400" />,
  };

  const handleSectorClick = (id: SectorId) => {
    onSelectSector(id);
    setSectorDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById('sectors-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-3.5' 
          : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/70 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Identity - Crowned Insignia & Single Line Lockup */}
          <a 
            href="#" 
            id="brand-logo-link"
            className="flex items-center gap-3 group shrink-0 focus:outline-none"
          >
            <BrandLogo size="sm" />
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-black tracking-tight text-white font-['Outfit'] group-hover:text-amber-400 transition-colors whitespace-nowrap">
                KING SHEEZY
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700 uppercase tracking-wider">
                GLOBAL
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Single-line, No wrapping */}
          <nav className="hidden xl:flex items-center gap-1 border border-slate-800/90 rounded-full px-3 py-1.5 bg-slate-900/60 backdrop-blur-md">
            
            {/* Subsidiaries Dropdown */}
            <div className="relative">
              <button
                id="nav-subsidiaries-dropdown"
                onClick={() => setSectorDropdownOpen(!sectorDropdownOpen)}
                onMouseEnter={() => setSectorDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                  sectorDropdownOpen ? 'bg-slate-800 text-amber-400' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Subsidiaries</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${sectorDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {sectorDropdownOpen && (
                <div 
                  onMouseLeave={() => setSectorDropdownOpen(false)}
                  className="absolute top-full left-0 mt-3 w-80 rounded-2xl bg-slate-950/98 backdrop-blur-2xl border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Core Subsidiaries</span>
                    <span className="text-[10px] text-amber-400 font-mono">4 Sectors</span>
                  </div>
                  {(Object.keys(SECTORS) as SectorId[]).map((id) => {
                    const sector = SECTORS[id];
                    return (
                      <button
                        key={id}
                        id={`nav-sector-${id}`}
                        onClick={() => handleSectorClick(id)}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                          currentSector === id 
                            ? 'bg-slate-900 border border-slate-700 text-white' 
                            : 'hover:bg-slate-900/80 text-slate-300 border border-transparent'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 mt-0.5 shrink-0">
                          {sectorIcons[id]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">{sector.fullName}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{sector.tagline}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              id="nav-catalog-btn"
              onClick={onOpenCatalog}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all whitespace-nowrap"
            >
              Services & Rates
            </button>

            <a 
              href="#calculator-section"
              id="nav-calculator-link"
              onClick={(e) => {
                e.preventDefault();
                onOpenCalculator(currentSector);
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all whitespace-nowrap"
            >
              Quote Estimator
            </a>

            <a 
              href="#about-section"
              id="nav-about-link"
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all whitespace-nowrap"
            >
              About
            </a>

            <a 
              href="#testimonials-section"
              id="nav-reviews-link"
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all whitespace-nowrap"
            >
              Reviews
            </a>

            <a 
              href="#contact-section"
              id="nav-contact-link"
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all whitespace-nowrap"
            >
              Contact Hub
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Currency Pill Switcher */}
            <button
              id="currency-toggle-btn"
              onClick={onToggleCurrency}
              title="Toggle Currency Display (NGN ₦ / USD $)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold transition-colors"
            >
              <span className={currency === 'NGN' ? 'text-amber-400 font-extrabold' : 'text-slate-500'}>₦ NGN</span>
              <span className="text-slate-600 text-[10px]">|</span>
              <span className={currency === 'USD' ? 'text-amber-400 font-extrabold' : 'text-slate-500'}>$ USD</span>
            </button>

            {/* Quote Estimator Button */}
            <button
              id="header-quote-calculator-btn"
              onClick={() => onOpenCalculator(currentSector)}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 text-xs font-bold transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Estimator</span>
            </button>

            {/* Primary Request Service CTA */}
            <button
              id="header-book-service-btn"
              onClick={() => onOpenBooking(currentSector)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-95 transition-all whitespace-nowrap"
            >
              <span>Request Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Currency for Mobile */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-currency-toggle"
              onClick={onToggleCurrency}
              className="sm:hidden px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400"
            >
              {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Drawer with Clean Borders & Spacing */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer" 
          className="xl:hidden bg-slate-950/98 border-b border-slate-800 px-5 pt-5 pb-8 mt-3 space-y-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
        >
          {/* Subsidiaries List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Our Subsidiaries</span>
              <span className="text-[10px] text-amber-400 font-mono">Select to View</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(SECTORS) as SectorId[]).map((id) => {
                const isSelected = currentSector === id;
                return (
                  <button
                    key={id}
                    id={`mobile-sector-${id}`}
                    onClick={() => handleSectorClick(id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl text-left border transition-all ${
                      isSelected 
                        ? 'bg-slate-900 border-amber-500/60 text-white shadow-md' 
                        : 'bg-slate-900/60 border-slate-800/90 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        {sectorIcons[id]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{SECTORS[id].fullName}</p>
                        <p className="text-[10px] text-slate-400">{SECTORS[id].tagline.slice(0, 32)}...</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="pt-3 border-t border-slate-800/90 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 block mb-2">Portal Navigation</span>
            
            <button
              id="mobile-open-catalog-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatalog();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 text-xs font-semibold text-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-amber-400" />
                <span>Full Service Directory & Rates</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <a
              href="#about-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 text-xs font-semibold text-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              About King Sheezy Conglomerate
            </a>

            <a
              href="#testimonials-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 text-xs font-semibold text-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              Client Testimonials & Ratings
            </a>

            <a
              href="#faq-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 text-xs font-semibold text-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              Corporate Knowledge Base & FAQs
            </a>

            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 text-xs font-semibold text-slate-200 hover:bg-slate-900 hover:text-white transition-all"
            >
              Headquarters & Regional Branches
            </a>
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
            <button
              id="mobile-open-calc-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator(currentSector);
              }}
              className="w-full py-3 px-3 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Quote Estimator</span>
            </button>
            <button
              id="mobile-book-now-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking(currentSector);
              }}
              className="w-full py-3 px-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
            >
              <span>Request Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
