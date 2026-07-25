"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";
import Button from "../components/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* Corner Marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/30 z-10" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/30 z-10" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/30 z-10" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/30 z-10" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[15rem] font-bold text-white/90 tracking-tight leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            variant="filled"
            size="lg"
            onClick={() => router.push("/")}
            icon={<Home className="w-5 h-5" />}
            className="w-full sm:w-auto"
          >
            Go Home
          </Button>
          <Button
            variant="blank"
            size="lg"
            onClick={() => router.back()}
            icon={<ArrowLeft className="w-5 h-5" />}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex items-center gap-4 text-white/40 text-sm">
          <span className="w-12 h-px bg-white/30" />
          <span className="font-mono">404</span>
          <span className="w-12 h-px bg-white/30" />
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
