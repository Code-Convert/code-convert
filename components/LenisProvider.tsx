'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';

const VoidBackground = dynamic(() => import('@/components/VoidBackground'), { ssr: false });
const InteractiveCursor = dynamic(() => import('@/components/InteractiveCursor'), { ssr: false });

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.0, smoothWheel: true });

      lenis.on('scroll', (e: any) => {
        window.dispatchEvent(new CustomEvent('app-scroll', {
          detail: { scroll: e.progress, scrollVel: e.velocity },
        }));
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => lenis?.destroy();
  }, []);

  return (
    <div className="relative selection:bg-[#FF1E1E]/20 selection:text-white overflow-x-hidden">
      <Loader />
      <VoidBackground />
      <InteractiveCursor />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
