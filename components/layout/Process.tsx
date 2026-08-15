'use client';

import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Audit & Strategy',
    description: 'We deep-dive into your analytics, past campaigns, and competitors to map out a clear growth trajectory.',
    timeline: 'Week 1'
  },
  {
    number: '02',
    title: 'Setup & Tracking',
    description: 'Fixing the plumbing. We ensure attribution is flawless and tracking pixels capture every user action accurately.',
    timeline: 'Week 2'
  },
  {
    number: '03',
    title: 'Launch & Test',
    description: 'Deploying initial campaigns, rapid creative testing, and gathering structural data to find winning angles.',
    timeline: 'Week 3–4'
  },
  {
    number: '04',
    title: 'Scale & Optimize',
    description: 'Cutting losers and scaling winners. Continuous CRO and budget allocation towards the highest ROAS channels.',
    timeline: 'Ongoing ✓',
    highlight: true
  }
];

export default function Process() {
  return (
    <section id="method" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-bold tracking-wide uppercase border border-white/5 bg-white/[0.02] text-white/40 mb-4 md:mb-5 mx-auto"
          >
            Our Method
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-h2 font-bold tracking-tight mb-3 md:mb-4 px-4"
          >
            The blueprint to<br /><span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">profitable scale</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#050505]/40 border border-white/5 backdrop-blur-[16px] rounded-2xl p-4 md:p-5 lg:p-6 relative hover:bg-[#050505]/60 hover:border-[#FF1E1E]/10 hover:-translate-y-[2px] transition-all duration-400"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
                <div className={`w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center text-small font-bold ${step.highlight ? 'bg-[#FF1E1E] text-white shadow-[0_0_15px_rgba(255,30,30,0.4)]' : 'bg-[#FF1E1E]/10 border border-[#FF1E1E]/20 text-[#FF1E1E]'}`}>
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-[linear-gradient(90deg,rgba(255,30,30,0.15),transparent)]" />
                )}
              </div>
              <h3 className="text-h3 font-bold tracking-tight mb-2">{step.title}</h3>
              <p className="text-small text-neutral-500 leading-relaxed">{step.description}</p>
              <div className={`mt-4 text-[10px] uppercase tracking-widest font-bold ${step.highlight ? 'text-[#FF1E1E]' : 'text-neutral-600'}`}>
                {step.timeline}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
