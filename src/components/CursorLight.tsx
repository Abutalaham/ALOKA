import React, { useEffect, useState } from 'react';

export const CursorLight: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [visible]);

  if (isTouch) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Central tiny star point */}
      <div className="relative -left-1 -top-1 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(168,85,247,0.8)] pointer-events-none" />

      {/* Soft ambient violet glow halo */}
      <div
        className="absolute -top-32 -left-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
        }}
      />
    </div>
  );
};
export default CursorLight;
