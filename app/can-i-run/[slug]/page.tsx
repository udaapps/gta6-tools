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

        <section className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" /> {gpu.name} GTA 6 Resolution & Upscaling Breakdown
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Estimated RAGE 9 frame rates comparing Native rendering, {gpu.upscaler} Quality Mode, and AI Frame Generation:
          </p>
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                <th className="py-3 px-3">Resolution</th>
                <th className="py-3 px-3">Native Raster</th>
                <th className="py-3 px-3">{gpu.upscaler} Quality</th>
                <th className="py-3 px-3">+ Frame Gen</th>
                <th className="py-3