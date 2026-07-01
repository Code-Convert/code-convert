"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white/20"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.3 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.8 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.5, 0.8, 0.5],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

interface HeroBackgroundPathsProps {
    title: string;
    subtitle: string;
    primaryCTA: {
        text: string;
        href: string;
        badge?: string;
    };
    secondaryCTA?: {
        text: string;
        href: string;
    };
}


function PrimaryCTA({
    text,
    href,
    badge,
}: {
    text: string;
    href: string;
    badge?: string;
}) {
    return (
        <div className="relative inline-block group">
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    whileHover={{ opacity: 1, y: -45, scale: 1 }}
                    className="absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-black border border-[#FF1E1E]/30 rounded-full text-xs font-semibold text-white whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                    {badge}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black border-r border-b border-[#FF1E1E]/30 rotate-45" />
                </motion.div>
            )}

            <Link
                href={href}
                className="inline-block group/btn relative bg-linear-to-b from-[#FF1E1E]/10 to-white/10 
                p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl 
                transition-shadow duration-300"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-[1.15rem] px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-sm font-semibold 
                    bg-[#FF1E1E] hover:bg-white text-white hover:text-black transition-all duration-300 
                    flex items-center gap-2"
                >
                    <span className="opacity-100 transition-opacity">
                        {text}
                    </span>
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300" />
                </motion.div>
            </Link>
        </div>
    );
}

function SecondaryCTA({ text, href }: { text: string; href: string }) {
    return (
        <Link
            href={href}
            className="inline-block group relative bg-linear-to-b from-white/10 to-black/10 
            p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl 
            transition-shadow duration-300"
        >
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-[1.15rem] px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-sm font-semibold backdrop-blur-md 
                bg-white/10 hover:bg-white/20 text-white transition-all duration-300 
                flex items-center gap-2 border border-white/10"
            >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                    {text}
                </span>
                <span className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                    →
                </span>
            </motion.div>
        </Link>
    );
}

export default function HeroBackgroundPaths({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA,
}: HeroBackgroundPathsProps) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center pt-24 sm:pt-28 md:pt-32">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-6xl mx-auto"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-3 md:mr-4 lg:mr-5 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-linear-to-r from-white to-white/80"
                                    >
                                        {letter === " " ? "\u00A0" : letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-gray-400 text-md md:text-lg lg:text-lg max-w-4xl mx-auto mb-10 md:mb-12 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* Primary CTA */}
                        <PrimaryCTA
                            text={primaryCTA.text}
                            href={primaryCTA.href}
                            badge={primaryCTA.badge}
                        />

                        {/* Secondary CTA */}
                        {secondaryCTA && (
                            <SecondaryCTA
                                text={secondaryCTA.text}
                                href={secondaryCTA.href}
                            />
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
