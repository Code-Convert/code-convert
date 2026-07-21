'use client';

import { motion } from 'motion/react';
import Section, { SectionHeader } from '@/components/ui/section';

export default function ProcessTimeline() {
  const timelineData = [
    {
      week: 'Week 1',
      title: 'Communication & Strategy',
      description:
        'We communicate and understand your goals, market position, and growth objectives to craft a tailored strategy.',
    },
    {
      week: 'Week 2',
      title: 'Design & Development',
      description:
        'Our team designs and develops your solution with precision, ensuring every element aligns with your vision.',
    },
    {
      week: 'Week 3',
      title: 'Launch & Optimization',
      description:
        'Your solution is tested, optimized, and launched to market. We monitor performance and iterate for success.',
    },
  ];

  return (
    <Section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Our Process"
          title="The Code & Convert Blueprint"
          description="A proven 3-week framework that transforms your vision into market-ready solutions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step number circle */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FF1E1E] text-white font-bold flex items-center justify-center text-lg">
                  {index + 1}
                </div>
                <div className="text-[#FF1E1E] font-bold text-sm uppercase tracking-wider">
                  {item.week}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>

              {/* Connector line (hidden on last item) */}
              {index < timelineData.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(100%+1rem)] w-8 h-0.5 bg-gradient-to-r from-[#FF1E1E] to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
