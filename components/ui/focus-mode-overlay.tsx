"use client";

import { motion } from "framer-motion";

export function FocusModeOverlay() {
  return (
    <motion.div
      key="focus-overlay"
      className="absolute inset-0 "
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(12px)",
        pointerEvents: "none",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}
