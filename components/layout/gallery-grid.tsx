'use client';

import { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react';
import { SERVICES } from '@/types/case-study';

export interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  services: string[];
  description: string;
  image: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

const ALL = 'All Services';
const CATEGORIES = [ALL, ...SERVICES];

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered =
    activeCategory === ALL
      ? items
      : items.filter((cs) => cs.services.includes(activeCategory));

  const selectedStudy = items.find((cs) => cs.id === selectedId) ?? null;

  const handleNext = () => {
    if (!selectedId) return;
    const idx = filtered.findIndex((cs) => cs.id === selectedId);
    setSelectedId(filtered[(idx + 1) % filtered.length].id);
  };

  const handlePrev = () => {
    if (!selectedId) return;
    const idx = filtered.findIndex((cs) => cs.id === selectedId);
    setSelectedId(filtered[(idx - 1 + filtered.length) % filtered.length].id);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(id); }
  };

  return (
    <section id="gallery-grid" className="py-12 bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services: Outcome-Based Stacks
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore how we combine strategic thinking, compelling design and technical excellence to create measurable business growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-16"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full font-medium transition-all text-sm ${
                activeCategory === category
                  ? 'bg-[#FF1E1E] text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-[#FF1E1E]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                role="listitem"
              >
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelectedId(caseStudy.id)}
                  onKeyDown={(e) => handleCardKeyDown(e, caseStudy.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${caseStudy.title}`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 hover:border-[#FF1E1E]/50 transition-all hover:shadow-xl hover:shadow-[#FF1E1E]/10 bg-gray-800">
                    <motion.div className="h-full w-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                      {caseStudy.image ? (
                        <Image src={caseStudy.image} alt={caseStudy.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-700" />
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      <ZoomIn className="h-8 w-8 text-white" />
                    </motion.div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm font-semibold text-white mb-2">{caseStudy.title}</h3>
                    <span className="text-xs font-semibold text-[#FF1E1E] bg-[#FF1E1E]/10 px-2 py-1 rounded-full">
                      {caseStudy.services[0]?.split(' ')[0] ?? 'Project'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedId && selectedStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedId(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-title"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[90vh] max-w-3xl w-full"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute -right-12 top-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous case study"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/10 transition-colors"
                  aria-label="Next case study"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
                <motion.div
                  key={selectedStudy.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full overflow-hidden rounded-2xl bg-gray-800"
                  style={{ maxHeight: '70vh' }}
                >
                  {selectedStudy.image ? (
                    <Image
                      src={selectedStudy.image}
                      alt={selectedStudy.title}
                      width={900}
                      height={600}
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-700 rounded-2xl" />
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 text-center"
                >
                  <h3 id="lightbox-title" className="mb-2 text-xl font-semibold text-white">
                    {selectedStudy.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#FF1E1E] bg-[#FF1E1E]/10 px-3 py-1 rounded-full">
                    {selectedStudy.services[0] ?? 'Project'}
                  </span>
                  <p className="mt-3 text-gray-400 text-sm">{selectedStudy.description}</p>
                  <Link
                    href={`/case-studies/${selectedStudy.slug}`}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-white hover:text-black text-white font-bold rounded-xl transition-all duration-300"
                  >
                    View Full Case Study <ExternalLink className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-16"
        >
          <Link href="/case-studies">
            <button className="px-8 py-3 bg-[#FF1E1E] text-white rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300">
              View All Case Studies
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
