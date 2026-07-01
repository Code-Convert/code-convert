'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import TestimonialsGrid from '@/components/ui/testimonials-grid';

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
        .limit(6);
      
      if (data) setTestimonials(data);
    }
    fetchTestimonials();
  }, []);

  return (
    <section id="partners" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-white/3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase border border-white/5 bg-white/2 text-white/40 mb-4 md:mb-5 mx-auto"
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
          {testimonials.slice(0, 3).map((t) => (
            <span key={t.id} className="text-base md:text-lg font-bold tracking-tighter text-neutral-500 hover:text-white transition-colors cursor-pointer capitalize">
              {t.client}
            </span>
          ))}
        </motion.div>

        {/* Testimonial cards using TestimonialsGrid */}
        <TestimonialsGrid testimonials={testimonials} />
      </div>
    </section>
  );
}
