'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 300);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative z-10 text-center px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex h-7 sm:h-9 px-2 sm:px-3 rounded-lg items-center justify-center bg-[#FF1E1E] shrink-0">
                <span className="font-bold text-[10px] sm:text-xs tracking-tighter text-white">C&C</span>
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white uppercase">Code & Convert</span>
            </div>
            <div className="mx-auto mb-4 flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sun className="w-8 sm:w-10 h-8 sm:h-10 text-[#FF1E1E]" />
              </motion.div>
            </div>
            <p className="text-xs text-neutral-600 mt-4 tracking-wide">Loading</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
