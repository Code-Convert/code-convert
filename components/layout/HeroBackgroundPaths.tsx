"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function HeroBackgroundPaths({
    title,
    subtitle,
    primaryCTA,
    secondaryCTA,
}: HeroBackgroundPathsProps) {
    return (
        <div className="relative w-full flex flex-col overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48Y2lyY2xlIGN4PSIyMyIgY3k9IjQ1IiByPSIwLjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xOCkiLz48Y2lyY2xlIGN4PSI4NyIgY3k9IjEyIiByPSIxLjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48Y2lyY2xlIGN4PSIxNTYiIGN5PSI3OCIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMjMpIi8+PGNpcmNsZSBjeD0iMzQiIGN5PSIxMzQiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjxjaXJjbGUgY3g9IjExMiIgY3k9IjE2NyIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PGNpcmNsZSBjeD0iMTc4IiBjeT0iMjMiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjExKSIvPjxjaXJjbGUgY3g9IjY3IiBjeT0iODkiIHI9IjAuNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEzKSIvPjxjaXJjbGUgY3g9IjE0NSIgY3k9IjE0NSIgcj0iMS4yIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjE4OSIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMjEpIi8+PGNpcmNsZSBjeD0iMTkxIiBjeT0iMTEyIiByPSIxLjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOSkiLz48Y2lyY2xlIGN4PSI1NiIgY3k9IjI1NiIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTMpIi8+PGNpcmNsZSBjeD0iMjIzIiBjeT0iMzQiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA3KSIvPjxjaXJjbGUgY3g9IjI4OSIgY3k9IjE2NyIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTkpIi8+PGNpcmNsZSBjeD0iMTc4IiBjeT0iMjc4IiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz48Y2lyY2xlIGN4PSIzNjciIGN5PSI0NSIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSIzMTIiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjxjaXJjbGUgY3g9IjMzNCIgY3k9Ijg5IiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMykiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjM2NyIgcj0iMS4yIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIi8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMjQ1IiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNykiLz48Y2lyY2xlIGN4PSIzNjciIGN5PSIyODkiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PGNpcmNsZSBjeD0iMjQ1IiBjeT0iMzU2IiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMikiLz48Y2lyY2xlIGN4PSIxMjMiIGN5PSIzMzQiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjxjaXJjbGUgY3g9IjM4OSIgY3k9IjE1NiIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiLz48Y2lyY2xlIGN4PSIyNTYiIGN5PSIxMjMiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA3KSIvPjxjaXJjbGUgY3g9Ijc4IiBjeT0iMzc4IiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMSkiLz48Y2lyY2xlIGN4PSIzMTIiIGN5PSIzNzgiIHI9IjEuMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjxjaXJjbGUgY3g9IjE4OSIgY3k9IjM4OSIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTQpIi8+PGNpcmNsZSBjeD0iMzg5IiBjeT0iMzM0IiByPSIxLjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48Y2lyY2xlIGN4PSIxMzQiIGN5PSIyMTIiIHI9IjAuNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE2KSIvPjxjaXJjbGUgY3g9IjM1NiIgY3k9IjIxMiIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTEpIi8+PGNpcmNsZSBjeD0iMzI3IiBjeT0iNTciIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjxjaXJjbGUgY3g9IjEyNSIgY3k9IjExNCIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PGNpcmNsZSBjeD0iMzQ2IiBjeT0iMzc5IiByPSIxLjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNikiLz48Y2lyY2xlIGN4PSIyMTYiIGN5PSIxNiIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIi8+PGNpcmNsZSBjeD0iMTE5IiBjeT0iMjU4IiByPSIxLjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48Y2lyY2xlIGN4PSIxMDEiIGN5PSIzNjYiIHI9IjEuMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE0KSIvPjxjaXJjbGUgY3g9IjIxNCIgY3k9IjExMiIgcj0iMC44IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTMpIi8+PGNpcmNsZSBjeD0iMyIgY3k9IjM4OCIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTQpIi8+PGNpcmNsZSBjeD0iMTc0IiBjeT0iMTQyIiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48Y2lyY2xlIGN4PSIzOTAiIGN5PSIxNzIiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjxjaXJjbGUgY3g9IjQ5IiBjeT0iMTgzIiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMykiLz48Y2lyY2xlIGN4PSIyMiIgY3k9IjM3MyIgcj0iMC44IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTIpIi8+PGNpcmNsZSBjeD0iMTkzIiBjeT0iNDAiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA5KSIvPjxjaXJjbGUgY3g9IjMyMSIgY3k9IjMxNiIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTMpIi8+PGNpcmNsZSBjeD0iMzYwIiBjeT0iMzUiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE0KSIvPjxjaXJjbGUgY3g9IjM5NSIgY3k9IjE0OCIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTYpIi8+PGNpcmNsZSBjeD0iNTEiIGN5PSIxOTQiIHI9IjAuNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjExKSIvPjxjaXJjbGUgY3g9IjE4NiIgY3k9IjgzIiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjxjaXJjbGUgY3g9IjM0MyIgY3k9IjEzNiIgcj0iMS4yIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTcpIi8+PGNpcmNsZSBjeD0iMzMxIiBjeT0iMzYiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEzKSIvPjxjaXJjbGUgY3g9IjI3MyIgY3k9IjM3MyIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDcpIi8+PGNpcmNsZSBjeD0iMTk0IiBjeT0iMTM4IiByPSIxLjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNCkiLz48Y2lyY2xlIGN4PSIxMTIiIGN5PSIzNTAiIHI9IjAuNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE2KSIvPjxjaXJjbGUgY3g9IjM5NyIgY3k9IjI4IiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNikiLz48Y2lyY2xlIGN4PSIxNjEiIGN5PSIyMDUiIHI9IjAuNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjxjaXJjbGUgY3g9IjI5MCIgY3k9IjM2NyIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PGNpcmNsZSBjeD0iMjU1IiBjeT0iMjAyIiByPSIxLjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMSkiLz48Y2lyY2xlIGN4PSIxMzUiIGN5PSI3MSIgcj0iMC42IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PGNpcmNsZSBjeD0iMjc1IiBjeT0iMTM0IiByPSIxLjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMykiLz48Y2lyY2xlIGN4PSIyOTgiIGN5PSIyMDQiIHI9IjAuNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iMjYwIiByPSIwLjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNikiLz48Y2lyY2xlIGN4PSIyNCIgY3k9IjU2IiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMykiLz48Y2lyY2xlIGN4PSIzNDgiIGN5PSIyMTYiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjxjaXJjbGUgY3g9IjE5NSIgY3k9IjMwNSIgcj0iMC44IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTIpIi8+PGNpcmNsZSBjeD0iMjgzIiBjeT0iNSIgcj0iMS4yIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTQpIi8+PGNpcmNsZSBjeD0iMzQ5IiBjeT0iMjc0IiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48Y2lyY2xlIGN4PSIxNzQiIGN5PSI1NyIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTEpIi8+PGNpcmNsZSBjeD0iMjMyIiBjeT0iMSIgcj0iMS4yIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTYpIi8+PGNpcmNsZSBjeD0iMTM0IiBjeT0iMjU2IiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMikiLz48Y2lyY2xlIGN4PSI1NCIgY3k9IjMyMCIgcj0iMC43IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTYpIi8+PGNpcmNsZSBjeD0iMjU5IiBjeT0iMzExIiByPSIwLjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48Y2lyY2xlIGN4PSIzOTAiIGN5PSI4MiIgcj0iMS4wIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTcpIi8+PGNpcmNsZSBjeD0iMjcxIiBjeT0iMCIgcj0iMS4wIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDkpIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjU3IiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNikiLz48Y2lyY2xlIGN4PSIxNTciIGN5PSIxMjIiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjxjaXJjbGUgY3g9IjI5MCIgY3k9IjQwIiByPSIwLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjM4OSIgcj0iMS4wIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PGNpcmNsZSBjeD0iNjUiIGN5PSIzMzciIHI9IjAuOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE3KSIvPjxjaXJjbGUgY3g9Ijg0IiBjeT0iMTM1IiByPSIxLjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNikiLz48Y2lyY2xlIGN4PSIyMTYiIGN5PSIxMDgiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjxjaXJjbGUgY3g9IjM1MyIgY3k9IjEwMiIgcj0iMS4yIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDkpIi8+PGNpcmNsZSBjeD0iMzQzIiBjeT0iMzMyIiByPSIwLjciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMSkiLz48Y2lyY2xlIGN4PSIyNjQiIGN5PSIyMzEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMTczIiByPSIwLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMykiLz48Y2lyY2xlIGN4PSIxMTciIGN5PSIzMDEiIHI9IjAuNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjxjaXJjbGUgY3g9IjM2MiIgY3k9IjMyMyIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNjkiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEyKSIvPjxjaXJjbGUgY3g9IjE0MiIgY3k9IjM0MiIgcj0iMC44IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PGNpcmNsZSBjeD0iNjciIGN5PSIzNzAiIHI9IjEuMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEyKSIvPjxjaXJjbGUgY3g9IjEyNCIgY3k9IjI0MiIgcj0iMC44IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDcpIi8+PGNpcmNsZSBjeD0iNDkiIGN5PSIzMzciIHI9IjAuOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PGNpcmNsZSBjeD0iMjEwIiBjeT0iMjM5IiByPSIxLjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNikiLz48Y2lyY2xlIGN4PSIzMzQiIGN5PSIzMzAiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA2KSIvPjxjaXJjbGUgY3g9IjM3MiIgY3k9IjE3MyIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIi8+PGNpcmNsZSBjeD0iOTciIGN5PSIyNzQiIHI9IjAuOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA3KSIvPjxjaXJjbGUgY3g9IjkzIiBjeT0iMTQyIiByPSIwLjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48Y2lyY2xlIGN4PSIzOCIgY3k9IjIyNiIgcj0iMS4wIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIi8+PGNpcmNsZSBjeD0iMzMzIiBjeT0iMjc2IiByPSIwLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xOCkiLz48Y2lyY2xlIGN4PSIzODUiIGN5PSIxMjEiIHI9IjAuNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PGNpcmNsZSBjeD0iMjQ2IiBjeT0iMTA5IiByPSIwLjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNykiLz48L3N2Zz4=')]">
            {/* Stars — tiny pinpoint dots */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.72]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5.2%" cy="8.1%" r="0.06%" fill="rgba(255,255,255,0.5)"/> <circle cx="12.7%" cy="3.4%" r="0.05%" fill="rgba(255,255,255,0.4)"/> <circle cx="22.1%" cy="14.6%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="31.4%" cy="6.2%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="41.8%" cy="11.3%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="53.3%" cy="4.7%" r="0.07%" fill="rgba(255,255,255,0.5)"/> <circle cx="62.9%" cy="9.8%" r="0.05%" fill="rgba(255,255,255,0.4)"/> <circle cx="74.1%" cy="2.9%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="83.6%" cy="7.4%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="92.4%" cy="13.1%" r="0.07%" fill="rgba(255,255,255,0.45)"/> <circle cx="7.8%" cy="21.5%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="18.3%" cy="27.9%" r="0.06%" fill="rgba(255,255,255,0.4)"/> <circle cx="28.7%" cy="19.2%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="38.2%" cy="33.6%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="47.6%" cy="24.8%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="57.1%" cy="31.3%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="66.4%" cy="18.7%" r="0.07%" fill="rgba(255,255,255,0.4)"/> <circle cx="77.9%" cy="26.4%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="87.3%" cy="22.1%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="96.8%" cy="29.7%" r="0.07%" fill="rgba(255,255,255,0.45)"/> <circle cx="3.1%" cy="38.4%" r="0.06%" fill="rgba(255,255,255,0.5)"/> <circle cx="14.6%" cy="42.7%" r="0.05%" fill="rgba(255,255,255,0.4)"/> <circle cx="24.9%" cy="47.3%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="35.7%" cy="41.8%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="45.2%" cy="53.6%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="55.8%" cy="44.9%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="65.3%" cy="51.2%" r="0.07%" fill="rgba(255,255,255,0.4)"/> <circle cx="75.6%" cy="38.7%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="85.1%" cy="46.4%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="94.7%" cy="42.1%" r="0.07%" fill="rgba(255,255,255,0.45)"/> <circle cx="9.4%" cy="57.8%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="19.8%" cy="63.2%" r="0.06%" fill="rgba(255,255,255,0.4)"/> <circle cx="30.2%" cy="58.6%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="41.6%" cy="67.4%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="51.9%" cy="61.8%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="62.4%" cy="69.3%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="72.8%" cy="55.7%" r="0.07%" fill="rgba(255,255,255,0.4)"/> <circle cx="82.2%" cy="63.1%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="91.7%" cy="57.4%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="4.3%" cy="74.6%" r="0.07%" fill="rgba(255,255,255,0.45)"/> <circle cx="15.7%" cy="79.2%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="26.1%" cy="72.8%" r="0.06%" fill="rgba(255,255,255,0.4)"/> <circle cx="36.4%" cy="81.4%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="47.8%" cy="76.9%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="58.2%" cy="83.3%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="68.7%" cy="77.6%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="79.1%" cy="84.8%" r="0.07%" fill="rgba(255,255,255,0.4)"/> <circle cx="89.6%" cy="71.3%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="97.2%" cy="78.9%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="10.6%" cy="91.7%" r="0.07%" fill="rgba(255,255,255,0.45)"/> <circle cx="21.3%" cy="87.4%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="32.8%" cy="93.1%" r="0.06%" fill="rgba(255,255,255,0.4)"/> <circle cx="43.2%" cy="88.6%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="54.7%" cy="94.3%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="64.1%" cy="89.8%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="74.6%" cy="95.2%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="85.3%" cy="90.7%" r="0.07%" fill="rgba(255,255,255,0.4)"/> <circle cx="93.9%" cy="86.4%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="2.7%" cy="16.3%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="48.4%" cy="16.1%" r="0.07%" fill="rgba(255,255,255,0.45)"/> <circle cx="70.3%" cy="35.2%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="16.9%" cy="52.4%" r="0.06%" fill="rgba(255,255,255,0.4)"/> <circle cx="88.4%" cy="33.7%" r="0.07%" fill="rgba(255,255,255,0.55)"/> <circle cx="33.6%" cy="66.1%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="59.7%" cy="48.3%" r="0.06%" fill="rgba(255,255,255,0.45)"/> <circle cx="78.4%" cy="67.9%" r="0.05%" fill="rgba(255,255,255,0.5)"/> <circle cx="23.5%" cy="83.7%" r="0.07%" fill="rgba(255,255,255,0.4)"/> <circle cx="49.3%" cy="35.7%" r="0.06%" fill="rgba(255,255,255,0.55)"/> <circle cx="6.8%" cy="46.2%" r="0.05%" fill="rgba(255,255,255,0.35)"/> <circle cx="95.1%" cy="53.8%" r="0.07%" fill="rgba(255,255,255,0.45)"/>
            </svg>

            {/* Shooting stars */}
            <style>{`
              @keyframes shoot1 {
                0%   { transform: translate(0, 0) rotate(35deg); opacity: 0; width: 0px; }
                4%   { opacity: 1; width: 120px; }
                22%  { transform: translate(480px, 336px) rotate(35deg); opacity: 0; width: 120px; }
                100% { transform: translate(480px, 336px) rotate(35deg); opacity: 0; width: 120px; }
              }
              @keyframes shoot2 {
                0%   { transform: translate(0, 0) rotate(30deg); opacity: 0; width: 0px; }
                4%   { opacity: 1; width: 90px; }
                20%  { transform: translate(380px, 220px) rotate(30deg); opacity: 0; width: 90px; }
                100% { transform: translate(380px, 220px) rotate(30deg); opacity: 0; width: 90px; }
              }
              @keyframes shoot3 {
                0%   { transform: translate(0, 0) rotate(40deg); opacity: 0; width: 0px; }
                4%   { opacity: 1; width: 150px; }
                25%  { transform: translate(560px, 470px) rotate(40deg); opacity: 0; width: 150px; }
                100% { transform: translate(560px, 470px) rotate(40deg); opacity: 0; width: 150px; }
              }
            `}</style>
            <div style={{
              position: 'absolute', top: '12%', left: '18%', height: '1.5px',
              background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.8) 100%)',
              borderRadius: '999px', animation: 'shoot1 14s 1s infinite',
            }} />
            <div style={{
              position: 'absolute', top: '6%', left: '55%', height: '1px',
              background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.44) 60%, rgba(255,255,255,0.75) 100%)',
              borderRadius: '999px', animation: 'shoot2 18s 7s infinite',
            }} />
            <div style={{
              position: 'absolute', top: '20%', left: '5%', height: '1.5px',
              background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.47) 60%, rgba(255,255,255,0.78) 100%)',
              borderRadius: '999px', animation: 'shoot3 22s 13s infinite',
            }} />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24 text-center">
                {/* Badge pill */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-white/20 bg-white/[0.06] text-white/70 mb-6 md:mb-8"
                >
                    Our Services
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5 md:mb-6 text-white"
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-base sm:text-lg text-neutral-400 font-bold leading-relaxed max-w-xl mx-auto mb-8 md:mb-10"
                >
                    {subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link
                        href={primaryCTA.href}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-full bg-[#FF1E1E] text-white hover:bg-white hover:text-[#050505] hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
                    >
                        {primaryCTA.text}
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    {secondaryCTA && (
                        <Link
                            href={secondaryCTA.href}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-full border border-white/10 text-white bg-transparent hover:border-white/20 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
                        >
                            {secondaryCTA.text}
                            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
