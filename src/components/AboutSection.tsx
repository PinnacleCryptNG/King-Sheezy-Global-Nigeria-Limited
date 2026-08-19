import React from 'react';
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/conglomerateData';

interface AboutSectionProps {
  onOpenCatalog: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCatalog }) => {
  const milestones = [
    {
      year: '2019',
      title: 'Foundation & Incorporation',
      desc: 'King Sheezy Global Limited was officially incorporated (CAC RC: 1894204), launching executive catering and luxury lifestyle management in Lagos.',
    },
    {
      year: '2021',
      title: 'Agro Solutions Expansion',
      desc: 'Acquired 100+ hectares of commercial farmland in Western & Middle-Belt regions to establish sustainable maize, cassava, and grain supply chains.',
    },
    {
      year: '2023',
      title: 'Entertainment & Production Scale',
      desc: 'Invested in high-definition concert line-array sound, P2.9 LED displays, and media production rigs, catering to major Nigerian festivals.',
    },
    {
      year: '2025',
      title: 'Modern Laundry & Logistics Network',
      desc: 'Commissioned automated dry-cleaning centers and motorized doorstep pickup fleets across Lagos and Abuja, completing the 4-pillar multi-sector model.',
    },
  ];

  return (
    <section id="about-section" className="py-24 sm:py-32 bg-slate-950 relative border-b border-slate-800/80">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight">
            The King Sheezy Standard
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Building Africa’s most trusted multi-sector enterprise through relentless operational excellence, innovation, and ethical stewardship.
          </p>
        </div>

        {/* Mission & Vision Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition-colors shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">Our Corporate Mission</h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {COMPANY_INFO.mission}
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 relative overflow-hidden group hover:border-purple-500/40 transition-colors shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">Our Corporate Vision</h3>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {COMPANY_INFO.vision}
            </p>
          </div>
        </div>

        {/* 5 Core Values */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">
                Pillars of Integrity & Value
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Guiding every transaction, event, crop cycle, and garment.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800 w-fit">
              5 Core Values
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COMPANY_INFO.coreValues.map((val, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-900 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Growth Timeline */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Our Journey of Strategic Growth
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              From dynamic beginnings to an integrated pan-African conglomerate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative space-y-2 group">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-amber-400 font-['Outfit']">
                    {m.year}
                  </span>
                  <div className="h-0.5 flex-1 bg-slate-800 group-hover:bg-amber-500/50 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Incorporated under the Companies and Allied Matters Act 1990 (Nigeria)</span>
            </div>
            <button
              id="about-catalog-trigger-btn"
              onClick={onOpenCatalog}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700"
            >
              <span>Explore Complete Rate Cards & Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
