'use client';

import { motion } from 'motion/react';
import { TrendingUp, Calendar, Mail, CheckCircle2 } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="relative z-10 pt-12 pb-32 sm:pt-16 sm:pb-40 md:pt-24 md:pb-48 lg:pt-32 lg:pb-64 border-t border-white/03">
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
            <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 md:mb-7 bg-[#FF1E1E]/10 border border-[#FF1E1E]/20">
              <TrendingUp className="w-5 md:w-6 h-5 md:h-6 text-[#FF1E1E]" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4 px-2">
              Ready to multiply<br />your <span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">revenue</span>?
            </h2>
            <p className="text-body text-neutral-400 max-w-sm mx-auto mb-6 md:mb-9 font-bold px-2">
              Book a complimentary audit call. We'll dissect your current setup and outline actionable growth strategies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/contact-us" className="inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 text-[15px] font-bold rounded-full bg-[#FF1E1E] text-white hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,30,30,0.25),0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto">
                <Calendar className="w-3.5 md:w-4 h-3.5 md:h-4" />
                Book 1:1 Let's chat.
              </a>
              <a href="mailto:hello@codeandconvert.co.za" className="inline-flex items-center justify-center gap-2 px-5 md:px-7 py-3 md:py-3.5 text-[15px] font-bold rounded-full border border-white/10 text-white bg-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto">
                <Mail className="w-3.5 md:w-4 h-3.5 md:h-4" />
                hello@codeandconvert.co.za
              </a>
            </div>

            <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-5 flex-wrap px-2">
              {['Free Account Audit', 'Data-Driven Strategy', 'Transparent Reporting'].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                  <CheckCircle2 className="w-3 h-3 text-[#FF1E1E]" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
