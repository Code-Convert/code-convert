'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import CTAButton from '@/components/ui/CTA_Button';

export default function ServicesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] bg-black overflow-hidden pt-32 pb-24">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full blur-3xl bg-[#FF1E1E]/2.5" />
      <div className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full blur-3xl bg-[#FF1E1E]/2" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text Content */}
          <div className="space-y-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl lg:text-6xl font-bold text-white leading-tight"
            >
              Web Development & Social Media Services
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              We combine strategic design, high-conversion development, and data-driven marketing to help ambitious brands grow beyond their competition.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <CTAButton href="/contact-us" variant="primary">
                Book Your Free Strategy Session 
              </CTAButton>
              <CTAButton href="#gallery-grid" variant="secondary">
                View Our Work
              </CTAButton>
            </motion.div>
          </div>

          {/* RIGHT: Stats or Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-[#FF1E1E] mb-2">150+</div>
                <p className="text-gray-400">Projects Delivered</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-[#FF1E1E] mb-2">95%</div>
                <p className="text-gray-400">Performance Scores</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-[#FF1E1E] mb-2">4.8x</div>
                <p className="text-gray-400">Average ROAS</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-[#FF1E1E] mb-2">100%</div>
                <p className="text-gray-400">Custom Built</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
