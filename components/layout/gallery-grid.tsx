'use client';

import { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: '1',
    title: 'StyleHub Fashion E-Commerce',
    category: 'Web Design & Development',
    description: 'Luxury fashion platform with mobile optimization and conversion-focused design.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    link: '/case-studies/stylehub',
  },
  {
    id: '2',
    title: 'Mbali Jewellery',
    category: 'Web Design & Development',
    description: 'A luxury-focused digital storefront crafted to elevate brand perception.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop',
    link: '/case-studies/mbali',
  },
  {
    id: '6',
    title: 'Fintech Solutions Platform',
    category: 'Web Design & Development',
    description: 'Conversion-focused corporate platform for lead generation.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    link: '/case-studies/fintech',
  },
  {
    id: '8',
    title: 'Prime Estates Property Platform',
    category: 'Web Design & Development',
    description: 'Modern property platform built to simplify discovery.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop',
    link: '/case-studies/prime-estates',
  },
  {
    id: '3',
    title: 'Social Media Growth Campaign',
    category: 'Social Media Strategy & Management',
    description: 'Data-driven social strategy that increased engagement by 300%.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop',
    link: '/case-studies/social-growth',
  },
  {
    id: '7',
    title: 'Brand Awareness Campaign',
    category: 'Social Media Strategy & Management',
    description: 'Multi-channel campaign reaching 2M+ impressions.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop',
    link: '/case-studies/brand-awareness',
  },
  {
    id: '4',
    title: 'Content Marketing Series',
    category: 'Content Creation & Marketing',
    description: 'Strategic content calendar that drove 500+ qualified leads.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    link: '/case-studies/content-series',
  },
  {
    id: '5',
    title: 'Community Engagement Initiative',
    category: 'Community Engagement & Management',
    description: 'Built and managed a thriving community of 50k+ engaged members.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop',
    link: '/case-studies/community',
  },
];

const CATEGORIES = [
  'All Services',
  'Web Design & Development',
  'Social Media Strategy & Management',
  'Content Creation & Marketing',
  'Community Engagement & Management',
];

function getFiltered(activeCategory: string) {
  if (activeCategory === 'All Services') {
    // One representative per category, max 4 total
    const seen = new Set<string>();
    const result = [];
    for (const cs of CASE_STUDIES) {
      if (!seen.has(cs.category)) {
        seen.add(cs.category);
        result.push(cs);
        if (result.length === 4) break;
      }
    }
    return result;
  }
  return CASE_STUDIES.filter((cs) => cs.category === activeCategory).slice(0, 4);
}

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedStudy = CASE_STUDIES.find((cs) => cs.id === selectedId) ?? null;
  const filteredCaseStudies = getFiltered(activeCategory);

  const handleNext = () => {
    if (!selectedId) return;
    const idx = filteredCaseStudies.findIndex((cs) => cs.id === selectedId);
    setSelectedId(filteredCaseStudies[(idx + 1) % filteredCaseStudies.length].id);
  };

  const handlePrev = () => {
    if (!selectedId) return;
    const idx = filteredCaseStudies.findIndex((cs) => cs.id === selectedId);
    setSelectedId(filteredCaseStudies[(idx - 1 + filteredCaseStudies.length) % filteredCaseStudies.length].id);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(id); }
  };

  return (
    <section id="gallery-grid" className="py-12 bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
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

        {/* Filter Buttons */}
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

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCaseStudies.map((caseStudy, index) => (
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
                    <motion.div
                      className="h-full w-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover"
                      />
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
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {caseStudy.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#FF1E1E] bg-[#FF1E1E]/10 px-2 py-1 rounded-full">
                      {caseStudy.category.split(' ')[0]}
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
                  <Image
                    src={selectedStudy.image}
                    alt={selectedStudy.title}
                    width={900}
                    height={600}
                    className="w-full h-auto object-cover rounded-2xl"
                  />
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
                    {selectedStudy.category}
                  </span>
                  <p className="mt-3 text-gray-400 text-sm">{selectedStudy.description}</p>
                  <Link
                    href={selectedStudy.link}
                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-white hover:text-black text-white font-bold rounded-xl transition-all duration-300"
                  >
                    View Full Case Study <ExternalLink className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View More Button */}
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
