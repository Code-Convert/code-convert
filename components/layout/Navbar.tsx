'use client';

import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      // Only hide on desktop, always show on mobile/tablet
      if (window.innerWidth >= 768) {
        if (current > lastScroll && current > 100) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
      setLastScroll(current);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [lastScroll]);

  return (
    <motion.nav
      initial={{ translateY: -16, opacity: 0 }}
      animate={{ translateY: isHidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 bg-[#050505]/80 backdrop-blur-[20px] border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-6 sm:h-7 px-1.5 sm:px-2 rounded-lg items-center justify-center bg-[#FF1E1E] shrink-0">
              <span className="font-bold text-[9px] sm:text-[10px] tracking-tighter text-white">C&C</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs sm:text-sm font-bold tracking-tight truncate uppercase leading-tight">Code & Convert</span>
              <span className="text-[7px] sm:text-[8px] text-neutral-400 font-medium uppercase tracking-[0.2em] leading-none mt-0.5 ">We code, you convert</span>
            </div>
          </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          <a href="/" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors duration-300 uppercase tracking-widest whitespace-nowrap">Home</a>
          <a href="/services" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors duration-300 uppercase tracking-widest whitespace-nowrap">Services</a>
          <a href="/case-studies" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors duration-300 uppercase tracking-widest whitespace-nowrap">Case Studies</a>
          <a href="/blog" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors duration-300 uppercase tracking-widest whitespace-nowrap">Blog</a>
        </div>

          <div className="flex items-center gap-2">
            <a
              href="/contact-us"
              className="inline-flex items-center gap-1 text-[12px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FF1E1E] text-white hover:bg-white hover:text-[#050505] hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 group whitespace-nowrap"
            >
              Book 1:1 Meeting
              <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 hidden sm:block" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed top-0 left-0 h-screen w-[80%] bg-black z-50 md:hidden flex flex-col"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Sidebar Content */}
            <div className="flex-1 px-6 pb-8">
              <div className="space-y-1">
                <a 
                  href="/" 
                  className="block text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest py-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <div className="h-px bg-[#FF1E1E]/20 my-1" />
                
                <a 
                  href="/web-design" 
                  className="block text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest py-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Web Design
                </a>
                <div className="h-px bg-[#FF1E1E]/20 my-1" />
                
                <a 
                  href="/marketing" 
                  className="block text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest py-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marketing
                </a>
                <div className="h-px bg-[#FF1E1E]/20 my-1" />
                
                <a 
                  href="/case-studies" 
                  className="block text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest py-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Case Studies
                </a>
                <div className="h-px bg-[#FF1E1E]/20 my-1" />
                
                <a 
                  href="/blog" 
                  className="block text-sm font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest py-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
              </div>
            </div>
            
            {/* Bottom Button */}
            <div className="p-6 pb-8">
              <a
                href="/contact-us"
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold px-6 py-3 rounded-lg bg-[#FF1E1E] text-white hover:bg-white hover:text-[#050505] transition-all duration-300 uppercase tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book 1:1 Meeting
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </motion.nav>
  );
}
