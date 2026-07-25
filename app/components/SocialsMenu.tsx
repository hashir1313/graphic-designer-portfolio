import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SocialLink {
  platform: string;
  url: string;
}

interface SocialsMenuProps {
  socials?: SocialLink[];
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "instagram":
      return <Instagram className="w-5 h-5 md:w-6 md:h-6" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5 md:w-6 md:h-6" />;
    case "github":
      return <Github className="w-5 h-5 md:w-6 md:h-6" />;
    case "twitter":
      return <Twitter className="w-5 h-5 md:w-6 md:h-6" />;
    default:
      return null;
  }
};

const defaultSocials: SocialLink[] = [
  {
    platform: "Instagram",
    url: "https://www.instagram.com/k.p_ahir_official",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/prakash-katariya-3667b8250",
  },
  {
    platform: "GitHub",
    url: "https://github.com/mayurnakum07",
  },
];

const SocialsMenu = ({ socials }: SocialsMenuProps) => {
  const displaySocials = socials && socials.length > 0 ? socials : defaultSocials;

  return (
    <nav>
      <ul className="flex space-x-6 font-bold text-[20px]">
        {displaySocials.map((social, index) => {
          const icon = getSocialIcon(social.platform);
          if (!icon) return null;
          return (
            <li
              key={index}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                {icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SocialsMenu;
