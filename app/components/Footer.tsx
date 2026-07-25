"use client";

import { Download, Mail, MapPin } from "lucide-react";
import SocialsMenu from "./SocialsMenu";
import Button from "./Button";
import Link from "next/link";
import { EMAIL } from "../../lib/constants";

interface Profile {
  email?: string;
  location?: string;
  socials?: any[];
  resume?: {
    asset?: {
      url?: string;
    };
  };
}

interface FooterProps {
  profile?: Profile;
}

const Footer = ({ profile }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const email = profile?.email || EMAIL;
  const location = profile?.location || "Surat, Gujarat, India";
  const resumeUrl = profile?.resume?.asset?.url;

  return (
    <footer className="relative w-full bg-black/95 backdrop-blur-md border-t border-white/10 mt-auto">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 text-center md:text-left mb-4">
          {/* Menubar */}
          <section className="flex justify-center md:justify-start">
            {/* <Menubar isContactVisible={true} /> */}
          </section>

          {/* Socials Menu */}
          <section className="flex md:flex-col justify-center md:justify-start md:items-end">
            <SocialsMenu socials={profile?.socials} />
          </section>

          {/* Get in Touch */}
          <section className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-xl md:text-2xl font-semibold text-white">
              Interested in working together?
            </h1>
            <div className="mt-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
              <Link href="#contact">
                <Button variant="filled" size="md">
                  Get in Touch
                </Button>
              </Link>
              <Button
                size="md"
                icon={<Download className="w-4 h-4" />}
                onClick={() => {
                  if (resumeUrl) {
                    window.open(resumeUrl, "_blank");
                  } else {
                    alert("Resume/CV is not uploaded yet!");
                  }
                }}
              >
                Download CV
              </Button>
            </div>
          </section>

          {/* Copyright */}
          <section className="flex flex-col justify-center items-center md:items-end">
            <div className="text-sm md:text-base text-white/60 text-center md:text-right">
              <p>© {currentYear} All Rights Reserved.</p>
              <p className="hover:text-white transition-colors">
                <Link
                  href="https://mayurnakum-portfolio.vercel.app"
                  target="_blank"
                  className="mt-1"
                >
                  Made with 🤍 by Mayur Nakum
                </Link>
              </p>
            </div>
          </section>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <div className="hover:text-white transition-colors flex items-center gap-4">
              <Link
                href={`mailto:${email}`}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
