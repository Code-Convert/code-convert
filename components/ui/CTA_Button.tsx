'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { type CTAButtonVariant } from './button/shared';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  badge?: string;
  variant?: CTAButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function CTAButton({
  href,
  children,
  badge,
  variant = 'primary',
  icon,
  className = '',
  target,
  rel,
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isPrimary = variant === 'primary';

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {isHovered && badge && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-black border border-[#FF1E1E]/30 rounded-full text-xs font-semibold text-white whitespace-nowrap shadow-lg z-50"
          >
            {badge}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black border-r border-b border-[#FF1E1E]/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={href}
          target={target}
          rel={rel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base
            transition-all duration-300 relative overflow-hidden group
            ${
              isPrimary
                ? 'bg-[#FF1E1E] text-white hover:bg-white hover:text-black'
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
            }
            ${className}
          `}
        >
          <span className="relative z-10">{children}</span>
          {icon ? (
            <span className="relative z-10 group-hover:rotate-45 transition-transform duration-300">
              {icon}
            </span>
          ) : (
            <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
          )}
          
          {isPrimary && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.1 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </Link>
      </motion.div>
    </div>
  );
}
