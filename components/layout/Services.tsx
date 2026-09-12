'use client';

import { motion } from 'motion/react';
import { Printer, MapPin } from 'lucide-react';
import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

type Logo = { name: string; node: React.ReactNode };
type ServiceItem = {
  icon?: LucideIcon;
  logos?: Logo[];
  shopifyPartner?: boolean;
  accent: string;
  title: string;
  description: string;
  tags: string[];
};

const BrandImg = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} width={28} height={28} className="w-full h-full object-contain" />
);

const services: ServiceItem[] = [
  {
    logos: [
      { name: 'Figma', node: <BrandImg src="/brand-logos/figma.svg" alt="Figma" /> },
      { name: 'React', node: <BrandImg src="/brand-logos/react.svg" alt="React" /> },
      { name: 'Next.js', node: <BrandImg src="/brand-logos/nextjs.svg" alt="Next.js" /> },
    ],
    accent: '#3B82F6',
    title: 'Web Design & Development',
    description: 'Websites built or remodelled to represent your brand, communicate your value and turn visitors into customers.',
    tags: ['Web Design', 'Development', 'UX/UI'],
  },
  {
    logos: [{ name: 'Shopify', node: <BrandImg src="/brand-logos/shopify.svg" alt="Shopify" /> }],
    shopifyPartner: true,
    accent: '#96BF47',
    title: 'E-Commerce Solutions',
    description: 'From Shopify builds to optimisation, we create e-commerce experiences designed to make buying simple and selling easier.',
    tags: ['Shopify', 'E-Commerce', 'Conversion'],
  },
  {
    logos: [
      { name: 'Instagram', node: <BrandImg src="/brand-logos/instagram.svg" alt="Instagram" /> },
      { name: 'Facebook', node: <BrandImg src="/brand-logos/facebook.svg" alt="Facebook" /> },
      { name: 'TikTok', node: <BrandImg src="/brand-logos/tiktok.svg" alt="TikTok" /> },
      { name: 'LinkedIn', node: <BrandImg src="/brand-logos/linkedin.svg" alt="LinkedIn" /> },
    ],
    accent: '#E1306C',
    title: 'Social Media Management',
    description: 'Keep your brand visible and relevant with strategic content, consistent publishing and ongoing community management.',
    tags: ['Strategy', 'Content', 'Management'],
  },
  {
    logos: [
      { name: 'Google Ads', node: <BrandImg src="/brand-logos/google-ads.svg" alt="Google Ads" /> },
      { name: 'Meta', node: <BrandImg src="/brand-logos/meta.svg" alt="Meta" /> },
    ],
    accent: '#4285F4',
    title: 'Paid Advertising',
    description: 'Put your business in front of the right people with targeted campaigns across the platforms where your customers spend their time.',
    tags: ['Meta Ads', 'Google Ads', 'Campaigns'],
  },
  {
    logos: [
      { name: 'Klaviyo', node: <BrandImg src="/brand-logos/klaviyo.svg" alt="Klaviyo" /> },
      { name: 'Adobe', node: <BrandImg src="/brand-logos/adobe.svg" alt="Adobe" /> },
    ],
    accent: '#FF4500',
    title: 'Email Marketing',
    description: 'Turn your audience into repeat customers with strategic campaigns, automated journeys and meaningful communication.',
    tags: ['Campaigns', 'Automation', 'Retention'],
  },
  {
    icon: Printer,
    accent: '#F59E0B',
    title: 'Traditional Marketing',
    description: 'Take your brand beyond the screen with print, signage, branded materials and marketing that people can see in the real world.',
    tags: ['Print', 'Signage', 'Branding'],
  },
  {
    icon: MapPin,
    accent: '#F59E0B',
    title: 'OOH / DOOH',
    description: 'Put your brand where people are with strategically placed outdoor and digital outdoor advertising that gets noticed.',
    tags: ['OOH', 'DOOH', 'Placement'],
  },
];

/* ── Component ── */

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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-bold tracking-wide uppercase border border-white/20 bg-white/[0.02] text-white/60 mb-4 md:mb-5 mx-auto"
          >
            What We Do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-h2 font-bold tracking-tight mb-3 md:mb-4 px-4"
          >
            Built For Every Side Of Your Marketing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body text-neutral-400 font-bold max-w-xl mx-auto px-4"
          >
            Your brand needs more than a website or a social media presence. We bring together the digital channels and marketing services that help your business show up, connect with customers and keep moving forward.
          </motion.p>
        </div>

        {/* Mobile: sticky scroll stack */}
        <div className="sm:hidden flex flex-col gap-3">
          {services.map((service, i) => (
            <div
              key={i}
              className="sticky"
              style={{ top: `calc(5rem + ${i * 2}px)`, zIndex: i + 1 }}
            >
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rgb = hexToRgb(service.accent);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "0px 0px 120px 0px" }}
      transition={{ delay: Math.min(index * 0.07, 0.2), duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden group backdrop-blur-[16px] rounded-2xl p-5 md:p-6 lg:p-7 hover:-translate-y-[2px] transition-all duration-400"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb}, 0.06) 0%, rgba(5,5,5,0.5) 60%)`,
        border: `1px solid rgba(${rgb}, 0.14)`,
      }}
    >
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: `radial-gradient(circle, rgba(${rgb}, 0.08) 0%, transparent 70%)`,
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      <div className="relative z-10">
        {service.logos ? (
          <div className="flex items-center gap-1.5 mb-4 md:mb-5 flex-wrap">
            {service.logos.map((logo) => (
              <div
                key={logo.name}
                className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ background: `rgba(${rgb}, 0.05)`, border: `1px solid rgba(${rgb}, 0.12)` }}
              >
                {logo.node}
              </div>
            ))}
            {service.shopifyPartner && (
              <span className="text-[10px] font-bold tracking-wide px-2 py-1 rounded-md border border-[#96BF47]/30 text-[#96BF47] bg-[#96BF47]/5 uppercase ml-1">
                Partner
              </span>
            )}
          </div>
        ) : service.icon ? (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 md:mb-5"
            style={{ background: `rgba(${rgb}, 0.1)`, border: `1px solid rgba(${rgb}, 0.2)` }}
          >
            <service.icon className="w-4 h-4" style={{ color: service.accent }} />
          </div>
        ) : null}

        <h3 className="text-h3 font-bold tracking-tight mb-2">{service.title}</h3>
        <p className="text-small text-neutral-400 font-bold leading-relaxed mb-4 md:mb-5">{service.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md text-white/60 bg-white/[0.07] border border-white/[0.12]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
