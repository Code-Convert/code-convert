'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Loader from '@/components/Loader';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';
import Hero from '@/components/layout/Hero';
import Marquee from '@/components/layout/Marquee';
import SelectedWork from '@/components/layout/SelectedWork';
import Services from '@/components/layout/Services';
import Process from '@/components/layout/Process';
import Testimonials from '@/components/layout/Testimonials';
import CTA from '@/components/layout/CTA';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);
    
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
    });

    lenis.on('scroll', (e: any) => {
      window.dispatchEvent(new CustomEvent('app-scroll', {
        detail: {
          scroll: e.progress,
          scrollVel: e.velocity,
        }
      }));
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white overflow-x-hidden">
      <Loader />
      {isLoaded && (
        <>
          <VoidBackground />
          <InteractiveCursor />
          
          <div className="relative z-10">
            <Hero />
            <Marquee />
            <SelectedWork />
            <Services />
            <Process />
            <Testimonials />
            <CTA />
          </div>
        </>
      )}
    </div>
  );
}
