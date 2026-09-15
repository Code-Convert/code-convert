"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Printer } from "lucide-react";

const BrandImg = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} width={28} height={28} className="w-full h-full object-contain" />
);

const services = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description: "Websites that look good, work properly and give your business a stronger digital foundation.",
    logos: [
      { name: 'Figma', node: <BrandImg src="/brand-logos/figma.svg" alt="Figma" /> },
      { name: 'React', node: <BrandImg src="/brand-logos/react.svg" alt="React" /> },
      { name: 'Next.js', node: <BrandImg src="/brand-logos/nextjs.svg" alt="Next.js" /> },
    ],
    items: ["Website Design & Development", "UX/UI Design", "Landing Pages", "Website Maintenance", "Technical Optimisation"],
    color: "#3B82F6",
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "From store strategy to launch, we build e-commerce experiences designed to make buying from your brand simple.",
    logos: [
      { name: 'Shopify', node: <BrandImg src="/brand-logos/shopify.svg" alt="Shopify" /> },
    ],
    shopifyPartner: true,
    items: ["Shopify Store Design", "Shopify Development", "Store Setup & Configuration", "Product & Collection Setup", "E-Commerce Integrations"],
    color: "#96BF47",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description: "Keep your brand active, consistent and worth paying attention to with content built around your business.",
    logos: [
      { name: 'Instagram', node: <BrandImg src="/brand-logos/instagram.svg" alt="Instagram" /> },
      { name: 'Facebook', node: <BrandImg src="/brand-logos/facebook.svg" alt="Facebook" /> },
      { name: 'TikTok', node: <BrandImg src="/brand-logos/tiktok.svg" alt="TikTok" /> },
      { name: 'LinkedIn', node: <BrandImg src="/brand-logos/linkedin.svg" alt="LinkedIn" /> },
    ],
    items: ["Social Media Strategy", "Content Planning", "Content Creation", "Community Management", "Monthly Reporting"],
    color: "#E1306C",
  },
  {
    id: "paid-ads",
    title: "Paid Advertising",
    description: "Put your business in front of the right people with targeted campaigns across the platforms that matter.",
    logos: [
      { name: 'Google Ads', node: <BrandImg src="/brand-logos/google-ads.svg" alt="Google Ads" /> },
      { name: 'Meta', node: <BrandImg src="/brand-logos/meta.svg" alt="Meta" /> },
    ],
    items: ["Meta & Instagram Ads", "Google Ads", "Campaign Strategy", "Creative & Ad Copy", "Campaign Optimisation"],
    color: "#F59E0B",
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description: "Turn attention into lasting customer relationships with email marketing that keeps your brand connected.",
    logos: [
      { name: 'Klaviyo', node: <BrandImg src="/brand-logos/klaviyo.svg" alt="Klaviyo" /> },
      { name: 'Adobe', node: <BrandImg src="/brand-logos/adobe.svg" alt="Adobe" /> },
    ],
    items: ["Email Campaigns", "Email Strategy", "Automated Flows", "Customer Retention"],
    color: "#FF4500",
  },
  {
    id: "traditional-marketing",
    title: "Traditional Marketing",
    description: "Bring your brand into the real world with marketing that gets you seen beyond the screen.",
    icon: Printer,
    items: ["Print & Brochures", "Signage", "OOH & DOOH", "Branded Activations", "Events & Promotional Campaigns"],
    color: "#8B5CF6",
  },
];

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const ServiceCard = ({ service, index, span = 1 }: { service: typeof services[0]; index: number; span?: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rgb = hexToRgb(service.color);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ delay: Math.min(index * 0.07, 0.25), duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden group backdrop-blur-[16px] rounded-2xl p-5 md:p-6 lg:p-7 hover:-translate-y-[2px] transition-all duration-400"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb}, 0.06) 0%, rgba(5,5,5,0.5) 60%)`,
        border: `1px solid rgba(${rgb}, 0.14)`,
        gridColumn: span > 1 ? `span ${span}` : undefined,
      }}
    >
      <div
        className="absolute w-[360px] h-[360px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          background: `radial-gradient(circle, rgba(${rgb}, 0.08) 0%, transparent 70%)`,
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      <div className="relative z-10">
        {'logos' in service && service.logos ? (
          <div className="flex items-center gap-1.5 mb-4 md:mb-5 flex-wrap">
            {(service.logos as { name: string; node: React.ReactNode }[]).map((logo) => (
              <div
                key={logo.name}
                className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ background: `rgba(${rgb}, 0.05)`, border: `1px solid rgba(${rgb}, 0.12)` }}
              >
                {logo.node}
              </div>
            ))}
            {'shopifyPartner' in service && service.shopifyPartner && (
              <span className="text-[10px] font-bold tracking-wide px-2 py-1 rounded-md border border-[#96BF47]/30 text-[#96BF47] bg-[#96BF47]/5 uppercase ml-1">
                Partner
              </span>
            )}
          </div>
        ) : 'icon' in service && service.icon ? (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 md:mb-5"
            style={{ background: `rgba(${rgb}, 0.1)`, border: `1px solid rgba(${rgb}, 0.2)` }}
          >
            <service.icon className="w-4 h-4" style={{ color: service.color }} />
          </div>
        ) : null}

        <h3 className="text-h3 font-bold tracking-tight mb-2">{service.title}</h3>
        <p className="text-small text-neutral-400 font-bold leading-relaxed mb-4 md:mb-5">{service.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {service.items.map((tag) => (
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
};

export default function TechStack() {
  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 border-t border-white/[0.03]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(255,30,30,0.02),transparent_60%)] -z-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-h2 font-bold tracking-tight mb-3 md:mb-4 px-4"
          >
            Built for the Way Modern Businesses Market
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-body text-neutral-400 font-bold max-w-xl mx-auto px-4"
          >
            The right mix of creative, digital and traditional capabilities to help your business compete, communicate and stay visible.
          </motion.p>
        </div>

        {/* Mobile: stack */}
        <div className="sm:hidden flex flex-col gap-3">
          {services.map((service, i) => (
            <div key={service.id} className="sticky" style={{ top: `calc(5rem + ${i * 2}px)`, zIndex: i + 1 }}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop: bento — alternating [wide+narrow] [narrow+wide] [wide+narrow], flagship services in wide slots */}
        <div className="hidden sm:grid grid-cols-3 gap-4">
          {/* Row 1: Web Design (wide) + Paid Ads (narrow) */}
          <ServiceCard service={services[0]} index={0} span={2} />
          <ServiceCard service={services[3]} index={3} />
          {/* Row 2: Email (narrow) + E-Commerce (wide) */}
          <ServiceCard service={services[4]} index={4} />
          <ServiceCard service={services[1]} index={1} span={2} />
          {/* Row 3: Social Media (wide) + Traditional (narrow) */}
          <ServiceCard service={services[2]} index={2} span={2} />
          <ServiceCard service={services[5]} index={5} />
        </div>
      </div>
    </section>
  );
}