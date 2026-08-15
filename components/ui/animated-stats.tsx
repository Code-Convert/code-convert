'use client';

import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
}

export default function AnimatedStats({ stats }: AnimatedStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
      {stats.map((stat, idx) => (
        <StatCard key={idx} stat={stat} index={idx} />
      ))}
    </div>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      className="text-center group"
    >
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-[#FF1E1E]/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
        <motion.div
          className="relative text-h1 font-bold bg-linear-to-br from-white via-white to-gray-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
        </motion.div>
      </div>
      <p className="text-gray-400 mt-3 text-body font-medium">{stat.label}</p>
    </motion.div>
  );
}

function AnimatedNumber({
  value,
  suffix = '',
  isInView,
}: {
  value: string;
  suffix?: string;
  isInView: boolean;
}) {
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const prefix = value.match(/[^0-9.]/g)?.[0] || '';
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(latest.toFixed(numericValue % 1 !== 0 ? 1 : 0));
    });
  }, [springValue, numericValue]);

  return (
    <>
      {prefix}
      {displayValue}
      {suffix}
    </>
  );
}
