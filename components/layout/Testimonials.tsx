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
            The Brands We&apos;re Proud<br className="hidden sm:block" /> to Work With
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
        >
          {[
            { src: '/brand-logos/peak-activewear.png', alt: 'Peak Activewear', filter: '' },
            { src: '/brand-logos/thriveearth-transparent.png', alt: 'ThriveEarth Hydroseeding', filter: 'grayscale(1) invert(1)' },
            { src: '/brand-logos/nelson-chauke-properties.png', alt: 'Nelson Chauke Properties', filter: 'grayscale(1) invert(1)' },
            { src: '/brand-logos/jasonb.png', alt: 'Jason B Jewellery', filter: 'grayscale(1) invert(1)' },
          ].map(({ src, alt, filter }) => (
            <div key={alt} className="w-28 sm:w-32 h-10 sm:h-11 flex items-center justify-center">
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={filter ? { filter } : undefined}
              />
            </div>
          ))}
        </motion.div>

        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  );
}
