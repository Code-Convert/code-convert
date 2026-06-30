'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

// Support multiple data formats
type TestimonialInput = 
  | {
      rating: number;
      quote: string;
      name: string;
      company: string;
      role: string;
    }
  | {
      id?: string;
      testimonial_text: string;
      testimonial_author: string;
      testimonial_role: string;
      client: string;
    };

// Normalized format for internal use
interface NormalizedTestimonial {
  rating: number;
  quote: string;
  name: string;
  company: string;
  role: string;
}

interface TestimonialsGridProps {
  testimonials: TestimonialInput[];
}

// Data normalizer - converts any format to the display format
function normalizeTestimonial(input: TestimonialInput): NormalizedTestimonial {
  // Check if it's already in the correct format
  if ('quote' in input && 'name' in input) {
    return input as NormalizedTestimonial;
  }
  
  // Convert from Supabase format
  return {
    rating: 5, // Default to 5 stars for Supabase testimonials
    quote: input.testimonial_text,
    name: input.testimonial_author,
    company: input.client,
    role: input.testimonial_role,
  };
}

export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  const normalized = testimonials.map(normalizeTestimonial);
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {normalized.map((testimonial, idx) => (
        <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: NormalizedTestimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-[#FF1E1E]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      
      {/* Card */}
      <div className="relative p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-all duration-300 h-full flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'fill-[#FF1E1E] text-[#FF1E1E]' : 'text-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-300 leading-relaxed mb-6 flex-grow text-sm md:text-base">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="pt-4 border-t border-white/10">
          <p className="font-bold text-white mb-1">{testimonial.name}</p>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
          <p className="text-sm text-[#FF1E1E]">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}
