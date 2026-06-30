'use client';

import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface WebsiteShowcase {
  name: string;
  industry: string;
  image: string;
}

interface WebsiteCarouselProps {
  websites: WebsiteShowcase[];
}

export default function WebsiteCarousel({ websites }: WebsiteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const xSmooth = useSpring(x, { damping: 50, stiffness: 400 });

  // Auto-scroll
  useEffect(() => {
    if (isPaused || isDragging) return;

    const controls = animate(x, -((websites.length * 400) / 2), {
      duration: 30,
      repeat: Infinity,
      ease: 'linear',
      onUpdate: (latest) => {
        if (latest <= -((websites.length * 400) / 2)) {
          x.set(0);
        }
      },
    });

    return controls.stop;
  }, [x, websites.length, isPaused, isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        style={{ x: xSmooth }}
        drag="x"
        dragConstraints={{ left: -((websites.length - 1) * 400), right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
      >
        {[...websites, ...websites].map((website, idx) => (
          <WebsiteCard key={idx} website={website} />
        ))}
      </motion.div>
    </div>
  );
}

function WebsiteCard({ website }: { website: WebsiteShowcase }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex-shrink-0 w-[350px] sm:w-[400px] group"
    >
      <div className="relative h-[450px] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-10" />
        <Image
          src={website.image}
          alt={website.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <p className="text-gray-400 text-sm mb-1">{website.industry}</p>
          <h4 className="text-xl font-bold">{website.name}</h4>
        </div>
      </div>
    </motion.div>
  );
}
