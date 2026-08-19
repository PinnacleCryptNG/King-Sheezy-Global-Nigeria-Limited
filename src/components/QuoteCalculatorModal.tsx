import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calculator, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight, 
  UtensilsCrossed, 
  Sparkles, 
  Sprout, 
  Shirt,
  Download,
  Info
} from 'lucide-react';
import { SectorId, Currency } from '../types';
import { SECTORS, CALCULATOR_ITEMS, COMPANY_INFO } from '../data/conglomerateData';
import { formatCurrency, generateWhatsAppUrl } from '../utils/formatters';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSector?: SectorId;
  currency: Currency;
  onProceedToBooking: (sector: SectorId, estimatedTotal: string, summary: string) => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialSector = 'food-beverages',
  currency,
  onProceedToBooking,
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorId>(initialSector);
  const [quantity, setQuantity] = useState<number>(100);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSector) {
      setSelectedSector(initialSector);
      const config = CALCULATOR_ITEMS[initialSector];
      setQuantity(config.default);
      setSelectedAddOns({});
    }
  }, [initialSector, isOpen]);

  const handleSectorChange = (sectorId: SectorId) => {
    setSelectedSector(sectorId);
    const config = CALCULATOR_ITEMS[sectorId];
    setQuantity(config.default);
    setSelectedAddOns({});
  };

  const config = CALCULATOR_ITEMS[selectedSector];
  const sectorInfo = SECTORS[selectedSector];

  // Calculation Logic
  const baseSubtotal = quantity * config.baseRateNGN;
  let addOnsTotal = 0;
  
  config.addOns.forEach((addon) => {
    if (selectedAddOns[addon.id]) {
      if (addon.id === 'express_24h') {
        addOnsTotal += baseSubtotal * (addon.priceNGN as number);
      } else if (addon.id === 'drinks' || addon.id === 'smallchops' || addon.id === 'cleaning_grading' || addon.id === 'custom_packaging' || addon.id === 'scented_softener') {
        addOnsTotal += (addon.priceNGN as number) * quantity;
      } else {
        addOnsTotal += addon.priceNGN as number;
      }
    }
  });

  const grandTotalNGN = baseSubtotal + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getSummaryText = () => {
    const chosenAddonsList = config.addOns
      .filter((a) => selectedAddOns[a.id])
      .map((a) => a.label)
      .join(', ');

    return `King Sheezy Global — Instant Quote Estimate
Sector: ${sectorInfo.fullName}
Quantity: ${quantity} ${config.unit}
Base Estimate: ${formatCurrency(baseSubtotal, currency)}
Add-ons: ${chosenAddonsList || 'None selected'}
Total Estimated Cost: ${formatCurrency(grandTotalNGN, currency)}
Note: Final invoice may include specific logistics or custom client requests.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppQuote = () => {
    const message = `Hello King Sheezy Global! I calculated an instant estimate on your portal:
• Subsidiary: ${sectorInfo.fullName}
• Requirement: ${quantity} ${config.unit}
• Estimated Total: ${formatCurrency(grandTotalNGN, 'NGN')} (${formatCurrency(grandTotalNGN, 'USD')})
Please confirm date availability and provide the official invoice.`;
    window.open(generateWhatsAppUrl(message, sectorInfo.managerContact.phone), '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      id="quote-calculator-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="quote-calculator-modal"
        className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Instant Price & Service Estimator
              </h3>
              <p className="text-xs text-slate-400">
                Transparent rates across all King Sheezy Global divisions
              </p>
            </div>
          </div>
          <button
            id="close-calculator-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Select Sector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              1. Select Subsidiary
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(SECTORS) as SectorId[]).map((sId) => {
                const s = SECTORS[sId];
                const active = selectedSector === sId;
                return (
                  <button
                    key={sId}
                    id={`calc-sector-btn-${sId}`}
                    onClick={() => handleSectorChange(sId)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold flex flex-col gap-1.5 ${
                      active
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{s.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Configure Volume / Quantity */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-bold text-white block">
                  {config.label}
                </label>
                <span className="text-xs text-slate-400">
                  Base rate: {formatCurrency(config.baseRateNGN, currency)} / {config.unit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(config.min, Math.min(config.max, Number(e.target.value) || config.min)))}
                  className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-bold text-sm text-center focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-400">{config.unit}</span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={config.min}
              max={config.max}
              step={config.step}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Min: {config.min} {config.unit}</span>
              <span>Max: {config.max} {config.unit}</span>
            </div>
          </div>

          {/* Step 3: Value Add-ons */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>2. Optional Add-ons & Premium Packages</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {config.addOns.map((addon) => {
                const isChecked = !!selectedAddOns[addon.id];
                return (
                  <label
                    key={addon.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-amber-500/10 border-amber-500/60 text-white'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-950'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAddOn(addon.id)}
                      className="mt-1 w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-0 focus:ring-offset-0"
                    />
                    <div className="text-xs">
                      <span className="font-medium block leading-tight">{addon.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Subtotal ({quantity} {config.unit}):</span>
              <span>{formatCurrency(baseSubtotal, currency)}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="flex items-center justify-between text-xs text-amber-400/90">
                <span>Selected Add-ons Total:</span>
                <span>+{formatCurrency(addOnsTotal, currency)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Estimated Total</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-['Outfit']">
                  {formatCurrency(grandTotalNGN, currency)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Standard Rate Equivalent</span>
                <span className="text-xs font-semibold text-slate-300">
                  {currency === 'NGN' ? formatCurrency(grandTotalNGN, 'USD') : formatCurrency(grandTotalNGN, 'NGN')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Estimates are instant reference guides. Custom delivery locations and special rider requirements will be finalized on your official invoice.</span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <button
            id="calc-copy-btn"
            onClick={handleCopy}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Estimate Copied!' : 'Copy Summary'}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="calc-whatsapp-btn"
              onClick={handleWhatsAppQuote}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send to WhatsApp</span>
            </button>

            <button
              id="calc-proceed-btn"
              onClick={() => {
                onClose();
                onProceedToBooking(selectedSector, formatCurrency(grandTotalNGN, currency), getSummaryText());
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
            >
              <span>Book with this Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
