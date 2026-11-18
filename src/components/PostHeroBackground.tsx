import React, { useEffect, useState } from 'react';
import Antigravity from './Antigravity';
import './PostHeroBackground.css';

export const PostHeroBackground: React.FC = () => {
  const [hasReachedServices, setHasReachedServices] = useState(false);

  useEffect(() => {
    const services = document.getElementById('services');
    if (!services) {
      console.error('Unable to start the Antigravity background: #services was not found.');
      return;
    }

    if (services.getBoundingClientRect().top <= window.innerHeight) {
      setHasReachedServices(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasReachedServices(true);
        observer.disconnect();
      }
    });
    observer.observe(services);

    return () => observer.disconnect();
  }, []);

  if (!hasReachedServices) return null;

  return (
    <div className="post-hero-antigravity" aria-hidden="true">
      <Antigravity
        colors={['#5227FF', '#FF9FFC', '#B497CF']}
        count={1500}
        magnetRadius={9}
        ringRadius={7}
        particleSize={0.9}
        autoAnimate
        colorMode="conic"
        colorSpeed={0.05}
        particleShape="capsule"
        particleVariance={1}
        fieldStrength={10}
        waveAmplitude={1}
        waveCount={3}
        waveSpeed={0.4}
        rotationSpeed={0}
        pulseSpeed={3}
        depthFactor={1}
        ambient={0.25}
        lerpSpeed={0.05}
        interactive
        clickBurst
        intro
        lightMode={false}
      />
    </div>
  );
};

export default PostHeroBackground;
