"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";

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
    imageSrc?: string;
    imageAlt?: string;
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
                    <span className="opacity-100 transition-opacity">{text}</span>
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
    imageSrc = "/your-image.png",
    imageAlt = "Hero illustration",
}: HeroBackgroundPathsProps) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black">
            {/* Background: Paper Shaders MeshGradient */}
            <div className="absolute inset-0 z-0">
                <MeshGradient
                    colors={["#000000", "#1a1a1a", "#3d3d3d", "#FF1E1E", "#FF6B6B"]}
                    distortion={0.8}
                    swirl={0.3}
                    grainMixer={0.1}
                    grainOverlay={0.05}
                    speed={0.4}
                    style={{ width: "100%", height: "100%" }}
                />
                {/* Dark overlay to keep text readable */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* ─── Hero Section ─── */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* LEFT: Text + Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="order-2 lg:order-1"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-5 sm:mb-6 md:mb-8 tracking-tight leading-[1.1] sm:leading-tight text-left">
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className="inline-block mr-2 sm:mr-3 md:mr-4 lg:mr-3 last:mr-0"
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
                                            className="inline-block text-transparent bg-clip-text bg-linear-to-r from-white to-white/80"
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
                            className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed text-left"
                        >
                            {subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
                        >
                            <PrimaryCTA
                                text={primaryCTA.text}
                                href={primaryCTA.href}
                                badge={primaryCTA.badge}
                            />
                            {secondaryCTA && (
                                <SecondaryCTA
                                    text={secondaryCTA.text}
                                    href={secondaryCTA.href}
                                />
                            )}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Your Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative  object-fill rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm hidden lg:block">
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}