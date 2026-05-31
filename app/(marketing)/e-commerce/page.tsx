'use client';

import Link from 'next/link';
import { ArrowUpRight, ShoppingCart, CreditCard, BarChart3, Lock } from 'lucide-react';
import VoidBackground from '@/components/VoidBackground';
import InteractiveCursor from '@/components/InteractiveCursor';

export default function EcommercePage() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 overflow-x-hidden selection:bg-[#FF1E1E]/20 selection:text-white">
      <VoidBackground />
      <InteractiveCursor />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">E-Commerce</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mb-6 md:mb-8">
            Transform your business with a high-converting online store built for growth.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF1E1E] text-white rounded-full font-bold hover:bg-white hover:text-[#050505] transition-all duration-300"
          >
            Launch Your Store
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20">
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <ShoppingCart className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Easy Shopping</h3>
            <p className="text-gray-400 text-xs md:text-sm">Intuitive user experience that drives sales</p>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <CreditCard className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-400 text-xs md:text-sm">Multiple payment gateways integrated</p>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <BarChart3 className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-400 text-xs md:text-sm">Track performance and optimize sales</p>
          </div>
          <div className="p-4 md:p-6 bg-white/5 rounded-xl">
            <Lock className="w-8 md:w-10 h-8 md:h-10 text-[#FF1E1E] mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-bold mb-2">Secure</h3>
            <p className="text-gray-400 text-xs md:text-sm">SSL encryption and PCI compliance</p>
          </div>
        </div>

        {/* Platform & Features */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#FF1E1E]">Platform Expertise</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              We build custom e-commerce solutions using modern platforms and technologies 
              that scale with your business needs.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Whether you need a simple online store or a complex multi-vendor marketplace, 
              we have the expertise to bring your vision to life.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-[#FF1E1E]">Features</h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Secure payment gateway integration</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Advanced inventory management system</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Mobile-first responsive design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Real-time analytics and reporting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>Email marketing and automation tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF1E1E] mt-1">✓</span>
                <span>SEO optimization for product pages</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 md:py-16 px-4 md:px-6 bg-white/5 rounded-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Ready to Grow Your Online Business?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's build an e-commerce platform that drives sales and scales with your success.
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
