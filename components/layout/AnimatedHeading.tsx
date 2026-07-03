'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  children: string;
  className?: string;
}

export default function AnimatedHeading({ children, className = '' }: AnimatedHeadingProps) {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(children.split(' '));
  }, [children]);

  return (
    <h1 className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: idx * 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block mr-3 md:mr-4 lg:mr-5"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
