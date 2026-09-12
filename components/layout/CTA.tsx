'use client';

import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-white/[0.03]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,30,30,0.025),transparent_60%)] -z-10" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#050505]/60 border border-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl bg-[#FF1E1E]/5" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl bg-[#FF1E1E]/5" />

          <div className="relative">
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-bold tracking-wide uppercase border border-white/20 bg-white/[0.02] text-white/60 mb-5 md:mb-7">
              Ready When You Are
            </div>

            {/* Headline */}
            <h2 className="text-h2 font-bold tracking-tight mb-3 md:mb-4 px-2">
              Your Next Move Starts <span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">HERE.</span>
            </h2>

            {/* Body */}
            <p className="text-body text-neutral-400 font-bold max-w-lg mx-auto mb-6 md:mb-9 px-2">
              Whether you need a new website, a stronger digital presence or a traditional marketing partner to take the reins, let&apos;s talk about what&apos;s next for your business.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 text-body font-bold rounded-full bg-[#FF1E1E] text-white hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,30,30,0.25),0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
              >
                Let&apos;s Talk
                <ArrowRight className="w-3.5 md:w-4 h-3.5 md:h-4" />
              </a>
              <a
                href="mailto:info@codeconvert.co.za"
                className="inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 text-body font-bold rounded-full border border-white/10 text-white bg-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
              >
                <Mail className="w-3.5 md:w-4 h-3.5 md:h-4" />
                info@codeconvert.co.za
              </a>
            </div>

            {/* Service tags */}
            <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3 flex-wrap px-2">
              {['Web Development', 'E-Commerce', 'Digital + Traditional Marketing'].map((text, i, arr) => (
                <span key={text} className="flex items-center gap-2 md:gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">{text}</span>
                  {i < arr.length - 1 && <span className="text-neutral-700 text-[10px]">·</span>}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
