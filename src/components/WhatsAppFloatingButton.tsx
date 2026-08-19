import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, UtensilsCrossed, Sparkles, Sprout, Shirt, Send } from 'lucide-react';
import { COMPANY_INFO, SECTORS } from '../data/conglomerateData';
import { generateWhatsAppUrl } from '../utils/formatters';
import { SectorId } from '../types';
import { BrandLogo } from './BrandLogo';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickPrompts: { label: string; sectorId: SectorId; icon: React.ReactNode; text: string }[] = [
    {
      label: 'Food & Catering Inquiries',
      sectorId: 'food-beverages',
      icon: <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />,
      text: 'Hello King Sheezy Food & Beverages! I would like to inquire about your catering and beverage supply services.',
    },
    {
      label: 'Events, Stage & Media Booking',
      sectorId: 'entertainment',
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
      text: 'Hello King Sheezy Entertainment! I would like to inquire about sound/lighting rentals, artist booking, or event production.',
    },
    {
      label: 'Wholesale Farm Produce Supply',
      sectorId: 'agro-solutions',
      icon: <Sprout className="w-3.5 h-3.5 text-emerald-400" />,
      text: 'Hello King Sheezy Agro Solutions! I want to order bulk farm produce or agrochemical solutions.',
    },
    {
      label: 'Doorstep Laundry Pickup',
      sectorId: 'laundry-care',
      icon: <Shirt className="w-3.5 h-3.5 text-cyan-400" />,
      text: 'Hello King Sheezy Laundry & Care! I need a doorstep pickup for my dry cleaning / laundry.',
    },
  ];

  const handleLaunchWhatsApp = (text: string, sectorId?: SectorId) => {
    const phone = sectorId ? SECTORS[sectorId].managerContact.phone : COMPANY_INFO.headquarters.whatsapp;
    window.open(generateWhatsAppUrl(text, phone), '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popup */}
      {isOpen && (
        <div 
          id="whatsapp-chat-popup"
          className="mb-3 w-80 sm:w-96 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-emerald-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center p-0.5 border border-emerald-400/40">
                <BrandLogo size="xs" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">King Sheezy 24/7 Desk</p>
                <p className="text-[11px] text-emerald-100 opacity-90">Instant WhatsApp Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-950 space-y-3">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              👋 <strong className="text-white">Welcome to King Sheezy Global!</strong> How may our specialized division leads assist your requirements today?
            </div>

            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold px-1">
              Select Quick Topic:
            </p>

            <div className="space-y-1.5">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLaunchWhatsApp(q.text, q.sectorId)}
                  className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left flex items-center justify-between gap-2 group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                      {q.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                      {q.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-900">
              <button
                onClick={() => handleLaunchWhatsApp('Hello King Sheezy Global! I would like to speak directly with an operations executive.')}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start General WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        id="whatsapp-floating-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-slate-950 text-emerald-500" />
        
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

        {/* Floating tooltip on hover */}
        {!isOpen && (
          <span className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            WhatsApp Desk • Live 24/7
          </span>
        )}
      </button>
    </div>
  );
};
