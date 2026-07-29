'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';

function LoaderContent() {
  return (
    <div className="relative z-10 text-center px-4">
      <div className="flex items-center justify-center gap-2 mb-6">
        <motion.div
          className="flex h-7 sm:h-9 px-2 sm:px-3 rounded-lg items-center justify-center bg-[#FF1E1E] shrink-0"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
        >
          <span className="font-bold text-[10px] sm:text-xs tracking-tighter text-white">C&C</span>
        </motion.div>
        <div className="h-full flex flex-col justify-center items-start gap-1">
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase">Code & Convert</span>
          <span className="text-xs sm:text-sm text-neutral-600">We code, You convert</span>
        </div>
      </div>
    </div>
  );
}

export default function Loader({ inline = false }: { inline?: boolean }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (inline) return;
    const handleLoad = () => setTimeout(() => setIsVisible(false), 300);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [inline]);

  if (inline) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center">
        <LoaderContent />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          <LoaderContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
