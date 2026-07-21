'use client';

import AnimatedStats from '@/components/ui/animated-stats';
import Section, { SectionHeader } from '@/components/ui/section';
import CTAButton from '@/components/ui/CTA_Button';
import { motion } from 'motion/react';

const stats = [
  { value: '150', suffix: '+', label: 'Projects Delivered' },
  { value: '95', suffix: '+', label: 'Performance Scores' },
  { value: '4.8', suffix: 'x', label: 'Average ROAS' },
  { value: '100', suffix: '%', label: 'Custom Built' },
];

export default function Statistics() {
  return (
    <Section className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <SectionHeader
            title="A Track Record Of Market Dominance"
            description="We let the numbers do the talking. Explore the strategies, campaigns and digital experiences that transformed ambitious goals into measurable business growth."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <CTAButton href="/case-studies" variant="secondary">
              See More Projects
            </CTAButton>
          </motion.div>
        </div>

        {/* Stats */}
        <AnimatedStats stats={stats} />
      </div>
    </Section>
  );
}
