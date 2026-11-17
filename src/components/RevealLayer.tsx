import React, { useEffect, useRef, useState } from 'react';

const BASE_IMAGE_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';

const REVEAL_IMAGE_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const SPOTLIGHT_R = 260;

export const RevealLayer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);

  const [baseLoaded, setBaseLoaded] = useState(false);
  const [revealLoaded, setRevealLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Center coordinates as initial positions
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight * 0.45;

    const mouse = { x: initialX, y: initialY };
    const smooth = { x: initialX, y: initialY };
    let isMouseActive = false;
    let lastMouseMove = performance.now();
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      isMouseActive = true;
      lastMouseMove = performance.now();
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const updateMask = (time: number) => {
      const targetElement = revealLayerRef.current;
      if (targetElement) {
        // If on touch device or mouse inactive for > 2.5s, use graceful ambient floating motion
        const timeSinceMove = performance.now() - lastMouseMove;
        if (isTouchDevice || (!isMouseActive && timeSinceMove > 2500)) {
          const t = time * 0.0008;
          const boundsWidth = containerRef.current?.clientWidth || window.innerWidth;
          const boundsHeight = containerRef.current?.clientHeight || window.innerHeight;

          const ambientTargetX = boundsWidth * 0.5 + Math.sin(t * 1.1) * (boundsWidth * 0.22);
          const ambientTargetY = boundsHeight * 0.45 + Math.cos(t * 0.8) * (boundsHeight * 0.18);

          mouse.x = ambientTargetX;
          mouse.y = ambientTargetY;
        }

        // Smooth position interpolation
        const lerpFactor = prefersReducedMotion ? 0.3 : 0.1;
        smooth.x += (mouse.x - smooth.x) * lerpFactor;
        smooth.y += (mouse.y - smooth.y) * lerpFactor;

        // Radial mask with exact feathered stops
        // 0%: 100%, 40%: 100%, 60%: 75%, 75%: 40%, 88%: 12%, 100%: 0%
        const maskGradient = `radial-gradient(circle ${SPOTLIGHT_R}px at ${smooth.x.toFixed(1)}px ${smooth.y.toFixed(1)}px, #000 0%, #000 40%, rgba(0, 0, 0, 0.75) 60%, rgba(0, 0, 0, 0.40) 75%, rgba(0, 0, 0, 0.12) 88%, transparent 100%)`;

        targetElement.style.webkitMaskImage = maskGradient;
        targetElement.style.maskImage = maskGradient;
      }

      animId = requestAnimationFrame(updateMask);
    };

    animId = requestAnimationFrame(updateMask);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black"
    >
      {/* Fallback cosmic gradient if images are loading or encounter network error */}
      {(!baseLoaded || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0614] via-[#040208] to-[#030303] z-0" />
      )}

      {/* Hidden preloader images for graceful loading & error checking */}
      <img
        src={BASE_IMAGE_URL}
        alt=""
        className="hidden"
        onLoad={() => setBaseLoaded(true)}
        onError={() => setHasError(true)}
      />
      <img
        src={REVEAL_IMAGE_URL}
        alt=""
        className="hidden"
        onLoad={() => setRevealLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* LAYER 1: Base Image (Cinematic Zoom-out) */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          baseLoaded ? 'opacity-100 animate-hero-zoom' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url("${BASE_IMAGE_URL}")`,
          willChange: 'transform',
        }}
      />

      {/* LAYER 2: Reveal Image with dynamic cursor spotlight mask */}
      <div
        ref={revealLayerRef}
        className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
          revealLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url("${REVEAL_IMAGE_URL}")`,
          willChange: 'mask-image, -webkit-mask-image',
        }}
      />

      {/* Cinematic Vignette & Readability Gradient Overlays */}
      {/* Top gradient for Navbar contrast */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none z-10" />

      {/* Bottom gradient for hero descriptions and CTA contrast */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

      {/* Subtle radial ambient glow at center to tie in with ALOKA cosmic violet identity */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 65%)',
        }}
      />
    </div>
  );
};

export default RevealLayer;
