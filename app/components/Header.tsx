"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";
import { EMAIL } from "../../lib/constants";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

interface Profile {
  name?: string;
  email?: string;
}

interface HeaderProps {
  profile?: Profile;
}

export default function Header({ profile }: HeaderProps) {
  const name = profile?.name || "prakash";
  const email = profile?.email || EMAIL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Closed Menu Header */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMenuOpen ? "hidden" : ""
        }`}
      >
        {/* Background - Black initially, Glass effect on scroll */}
        <div
          className={`absolute inset-0 transition-all duration-300 backdrop-blur-xl backdrop-saturate-150 ${
            isScrolled ? "bg-black/40" : "bg-black/80"
          }`}
        >
          {/* Background Pattern - Show like Footer initially */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              isScrolled ? "opacity-5" : "opacity-10"
            }`}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: "200px 200px",
              }}
            />
          </div>
        </div>

        {/* Bottom Blurry Shadow Effect - Only show when scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%)",
                filter: "blur(20px)",
                transform: "translateY(10px)",
              }}
            />
          </div>
        )}

        <nav className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center z-10">
              <Logo name={name} />
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden text-white md:flex items-center gap-16 lg:gap-24 absolute left-1/2 transform -translate-x-1/2 z-10">
              {navLinks
                .filter((link) => link.href !== "/")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm md:text-base font-semibold text-white hover:text-white/80 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
            </div>

            {/* Hamburger Button - 2 lines */}
            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="w-6 h-0.5 bg-white transition-all duration-300" />
              <span className="w-6 h-0.5 bg-white transition-all duration-300" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Open Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header with Logo and Close Button */}
            <motion.div
              className="flex items-center justify-between px-6 lg:px-8 h-16 md:h-20 border-b border-white/10"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Logo name={name} />
              <button
                onClick={closeMenu}
                className="w-8 h-8 flex items-center justify-center relative"
                aria-label="Close menu"
              >
                <span className="absolute w-5 h-0.5 bg-white rotate-45" />
                <span className="absolute w-5 h-0.5 bg-white -rotate-45" />
              </button>
            </motion.div>

            {/* Centered Menu Items */}
            <div className="flex-1 flex items-center justify-center">
              <nav className="flex text-white flex-col items-center gap-8 md:gap-12">
                {navLinks.map((link, index) => (
                  <motion.a
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-4xl md:text-6xl font-bold text-white hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <motion.footer
              className="border-t border-white/10 px-6 lg:px-8 py-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  {/* Left - Contact Info */}
                  <div className="flex flex-col gap-2 text-sm text-white/80">
                    <Link
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors w-full"
                    >
                      <Mail className="w-4 h-4 shrink-0 text-white/60" />
                      <span className="truncate">{email}</span>
                    </Link>
                  </div>

                  {/* Center - Legal Links */}
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </div>

                  {/* Right - Copyright */}
                  <p className="text-sm text-white/80">
                    © 2025 {name.toLowerCase()}<sup className="text-xs">®</sup> Studio
                  </p>
                </div>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
