import React from 'react';
import { ArrowRight } from 'lucide-react';
import RevealLayer from '../components/RevealLayer';

export const HeroSection: React.FC = () => {
  const scrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black select-none z-10"
      style={{ height: '100dvh' }}
    >
      {/* LAYER 1 & 2: Base Image + Cursor-following Spotlight Reveal Image */}
      <RevealLayer />

      {/* LAYER 3: Hero Headline (Upper-Middle Screen) */}
      <div className="absolute inset-x-0 top-[28%] md:top-[30%] -translate-y-1/2 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20">
        <h1 className="flex flex-col items-center tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          {/* Line 1 */}
          <span
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-light animate-blur-in"
            style={{ animationDelay: '150ms' }}
          >
            We turn{' '}
            <span className="font-display italic font-normal text-white">
              ideas
            </span>
          </span>

          {/* Line 2 */}
          <span
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-light animate-blur-in mt-1 sm:mt-2"
            style={{ animationDelay: '400ms' }}
          >
            into{' '}
            <span className="font-display italic font-normal text-white">
              light.
            </span>
          </span>
        </h1>
      </div>

      {/* LAYER 4: Bottom-Left Description */}
      <div
        className="hidden sm:block absolute bottom-8 md:bottom-12 left-6 md:left-14 max-w-[260px] text-left z-20 animate-fade-up pointer-events-auto"
        style={{ animationDelay: '650ms' }}
      >
        <p className="text-xs md:text-sm font-light text-white/80 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          At ALOKA, we bring ideas to life through technology, creativity and intelligent digital experiences. We build meaningful solutions that move businesses forward.
        </p>
      </div>

      {/* LAYER 5: Bottom-Right Description and CTA */}
      <div
        className="absolute bottom-8 md:bottom-12 right-6 md:right-14 max-w-[320px] flex flex-col items-start sm:items-end text-left sm:text-right z-20 animate-fade-up pointer-events-auto"
        style={{ animationDelay: '800ms' }}
      >
        <p className="text-xs md:text-sm font-light text-white/80 leading-relaxed mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          Every great creation begins with a spark. Discover how we combine creativity and technology to bring meaningful ideas to life.
        </p>

        <button
          onClick={scrollToServices}
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs md:text-sm font-medium tracking-wide text-white bg-purple-600/90 hover:bg-purple-500 border border-purple-400/30 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
        >
          <span>Explore What We Do</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
