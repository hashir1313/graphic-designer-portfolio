"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

interface Profile {
  aboutMe1?: string;
  aboutMe2?: string;
}

interface AboutProps {
  profile?: Profile;
}

export default function About({ profile }: AboutProps) {
  const aboutMe1 =
    profile?.aboutMe1 ||
    "I'm a passionate Graphic Designer and Video Editor dedicated to transforming creative visions into compelling visual narratives. With expertise spanning brand identity, motion graphics, and video production, I craft designs that resonate and engage.";
  const aboutMe2 =
    profile?.aboutMe2 ||
    "Every project is an opportunity to blend creativity with strategy, creating visual stories that not only look exceptional but also drive results and leave lasting impressions.";
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-24 lg:py-28"
    >
      {/* Main Container */}
      <div className="relative z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)] max-w-7xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Corner Marks */}
          {[
            "top-4 left-4",
            "top-4 right-4",
            "bottom-4 left-4",
            "bottom-4 right-4",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} text-white/30 text-lg md:text-xl font-light z-10`}
            >
              +
            </div>
          ))}

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Heading */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight mb-4 md:mb-6 tracking-tight">
                About
              </h2>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/80">
                  Me
                </p>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col justify-center text-white space-y-6 md:space-y-8"
            >
              {aboutMe1 && (
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80"
                >
                  {aboutMe1}
                </motion.p>
              )}

              {aboutMe2 && (
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80"
                >
                  {aboutMe2}
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
