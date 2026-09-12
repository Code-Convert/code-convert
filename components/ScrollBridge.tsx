'use client';

import { useEffect } from 'react';

export default function ScrollBridge() {
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const currentY = window.scrollY;
      const velocity = (currentY - lastY) / dt;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? currentY / totalScroll : 0;

      window.dispatchEvent(new CustomEvent('app-scroll', {
        detail: { scroll: progress, scrollVel: velocity },
      }));

      lastY = currentY;
      lastTime = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
