'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  services: string[];
  results: string;
  featured_image: string;
}

interface SelectedWorkProps {
  projects: CaseStudy[];
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  return (
    <section id="work" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,30,30,0.02),transparent_60%)] -z-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-14 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase border border-white/5 bg-white/2 text-white/40 mb-4 md:mb-5 mx-auto"
            >
              Selected Case Studies
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight px-4"
            >
              Growth we've<br /><span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">engineered</span>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white transition-colors mt-2"
          >
            View all case studies
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#FF1E1E]/90 text-white font-bold rounded-lg transition-colors"
          >
            View More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: CaseStudy; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const colSpan = index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1';
  const color = index === 1 ? '#FF5555' : '#FF1E1E';

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      href={`/case-studies/${project.slug}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group bg-[#050505]/40 border border-white/5 backdrop-blur-lg rounded-2xl ${colSpan} hover:bg-[#050505]/60 hover:border-[#FF1E1E]/10 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.4)] transition-all duration-400 cursor-pointer`}
    >
      <div
        className="absolute w-100 h-100 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,30,30,0.06) 0%, transparent 70%)',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      <div className="relative aspect-video overflow-hidden bg-[linear-gradient(145deg,#0d0d0d,#141414)] z-10">
        {project.featured_image ? (
          <Image
            src={project.featured_image}
            alt={project.client}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full" style={{ background: `radial-gradient(circle at center, ${color}33, transparent)` }} />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,5,5,0.9)_100%)]" />
      </div>

      <div className="p-4 sm:p-5 md:p-6 relative z-10">
        <div className="flex items-center justify-between mb-2 md:mb-3 text-[10px] uppercase tracking-[0.2em] font-bold">
          <span style={{ color }}>{project.industry}</span>
          <ArrowUpRight className="w-3.5 md:w-4 h-3.5 md:h-4 text-neutral-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-base md:text-lg font-bold tracking-tight mb-2">{project.client}</h3>
        <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed mb-4 md:mb-5" dangerouslySetInnerHTML={{ __html: project.results.substring(0, 150) + '...' }} />
        <div className="flex flex-wrap gap-1.5">
          {project.services?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-neutral-600 px-2.5 py-1 rounded-md bg-white/3 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
