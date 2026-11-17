import React, { useState } from 'react';

interface StarParticleProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isHovered?: boolean;
  className?: string;
  glowColor?: string;
}

export const StarParticle: React.FC<StarParticleProps> = ({
  size = 'md',
  isHovered = false,
  className = '',
  glowColor = 'rgba(168, 85, 247, 0.8)',
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered || internalHover;

  const sizeDimensions = {
    sm: { box: 'w-4 h-4', svg: 16, core: 3 },
    md: { box: 'w-6 h-6', svg: 24, core: 5 },
    lg: { box: 'w-8 h-8', svg: 32, core: 7 },
    xl: { box: 'w-12 h-12', svg: 48, core: 10 },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-500 ${sizeDimensions.box} ${
        active ? 'scale-125' : 'scale-100'
      } ${className}`}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
    >
      {/* Soft radial glow aura */}
      <div
        className={`absolute rounded-full transition-all duration-700 pointer-events-none ${
          active ? 'opacity-100 scale-175' : 'opacity-20 scale-100'
        }`}
        style={{
          width: '240%',
          height: '240%',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(139, 92, 246, 0.25) 45%, transparent 70%)`,
        }}
      />

      {/* SVG Celestial 4-Point Star with soft rays */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full transition-all duration-500 ${
          active ? 'text-white drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] rotate-45' : 'text-purple-300/80 drop-shadow-[0_0_4px_rgba(168,85,247,0.3)]'
        }`}
      >
        {/* Diamond 4-point star path */}
        <path
          d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z"
          fill="currentColor"
        />
        {/* Center bright core */}
        <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
      </svg>

      {/* Radiating micro-sparkles on active */}
      {active && (
        <>
          <span
            className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-white animate-ping"
            style={{ animationDuration: '1.2s' }}
          />
          <span
            className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full bg-purple-300 animate-ping"
            style={{ animationDuration: '1.6s', animationDelay: '0.2s' }}
          />
        </>
      )}
    </div>
  );
};
export default StarParticle;
