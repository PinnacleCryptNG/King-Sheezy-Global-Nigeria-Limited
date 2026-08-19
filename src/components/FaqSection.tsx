import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  MessageCircle, 
  PhoneCall 
} from 'lucide-react';
import { SectorId } from '../types';
import { GENERAL_FAQS, SECTORS, COMPANY_INFO } from '../data/conglomerateData';
import { generateWhatsAppUrl } from '../utils/formatters';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Consolidate all FAQs
  const allFaqs: { category: string; question: string; answer: string; tag: string }[] = [];

  GENERAL_FAQS.forEach((f) => {
    allFaqs.push({
      category: 'general',
      question: f.question,
      answer: f.answer,
      tag: 'General Corporate',
    });
  });

  (Object.keys(SECTORS) as SectorId[]).forEach((sId) => {
    SECTORS[sId].faqs.forEach((f) => {
      allFaqs.push({
        category: sId,
        question: f.question,
        answer: f.answer,
        tag: SECTORS[sId].shortName,
      });
    });
  });

  const filteredFaqs = allFaqs.filter((f) => {
    const matchesCat = activeCategory === 'all' || f.category === activeCategory;
    const matchesSearch = 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const whatsappHelpUrl = generateWhatsAppUrl('Hello King Sheezy Global Support! I have a question not covered in your FAQ.');

  return (
    <section id="faq-section" className="py-24 sm:py-32 bg-slate-950 relative border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Everything you need to know about our business processes, logistics, quality compliance, and contracts.
          </p>
        </div>

        {/* Search bar & Category filters */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by keyword (e.g., payment, pickup, delivery, refund, NAFDAC, booking)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Topics ({allFaqs.length})
            </button>
            <button
              onClick={() => setActiveCategory('general')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === 'general'
                  ? 'bg-slate-800 text-white border border-amber-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              General Corporate
            </button>
            {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
              <button
                key={sId}
                onClick={() => setActiveCategory(sId)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === sId
                    ? 'bg-slate-800 text-white border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {SECTORS[sId].shortName}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion with Defined Borders */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs sm:text-sm">
              No matching answers found for "{searchQuery}". Try a different keyword or contact our support team.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  id={`faq-item-${idx}`}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen 
                      ? 'bg-slate-900/90 border-slate-700 shadow-xl shadow-slate-950/40' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-amber-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                        {faq.tag}
                      </span>
                      <span className="text-xs sm:text-sm md:text-base font-bold font-['Outfit']">{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Have a customized requirement or enterprise tender?
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Speak directly with our Executive Operations Desk in Lagos or Abuja.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.headquarters.phone}`}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-2 transition-colors border border-slate-700"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
