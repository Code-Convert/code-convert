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
  const x = useMotionValue(0);
  const xSmooth = useSpring(x, { damping: 50, stiffness: 400 });

  const cardWidth = 400; // Width including gap
  const totalWidth = websites.length * cardWidth;

  // Auto-scroll with infinite loop
  useEffect(() => {
    if (isDragging) return;

    const controls = animate(x, -totalWidth, {
      duration: 30,
      repeat: Infinity,
      ease: 'linear',
      repeatType: 'loop',
      onRepeat: () => {
        x.set(0);
      },
    });

    return controls.stop;
  }, [x, totalWidth, isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-4"
    >
      <motion.div
        style={{ x: xSmooth }}
        drag="x"
        dragConstraints={{ left: -totalWidth, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          // Wrap around if dragged past boundaries
          const currentX = x.get();
          if (currentX <= -totalWidth) {
            x.set(currentX + totalWidth);
          } else if (currentX > 0) {
            x.set(currentX - totalWidth);
          }
        }}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
      >
        {[...websites, ...websites, ...websites].map((website, idx) => (
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
      className="shrink-0 w-87.5  sm:w-100 group"
    >
      <div className="relative h-112.5 rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
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
