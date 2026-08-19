import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  FileText, 
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import { SectorId, BookingFormData } from '../types';
import { SECTORS, COMPANY_INFO } from '../data/conglomerateData';
import { generateWhatsAppUrl } from '../utils/formatters';

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSector?: SectorId;
  initialServiceName?: string;
  prefilledEstimate?: string;
  prefilledNotes?: string;
}

export const QuickBookingModal: React.FC<QuickBookingModalProps> = ({
  isOpen,
  onClose,
  initialSector = 'food-beverages',
  initialServiceName = '',
  prefilledEstimate = '',
  prefilledNotes = '',
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    sectorId: initialSector,
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    serviceType: initialServiceName,
    preferredDate: '',
    location: '',
    estimatedBudget: prefilledEstimate,
    notes: prefilledNotes,
    urgency: 'Standard',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        sectorId: initialSector,
        serviceType: initialServiceName || prev.serviceType,
        estimatedBudget: prefilledEstimate || prev.estimatedBudget,
        notes: prefilledNotes || prev.notes,
      }));
      setIsSubmitted(false);
    }
  }, [isOpen, initialSector, initialServiceName, prefilledEstimate, prefilledNotes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const sectorName = SECTORS[formData.sectorId].fullName;
    const msg = `*NEW SERVICE BOOKING / INQUIRY*
• *Conglomerate Unit:* ${sectorName}
• *Client Name:* ${formData.fullName || 'Valued Client'}
• *Phone / WhatsApp:* ${formData.phone || formData.whatsapp || 'Provided in chat'}
• *Service Requested:* ${formData.serviceType || 'General Consultation'}
• *Preferred Date:* ${formData.preferredDate || 'Earliest available'}
• *Location:* ${formData.location || 'Lagos / National'}
• *Urgency:* ${formData.urgency}
• *Estimated Budget:* ${formData.estimatedBudget || 'Standard Quote'}
• *Special Requirements:* ${formData.notes || 'Please provide details'}

Kindly confirm receipt and allocate a King Sheezy account specialist.`;

    const sectorPhone = SECTORS[formData.sectorId].managerContact.phone;
    window.open(generateWhatsAppUrl(msg, sectorPhone), '_blank');
    
    // Also mark as submitted locally
    const code = 'KS-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    setIsSubmitted(true);
  };

  const handleSubmitFormal = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'KS-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(code);
    setIsSubmitted(true);
  };

  const copyRefCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="booking-modal"
        className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Request Service / Corporate Inquiry
              </h3>
              <p className="text-xs text-slate-400">
                Direct submission to King Sheezy Global project coordination team
              </p>
            </div>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success View */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white font-['Outfit']">
                Inquiry Successfully Logged!
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <span className="text-amber-400 font-semibold">{formData.fullName || 'Valued Client'}</span>. Your request for <span className="text-white font-medium">{SECTORS[formData.sectorId].fullName}</span> has been dispatched to our desk.
              </p>
            </div>

            {/* Reference Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Tracking Reference</span>
                <span className="text-base font-mono font-extrabold text-amber-400">{refCode}</span>
              </div>
              <button
                id="copy-ref-btn"
                onClick={copyRefCode}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Our division lead will call or message your WhatsApp at <span className="text-slate-200 font-medium">{formData.phone || formData.whatsapp || 'your registered number'}</span> within 15–30 minutes during working hours.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                id="modal-finish-close-btn"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
              >
                Close Window
              </button>
              <button
                id="modal-finish-whatsapp-btn"
                onClick={handleWhatsAppSend}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitFormal} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Sector Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Target Business Division *
              </label>
              <select
                name="sectorId"
                value={formData.sectorId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-500"
                required
              >
                {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
                  <option key={sId} value={sId}>
                    {SECTORS[sId].fullName} ({SECTORS[sId].shortName})
                  </option>
                ))}
              </select>
            </div>

            {/* Service & Urgency Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Service / Item Required
                </label>
                <input
                  type="text"
                  name="serviceType"
                  placeholder="e.g. Wedding Buffet / Produce Wholesale"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Urgency / Timeline
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="Standard">Standard Schedule (2–5 Days)</option>
                  <option value="Urgent (Within 24h)">Express Rush (Within 24 Hours)</option>
                  <option value="Planned Event">Upcoming Planned Date</option>
                </select>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Your Full Name / Corporate Entity *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Prince Adeyemi / Dangote Sugar"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="client@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Delivery / Event Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Victoria Island, Lagos / Maitama, Abuja"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Date & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Preferred Delivery / Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Estimated Budget / Quote Target
                </label>
                <input
                  type="text"
                  name="estimatedBudget"
                  placeholder="e.g. ₦150,000 / Flexible"
                  value={formData.estimatedBudget}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Notes & Requirements */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Special Instructions / Custom Specifications
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Specify menu preferences, headcount, equipment requirements, delivery logistics, or fabric care notes..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 placeholder:text-slate-600 resize-none"
              />
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>We respect your privacy. Inquiries are handled strictly by verified King Sheezy Global operations personnel.</span>
            </div>

            {/* Submission Actions */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                id="booking-whatsapp-direct-btn"
                onClick={handleWhatsAppSend}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Submit & Chat on WhatsApp</span>
              </button>

              <button
                type="submit"
                id="booking-formal-submit-btn"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Official Inquiry</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
