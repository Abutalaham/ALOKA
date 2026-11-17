import React, { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'none';
  blur?: boolean;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  blur = true,
}) => {
  const { ref, isVisible } = useScrollReveal();

  const getTransform = () => {
    if (!isVisible) {
      if (direction === 'up') return 'translateY(36px)';
      return 'none';
    }
    return 'translateY(0)';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: blur ? (isVisible ? 'blur(0px)' : 'blur(8px)') : 'none',
        transform: getTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
export default SectionReveal;
