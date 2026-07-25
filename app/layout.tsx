import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client } from "../lib/sanity/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await client
    .fetch(`*[_type == "profile"][0] { name, title }`)
    .catch(() => null);

  const name = profile?.name || "Prakash";
  const title = profile?.title || "Graphic Designer & Video Editor";

  return {
    title: `${name} | ${title} Portfolio`,
    description: `${title} with expertise in Adobe Photoshop, Adobe Illustrator, Adobe After Effects, Adobe Premiere Pro, and Adobe XD. Passionate about creating visual stories that inspire and engage.`,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    other: [
      {
        rel: "apple-mobile-web-app-title",
        content: "Portfolio",
      },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
