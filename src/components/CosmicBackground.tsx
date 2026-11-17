import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  baseRadius: number;
  currentRadius: number;
  baseAlpha: number;
  currentAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  glowColor: string;
  layer: number; // 1, 2, 3 for parallax depth
  driftVx: number;
  driftVy: number;
  isAwakened: boolean;
  awakenedTimer: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  decay: number;
  color: string;
}

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Viewport dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive star count
    const starCount = prefersReducedMotion ? 60 : isMobile ? 85 : 190;

    // Cursor state tracked directly in ref/closure
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isMoving: false,
      lastMoveTime: 0,
      prevX: -1000,
      prevY: -1000,
    };

    // Arrays
    const stars: Star[] = [];
    const particles: SparkleParticle[] = [];
    const pulseWaves: PulseWave[] = [];

    // Color palettes for stars
    const starColors = [
      { core: '#ffffff', glow: 'rgba(255, 255, 255, 0.6)' },
      { core: '#ffffff', glow: 'rgba(168, 85, 247, 0.7)' },
      { core: '#e9d5ff', glow: 'rgba(192, 132, 252, 0.8)' },
      { core: '#c4b5fd', glow: 'rgba(139, 92, 246, 0.75)' },
      { core: '#bfdbfe', glow: 'rgba(96, 165, 250, 0.65)' },
    ];

    // Initialize stars with stable pseudo-random distribution
    for (let i = 0; i < starCount; i++) {
      const palette = starColors[i % starColors.length];
      const layer = (i % 3) + 1; // 1: distant, 2: mid, 3: close
      const baseRadius = layer === 1 ? 0.6 + Math.random() * 0.5 : layer === 2 ? 1.0 + Math.random() * 0.7 : 1.6 + Math.random() * 1.0;
      const baseAlpha = layer === 1 ? 0.2 + Math.random() * 0.25 : layer === 2 ? 0.35 + Math.random() * 0.3 : 0.6 + Math.random() * 0.35;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius,
        currentRadius: baseRadius,
        baseAlpha,
        currentAlpha: baseAlpha,
        twinkleSpeed: 0.008 + Math.random() * 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        color: palette.core,
        glowColor: palette.glow,
        layer,
        driftVx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.04 * layer,
        driftVy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.04 * layer,
        isAwakened: false,
        awakenedTimer: 0,
      });
    }

    // Spawn sparkles at position
    const spawnSparkles = (x: number, y: number, count = 3, spread = 1.2, baseColor = '#c084fc') => {
      if (prefersReducedMotion) return;
      for (let i = 0; i < count; i++) {
        if (particles.length > 80) break; // Keep cap for strict 60fps
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * spread;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 0.8 + Math.random() * 1.6,
          alpha: 0.8 + Math.random() * 0.2,
          decay: 0.018 + Math.random() * 0.02,
          color: baseColor,
        });
      }
    };

    // Resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Rescale star positions proportionally
      const scaleX = newWidth / width;
      const scaleY = newHeight / height;

      stars.forEach((star) => {
        star.x *= scaleX;
        star.y *= scaleY;
      });

      width = canvas.width = newWidth;
      height = canvas.height = newHeight;
    };

    // Mouse movement
    let moveCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;
      mouse.lastMoveTime = performance.now();

      // Emit tiny sparkles around cursor while moving (throttled)
      moveCounter++;
      if (moveCounter % 3 === 0) {
        const offsetAngle = Math.random() * Math.PI * 2;
        const offsetDist = Math.random() * 14;
        const px = e.clientX + Math.cos(offsetAngle) * offsetDist;
        const py = e.clientY + Math.sin(offsetAngle) * offsetDist;
        spawnSparkles(px, py, 1, 0.6, Math.random() > 0.5 ? '#d8b4fe' : '#93c5fd');
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Ambient constellation pulse timer for mobile / idle
    let ambientPulseTimer = 0;
    let animId: number;

    // Main animation loop
    const render = () => {
      // Clear with true deep black #030303
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Check if mouse stopped moving recently
      if (performance.now() - mouse.lastMoveTime > 200) {
        mouse.isMoving = false;
      }

      // 1. Draw subtle cursor spotlight glow
      if (mouse.x > -500 && mouse.y > -500) {
        const glowRadius = isMobile ? 180 : 260;
        const spotlightGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );
        spotlightGradient.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
        spotlightGradient.addColorStop(0.35, 'rgba(139, 92, 246, 0.04)');
        spotlightGradient.addColorStop(0.7, 'rgba(96, 165, 250, 0.015)');
        spotlightGradient.addColorStop(1, 'rgba(3, 3, 3, 0)');

        ctx.fillStyle = spotlightGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Ambient pulse trigger for idle / mobile
      ambientPulseTimer += 0.016;
      if (ambientPulseTimer > 4.5) {
        ambientPulseTimer = 0;
        // Awaken 1 random star gently
        if (stars.length > 0) {
          const randomStar = stars[Math.floor(Math.random() * stars.length)];
          pulseWaves.push({
            x: randomStar.x,
            y: randomStar.y,
            radius: 2,
            maxRadius: 28,
            alpha: 0.5,
            decay: 0.012,
            color: 'rgba(168, 85, 247, 0.6)',
          });
          spawnSparkles(randomStar.x, randomStar.y, 2, 0.8, '#c084fc');
        }
      }

      // 3. Update & render pulse waves
      for (let i = pulseWaves.length - 1; i >= 0; i--) {
        const wave = pulseWaves[i];
        wave.radius += 0.8;
        wave.alpha -= wave.decay;

        if (wave.alpha <= 0 || wave.radius >= wave.maxRadius) {
          pulseWaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(168, 85, 247, ${wave.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Update & render stars
      const proximityThreshold = isMobile ? 85 : 125;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Automatic gentle drifting
        if (!prefersReducedMotion) {
          star.x += star.driftVx;
          star.y += star.driftVy;

          // Wrap edges smoothly
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = (Math.sin(star.twinklePhase) + 1) * 0.5; // 0 to 1
        let targetAlpha = star.baseAlpha * (0.65 + twinkleFactor * 0.35);
        let targetRadius = star.baseRadius * (0.85 + twinkleFactor * 0.25);
        let isNearCursor = false;
        let proximityRatio = 0;

        // Proximity calculation with cursor
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = mouse.x - star.x;
          const dy = mouse.y - star.y;
          const dist = Math.hypot(dx, dy);

          if (dist < proximityThreshold) {
            isNearCursor = true;
            proximityRatio = 1 - dist / proximityThreshold; // 0 (outer) to 1 (center)

            // Awaken star!
            targetAlpha = Math.min(1.0, star.baseAlpha + proximityRatio * 0.7);
            targetRadius = star.baseRadius * (1 + proximityRatio * 1.8);

            // If entering very close zone (< 45px) and not yet awakened, trigger pulse & sparkles
            if (dist < 45 && !star.isAwakened) {
              star.isAwakened = true;
              spawnSparkles(star.x, star.y, 4, 1.4, star.color);
              pulseWaves.push({
                x: star.x,
                y: star.y,
                radius: targetRadius,
                maxRadius: 36,
                alpha: 0.6,
                decay: 0.02,
                color: star.glowColor,
              });
            }
          }
        }

        if (!isNearCursor && star.isAwakened) {
          star.awakenedTimer++;
          if (star.awakenedTimer > 20) {
            star.isAwakened = false;
            star.awakenedTimer = 0;
          }
        }

        // Smoothly interpolate current radius and alpha
        star.currentRadius += (targetRadius - star.currentRadius) * 0.15;
        star.currentAlpha += (targetAlpha - star.currentAlpha) * 0.15;

        // Render soft halo/glow for awakened or close stars
        if (proximityRatio > 0.15 || star.isAwakened) {
          const haloRadius = star.currentRadius * 4.5 + proximityRatio * 12;
          const haloGrad = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            haloRadius
          );
          haloGrad.addColorStop(0, `rgba(168, 85, 247, ${proximityRatio * 0.45})`);
          haloGrad.addColorStop(0.5, `rgba(192, 132, 252, ${proximityRatio * 0.2})`);
          haloGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star core
        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(1, star.currentAlpha));
        ctx.fillStyle = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, Math.max(0.5, star.currentRadius), 0, Math.PI * 2);
        ctx.fill();

        // Extra central sparkle glint for close stars
        if (proximityRatio > 0.4 || star.currentRadius > 2.2) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + proximityRatio * 0.4})`;
          ctx.lineWidth = 0.7;
          const crossSize = star.currentRadius * 2.2;
          ctx.beginPath();
          ctx.moveTo(star.x - crossSize, star.y);
          ctx.lineTo(star.x + crossSize, star.y);
          ctx.moveTo(star.x, star.y - crossSize);
          ctx.lineTo(star.x, star.y + crossSize);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 5. Update & render cursor sparkles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{
        backgroundColor: '#030303',
      }}
      aria-hidden="true"
    />
  );
};
export default CosmicBackground;
