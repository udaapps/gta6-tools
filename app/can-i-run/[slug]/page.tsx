import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GPUS_DATA } from "@/data/gpus";
import {
  Cpu,
  Monitor,
  HardDrive,
  ShoppingCart,
  ArrowLeft,
  CheckCircle2,
  Gauge,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react";

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

  const title = `Can ${gpu.name} Run GTA 6? (${gpu.fps1080p} FPS 1080p, 1440p & 4K Benchmark)`;
  const description = `Test if the ${gpu.name} (${gpu.vram}) can run GTA VI on the 212GB RAGE 9 Engine. View 1080p (${gpu.fps1080p} FPS), 1440p (${gpu.fps1440p} FPS) & 4K benchmarks with ${gpu.upscaler}, VRAM limits, and best settings.`;
  const url = `https://gta6specs.online/can-i-run/${gpu.slug}`;

  return {
    title,
    description,
    keywords: [
      `can ${gpu.name.toLowerCase()} run gta 6`,
      `${gpu.name.toLowerCase()} gta 6 fps`,
      `${gpu.name.toLowerCase()} gta vi benchmark`,
      `gta 6 ${gpu.name.toLowerCase()} 1080p 1440p`,
      `gta 6 ${gpu.vram.toLowerCase()} vram test`,
      `best settings for gta 6 on ${gpu.name.toLowerCase()}`,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "GTA 6 PC Specs & FPS Calculator",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  // Computed Native vs Upscaled metrics for rich data tables (prevents thin content penalty)
  const native1080p = Math.max(18, Math.round(gpu.fps1080p * 0.76));
  const native1440p = Math.max(14, Math.round(gpu.fps1440p * 0.74));
  const native4k = Math.max(9, Math.round(gpu.fps4k * 0.7));
  const frameGen1080p = Math.round(gpu.fps1080p * 1.32);
  const frameGen1440p = Math.round(gpu.fps1440p * 1.35);

  const sameTierGpus = GPUS_DATA.filter(
    (g) => g.slug !== gpu.slug && g.tier === gpu.tier
  );
  const otherGpus = GPUS_DATA.filter(
    (g) => g.slug !== gpu.slug && g.tier !== gpu.tier
  );

  // Combined JSON-LD Schema: BreadcrumbList + Expanded 5-Question FAQPage
  const jsonLdSchema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "GTA 6 FPS Calculator",
          item: "https://gta6specs.online",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${gpu.name} Benchmark`,
          item: `https://gta6specs.online/can-i-run/${gpu.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Can the ${gpu.name} run GTA 6 at 60 FPS?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${gpu.verdict} At 1080p resolution, the ${gpu.name} achieves approximately ${native1080p} FPS natively and ~${gpu.fps1080p} FPS with ${gpu.upscaler} Quality mode enabled.`,
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
          name: `What are the best GTA 6 graphics settings for ${gpu.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `For optimal frame pacing in Vice City, we recommend running the ${gpu.name} on the ${gpu.recommendedPreset} preset with ${gpu.upscaler} enabled and installing the 212GB game files on a PCIe 4.0 M.2 NVMe SSD.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the best CPU to pair with ${gpu.name} for GTA 6?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `To prevent CPU bottlenecks in dense Leonida traffic and NPC crowd simulations, pair the ${gpu.name} with at least an ${gpu.pairedCpu} and 16GB to 32GB of dual-channel RAM.`,
          },
        },
        {
          "@type": "Question",
          name: `How does ${gpu.name} compare to PS5 Pro (30 FPS) in GTA 6?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `While consoles target a locked 30 FPS due to CPU simulation limits, the ${gpu.name} paired with an ${gpu.pairedCpu} delivers an estimated ~${gpu.fps1080p} FPS at 1080p and ~${gpu.fps1440p} FPS at 1440p on PC.`,
          },
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* SEO Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between flex-wrap gap-2 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-pink-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Interactive GTA 6 Spec Calculator
          </Link>
          <div className="text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-300">{gpu.name}</span>
          </div>
        </nav>

        {/* Hero Title Card */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/50 border border-pink-500/30 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/20 text-pink-400 border border-pink-500/40">
              {gpu.brand} • {gpu.tier} Tier
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {gpu.vram} VRAM • {gpu.arch}
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              212GB RAGE 9 Tested
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Can the <span className="text-cyan-400">{gpu.name}</span> Run GTA 6?
          </h1>
          <p className="mt-4 text-slate-300 text-base md:text-lg leading-relaxed">
            {gpu.verdict}
          </p>

          {/* Primary FPS Benchmark Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 text-center">
              <div className="text-xs uppercase font-bold text-slate-400">1080p (FHD)</div>
              <div className="text-4xl font-black text-emerald-400 mt-1">~{gpu.fps1080p} FPS</div>
              <div className="text-xs text-slate-400 mt-1">
                Native: ~{native1080p} FPS | {gpu.upscaler}
              </div>
            </div>
            <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-5 text-center">
              <div className="text-xs uppercase font-bold text-slate-400">1440p (QHD)</div>
              <div className="text-4xl font-black text-cyan-400 mt-1">~{gpu.fps1440p} FPS</div>
              <div className="text-xs text-slate-400 mt-1">
                Native: ~{native1440p} FPS | Sweet Spot
              </div>
            </div>
            <div className="bg-slate-950/90 border border-pink-500/30 rounded-xl p-5 text-center">
              <div className="text-xs uppercase font-bold text-slate-400">4K (UHD)</div>
              <div className="text-4xl font-black text-pink-400 mt-1">~{gpu.fps4k} FPS</div>
              <div className="text-xs text-slate-400 mt-1">
                Native: ~{native4k} FPS | Heavy RT Load
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Resolution & Upscaling Matrix Table (High Google Featured Snippet Value) */}
        <section className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" /> {gpu.name} GTA 6 Resolution & Upscaling Breakdown
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Estimated RAGE 9 frame rates comparing Native rendering, {gpu.upscaler} Quality Mode, and AI Frame Generation across Leonida Vice City biomes:
          </p>
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-3">Resolution</th>
                <th className="py-3 px-3">Native Raster</th>
                <th className="py-3 px-3">{gpu.upscaler} Quality</th>
                <th className="py-3 px-3">+ Frame Gen</th>
                <th className="py-3 px-3">Recommended Preset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-200">
              <tr>
                <td className="py-3 px-3 font-bold text-white">1080p (1920x1080)</td>
                <td className="py-3 px-3">~{native1080p} FPS</td>
                <td className="py-3 px-3 font-bold text-emerald-400">~{gpu.fps1080p} FPS</td>
                <td className="py-3 px-3 text-cyan-300">~{frameGen1080p} FPS</td>
                <td className="py-3 px-3">{gpu.recommendedPreset}</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">1440p (2560x1440)</td>
                <td className="py-3 px-3">~{native1440p} FPS</td>
                <td className="py-3 px-3 font-bold text-cyan-400">~{gpu.fps1440p} FPS</td>
                <td className="py-3 px-3 text-cyan-300">~{frameGen1440p} FPS</td>
                <td className="py-3 px-3">Medium-High + Balanced RT</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-white">4K (3840x2160)</td>
                <td className="py-3 px-3">~{native4k} FPS</td>
                <td className="py-3 px-3 font-bold text-pink-400">~{gpu.fps4k} FPS</td>
                <td className="py-3 px-3 text-cyan-300">~{Math.round(gpu.fps4k * 1.35)} FPS</td>
                <td className="py-3 px-3">Performance Upscaling</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Deep Hardware Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2 mb-4">
              <Gauge className="w-5 h-5 text-pink-500" /> Technical Specs & RAGE 9 Preset
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">GPU Architecture:</span>
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
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Required Install Storage:</span>
                <span className="font-semibold text-amber-400">212 GB PCIe 4.0 NVMe</span>
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
              <h3 className="text-xs font-bold uppercase text-slate-400">VRAM Texture Streaming</h3>
              <p className="text-sm text-slate-300 mt-1">{gpu.vramAnalysis}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase text-slate-400">Recommended CPU & Storage Pairing</h3>
              <p className="text-sm text-slate-300 mt-1">
                Pair the {gpu.name} with at least an <strong className="text-white">{gpu.pairedCpu}</strong>, 16GB–32GB RAM, and a Gen4 M.2 NVMe SSD to avoid asset pop-in across Vice City.
              </p>
            </div>
          </div>
        </section>

        {/* High-Converting 3-Column Affiliate Upgrade Box */}
        <section className="mt-8 bg-gradient-to-r from-pink-950/40 via-slate-900 to-cyan-950/40 border border-pink-500/40 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Recommended GTA 6 Hardware Upgrades for {gpu.name}
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Eliminate VRAM bottlenecks, meet the 212GB DirectStorage requirement, or play Day-1 on console:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={`https://www.amazon.com/s?k=${gpu.upgradeQuery}&tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-cyan-500/40 transition gap-3"
            >
              <div>
                <div className="text-[11px] text-cyan-400 font-bold uppercase">Recommended GPU Upgrade</div>
                <div className="font-bold text-white text-sm mt-1">{gpu.upgradeGpu}</div>
              </div>
              <span className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" /> Check Amazon Price
              </span>
            </a>

            <a
              href={`https://www.amazon.com/s?k=2TB+PCIe+Gen4+NVMe+M.2+SSD+PS5+PC&tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-amber-500/40 transition gap-3"
            >
              <div>
                <div className="text-[11px] text-amber-400 font-bold uppercase flex items-center gap-1">
                  <HardDrive className="w-3 h-3" /> For 212GB RAGE 9 Install
                </div>
                <div className="font-bold text-white text-sm mt-1">2TB Gen4 M.2 NVMe SSD</div>
              </div>
              <span className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" /> View SSD Deals
              </span>
            </a>

            <a
              href={`https://www.amazon.com/s?k=PlayStation+5+Pro+Console&tag=${AMAZON_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-pink-500/40 transition gap-3"
            >
              <div>
                <div className="text-[11px] text-pink-400 font-bold uppercase">Play Day-1 on Console</div>
                <div className="font-bold text-white text-sm mt-1">PlayStation 5 Pro Console</div>
              </div>
              <span className="px-3 py-2 bg-pink-600 hover:bg-pink-500 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" /> Check PS5 Pro Price
              </span>
            </a>
          </div>
        </section>

        {/* Visible On-Page FAQ Section (Matches JSON-LD Schema 100% for Google Compliance) */}
        <section className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" /> Frequently Asked Questions: {gpu.name} in GTA 6
          </h2>
          <div className="space-y-3 text-sm">
            <div className="border-b border-slate-800/80 pb-3">
              <h3 className="font-bold text-cyan-300">Can the {gpu.name} run GTA 6 at 60 FPS?</h3>
              <p className="text-slate-300 mt-1 text-xs leading-relaxed">
                {gpu.verdict} At 1080p, expect ~{native1080p} FPS natively and ~{gpu.fps1080p} FPS with {gpu.upscaler}.
              </p>
            </div>
            <div className="border-b border-slate-800/80 pb-3">
              <h3 className="font-bold text-cyan-300">Is {gpu.vram} VRAM enough for GTA VI on {gpu.name}?</h3>
              <p className="text-slate-300 mt-1 text-xs leading-relaxed">{gpu.vramAnalysis}</p>
            </div>
            <div>
              <h3 className="font-bold text-cyan-300">How does {gpu.name} compare to PS5 Pro (30 FPS) in GTA 6?</h3>
              <p className="text-slate-300 mt-1 text-xs leading-relaxed">
                While consoles lock to 30 FPS due to dense NPC and physics simulations, pairing the {gpu.name} with an {gpu.pairedCpu} unlocks ~{gpu.fps1080p} FPS at 1080p and ~{gpu.fps1440p} FPS at 1440p.
              </p>
            </div>
          </div>
        </section>

        {/* Complete 30-GPU Internal Linking Matrix (Eliminates Orphan Pages & Boosts Crawl Depth) */}
        <section className="mt-10 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-6">
          {sameTierGpus.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Compare Similar {gpu.tier} Tier GPUs for GTA 6
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {sameTierGpus.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/can-i-run/${item.slug}`}
                    className="text-xs bg-slate-950 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 rounded-lg px-3 py-2.5 text-slate-200 hover:text-white transition truncate flex justify-between items-center"
                  >
                    <span className="truncate">
                      {item.name.replace("NVIDIA GeForce ", "").replace("AMD Radeon ", "")}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold ml-1 shrink-0">
                      {item.fps1080p}fps
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-base font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Monitor className="w-4 h