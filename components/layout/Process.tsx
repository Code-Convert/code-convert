'use client';

import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We start with your business, your objectives, your audience and the challenges standing in the way.',
    timeline: 'GET THE FULL PICTURE'
  },
  {
    number: '02',
    title: 'Strategise',
    description: 'We identify the priorities, opportunities and channels that will have the greatest impact — then turn them into an actionable plan.',
    timeline: 'SET THE DIRECTION'
  },
  {
    number: '03',
    title: 'Execute',
    description: 'We put the plan into motion, from websites and campaigns to content, creative and customer communications.',
    timeline: 'MAKE IT HAPPEN'
  },
  {
    number: '04',
    title: 'Grow',
    description: 'We review what\'s working, identify what\'s not and make informed adjustments to keep your marketing moving in the right direction.',
    timeline: 'KEEP GETTING BETTER',
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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-bold tracking-wide uppercase border border-white/20 bg-white/[0.02] text-white/60 mb-4 md:mb-5 mx-auto"
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
            A Smarter Way To Do Marketing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body text-neutral-400 font-bold max-w-xl mx-auto px-4"
          >
            We keep the process focused, collaborative and practical — bringing strategy, creative and execution together so every piece of marketing has a clear purpose.
          </motion.p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory sm:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group backdrop-blur-[16px] rounded-2xl p-4 md:p-5 lg:p-6 relative hover:-translate-y-[2px] transition-all duration-400 flex-none w-[78vw] sm:w-auto snap-start sm:snap-align-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,30,30,0.07) 0%, rgba(5,5,5,0.5) 60%)',
                border: '1px solid rgba(255,30,30,0.18)',
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
                <div className={`w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center text-small font-bold ${step.highlight ? 'bg-[#FF1E1E] text-white shadow-[0_0_20px_rgba(255,30,30,0.5)]' : 'bg-[#FF1E1E]/15 border border-[#FF1E1E]/35 text-[#FF1E1E]'}`}>
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-[linear-gradient(90deg,rgba(255,30,30,0.3),transparent)]" />
                )}
              </div>
              {step.highlight ? (
                <h3 className="mb-2">
                  <span
                    className="block w-full px-4 py-1.5 rounded-lg text-h3 font-bold uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #7B5E00 0%, #C8960C 20%, #FFD700 40%, #FFFACD 55%, #DAA520 75%, #7B5E00 100%)',
                      color: '#1a0e00',
                      letterSpacing: '0.08em',
                      boxShadow: '0 2px 12px rgba(255,215,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    {step.title}
                  </span>
                </h3>
              ) : (
                <h3 className="mb-2">
                  <span
                    className="block w-full px-4 py-1.5 rounded-lg text-h3 font-bold uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #4a4a4a 0%, #9a9a9a 20%, #d8d8d8 40%, #ffffff 55%, #b0b0b0 75%, #4a4a4a 100%)',
                      color: '#1a1a1a',
                      letterSpacing: '0.08em',
                      boxShadow: '0 2px 12px rgba(200,200,200,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                    }}
                  >
                    {step.title}
                  </span>
                </h3>
              )}
              <p className="text-small text-neutral-400 font-bold leading-relaxed">{step.description}</p>
              <span className="mt-4 inline-flex items-center text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md text-white/60 bg-white/[0.07] border border-white/[0.12]">
                {step.timeline}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
