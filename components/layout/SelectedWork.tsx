'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import type { CaseStudy } from '@/types/case-study';

interface SelectedWorkProps {
  projects: CaseStudy[];
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  if (projects.length === 0) return null;

  return (
    <section id="work" className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,30,30,0.02),transparent_60%)] -z-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 md:mb-14 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-bold tracking-wide uppercase border border-white/20 bg-white/2 text-white/60 mb-4 md:mb-5 mx-auto"
            >
              Selected Work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-h2 font-bold tracking-tight px-4"
            >
              Brand Visibility<br /><span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">Done Right</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body text-neutral-400 font-bold leading-relaxed max-w-lg mx-auto px-4"
          >
            From concept to execution, here's a look at how we've helped businesses show up with clarity, confidence and purpose.
          </motion.p>
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] text-white font-bold rounded-full hover:!bg-white hover:!text-[#050505] hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.3)] active:!bg-white active:!text-[#050505] active:scale-[0.98] transition-all duration-300"
          >
            Explore Our Work →
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden group bg-[#050505]/40 border border-white/5 backdrop-blur-lg rounded-2xl ${colSpan} hover:bg-[#050505]/60 hover:border-[#FF1E1E]/10 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-16px_rgba(0,0,0,0.4)] transition-all duration-400 cursor-pointer`}
    >
      <a href={`/case-studies/${project.slug}`} className="absolute inset-0 z-20" aria-label={project.client} />
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
        <h3 className="text-h3 font-bold tracking-tight mb-2">{project.client}</h3>
        <div className="text-small text-neutral-400 font-bold leading-relaxed mb-4 md:mb-5" dangerouslySetInnerHTML={{ __html: (project.results ?? '').substring(0, 150) + '...' }} />
        <div className="flex flex-wrap gap-1.5">
          {project.services?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md text-white/60 bg-white/[0.07] border border-white/[0.12]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
