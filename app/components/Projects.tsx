"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { urlFor } from "../../lib/sanity/image";

interface Project {
  _id: string;
  image: any;
  title: string;
  description: string;
  category: string;
  projectLink?: string;
}

interface ProjectsProps {
  projects?: Project[];
}

const staticProjects: Project[] = [
  {
    _id: "1",
    image: "/assets/projects/project-iamge1.png",
    title: "Brand Identity Design",
    description:
      "Complete brand identity system with logo, color palette, and brand guidelines for a modern tech startup.",
    category: "Branding",
  },
  {
    _id: "2",
    image: "/assets/projects/project-iamge2.png",
    title: "Motion Graphics Showreel",
    description:
      "Dynamic motion graphics showcase featuring animations, transitions, and visual effects for digital campaigns.",
    category: "Motion Graphics",
  },
  {
    _id: "3",
    image: "/assets/projects/project-iamge3.png",
    title: "Video Production Portfolio",
    description:
      "Corporate video production with cinematic visuals, storytelling, and professional post-production editing.",
    category: "Video Editing",
  },
  {
    _id: "4",
    image: "/assets/projects/project-iamge4.png",
    title: "Creative Campaign Design",
    description:
      "Multi-platform marketing campaign with cohesive visual design across digital and print media.",
    category: "Graphic Design",
  },
  {
    _id: "5",
    image: "/assets/projects/project-iamge5.png",
    title: "Product Launch Video",
    description:
      "Product launch video featuring cinematic footage, motion graphics, and engaging storytelling.",
    category: "Video Production",
  },
  {
    _id: "6",
    image: "/assets/projects/project-iamge6.png",
    title: "Digital Marketing Content",
    description:
      "Social media content series with animated graphics, video snippets, and engaging visual storytelling.",
    category: "Motion Graphics",
  },
];

export default function Projects({ projects }: ProjectsProps) {
  const displayProjects = projects && projects.length > 0 ? projects : staticProjects;
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-24 lg:py-28"
    >
      {/* Main Container */}
      <div className="relative z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)] max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-4">
            Projects
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-2xl">
            A curated selection of creative work showcasing design, motion
            graphics, and video production expertise.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
        >
          {displayProjects.map((project, index) => (
            <motion.a
              key={project._id}
              href={project.projectLink || `#project-${project._id}`}
              onClick={(e) => {
                if (!project.projectLink) {
                  e.preventDefault();
                  // Fake link - can be replaced with actual project page
                  console.log(`Opening project: ${project.title}`);
                }
              }}
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative block cursor-pointer"
            >
              {/* Project Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-72 xl:h-80 overflow-hidden">
                  <Image
                    src={
                      typeof project.image === "string"
                        ? project.image
                        : urlFor(project.image).width(600).height(450).url()
                    }
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* External Link Icon */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
