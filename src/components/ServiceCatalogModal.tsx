import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  UtensilsCrossed, 
  Sparkles, 
  Sprout, 
  Shirt, 
  ArrowRight, 
  MessageCircle, 
  Printer, 
  CheckCircle2 
} from 'lucide-react';
import { SectorId, Currency, ServiceItem } from '../types';
import { SECTORS, COMPANY_INFO } from '../data/conglomerateData';
import { formatCurrency, generateWhatsAppUrl } from '../utils/formatters';

interface ServiceCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onBookService: (sector: SectorId, serviceName: string) => void;
}

export const ServiceCatalogModal: React.FC<ServiceCatalogModalProps> = ({
  isOpen,
  onClose,
  currency,
  onBookService,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  if (!isOpen) return null;

  // Flatten all services with sector association
  const allServices: { service: ServiceItem; sectorId: SectorId; sectorName: string }[] = [];
  (Object.keys(SECTORS) as SectorId[]).forEach((sId) => {
    SECTORS[sId].services.forEach((srv) => {
      allServices.push({
        service: srv,
        sectorId: sId,
        sectorName: SECTORS[sId].fullName,
      });
    });
  });

  const filteredServices = allServices.filter(({ service, sectorId, sectorName }) => {
    const matchesFilter = selectedFilter === 'all' || sectorId === selectedFilter;
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sectorName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppInquiry = (serviceName: string, sectorId: SectorId) => {
    const text = `Hello King Sheezy Global! I would like to make an inquiry regarding your catalog offering: "${serviceName}" under ${SECTORS[sectorId].fullName}.`;
    window.open(generateWhatsAppUrl(text, SECTORS[sectorId].managerContact.phone), '_blank');
  };

  return (
    <div 
      id="service-catalog-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="service-catalog-modal"
        className="relative w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Comprehensive Service & Product Catalog
              </h3>
              <p className="text-xs text-slate-400">
                Official rate cards across all 4 subsidiaries of {COMPANY_INFO.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              id="catalog-print-btn"
              onClick={handlePrint}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Print Rate Card"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="close-catalog-modal-btn"
              onClick={onClose}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 bg-slate-950/50 flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. buffet, water, DJ, maize, agbada, dry cleaning)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Sector category filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              id="filter-all"
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              All ({allServices.length})
            </button>
            {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
              <button
                key={sId}
                id={`filter-${sId}`}
                onClick={() => setSelectedFilter(sId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === sId
                    ? 'bg-slate-800 text-white border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {SECTORS[sId].shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-base font-semibold text-slate-300">No services match your search.</p>
              <p className="text-xs">Try searching for other terms like "catering", "lighting", "produce", or "laundry".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map(({ service, sectorId, sectorName }) => (
                <div
                  key={service.id}
                  id={`catalog-item-${service.id}`}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-400">
                        {sectorName}
                      </span>
                      <span className="text-xs font-bold text-amber-400 font-['Outfit']">
                        {formatCurrency(service.startingPriceNGN, currency)} <span className="text-[10px] text-slate-400 font-normal">/ {service.unit}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {service.name}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-1 pt-1">
                      {service.features.slice(0, 3).map((feat, fidx) => (
                        <div key={fidx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      id={`catalog-book-${service.id}`}
                      onClick={() => {
                        onClose();
                        onBookService(sectorId, service.name);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Inquire / Request</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      id={`catalog-wa-${service.id}`}
                      onClick={() => handleWhatsAppInquiry(service.name, sectorId)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800"
                      title="WhatsApp this item"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-center text-xs text-slate-400">
          <span>Need a customized corporate framework or volume tender contract? Contact our Enterprise Desk at </span>
          <span className="text-amber-400 font-medium">{COMPANY_INFO.headquarters.phone}</span>
        </div>

      </div>
    </div>
  );
};
