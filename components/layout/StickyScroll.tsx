'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface Project {
  industry: string;
  name: string;
  description: string;
  services: string[];
  image: string;
}

interface StickyScrollProps {
  projects: Project[];
}

export default function StickyScroll({ projects }: StickyScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={targetRef} className="relative">
      {projects.map((project, idx) => {
        const start = idx / projects.length;
        const end = (idx + 1) / projects.length;

        return (
          <ProjectCard
            key={idx}
            project={project}
            progress={scrollYProgress}
            start={start}
            end={end}
            index={idx}
            total={projects.length}
          />
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  progress,
  start,
  end,
  index,
  total,
}: {
  project: Project;
  progress: any;
  start: number;
  end: number;
  index: number;
  total: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0.95, 1, 1, 0.95]);
  const imageOpacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  const isLast = index === total - 1;

  return (
    <div className={`min-h-screen flex items-center ${isLast ? 'mb-0' : ''}`}>
      <div className="max-w-7xl px-0 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <motion.div style={{ opacity, scale }} className="space-y-4 md:space-y-6">
            <div className="inline-block px-4 py-1.5 bg-[#FF1E1E]/10 border border-[#FF1E1E]/20 rounded-full">
              <p className="text-[#FF1E1E] text-sm font-semibold">{project.industry}</p>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">{project.name}</h3>
            
            <p className="text-gray-400 text-base sm:text-sm md:text-lg leading-relaxed max-w-xl">
              {project.description}
            </p>

            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                Services Delivered
              </p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={{ opacity: imageOpacity }}
            className="relative lg:sticky lg:top-24 h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#FF1E1E]/20 to-transparent rounded-2xl blur-3xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
