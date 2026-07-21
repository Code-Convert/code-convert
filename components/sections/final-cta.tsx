'use client';

import { motion } from 'motion/react';
import CTAButton from '@/components/ui/CTA_Button';
import Section from '@/components/ui/section';

export default function FinalCTA() {
  return (
    <Section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-linear-to-r from-[#FF1E1E]/20 via-[#FF1E1E]/10 to-[#FF1E1E]/20 blur-3xl" />

          {/* CTA Card */}
          <div className="relative p-8 md:p-12 lg:p-16 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Get Your Scaling Strategy
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              From idea to investment, MVP to market. We adapt to your goals and build around what your product truly needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <CTAButton href="/contact-us" variant="primary">
                Book 1:1 Meeting
              </CTAButton>

              <CTAButton href="/contact-us" variant="secondary">
                Request A Callback
              </CTAButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
