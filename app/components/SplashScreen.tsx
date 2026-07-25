"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface SplashScreenProps {
  name?: string;
}

export default function SplashScreen({ name }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const text = name ? `${name}®` : "Prakash®";
  const characters = text.split("");

  // Animation timing controls
  const delayPerChar = 0.08; // Delay between each char
  const charDuration = 0.35; // Duration for each char animation
  const holdDuration = 0.8; // Hold before slide up
  const slideUpDuration = 0.8; // Duration for screen exit

  useEffect(() => {
    // Disable scroll during splash
    document.body.style.overflow = isVisible ? "hidden" : "";

    // Calculate full animation timeline
    const totalCharTime = characters.length * delayPerChar + charDuration;
    const totalTime = totalCharTime + holdDuration + slideUpDuration;

    const timer = setTimeout(() => setIsVisible(false), totalTime * 400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isVisible, characters.length]);

  const containerVariants: Variants = {
    exit: {
      y: "-100%",
      transition: { duration: slideUpDuration, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delayPerChar,
        duration: charDuration,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Background Pattern - Matching App Theme */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: "200px 200px",
              }}
            />
          </div>

          {/* Corner Marks - Matching App Theme */}
          <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/30" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/30" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/30" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/30" />

          {/* Main Logo Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative z-10 flex items-baseline justify-center"
          >
            {characters.map((char, i) =>
              char === "®" ? (
                <motion.sup
                  key={i}
                  variants={charVariants}
                  custom={i}
                  className="text-white font-bold inline-block"
                  style={{
                    fontSize: "0.5em",
                    verticalAlign: "super",
                    lineHeight: 0,
                  }}
                >
                  ®
                </motion.sup>
              ) : (
                <motion.span
                  key={i}
                  variants={charVariants}
                  custom={i}
                  className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold inline-block tracking-tight"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              )
            )}
          </motion.div>

          {/* Subtle Glow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
