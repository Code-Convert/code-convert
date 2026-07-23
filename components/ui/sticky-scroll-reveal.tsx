// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";

// export const StickyScroll = ({
//   content,
//   contentClassName,
// }: {
//   content: {
//     industry:string;
//     name: string;
//     description: string;
//     services: string[];
//     image: string;
//   }[];
//   contentClassName?: string;
// }) => {
//   const [activeCard, setActiveCard] = React.useState(0);
//   const ref = useRef<any>(null);
//   const { scrollYProgress } = useScroll({
//     //uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
//     // target: ref,
//     container: ref,
//     offset: ["start start", "end start"],
//   });
//   const cardLength = content.length;

//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     const cardsBreakpoints = content.map((_, index) => index / cardLength);
//     const closestBreakpointIndex = cardsBreakpoints.reduce(
//       (acc, breakpoint, index) => {
//         const distance = Math.abs(latest - breakpoint);
//         if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
//           return index;
//         }
//         return acc;
//       },
//       0,
//     );
//     setActiveCard(closestBreakpointIndex);
//   });

//   const backgroundColors = [
//     "#0f172a", // slate-900
//     "#000000", // black
//     "#171717", // neutral-900
//   ];
//   const linearGradients = [
//     "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
//     "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
//     "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
//   ];

//   const [backgroundGradient, setBackgroundGradient] = useState(
//     linearGradients[0],
//   );

//   useEffect(() => {
//     setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
//   }, [activeCard]);

//   return (
//     <motion.div
//       animate={{
//         backgroundColor: backgroundColors[activeCard % backgroundColors.length],
//       }}
//       className="relative h-screen overflow-y-auto scrollbar-none rounded-md"
//       ref={ref}
//     >
//       <div className="flex justify-center gap-10 lg:gap-20 px-4 lg:px-10 py-10">
//         {/* Left Column - Scrolling Content */}
//         <div className="w-full lg:w-1/2 max-w-2xl">
//           {content.map((item, index) => (
//             <div key={item.name + index} className="min-h-screen flex flex-col justify-center py-20">
              
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-[#FF1E1E] text-sm font-semibold"
//               >
//                 {item.industry}
//               </motion.p>
              
//               <motion.h3
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-3xl md:text-4xl lg:text-5xl font-bold"
//               >
//                 {item.name}
//               </motion.h3>
//               <motion.p
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: activeCard === index ? 1 : 0.3,
//                 }}
//                 className="text-gray-400 text-base sm:text-sm md:text-lg leading-relaxed max-w-xl"
//               >
//                 {item.description}
//               </motion.p>
              
//               <div className="pt-4">
//                 <p className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
//                   Services Delivered
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {item.services.map((service, idx) => (
//                     <span
//                       key={idx}
//                       className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
//                     >
//                       {service}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//             </div>
//           ))}
//         </div>

//         {/* Right Column - Sticky Image */}
//         <div className="hidden lg:block lg:w-1/2 max-w-2xl">
//           <div className="sticky top-10 h-[80vh]">
//             <div className="absolute inset-0 bg-linear-to-br from-[#FF1E1E]/20 to-transparent rounded-2xl blur-3xl" />
//             <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
//               <motion.div
//                 key={activeCard}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="w-full h-full relative"
//               >
//                 <Image
//                   src={content[activeCard].image}
//                   alt={content[activeCard].name}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };


"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    industry: string;
    name: string;
    description: string;
    services: string[];
    image: string;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    //uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref,
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#0f172a", // slate-900
    "#000000", // black
    "#171717", // neutral-900
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative h-screen overflow-y-auto scrollbar-none rounded-md"
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 px-4 lg:px-10 py-10">
        {/* Left Column - Scrolling Content */}
        <div className="w-full lg:w-1/2 max-w-2xl">
          {content.map((item, index) => (
            <div key={item.name + index} className="min-h-screen flex flex-col justify-center py-20">
              
              {/* Mobile Image - shown on top, hidden on lg+ */}
              <div className="block lg:hidden mb-6">
                <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                  <motion.div
                    key={`mobile-${activeCard}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-[#FF1E1E] text-sm font-semibold"
              >
                {item.industry}
              </motion.p>
              
              <motion.h3
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                {item.name}
              </motion.h3>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-gray-400 text-base sm:text-sm md:text-lg leading-relaxed max-w-xl"
              >
                {item.description}
              </motion.p>
              
              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                  Services Delivered
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column - Sticky Image (desktop only) */}
        <div className="hidden lg:block lg:w-1/2 max-w-2xl">
          <div className="sticky top-10 h-[80vh]">
            <div className="absolute inset-0 bg-linear-to-br from-[#FF1E1E]/20 to-transparent rounded-2xl blur-3xl" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={content[activeCard].image}
                  alt={content[activeCard].name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};