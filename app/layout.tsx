import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gta6specs.online"),
  title: {
    default:
      "Can I Run GTA 6? PC Specs, 212GB RAGE 9 FPS Calculator & VRAM Checker",
    template: "%s | GTA 6 PC Specs & FPS Benchmark Hub",
  },
  description:
    "Test if your Desktop PC, Gaming Laptop, or Steam Deck can run GTA VI (Grand Theft Auto 6). Calculate 1080p, 1440p & 4K FPS with DLSS 4 / FSR 3.5 Frame Gen, check 212GB NVMe SSD & VRAM bottlenecks, and compare 30+ GPUs.",
  keywords: [
    "can i run gta 6",
    "can my pc run gta 6",
    "gta 6 system requirements",
    "gta 6 pc specs",
    "gta 6 fps calculator",
    "gta 6 212gb storage requirement",
    "gta 6 vram requirements 8gb vs 12gb",
    "gta 6 rtx 3060 fps",
    "gta 6 rtx 4060 benchmark",
    "gta 6 gaming laptop specs",
    "gta 6 steam deck oled fps",
    "gta 6 ps5 pro 30 fps vs pc",
  ],
  authors: [{ name: "GTA 6 Specs Benchmark Team", url: "https://gta6specs.online" }],
  creator: "GTA 6 Specs Online",
  publisher: "GTA 6 Specs Online",
  category: "Gaming Hardware & Benchmarking",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gta6specs.online",
    siteName: "GTA 6 PC Specs & FPS Calculator",
    title: "Can Your PC Run GTA 6? (212GB RAGE 9 FPS & Bottleneck Calculator)",
    description:
      "Free interactive GTA VI hardware benchmark tool. Test Desktop GPUs, Gaming Laptops & Handhelds at 1080p/1440p/4K with DLSS 4, FSR 3.5 & VRAM bottleneck analysis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Can Your PC Run GTA 6? | RAGE 9 FPS & VRAM Bottleneck Calculator",
    description:
      "While consoles lock to 30 FPS, test how your GPU, CPU & RAM handle GTA 6's 212GB RAGE 9 Engine with DLSS 4 & Frame Generation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GTA 6 PC Specs & RAGE 9 FPS Calculator",
    url: "https://gta6specs.online",
    applicationCategory: "GameApplication, UtilityApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    description:
      "Interactive PC, Laptop, and Handheld FPS calculator and VRAM bottleneck analyzer for Grand Theft Auto VI (RAGE 9 Engine, 212GB NVMe SSD standard).",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "1080p, 1440p, and 4K GTA 6 FPS Estimation",
      "DLSS 4 & FSR 3.5 Frame Generation Toggle",
      "8GB vs 12GB vs 16GB VRAM Bottleneck Ladder",
      "212GB PCIe 4.0 NVMe SSD DirectStorage Checker",
      "30+ Dedicated Desktop, Laptop & Handheld GPU Benchmark Profiles",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />

        {children}

        {/* Internal SEO Crawl Hub + Safe Legal, DMCA & Amazon Affiliate Compliance Footer */}
        <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 text-xs text-slate-500 space-y-6">
          <div className="max-w-5xl mx-auto">
            <p className="font-bold text-slate-300 uppercase tracking-wider mb-3 text-center">
              Popular GTA 6 GPU Benchmarks (Quick Access)
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-[11px]">
              <Link href="/" className="px-2.5 py-1 rounded bg-slate-900 text-cyan-400 hover:bg-slate-800">
                Main FPS Calculator
              </Link>
              <Link href="/can-i-run/rtx-4060" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                RTX 4060 8GB
              </Link>
              <Link href="/can-i-run/rtx-3060" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                RTX 3060 12GB
              </Link>
              <Link href="/can-i-run/rtx-4070-super" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                RTX 4070 Super
              </Link>
              <Link href="/can-i-run/rx-7800-xt" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                RX 7800 XT 16GB
              </Link>
              <Link href="/can-i-run/rx-6600" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                RX 6600 8GB
              </Link>
              <Link href="/can-i-run/gtx-1650" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                GTX 1650 4GB
              </Link>
              <Link href="/can-i-run/rtx-4060-laptop" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                RTX 4060 Laptop
              </Link>
              <Link href="/can-i-run/steam-deck-oled" className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-cyan-400">
                Steam Deck OLED
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-2 text-center border-t border-slate-900/80 pt-6">
            <p className="font-semibold text-slate-400">
              LEGAL & TRADEMARK DISCLAIMER
            </p>
            <p>
              This website is an independent, unofficial hardware benchmarking and estimation tool built for fans. It is NOT affiliated with, endorsed, sponsored, or specifically approved by Rockstar Games, Take-Two Interactive Software, Inc., or Sony Interactive Entertainment. &quot;Grand Theft Auto&quot;, &quot;GTA VI&quot;, and &quot;Vice City&quot; are registered trademarks of Take-Two Interactive Software, Inc.
            </p>
            <p className="pt-2 text-slate-400 font-semibold">
              AFFILIATE DISCLOSURE
            </p>
            <p>
              As an Amazon Associate, we earn from qualifying purchases. Product links provided in hardware upgrade recommendations are affiliate links, meaning we may earn a small commission at no extra cost to you if you decide to make a purchase.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}