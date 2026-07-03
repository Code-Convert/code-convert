"use client";

import { motion, AnimatePresence } from "framer-motion";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export function OnboardingHeader({
  currentStep,
  totalSteps,
  stepTitle,
}: OnboardingHeaderProps) {
  const progressPct = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-5 select-none">
      <div className="flex items-center justify-between mb-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={stepTitle}
            className="text-sm font-semibold text-white tracking-wide"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {stepTitle}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm text-white/50 tabular-nums shrink-0 ml-4">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Progress bar track */}
      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#FF1E1E]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
        />
      </div>
    </div>
  );
}
