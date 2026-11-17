import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GPUS_DATA } from "@/data/gpus";
import { Cpu, Monitor, HardDrive, ShoppingCart, ArrowLeft, CheckCircle2, Gauge } from "lucide-react";

const AMAZON_TAG = "udara1982-20";

export async function generateStaticParams() {
  return GPUS_DATA.map((gpu) => ({
    slug: gpu.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gpu = GPUS_DATA.find((g) => g.slug === slug);
  if (!gpu) return {};

  return {
    title: `Can ${gpu.name} Run GTA 6? (1080p, 1440p, 4K FPS Benchmark)`,
    description: `Find out if the ${gpu.name} (${gpu.vram}) can run GTA VI. View predicted 1080p (${gpu.fps1080p} FPS), 1440p (${gpu.fps1440p} FPS), and 4K benchmarks, best settings, and CPU pairings.`,
    alternates: {
      canonical: `https://gta6specs.online/can-i-run/${gpu.slug}`,
    },
  };
}

export default async function GpuBenchmarkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gpu = GPUS_DATA.find((g) => g.slug === slug);

  if (!gpu) {
    notFound();
  }

  // Unique FAQ JSON-LD Schema for Google Rich Results & Fast Indexing
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Can the ${gpu.name} run GTA 6 at 60 FPS?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${gpu.verdict} At 1080p resolution, the ${gpu.name} is estimated to achieve around ${gpu.fps1080p} FPS, and ${gpu.fps1440p} FPS at 1440p using ${gpu.upscaler}.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${gpu.vram} VRAM enough for GTA VI on ${gpu.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: gpu.vramAnalysis,
        },
      },
      {
        "@type": "Question",
        name: `What is the best CPU to pair with ${gpu.name} for GTA 6?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `To avoid CPU bottlenecks in dense Vice City traffic and NPC simulations, we recommend pairing the ${gpu.name} with at least an ${gpu.pairedCpu} and 16GB to 32GB of RAM.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-pink-400 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Interactive GTA 6 Spec Calculator
        </Link>

        {/* Hero Title Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/50 border border-pink-500/30 rounded-2xl p-6 md:p-8 shadow-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/20 text-pink-400 border border-pink-500/40 mb-3">
            {gpu.brand} • {gpu.tier} Tier
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Can the <span className="text-cyan-400">{gpu.name}</span> Run GTA 6?
          </h1>
          <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
            {gpu.verdict}
          </p>

          {/* FPS Benchmark Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 text-center">
              <div className="text-xs uppercase font-bold text-slate-400">1080p (FHD)</div>
              <div className="text-4xl font-black text-emerald-400 mt-1">~{gpu.fps1080p} FPS</div>
              <div className="text-xs text-slate-400 mt-1">With {gpu.upscaler}</div>
            </div>
            <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-5 text-center">
              <div className="text-xs uppercase font-bold text-slate-400">1440p (QHD)</div>
              <div className="text-4xl font-black text-cyan-400 mt-1">~{gpu.fps1440p} FPS</div>
              <div className="text-xs text-slate-400 mt-1">Recommended Sweet Spot</div>
            </div>
            <div className="bg-slate-950/90 border border-pink-500/30 rounded-xl p-5 text-center">
              <div className="text-xs uppercase font-bold text-slate-400">4K (UHD)</div>
              <div className="text-4xl font-black text-pink-400 mt-1">~{gpu.fps4k} FPS</div>
              <div className="text-xs text-slate-400 mt-1">RAGE 9 Heavy Load</div>
            </div>
          </div>
        </div>

        {/* Deep Hardware Breakdown (Prevents Thin Content Penalty) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2 mb-4">
              <Gauge className="w-5 h-5 text-pink-500" /> Technical Specs & Preset
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Architecture:</span>
                <span className="font-semibold text-white">{gpu.arch}</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Video Memory (VRAM):</span>
                <span className="font-semibold text-white">{gpu.vram}</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Supported Upscaler:</span>
                <span className="font-semibold text-pink-400">{gpu.upscaler}</span>
              </li>
              <li className="pt-1">
                <span className="text-slate-400 block mb-1">Optimal GTA 6 Graphic Preset:</span>
                <span className="font-bold text-emerald-400">{gpu.recommendedPreset}</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> Bottleneck & VRAM Analysis
            </h2>
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400">VRAM Memory Streaming</h3>
              <p className="text-sm text-slate-300 mt-1">{gpu.vramAnalysis}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400">Recommended CPU Pairing</h3>
              <p className="text-sm text-slate-300 mt-1">
                Pair the {gpu.name} with at least an <strong className="text-white">{gpu.pairedCpu}</strong> and a PCIe Gen4 NVMe SSD for DirectStorage asset streaming.
              </p>
            </div>
          </div>
        </div>

        {/* High-Converting Affiliate Upgrade Box */}
        <div className="mt-8 bg-gradient-to-r from-pink-950/40 via-slate-900 to-cyan-950/40 border border-pink-500/40 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Recommended Hardware Upgrades for {gpu.name} Owners
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Want higher frame rates or Day-1 access to Vice City? Compare the best upgrade paths below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`https://www.amazon.com/s?k=${gpu.upgradeQuery}&tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-cyan-500/40 transition"
            >
              <div>
                <div className="text-xs text-cyan-400 font-bold uppercase">Recommended PC Upgrade</div>
                <div className="font-bold text-white text-sm mt-0.5">{gpu.upgradeGpu}</div>
              </div>
              <span className="px-3 py-2 bg-cyan-600 text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0">
                <ShoppingCart className="w-4 h-4" /> Check Price on Amazon
              </span>
            </a>

            <a
              href={`https://www.amazon.com/s?k=PlayStation+5+Pro+Console&tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-pink-500/40 transition"
            >
              <div>
                <div className="text-xs text-pink-400 font-bold uppercase">Play Day-1 on Console</div>
                <div className="font-bold text-white text-sm mt-0.5">PlayStation 5 Pro Console</div>
              </div>
              <span className="px-3 py-2 bg-pink-600 text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0">
                <ShoppingCart className="w-4 h-4" /> Check Price on Amazon
              </span>
            </a>
          </div>
        </div>

        {/* Related GPU Links for Fast Google Crawling */}
        <div className="mt-10 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-cyan-400" /> Compare Other Graphics Cards for GTA 6
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {GPUS_DATA.filter((g) => g.slug !== gpu.slug)
              .slice(0, 12)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/can-i-run/${item.slug}`}
                  className="text-xs bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-pink-500/40 rounded-lg px-3 py-2.5 text-slate-300 hover:text-white transition truncate"
                >
                  {item.name.replace("NVIDIA GeForce ", "").replace("AMD Radeon ", "")}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
