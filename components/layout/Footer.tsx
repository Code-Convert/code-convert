import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/3 pt-8 md:pt-16 pb-6 md:pb-10 bg-[#050505]/80 backdrop-blur-md overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Footer Links */}
        <div className="hidden lg:flex items-center justify-between w-full gap-8 lg:gap-12 mb-16">
          
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">LinkedIn</a>
          </div>

          <div className="flex items-center justify-center gap-x-6 sm:gap-x-10 flex-1">
            <a href="/web-design" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">Web design</a>
            <a href="/e-commerce" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">E-comm</a>
            <a href="/case-studies" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">Case Studies</a>
            <a href="/blog" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors whitespace-nowrap">Blog</a>
          </div>

          <div className="flex items-center justify-end gap-x-4 sm:gap-x-6">
            <a href="/privacy" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors whitespace-nowrap">Privacy Policy</a>
            <a href="/terms" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors whitespace-nowrap">Terms of Service</a>
          </div>

        </div>

        {/* Mobile/Tablet Footer Links */}
        <div className="lg:hidden space-y-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <a href="/web-design" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Web design</a>
            <a href="/e-commerce" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">E-comm</a>
            <a href="/case-studies" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Case Studies</a>
            <a href="/blog" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Blog</a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Facebook</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <a href="/privacy" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">Terms</a>
          </div>
        </div>

        <div className="h-px w-full mb-8 bg-linear-to-r from-transparent via-white/5 to-transparent" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Logo & Copyright - Full width on mobile, auto on tablet+ */}
          <div className="hidden sm:flex flex-col items-center md:items-start gap-3 text-center md:text-left w-full md:w-auto">
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-7 px-2 rounded-lg items-center justify-center bg-[#FF1E1E] shrink-0">
                <span className="font-bold text-[10px] sm:text-xs tracking-tighter text-white">C&C</span>
              </div>
              <div className="flex flex-col justify-center text-left">
                <span className="text-sm font-bold tracking-tight text-white truncate uppercase leading-tight">Code & Convert</span>
                <span className="text-[8px] sm:text-[9px] text-neutral-400 font-medium uppercase tracking-[0.2em] leading-none mt-0.5">We code, you convert</span>
              </div>
            </a>
            
            <p className="text-[10px] sm:text-xs text-neutral-500 font-medium tracking-tight">
              © {new Date().getFullYear()} Code & Convert (Pty) Ltd. All rights reserved.
            </p>
          </div>

          {/* Contact Details - Full width on mobile, auto on tablet+ */}
          <div className="flex flex-col items-center gap-2 text-center w-full md:w-auto">
            <a href="mailto:hello@codeandconvert.com" className="text-[16px] sm:text-md text-neutral-400 hover:text-white transition-colors font-medium">
              hello@codeandconvert.com
            </a>
            <a href="tel:+27123456789" className="text-[16px] sm:text-md text-neutral-400 hover:text-white transition-colors font-medium">
              +27 12 345 6789
            </a>
            <a href="/contact" className="px-3 py-1.5 rounded-full border border-white/5 bg-white/2 hover:bg-white/6 hover:border-white/10 transition-all text-[10px] font-bold tracking-widest uppercase text-neutral-400 hover:text-white flex items-center gap-1 group">
              Book 1:1 Meeting
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
            </a>
          </div>
          
          {/* Powered By - Full width on mobile, auto on tablet+ */}
          <a href="/" className="px-4 py-2 rounded-full border border-white/5 bg-white/2 hover:bg-white/6 hover:border-white/10 transition-all text-[10px] font-bold tracking-widest uppercase text-neutral-400 flex items-center gap-1.5 group w-full md:w-auto justify-center md:justify-start">
            Powered by Amari&C 
            <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
