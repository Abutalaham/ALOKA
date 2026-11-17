import React from 'react';
import CosmicBackground from './components/CosmicBackground';
import CursorLight from './components/CursorLight';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import AboutSection from './sections/AboutSection';
import ProcessSection from './sections/ProcessSection';
import WorkSection from './sections/WorkSection';
import InsightsSection from './sections/InsightsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-purple-600/30 selection:text-purple-200">
      {/* 1. Global Cosmic Background Canvas with interactive stars & trails */}
      <CosmicBackground />

      {/* 2. Cursor-following light glow & particles */}
      <CursorLight />

      {/* 3. Fixed Navigation Bar */}
      <Navbar />

      {/* 4. Page Sections with continuous cosmic depth */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <WorkSection />
        <InsightsSection />
        <ContactSection />
      </main>

      {/* 5. Minimal Dark Cosmic Footer */}
      <Footer />
    </div>
  );
};

export default App;
