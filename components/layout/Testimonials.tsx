'use client';

import { motion } from 'motion/react';
import TestimonialsGrid from '@/components/ui/testimonials-grid';
import type { CaseStudy } from '@/types/case-study';

interface TestimonialsProps {
  testimonials: CaseStudy[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="partners" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-white/3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-bold tracking-wide uppercase border border-white/20 bg-white/2 text-white/60 mb-4 md:mb-5 mx-auto"
          >
            Partners
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-h2 font-bold tracking-tight mb-3 md:mb-4 px-4"
          >
            The Brands We&apos;re Proud<br className="hidden sm:block" /><span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent"> to Work With</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
        >
          <img
            src="/brand-logos/peak-activewear.png"
            alt="Peak Activewear"
            className="h-8 sm:h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
          <img
            src="/brand-logos/thriveearth-transparent.png"
            alt="ThriveEarth Hydroseeding"
            className="h-11 sm:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'grayscale(1) invert(1)' }}
          />
          <img
            src="/brand-logos/nelson-chauke-properties.png"
            alt="Nelson Chauke Properties"
            className="h-8 sm:h-9 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'grayscale(1) invert(1)' }}
          />
          <img
            src="/brand-logos/jasonb.png"
            alt="Jason B Jewellery"
            className="h-7 sm:h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{ filter: 'grayscale(1) invert(1)' }}
          />
        </motion.div>

        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  );
}
