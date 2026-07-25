import Header from "../components/Header";
import Footer from "../components/Footer";
import SplashScreen from "../components/SplashScreen";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { client } from "../../lib/sanity/client";

export default async function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await client.fetch(
    `*[_type == "profile"][0] { name, email, socials, resume { asset->{ url } } }`
  ).catch((err) => {
    console.error("Sanity fetch error in layout: ", err);
    return null;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <SplashScreen name={profile?.name} />
      <Header profile={profile} />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
