"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Button from "./Button";
import { EMAIL } from "../layout";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const skills = [
    "Graphic Design",
    "Video Editing",
    "Motion Graphics",
    "Brand Identity",
  ];

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-black via-gray-900 to-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover min-h-full min-w-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src="/assets/hero-section-main-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight">
              <span className="block">I'm</span>
              <span className="block bg-linear-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                Prakash
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light max-w-xl">
              Graphic Designer & Video Editor
              <br />
              <span className="text-white/60">
                Crafting visual stories that inspire and engage
              </span>
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
              Transforming ideas into captivating visuals. Specializing in brand
              identity, motion graphics, and video production that tells your
              story with impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                variant="filled"
                size="md"
                icon="→"
                onClick={() => (window.location.href = "#projects")}
              >
                View My Work
              </Button>
              <Button
                variant="blank"
                size="md"
                onClick={() => (window.location.href = "#contact")}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Column - Skills & Profile */}
          <div className="flex flex-col space-y-6 lg:space-y-8">
            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-5 md:p-6 hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium text-center">
                    {skill}
                  </p>
                </div>
              ))}
            </div>

            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                {/* Profile Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden border-2 border-white/30 shrink-0">
                  <Image
                    src="/assets/profile-picture.png"
                    alt="Prakash - Graphic Designer & Video Editor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                    priority
                  />
                </div>

                {/* Profile Info */}
                <div className="flex flex-col text-white flex-1">
                  <p className="text-xs sm:text-sm md:text-base text-white/70 font-medium">
                    Available for Projects
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-1">
                    Prakash Katariya
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-white/60 mt-1">
                    Graphic Designer & Video Editor
                  </p>
                  <Button
                    variant="blank"
                    size="sm"
                    icon={<Mail className="w-4 h-4" />}
                    className="mt-3 sm:mt-4 w-fit"
                    onClick={() => (window.location.href = `mailto:${EMAIL}`)}
                  >
                    Let's Collaborate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-linear-to-b from-white/60 to-transparent" />
        </div>
      </div>

      {/* Corner Decorations */}
      {[
        { pos: "top-4 left-4", rot: "rotate-0" },
        { pos: "top-4 right-4", rot: "rotate-90" },
        { pos: "bottom-4 left-4", rot: "rotate-270" },
        { pos: "bottom-4 right-4", rot: "rotate-180" },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} ${corner.rot} text-white/30 text-2xl sm:text-3xl md:text-4xl font-light z-20`}
        >
          +
        </div>
      ))}
    </section>
  );
}
