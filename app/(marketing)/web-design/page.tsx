'use client';

import Link from 'next/link';
import { ArrowUpRight, Palette, Smartphone, Zap, Search } from 'lucide-react';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';

export default function WebDesignPage() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 overflow-x-hidden selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">Web Design</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mb-6 md:mb-8">
            Every website we create is fully custom-built, user-centric, and focused on delivering measurable results for your brand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] text-white rounded-full font-bold hover:bg-white hover:text-[#050505] transition-all duration-300"
          >
            Start Your Project
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20">
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <Palette className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Custom Design</h3>
            <p className="text-gray-400 text-xs md:text-sm">Unique designs tailored to your brand identity</p>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <Smartphone className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Responsive</h3>
            <p className="text-gray-400 text-xs md:text-sm">Perfect on all devices and screen sizes</p>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <Zap className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Fast Loading</h3>
            <p className="text-gray-400 text-xs md:text-sm">Optimized for speed and performance</p>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <Search className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">SEO Ready</h3>
            <p className="text-gray-400 text-xs md:text-sm">Built with search engines in mind</p>
          </div>
        </div>

        {/* Approach & Deliverables */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#FF1E1E]">Our Approach</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every project starts with understanding your goals. We combine strategic thinking 
              with creative design to deliver websites that not only look great but perform exceptionally.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our design process is collaborative, transparent, and focused on creating digital 
              experiences that resonate with your target audience and drive conversions.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#FF1E1E]">What We Deliver</h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Fully responsive design across all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Custom UI/UX tailored to your brand</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Performance optimization for fast loading</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>SEO best practices implementation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Content management system integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Ongoing support and maintenance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 md:py-16 px-4 md:px-6 bg-white/5 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Build Your Website?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF1E1E] text-white rounded-full font-bold hover:bg-white hover:text-[#050505] transition-all duration-300"
          >
            Get Started
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
