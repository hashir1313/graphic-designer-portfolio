import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Contact from "../components/Contact";
import { Metadata, Viewport } from "next";
import { client } from "../../lib/sanity/client";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await client
    .fetch(`*[_type == "profile"][0] { name, title }`)
    .catch(() => null);

  const name = profile?.name || "Prakash";
  const title = profile?.title || "Graphic Designer & Video Editor";
  const description = `${title} with expertise in Adobe Photoshop, Adobe Illustrator, Adobe After Effects, Adobe Premiere Pro, and Adobe XD. Passionate about creating visual stories that inspire and engage.`;

  return {
    title: `${name} | ${title} Portfolio`,
    description,
    keywords: [
      "Graphic Designer",
      "Video Editor",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Adobe XD",
    ],
    robots: "index, follow",
    openGraph: {
      images:
        "https://i.ibb.co/3PJzhXw/B58-A4-A9-C-C3-BE-4-E18-AEDD-8639-B169-A57-D.png",
      title: `${name} | ${title} Portfolio`,
      description,
    },
    twitter: {
      images:
        "https://i.ibb.co/3PJzhXw/B58-A4-A9-C-C3-BE-4-E18-AEDD-8639-B169-A57-D.png",
      title: `${name} | ${title} Portfolio`,
      description,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default async function Home() {
  const profile = await client
    .fetch(`*[_type == "profile"][0] { name, title, subtitle, aboutMe1, aboutMe2, profileImage, email, location, skills }`)
    .catch((err) => {
      console.error("Sanity fetch error (profile):", err);
      return null;
    });

  const projects = await client
    .fetch(`*[_type == "project"] | order(_createdAt desc) { _id, title, description, image, category, projectLink }`)
    .catch((err) => {
      console.error("Sanity fetch error (projects):", err);
      return null;
    });

  const services = await client
    .fetch(`*[_type == "service"] | order(title asc) { _id, title, description, image, icon, features }`)
    .catch((err) => {
      console.error("Sanity fetch error (services):", err);
      return null;
    });

  return (
    <>
      <Hero profile={profile} />
      {/* Unified Background for All Sections */}
      <div className="relative w-full bg-linear-to-br from-black via-gray-900 to-black">
        {/* Unified Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </div>
        {/* Sections Container */}
        <div className="relative z-10">
          <About profile={profile} />
          <Projects projects={projects} />
          <Services services={services} />
          <Contact profile={profile} />
        </div>
      </div>
    </>
  );
}
