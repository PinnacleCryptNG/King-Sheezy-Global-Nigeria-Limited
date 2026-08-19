import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquarePlus, 
  X, 
  Send 
} from 'lucide-react';
import { SectorId, Testimonial } from '../types';
import { TESTIMONIALS, SECTORS } from '../data/conglomerateData';

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    role: '',
    company: '',
    sectorId: 'food-beverages' as SectorId,
    rating: 5,
    comment: '',
    location: '',
  });

  const filteredTestimonials = filter === 'all' 
    ? testimonialsList 
    : testimonialsList.filter((t) => t.sectorId === filter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) return;

    const item: Testimonial = {
      id: 'test-' + Date.now(),
      author: newReview.author,
      role: newReview.role || 'Valued Client',
      company: newReview.company || 'Private Client',
      sectorId: newReview.sectorId,
      rating: newReview.rating,
      comment: newReview.comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: newReview.location || 'Nigeria',
    };

    setTestimonialsList([item, ...testimonialsList]);
    setModalOpen(false);
    setNewReview({
      author: '',
      role: '',
      company: '',
      sectorId: 'food-beverages',
      rating: 5,
      comment: '',
      location: '',
    });
  };

  return (
    <section id="testimonials-section" className="py-24 sm:py-32 bg-slate-900/30 relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
              <span>Verified Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl">
              Discover what corporate executives, event hosts, industrial millers, and families say about King Sheezy Global.
            </p>
          </div>

          <button
            id="leave-review-btn"
            onClick={() => setModalOpen(true)}
            className="self-start md:self-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Sector Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10">
          <button
            id="review-filter-all"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Divisions ({testimonialsList.length})
          </button>
          {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
            <button
              key={sId}
              id={`review-filter-${sId}`}
              onClick={() => setFilter(sId)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === sId
                  ? 'bg-slate-800 text-white border border-amber-500/40 shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {SECTORS[sId].shortName}
            </button>
          ))}
        </div>

        {/* Testimonials Grid with Defined Spacing & Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => {
            const sec = SECTORS[t.sectorId];
            return (
              <div 
                key={t.id}
                id={`testimonial-${t.id}`}
                className="p-6 sm:p-7 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-colors shadow-xl"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 border border-slate-800">
                      {sec ? sec.shortName : 'King Sheezy Global'}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <img 
                    src={t.avatar} 
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0" 
                  />
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-white truncate">{t.author}</p>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {t.role} {t.company ? `• ${t.company}` : ''}
                    </p>
                    <p className="text-[10px] text-slate-500">{t.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Leave Review Modal */}
      {modalOpen && (
        <div 
          id="leave-review-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Share Your Feedback</h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Babatunde Adeleke"
                  value={newReview.author}
                  onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Operations Director"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Org</label>
                  <input
                    type="text"
                    placeholder="e.g. Zenith Logistics"
                    value={newReview.company}
                    onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Subsidiary Experienced</label>
                  <select
                    value={newReview.sectorId}
                    onChange={(e) => setNewReview({ ...newReview, sectorId: e.target.value as SectorId })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  >
                    {(Object.keys(SECTORS) as SectorId[]).map((sId) => (
                      <option key={sId} value={sId}>{SECTORS[sId].shortName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lagos, Nigeria"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Review Comments *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share details regarding service quality, timeliness, and customer support..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
