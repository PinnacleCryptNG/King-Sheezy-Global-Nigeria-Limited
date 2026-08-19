import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'silver' | 'amber';
  showText?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'gold',
  showText = false,
  className = '',
}) => {
  // Dimensions for the icon
  const dimensions = {
    xs: { width: 24, height: 28, viewBox: '0 0 100 115' },
    sm: { width: 32, height: 38, viewBox: '0 0 100 115' },
    md: { width: 42, height: 48, viewBox: '0 0 100 115' },
    lg: { width: 56, height: 64, viewBox: '0 0 100 115' },
    xl: { width: 80, height: 92, viewBox: '0 0 100 115' },
  }[size];

  const gradientId = `sheezy-gold-grad-${size}-${variant}`;
  const crownGradId = `sheezy-crown-grad-${size}-${variant}`;
  const glowId = `sheezy-glow-${size}`;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Crowned Circle Shezy Emblem SVG */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={dimensions.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Rich Metallic Royal Gold Gradient */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Royal Crown Accent Gradient */}
          <linearGradient id={crownGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Subtle Inner Glow */}
          <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ================= ROYAL 5-POINT CROWN ================= */}
        <g id="crown" filter={`url(#${glowId})`}>
          {/* Crown Base Arch Band */}
          <path
            d="M26 31 C35 34, 65 34, 74 31 C72 34, 28 34, 26 31 Z"
            fill={`url(#${crownGradId})`}
          />
          <path
            d="M26 31.5 Q50 35 74 31.5 L73 34 Q50 37 27 34 Z"
            fill="#D97706"
          />

          {/* Crown Spikes & Peaks */}
          {/* Center Main Spike */}
          <polygon
            points="50,6 43,26 57,26"
            fill={`url(#${crownGradId})`}
          />
          {/* Center-Left Spike */}
          <polygon
            points="35,12 32,28 42,28"
            fill={`url(#${crownGradId})`}
          />
          {/* Center-Right Spike */}
          <polygon
            points="65,12 58,28 68,28"
            fill={`url(#${crownGradId})`}
          />
          {/* Far-Left Spike */}
          <polygon
            points="23,17 24,31 31,30"
            fill={`url(#${crownGradId})`}
          />
          {/* Far-Right Spike */}
          <polygon
            points="77,17 69,30 76,31"
            fill={`url(#${crownGradId})`}
          />

          {/* Crown Base Filigree Arches */}
          <path
            d="M24 31 C30 24, 38 24, 44 31 C46 22, 54 22, 56 31 C62 24, 70 24, 76 31 L74 33 C68 27, 62 27, 56 33 C54 26, 46 26, 44 33 C38 27, 30 27, 24 33 Z"
            fill={`url(#${gradientId})`}
          />

          {/* Crown Jewels (Diamond / Pearls on Tips) */}
          <circle cx="50" cy="5" r="3.2" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.8" />
          <polygon points="50,1.5 53,5 50,8.5 47,5" fill="#FEF08A" />

          <circle cx="35" cy="11" r="2.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.6" />
          <circle cx="65" cy="11" r="2.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.6" />

          <circle cx="23" cy="16" r="2" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.6" />
          <circle cx="77" cy="16" r="2" fill="#FFFFFF" stroke="#D97706" strokeWidth="0.6" />

          {/* Center Diamond on Crown Body */}
          <polygon points="50,15 54.5,22 50,28 45.5,22" fill="#FFFFFF" stroke="#B45309" strokeWidth="0.8" />
          <polygon points="50,17 53,22 50,26 47,22" fill={`url(#${gradientId})`} />
        </g>

        {/* ================= OUTER EMBLEM CIRCLE ================= */}
        {/* Outer Ring Thick Border */}
        <circle
          cx="50"
          cy="72"
          r="38"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          fill="#020617"
        />

        {/* Secondary Thin Inner Guide Ring */}
        <circle
          cx="50"
          cy="72"
          r="34"
          stroke={`url(#${crownGradId})`}
          strokeWidth="1.2"
          strokeDasharray="1 0"
          fill="none"
          opacity="0.85"
        />

        {/* ================= GEOMETRIC S-H-E-Z-Y MONOGRAM ================= */}
        {/* Central Vertical Spine / Divider ('H' / Center Pillar) */}
        <line
          x1="50"
          y1="39"
          x2="50"
          y2="105"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.6"
          strokeLinecap="square"
        />

        {/* Top-Left Quadrant: 'S' Shape */}
        <path
          d="M44 44 H25 C20 44, 18 48, 18 53 C18 58, 22 61, 28 61 H44 C44 61, 44 66, 44 68 H20 C18 68, 16 71, 16 71"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="miter"
          fill="none"
        />
        {/* S Inner Bars */}
        <line x1="22" y1="52" x2="44" y2="52" stroke={`url(#${gradientId})`} strokeWidth="3" />

        {/* Top-Right Quadrant: 'E' Shape */}
        <path
          d="M56 44 H76 C81 44, 83 47, 83 50"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="56" y1="56" x2="78" y2="56" stroke={`url(#${gradientId})`} strokeWidth="3.2" />
        <line x1="56" y1="68" x2="81" y2="68" stroke={`url(#${gradientId})`} strokeWidth="3.2" />

        {/* Bottom-Left Quadrant: 'Z' Shape */}
        <path
          d="M19 78 H44 L20 98 H44"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
        <line x1="26" y1="88" x2="38" y2="88" stroke={`url(#${gradientId})`} strokeWidth="2.2" opacity="0.8" />

        {/* Bottom-Right Quadrant: 'Y' Shape */}
        <path
          d="M56 78 L68 91 V104"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="square"
          fill="none"
        />
        <path
          d="M80 78 L68 91"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.2"
          strokeLinecap="square"
          fill="none"
        />

        {/* Subtle Center Gem Accent */}
        <circle cx="50" cy="72" r="2.2" fill="#FFFFFF" />
      </svg>

      {/* Optional Wordmark lockup */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base sm:text-lg font-black tracking-tight text-white font-['Outfit']">
              KING SHEEZY
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700 uppercase tracking-wider">
              GLOBAL
            </span>
          </div>
          <span className="text-[9px] tracking-widest text-slate-400 uppercase font-mono">
            RC 1894204 • CONGLOMERATE
          </span>
        </div>
      )}
    </div>
  );
};
