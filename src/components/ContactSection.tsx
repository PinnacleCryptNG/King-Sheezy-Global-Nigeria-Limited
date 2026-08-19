import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2
} from 'lucide-react';
import { SectorId } from '../types';
import { COMPANY_INFO, SECTORS } from '../data/conglomerateData';
import { generateWhatsAppUrl } from '../utils/formatters';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sectorId: 'food-beverages' as SectorId,
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    const sectorName = SECTORS[formData.sectorId].fullName;
    const msg = `*NEW CONTACT MESSAGE — KING SHEEZY PORTAL*
• *From:* ${formData.name}
• *Phone:* ${formData.phone || 'N/A'}
• *Email:* ${formData.email || 'N/A'}
• *Sector of Interest:* ${sectorName}
• *Subject:* ${formData.subject || 'General Inquiry'}
• *Message:* ${formData.message}`;

    const targetPhone = SECTORS[formData.sectorId].managerContact.phone;
    window.open(generateWhatsAppUrl(msg, targetPhone), '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-24 sm:py-32 bg-slate-900/40 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
            <Building2 className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Corporate Headquarters & Regional Hubs
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Reach out to our executive coordination desk, schedule a physical consultation, or request an on-site inspection.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Info & Locations / Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Office Hubs & Key Contacts */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card with Clean Defined Border */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 shadow-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  Lagos Corporate Headquarters
                </h3>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>{COMPANY_INFO.headquarters.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="space-x-2">
                    <a href={`tel:${COMPANY_INFO.headquarters.phone}`} className="hover:text-amber-400 transition-colors font-medium">
                      {COMPANY_INFO.headquarters.phone}
                    </a>
                    <span>•</span>
                    <a href={`tel:${COMPANY_INFO.headquarters.phoneSecondary}`} className="hover:text-amber-400 transition-colors font-medium">
                      {COMPANY_INFO.headquarters.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.headquarters.email}`} className="hover:text-amber-400 transition-colors">
                    {COMPANY_INFO.headquarters.email}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-xs">{COMPANY_INFO.headquarters.hours}</span>
                </div>
              </div>

              {/* Direct Quick WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppUrl('Hello King Sheezy Global! I would like to make an inquiry.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Chat ({COMPANY_INFO.headquarters.whatsappFormatted})</span>
                </a>
              </div>
            </div>

            {/* Regional Branches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 shadow-lg">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">Abuja Branch</p>
                <p className="text-xs text-slate-300 leading-relaxed">{COMPANY_INFO.headquarters.branchAbuja}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 shadow-lg">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">Port Harcourt Hub</p>
                <p className="text-xs text-slate-300 leading-relaxed">{COMPANY_INFO.headquarters.branchPH}</p>
              </div>
            </div>

            {/* Sector Lead Desk Cards */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-lg">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Subsidiary Hotlines</p>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
                  <div key={sId} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="font-bold text-slate-200 truncate">{SECTORS[sId].shortName}</p>
                    <p className="text-[11px] text-amber-400 font-mono mt-0.5">{SECTORS[sId].managerContact.phone}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                  Send a Direct Message to Our Board & Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Fill out the details below for automated dispatch to our project coordination team.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Your inquiry has been generated. If your WhatsApp did not open automatically, click the button below.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Raymond Dokpesi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Department / Subsidiary *</label>
                      <select
                        value={formData.sectorId}
                        onChange={(e) => setFormData({ ...formData, sectorId: e.target.value as SectorId })}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      >
                        {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
                          <option key={sId} value={sId}>
                            {SECTORS[sId].fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Subject / Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. 500-guest Banquet Catering / 100 Tons Maize Supply Tender"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Detailed Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please explain the scope of work, timeline, volume, or any specific instructions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-form-submit-btn"
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Operations Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
