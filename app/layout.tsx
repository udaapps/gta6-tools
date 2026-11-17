import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gta6specs.online"),
  title: {
    default: "Can My PC Run GTA 6? | Unofficial GTA VI Specs & FPS Calculator",
    template: "%s | GTA 6 Specs & Benchmark Hub",
  },
  description:
    "Test if your PC can run GTA VI (Grand Theft Auto 6). Calculate predicted 1080p, 1440p, and 4K FPS, check RAGE 9 Engine system requirements, and compare GPU upgrades.",
  keywords: [
    "can my pc run gta 6",
    "gta 6 system requirements",
    "gta vi pc specs checker",
    "gta 6 fps calculator",
    "gta 6 gpu benchmark",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        {children}

        {/* Safe Legal, DMCA & Amazon Affiliate Compliance Footer */}
        <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 text-center text-xs text-slate-500 space-y-3">
          <div className="max-w-4xl mx-auto space-y-2">
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