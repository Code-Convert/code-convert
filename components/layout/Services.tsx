'use client';

import { motion } from 'motion/react';
import { BarChart3, Search, MousePointer2, Mail, Video, PieChart } from 'lucide-react';
import React, { useState } from 'react';

const services = [
  {
    icon: BarChart3,
    title: 'Paid Acquisition',
    description: 'Hyper-targeted Meta, Google, and TikTok campaigns designed for sustainable customer acquisition cost (CAC).',
    tags: ['Google Ads', 'Meta Ads', 'TikTok']
  },
  {
    icon: Search,
    title: 'Technical SEO',
    description: 'Dominate search results with structural optimization, authoritative link building, and intent-driven content.',
    tags: ['Audits', 'On-Page', 'Off-Page']
  },
  {
    icon: MousePointer2,
    title: 'Conversion Optimization',
    description: 'Continuous A/B testing and user journey refinements to extract maximum value from existing traffic.',
    tags: ['A/B Testing', 'UX', 'Heatmaps']
  },
  {
    icon: Mail,
    title: 'Email & SMS',
    description: 'Build owned revenue channels with automated lifecycle flows and segmented campaign broadcasts.',
    tags: ['Klaviyo', 'Flows', 'Retention']
  },
  {
    icon: Video,
    title: 'Creative Studio',
    description: 'High-converting ad creatives, from rapid-fire UGC to polished brand videos designed strictly for performance.',
    tags: ['Video Ads', 'Static', 'UGC']
  },
  {
    icon: PieChart,
    title: 'Data & Attribution',
    description: 'Clear, actionable dashboards resolving multi-touch attribution so you know exactly what drives revenue.',
    tags: ['GA4', 'Dashboards', 'Attribution']
  }
];

export default function Services() {
  return (
    <section id="capabilities" className="relative z-10 py-12 sm:py-16 md:py-24 lg:py-32 border-t border-white/[0.03]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(255,30,30,0.02),transparent_60%)] -z-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase border border-white/5 bg-white/[0.02] text-white/40 mb-4 md:mb-5 mx-auto"
          >
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4 px-4"
          >
            Full-funnel marketing<br /><span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent">capabilities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body text-neutral-400 max-w-md mx-auto font-bold px-4"
          >
            We cover every touchpoint of your customer's journey with data-backed strategies.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden group bg-[#050505]/40 border border-white/5 backdrop-blur-[16px] rounded-2xl p-5 md:p-6 lg:p-7 hover:bg-[#050505]/60 hover:border-[#FF1E1E]/10 hover:-translate-y-[2px] transition-all duration-400"
    >
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,30,30,0.06) 0%, transparent 70%)',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      <div className="relative z-10">
        <div className="w-10 md:w-11 h-10 md:h-11 rounded-xl flex items-center justify-center mb-4 md:mb-5 bg-[#FF1E1E]/10 border border-[#FF1E1E]/20">
          <service.icon className="w-4.5 md:w-5 h-4.5 md:h-5 text-[#FF1E1E]" />
        </div>
        <h3 className="text-sm md:text-base font-bold tracking-tight mb-2">{service.title}</h3>
        <p className="text-[11px] md:text-xs text-neutral-500 leading-relaxed mb-4 md:mb-5">{service.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-neutral-600 px-2 py-0.5 rounded bg-white/[0.03] uppercase tracking-wider font-bold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
