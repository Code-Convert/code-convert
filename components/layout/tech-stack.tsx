"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, BarChart3, Target, Palette, Video } from "lucide-react";

const services = [
  {
    id: "marketing",
    title: "Marketing & Strategy",
    description:
      "We build data-backed roadmaps that align brand vision with market demand for sustainable, long-term growth.",
    icon: Target,
    items: [
      "Go-to-Market Strategy",
      "Brand Positioning",
      "Competitor Analysis",
      "Growth Consulting",
      "Customer Persona Mapping",
    ],
    color: "#8B5CF6",
    gradient: "from-violet-500/20 to-purple-500/10",
    imagePlaceholder: "Marketing Strategy",
  },
  {
    id: "paid-ads",
    title: "Paid Ads & Creative",
    description:
      "Aggressive media buying & high-performance creative to lower CAC and scale your revenue fast.",
    icon: BarChart3,
    items: [
      "Meta & IG Ads",
      "Google PPC",
      "UGC Production",
      "Creative Testing",
      "Performance Analytics",
    ],
    color: "#F59E0B",
    gradient: "from-amber-500/20 to-orange-500/10",
    imagePlaceholder: "Paid Advertising",
  },
  {
    id: "web-design",
    title: "Web Design & CRO",
    description:
      "Your site should be your best salesperson. We craft high-converting experiences that turn visitors into believers.",
    icon: Palette,
    items: [
      "UX/UI Design",
      "Landing Page Optimisation",
      "A/B Testing",
      "CRO",
      "Web Development",
    ],
    color: "#10B981",
    gradient: "from-emerald-500/20 to-teal-500/10",
    imagePlaceholder: "Web Design",
  },
  {
    id: "editing",
    title: "Editing & Content",
    description:
      "Capture attention in seconds. We produce scroll-stopping video assets that drive engagement and build brand authority.",
    icon: Video,
    items: [
      "Short-Form Content",
      "Video Editing",
      "Motion Graphics",
      "Scriptwriting",
      "VSL's",
    ],
    color: "#EF4444",
    gradient: "from-red-500/20 to-rose-500/10",
    imagePlaceholder: "Content Creation",
  },
];

const CardSkeleton = ({ color, icon: Icon, title }: { color: string; icon: any; title: string }) => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900/80 border border-neutral-800/50">
      {/* Top section - mock UI */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
          <div className="w-3 h-3 rounded-full bg-neutral-700" />
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          <div className="flex-1">
            <div className="h-3 w-24 bg-neutral-700 rounded-full" />
            <div className="h-2 w-16 bg-neutral-800 rounded-full mt-1.5" />
          </div>
          <div 
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${color}20`, color }}
          >
            Active
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <div className="h-2 w-full bg-neutral-800 rounded-full" />
          <div className="h-2 w-3/4 bg-neutral-800 rounded-full" />
          <div className="h-2 w-1/2 bg-neutral-800 rounded-full" />
        </div>

        <div className="flex gap-2 mt-4">
          {["Tag 1", "Tag 2", "Tag 3"].map((tag, i) => (
            <div key={i} className="px-3 py-1 rounded-lg bg-neutral-800 text-[10px] text-neutral-500">
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-neutral-900 to-transparent" />
    </div>
  );
};

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      layout
      className="relative rounded-2xl overflow-hidden bg-neutral-900/60 border border-neutral-800/50 backdrop-blur-sm cursor-pointer group"
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image/Skeleton Area */}
      <div className="relative h-64 w-full overflow-hidden">
        <CardSkeleton color={service.color} icon={Icon} title={service.title} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-60" />
      </div>

      {/* Content Area */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white leading-tight">
              {service.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="ml-3 mt-0.5"
          >
            <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-neutral-500 transition-colors">
              <Plus size={16} className="text-neutral-400" />
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2">
                {service.items.map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: service.color }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section className="relative w-full min-h-screen bg-neutral-950 py-24 px-4 sm:px-6 lg:px-8">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-950 to-neutral-950" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight"
          >
            The complete E-Commerce
            <br />
            growth stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg leading-relaxed lg:pt-2"
          >
            No fluff. No vanity metrics. Just the high-performance engines your business needs to dominate.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}