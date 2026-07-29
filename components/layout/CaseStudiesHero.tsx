'use client';

import { motion } from 'motion/react';

const socialTools = [
  {
    name: 'Instagram',
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    gradient: 'from-blue-600 to-blue-800',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Meta',
    gradient: 'from-blue-500 to-cyan-400',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.32 12.92c-1.13 0-2.07-.63-2.82-1.57-.86 1.05-1.84 1.57-2.92 1.57-1.83 0-3.18-1.29-3.18-3.07 0-2.4 2.12-4.32 5.38-4.32.49 0 .97.05 1.44.13v-.38c0-1.07-.75-1.72-2.01-1.72-.94 0-1.93.31-2.67.8l-.88-1.39c1.07-.73 2.47-1.12 3.89-1.12 2.47 0 4.02 1.35 4.02 3.66v4.6c0 .87.32 1.25.79 1.25.26 0 .55-.1.85-.29l.66 1.35c-.62.47-1.39.78-2.18.78zm-1.84-4.88c-.4-.08-.83-.12-1.25-.12-2.1 0-3.37 1.09-3.37 2.47 0 .88.65 1.48 1.57 1.48.81 0 1.57-.49 2.18-1.36v-2.47z" />
      </svg>
    ),
  },
  {
    name: 'Google Ads',
    gradient: 'from-red-500 via-yellow-400 to-green-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.987 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    gradient: 'from-neutral-600 to-neutral-900',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    gradient: 'from-red-600 to-red-800',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const ecommerceTools = [
  {
    name: 'Shopify',
    gradient: 'from-green-400 to-emerald-600',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.116-.194-.213-.194s-1.929-.136-1.929-.136-.271-.271-1.27-.271c0 0-.368-1.096-.716-1.793C15.337.891 14.378.5 13.594.5c-.019 0-.039 0-.058.002-.232-.31-.542-.446-.794-.446-1.967 0-2.916 2.461-3.207 3.713-.774.24-1.316.407-1.374.426-.426.135-.439.148-.494.552C7.612 5.1 6 17.9 6 17.9l9.337 2.079v4zm-2.604-21.4c-.271.084-.581.174-.91.271.271-1.045.794-2.071 1.413-2.75.232.484.445 1.161.445 1.161l-.948 1.318zm-1.374-.387c-.581.174-1.22.368-1.858.562.561-2.168 1.626-3.23 2.565-3.617-.426.852-.707 2.168-.707 3.055zm1.374-3.23c.174 0 .329.058.465.174-.929.426-1.929 1.51-2.352 3.675l-1.761.542c.484-1.645 1.626-4.391 3.648-4.391z" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    gradient: 'from-indigo-500 to-purple-600',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.583.92 3.442 1.637 3.442 2.612 0 .94-.85 1.517-2.327 1.517-2.172 0-4.992-.996-6.848-2.083l-.924 5.539C5.337 23.08 8.192 24 11.722 24c2.612 0 4.77-.653 6.307-1.871 1.583-1.254 2.41-3.088 2.41-5.367.001-4.131-2.467-5.831-6.463-7.612z" />
      </svg>
    ),
  },
  {
    name: 'PayPal',
    gradient: 'from-blue-500 to-blue-800',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .761-.643h6.58c3.27 0 5.738 1.481 5.342 4.966-.356 3.125-2.585 4.966-5.875 4.966H9.12l-1.127 7.153a.64.64 0 0 1-.632.535zM8.38 10.74h2.956c1.888 0 3.256-.99 3.473-2.887.21-1.838-.971-2.73-2.859-2.73H9.423l-1.043 5.617z" />
      </svg>
    ),
  },
  {
    name: 'ManyChat',
    gradient: 'from-orange-400 to-red-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.38C8.56 21.5 10.29 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    ),
  },
  {
    name: 'WooCommerce',
    gradient: 'from-purple-500 to-pink-600',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.062 6.326c-.328-.157-.704-.15-.101.02a.852.852 0 0 0-.285.161s-.007.007-.015.015c-.247.247-.457.54-.622.862l-2.077 4.035a11.13 11.13 0 0 0-.742 2.055 7.42 7.42 0 0 0-.255 1.582 3.12 3.12 0 0 1-.945-2.22 3.27 3.27 0 0 1 .48-1.725l1.635-3.18a.825.825 0 0 0-.015-.81.84.84 0 0 0-.727-.42h-3.69a.83.83 0 0 0-.742.45l-1.635 3.18a3.27 3.27 0 0 1-.48 1.725 3.12 3.12 0 0 1-.945 2.22 7.42 7.42 0 0 0-.255-1.582 11.13 11.13 0 0 0-.742-2.055L8.03 6.904a2.22 2.22 0 0 0-.622-.862s-.007-.007-.015-.015a.852.852 0 0 0-.285-.161c-.397-.172-.773-.178-1.101-.02-.328.158-.57.443-.68.803L3.15 13.95c-.24.78-.135 1.62.285 2.31.42.69 1.11 1.11 1.905 1.14h13.32c.795-.03 1.485-.45 1.905-1.14.42-.69.525-1.53.285-2.31l-2.175-7.302c-.11-.36-.352-.645-.68-.802z" />
      </svg>
    ),
  },
  {
    name: 'Amazon',
    gradient: 'from-amber-400 to-orange-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 0 1-10.951-.577 17.88 17.88 0 0 1-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.045-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.67 1.096-.06.3-.224.454-.49.454H8.77c-.27 0-.404-.15-.404-.45.015-1.064.45-1.89 1.32-2.48.87-.59 1.96-.885 3.27-.885 1.43 0 2.56.38 3.39 1.14.195.18.368.39.52.63.15.24.27.48.36.72.09.24.15.51.18.81.03.3.045.57.045.81v5.4c0 .3.06.57.18.81l.45.81c.06.12.09.24.09.36 0 .15-.075.27-.225.36l-2.07 1.395c-.18.12-.345.135-.495.045-.21-.165-.39-.345-.54-.54-.15-.195-.285-.405-.405-.63-.81.87-1.665 1.44-2.565 1.71-.6.18-1.26.27-1.98.27-1.05 0-1.92-.315-2.61-.945-.69-.63-1.035-1.5-1.035-2.61zm3.855.54c0 .51.12.915.36 1.215.24.3.57.45.99.45.15 0 .315-.015.495-.045.18-.03.345-.075.495-.135.45-.18.81-.495 1.08-.945.27-.45.405-.975.405-1.575v-.9c-.6.06-1.11.135-1.53.225-.42.09-.765.21-1.035.36-.27.15-.465.345-.585.585-.12.24-.18.525-.18.855l.505-.09z" />
      </svg>
    ),
  },
];

const designTools = [
  {
    name: 'Figma',
    gradient: 'from-purple-500 via-pink-500 to-red-400',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM8 0h4v8H8C5.792 8 4 6.208 4 4s1.792-4 4-4zm0 8h4v8H8c-2.208 0-4-1.792-4-4s1.792-4 4-4zm8 0c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8h4zm0 0c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V8h4z" />
      </svg>
    ),
  },
  {
    name: 'Adobe',
    gradient: 'from-red-500 to-orange-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.966 22h8.034l-8.034-18.729zm-3.932 0l-8.034-18.729h8.034zm-2.017-8.153h8.001l-4.001-9.339z" />
      </svg>
    ),
  },
  {
    name: 'Canva',
    gradient: 'from-teal-400 to-cyan-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.17 14.83c-.39.39-1.02.39-1.41 0l-3.76-3.76-3.76 3.76c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l3.76-3.76-3.76-3.76c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l3.76 3.76 3.76-3.76c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-3.76 3.76 3.76 3.76c.39.39.39 1.02 0 1.41z" />
      </svg>
    ),
  },
  {
    name: 'Framer',
    gradient: 'from-cyan-400 to-blue-600',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: 'Sketch',
    gradient: 'from-yellow-400 to-amber-500',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5L3.5 7l2.5 10.5L12 22.5l6-5 2.5-10.5L12 1.5zm0 3.2l5.1 3.3-2.1 7.1H8.9L6.9 8 12 4.7z" />
      </svg>
    ),
  },
  {
    name: 'InVision',
    gradient: 'from-pink-500 to-rose-600',
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 17.25h-3v-3h3v3zm0-4.5h-3v-7.5h3v7.5zm4.5 4.5h-3v-10.5h3v10.5z" />
      </svg>
    ),
  },
];

interface Tool {
  name: string;
  gradient: string;
  icon: React.ReactNode;
}

function MarqueeColumn({
  tools,
  direction = 'up',
  duration = 28,
}: {
  tools: Tool[];
  direction?: 'up' | 'down';
  duration?: number;
}) {
  const duplicated = [...tools, ...tools, ...tools, ...tools];

  return (
    <div className="flex-1 overflow-hidden h-full">
      <motion.div
        className="flex flex-col gap-5 sm:gap-7 items-center"
        animate={{
          y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className="group flex flex-col items-center gap-2 cursor-default"
          >
            <div
              className={`p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(255,30,30,0.5)] group-hover:scale-110`}
            >
              {tool.icon}
            </div>
            <span className="text-neutral-500 group-hover:text-neutral-300 font-medium text-[10px] sm:text-xs text-center whitespace-nowrap transition-colors duration-300">
              {tool.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

function LeftColumn() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-start px-4 sm:px-6 lg:px-8 xl:px-16 py-24 lg:py-0 z-20">
      <div className="max-w-xl w-full">

        {/* Badge pill — matches site pattern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase border border-[#FF1E1E]/15 bg-[#FF1E1E]/5 text-[#FF1E1E] mb-6 md:mb-8"
        >
          Our Work
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[0.95] mb-5 md:mb-7 text-white drop-shadow-[0_4px_32px_rgba(0,0,0,1)]"
        >
          Case{' '}
          <span className="bg-[linear-gradient(135deg,#FF1E1E_0%,#FF5555_50%,#FF1E1E_100%)] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,30,30,0.6)]">
            Studies
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed max-w-md mb-8 md:mb-10"
        >
          Real results from real projects. See how we&apos;ve helped businesses grow.
        </motion.p>
      </div>
    </div>
  );
}

function RightColumn() {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-full lg:relative lg:w-1/2 h-full flex items-center justify-center overflow-hidden pointer-events-none lg:pointer-events-auto">

      {/* Fade overlays using site background colour */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Mobile: darken left side so left column text stays readable */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
        {/* Left fade (desktop only) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent" />
      </div>

      {/* Three marquee columns */}
      <div
        className="flex gap-5 sm:gap-8 lg:gap-10 h-[80vh] max-h-[700px] overflow-hidden opacity-40 lg:opacity-100 transition-opacity duration-500"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <MarqueeColumn tools={socialTools} direction="up" duration={28} />
        <MarqueeColumn tools={ecommerceTools} direction="down" duration={32} />
        <MarqueeColumn tools={designTools} direction="up" duration={38} />
      </div>

    </div>
  );
}

export default function CaseStudiesHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center">

      {/* Ambient red glows — matches site Hero pattern */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl bg-[#FF1E1E]/[0.025] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-[#FF1E1E]/[0.02] pointer-events-none" />

      {/* Dot grid overlay — matches site Hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=\")",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 flex flex-row w-full min-h-screen items-center">
        <LeftColumn />
        <RightColumn />
      </div>

      {/* Scroll indicator — matches site Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-5 h-8 rounded-full border border-white/8 flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-white/20 rounded-full" />
        </div>
      </motion.div>

    </section>
  );
}
