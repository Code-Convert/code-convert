'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Testimonial {
  id: string;
  testimonial_text: string;
  testimonial_author: string;
  testimonial_role: string;
  client: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const supabase = createClient();
      const { data } = await supabase
        .from('case_studies')
        .select('id, testimonial_text, testimonial_author, testimonial_role, client')
        .eq('published', true)
        .not('testimonial_text', 'is', null)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  return (
    <section id="partners" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase border border-white/5 bg-white/[0.02] text-white/40 mb-4 md:mb-5 mx-auto"
          >
            Partners
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4 px-4"
          >
            Trusted by<br /><span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">industry leaders</span>
          </motion.h2>
        </div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8 lg:gap-14 mb-10 sm:mb-12 md:mb-16"
        >
          {testimonials.map((t) => (
            <span key={t.id} className="text-base md:text-lg font-bold tracking-tighter text-neutral-500 hover:text-white transition-colors cursor-pointer capitalize">
              {t.client}
            </span>
          ))}
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#050505]/40 border border-white/5 backdrop-blur-[16px] rounded-2xl p-4 md:p-5 lg:p-6 hover:bg-[#050505]/60 hover:border-[#FF1E1E]/10 hover:-translate-y-[2px] transition-all duration-400"
            >
              <div className="flex gap-0.5 mb-3 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#FF1E1E] fill-[#FF1E1E]" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-5 md:mb-6 font-bold">"{t.testimonial_text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold bg-[linear-gradient(135deg,rgba(255,30,30,0.15),rgba(255,30,30,0.05))] ${i === 0 ? 'text-[#FF1E1E]' : i === 1 ? 'text-red-400' : 'text-red-300'}`}>
                  {getInitials(t.testimonial_author)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.testimonial_author}</div>
                  <div className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">{t.testimonial_role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
