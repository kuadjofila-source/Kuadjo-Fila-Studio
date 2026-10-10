import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmarkInside?: boolean;
  className?: string;
}

/**
 * Exact high-resolution vector reproduction of the official Kuadjo Fila Studio logo
 * featuring the gold-framed deep navy emblem, interlocked serif 'KF' monogram,
 * and 'KUADJO FILA STUDIO' gold typography.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showWordmarkInside = false,
  className = '',
}) => {
  const dimensions = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-20 h-16',
    xl: 'w-44 h-36',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-sm shadow-md ${dimensions} ${className}`}
      aria-label="Kuadjo Fila Studio Official Logo"
    >
      <svg
        viewBox="0 0 640 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Outer Gold Frame Gradient */}
          <linearGradient id="kfFrameGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9A6F28" />
            <stop offset="30%" stopColor="#C99E46" />
            <stop offset="55%" stopColor="#F3D078" />
            <stop offset="80%" stopColor="#C89B42" />
            <stop offset="100%" stopColor="#A67A2E" />
          </linearGradient>

          {/* Monogram Metallic Gold Gradient */}
          <linearGradient id="kfMonogramGold" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#B88938" />
            <stop offset="25%" stopColor="#DFB65B" />
            <stop offset="50%" stopColor="#F8DF95" />
            <stop offset="75%" stopColor="#D2A54A" />
            <stop offset="100%" stopColor="#AC7E30" />
          </linearGradient>
        </defs>

        {/* Gold Outer Border */}
        <rect width="640" height="500" fill="url(#kfFrameGold)" />

        {/* Deep Navy Blue Inner Canvas (#0D1D45) */}
        <rect x="28" y="24" width="584" height="452" fill="#0D1D45" />

        {/* Interlocked Serif 'KF' Monogram */}
        <g fill="url(#kfMonogramGold)">
          {/* Left Vertical Stem of K */}
          <path d="M188 122 H286 V128 C261 129 254 137 254 162 V282 C254 307 261 315 286 316 V322 H188 V316 C213 315 220 307 220 282 V162 C220 137 213 129 188 128 Z" />

          {/* Upper Right Diagonal Arm of K (Sweeping across to top of F) */}
          <path d="M308 122 H410 V128 C392 129 376 136 355 153 L254 234 L254 212 L336 144 C347 135 344 128 322 128 H308 Z" />

          {/* Lower Right Diagonal Leg of K (Interlocked behind F stem with stencil gap) */}
          <path d="M254 222 L330 278 V310 L254 246 Z" />
          <path d="M376 300 L414 313 C424 316 433 316 442 316 V322 H396 C386 322 379 318 376 312 Z" />

          {/* Vertical Stem of F (With diagonal stencil cut at top where K arm passes) */}
          <path d="M372 152 L336 180 V282 C336 307 328 315 304 316 V322 H408 V316 C380 315 372 307 372 282 Z" />

          {/* Top Horizontal Bar & Serif Beak of F */}
          <path d="M415 122 H478 L483 168 H476 C470 144 456 135 426 135 H415 Z" />

          {/* Middle Horizontal Crossbar & Serif of F */}
          <path d="M372 214 H424 C441 214 446 206 448 192 H454 V250 H448 C446 236 441 228 424 228 H372 Z" />
        </g>

        {/* Bottom 'KUADJO FILA STUDIO' Gold Serif Wordmark */}
        {showWordmarkInside && (
          <text
            x="320"
            y="404"
            textAnchor="middle"
            fill="url(#kfMonogramGold)"
            fontFamily="Fraunces, Georgia, serif"
            fontWeight="600"
            fontSize="38"
            letterSpacing="3"
          >
            KUADJO FILA STUDIO
          </text>
        )}
      </svg>
    </div>
  );
};
