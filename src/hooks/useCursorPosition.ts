import { useState, useEffect, useRef } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  isHovering: boolean;
  isTouch: boolean;
}

export function useCursorPosition(lerpFactor = 0.12): CursorPosition {
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Use refs for high-frequency RAF loop without excessive re-renders
  const targetPos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const currentPos = useRef({ x: targetPos.current.x, y: targetPos.current.y });
  const [pos, setPos] = useState<CursorPosition>({
    x: targetPos.current.x,
    y: targetPos.current.y,
    smoothX: targetPos.current.x,
    smoothY: targetPos.current.y,
    isHovering: false,
    isTouch: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch
    const checkTouch = () => {
      const touchDetected = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(touchDetected);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      if (!isHovering) {
        setIsHovering(true);
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    let lastUpdate = 0;

    const animate = (time: number) => {
      // Lerp smooth position
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      // Update state at reasonable throttle to avoid choking React while keeping Canvas responsive
      if (time - lastUpdate > 30) {
        setPos({
          x: targetPos.current.x,
          y: targetPos.current.y,
          smoothX: currentPos.current.x,
          smoothY: currentPos.current.y,
          isHovering: true,
          isTouch: false,
        });
        lastUpdate = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lerpFactor, isHovering]);

  return { ...pos, isTouch };
}
