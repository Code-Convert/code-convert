'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import AnimatedStats from '@/components/ui/animated-stats';

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as any }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as any }
};

export default function Hero() {
  const stats = [
    { value: '30', suffix: '+', label: 'Custom Full-Stack Builds' },
    { value: '24', suffix: '/7', label: 'Automated Lead Capture' },
    { value: '94', suffix: '%', label: 'Client Retention' },
    { value: '100', suffix: '%', label: 'Built to Convert Leads' },
  ];

  return (
    <section className="relative z-10 min-h-screen flex items-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')]" id="hero">
      <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full blur-3xl bg-[#FF1E1E]/2.5" />
      <div className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full blur-3xl bg-[#FF1E1E]/2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            {...scaleIn}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase border border-[#FF1E1E]/15 bg-[#FF1E1E]/5 text-[#FF1E1E] mb-6 md:mb-8"
          >
            We Build, Market & Scale Digital Brands.
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] mb-5 md:mb-7 drop-shadow-[0_4px_32px_rgba(0,0,0,1)] text-[#FFFFFF] px-2"
          >
            Transforming First Impressions<br />
            into <span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,30,30,0.8)]">Profitable Actions</span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 } as any}
            className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-lg mx-auto mb-6 md:mb-8 lg:mb-10 font-bold drop-shadow-[0_4px_24px_rgba(0,0,0,1)] text-shadow-sm px-4"
          >
            Elite web architecture designed with one objective: maximizing your conversion rate through data-backed design and psychological triggers.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 } as any}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            <a href="#work" className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold rounded-full bg-[#FF1E1E] text-white hover:bg-white hover:text-[#050505] hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,30,30,0.15)] group">
              View Case Studies
              <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-24">
          <AnimatedStats stats={stats} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-white/8 flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
