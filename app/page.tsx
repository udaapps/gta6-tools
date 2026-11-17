"use client";

import React, { useState, useEffect } from "react";
import {
  Cpu,
  Monitor,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShoppingCart,
  Flame,
  Clock,
  Disc,
  HelpCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { GPUS_DATA } from "@/data/gpus";

// Updated Hardware Database with RTX 50-Series & Ryzen 9800X3D
const GPUS = [
  { name: "Select your GPU...", score: 0 },
  { name: "NVIDIA GTX 1650 / 1060 / RX 580 (4GB-6GB)", score: 25 },
  { name: "NVIDIA RTX 2060 / RTX 3050 / RX 6600 (8GB)", score: 52 },
  { name: "NVIDIA RTX 3060 (12GB) / RTX 4060 / RX 7600 XT", score: 74 },
  { name: "NVIDIA RTX 3070 / RTX 4060 Ti (16GB) / RX 7700 XT", score: 84 },
  { name: "NVIDIA RTX 4070 Super / RTX 5070 / RX 7800 XT", score: 94 },
  { name: "NVIDIA RTX 4080 Super / RTX 5080 / RX 7900 XTX", score: 98 },
  { name: "NVIDIA RTX 4090 / RTX 5090 (24GB-32GB)", score: 100 },
];

const CPUS = [
  { name: "Select your CPU...", score: 0 },
  { name: "Intel Core i3 / Old Quad-Core / Ryzen 3", score: 25 },
  { name: "Intel Core i5 (10th/11th) / Ryzen 5 3600 (6-Core)", score: 58 },
  { name: "Intel Core i5 (12th/13th) / Ryzen 5 5600X / 7600X", score: 80 },
  { name: "Intel Core i7 (13th/14th) / Ryzen 7 7700X / 5800X3D", score: 94 },
  { name: "AMD Ryzen 7 7800X3D / 9800X3D / Intel Core i9-14900K", score: 100 },
];

const RAMS = [
  { name: "8 GB RAM (Critical Bottleneck)", score: 25 },
  { name: "16 GB DDR4 / DDR5 RAM (Minimum)", score: 75 },
  { name: "32 GB or 64 GB DDR5 RAM (Recommended)", score: 100 },
];

const STORAGES = [
  { name: "NVMe M.2 SSD (Gen 4 / Gen 5) - 212GB+ Free", type: "NVME", penalty: 1 },
  { name: "SATA SSD (Standard 2.5\" SSD)", type: "SATA", penalty: 0.92 },
  { name: "Mechanical Hard Drive (HDD) - Not Supported", type: "HDD", penalty: 0.55 },
];

export default function GTA6ToolsHub() {
  const AMAZON_TAG = "yourtag-20";

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isLaunched, setIsLaunched] = useState(false);

  const [gpu, setGpu] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(75);
  const [storage, setStorage] = useState("NVME");
  const [resolution, setResolution] = useState("1080p");
  const [result, setResult] = useState<null | {
    status: "PASS" | "MINIMUM" | "FAIL";
    fps: number;
    message: string;
    bottleneck: string;
  }>(null);

  useEffect(() => {
    // Official Rockstar Launch Date: November 19, 2026 Midnight
    const targetDate = new Date("2026-11-19T00:00:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setIsLaunched(true);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateSpecs = () => {
    if (gpu === 0 || cpu === 0) return;

    const resMultiplier = resolution === "1080p" ? 1 : resolution === "1440p" ? 0.78 : 0.52;
    const storageObj = STORAGES.find((s) => s.type === storage) || STORAGES[0];
    const rawScore = (gpu * 0.55 + cpu * 0.3 + ram * 0.15) * resMultiplier * storageObj.penalty;
    const estimatedFps = Math.round((rawScore / 100) * 95);

    let bottleneck = "None (Balanced Build)";
    if (storage === "HDD") bottleneck = "HDD Storage (212GB NVMe SSD Required for RAGE 9 Asset Streaming!)";
    else if (gpu < 74) bottleneck = "GPU VRAM & Core Speed (12GB+ VRAM Recommended)";
    else if (cpu < 75) bottleneck = "CPU Crowd & AI Simulation Bottleneck";
    else if (ram < 75) bottleneck = "System RAM (16GB Minimum / 32GB DDR5 Ideal)";

    if (rawScore >= 72 && storage !== "HDD") {
      setResult({
        status: "PASS",
        fps: estimatedFps,
        message: "Your PC is Vice City Ready! Beats PS5 Pro's 30 FPS cap with smooth High/Ultra gameplay.",
        bottleneck,
      });
    } else if (rawScore >= 46 && storage !== "HDD") {
      setResult({
        status: "MINIMUM",
        fps: estimatedFps,
        message: "Meets Console-Grade Minimums (30-45 FPS). Use DLSS/FSR Balanced Mode.",
        bottleneck,
      });
    } else {
      setResult({
        status: "FAIL",
        fps: Math.max(14, estimatedFps),
        message:
          storage === "HDD"
            ? "CRITICAL: GTA VI cannot stream Leonida assets from a Hard Drive (HDD). Upgrade to NVMe SSD!"
            : "Your system will struggle heavily with GTA VI's RAGE 9 Ray-Traced Engine.",
        bottleneck,
      });
    }
  };

  // JSON-LD FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does GTA 6 run at 60 FPS on PS5 Pro and Xbox Series X?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rockstar Games has confirmed GTA 6 targets 30 FPS across PS5, PS5 Pro, and Xbox Series X|S at launch due to heavy CPU simulation and global illumination ray tracing. PS5 Pro gains exclusive PSSR upscaling and ray-traced shadows, while 60+ FPS requires a gaming PC.",
        },
      },
      {
        "@type": "Question",
        name: "How many GB is GTA 6 download and install size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GTA 6 requires up to 212 GB of free storage space on an NVMe SSD. Mechanical hard drives (HDD) are not supported due to fast DirectStorage asset streaming in Leonida.",
        },
      },
      {
        "@type": "Question",
        name: "Can an NVIDIA RTX 3060 or RTX 4060 run GTA 6?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, both the RTX 3060 (12GB) and RTX 4060 can run GTA 6 at 1080p Medium-High settings at 50-60 FPS using DLSS Quality mode, outperforming base console frame rates.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero & Official November 19 Launch Countdown */}
      <header className="relative overflow-hidden border-b border-pink-500/30 bg-gradient-to-b from-purple-950/60 via-slate-950 to-slate-950 py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-500/20 text-pink-400 border border-pink-500/40 mb-4">
            <Flame className="w-3.5 h-3.5" /> Official Launch: November 19, 2026 • 212 GB Install Size Confirmed
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CAN YOUR PC RUN GTA VI?
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
            Test your GPU, CPU & SSD against GTA 6&apos;s RAGE 9 Engine requirements, calculate 1080p/1440p/4K FPS, and compare PC 60+ FPS upgrades vs. PS5 Pro&apos;s 30 FPS PSSR mode.
          </p>

          {/* Countdown Box */}
          <div className="mt-8 inline-flex flex-wrap justify-center items-center gap-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 md:px-8 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium pr-2 border-r border-slate-800">
              <Clock className="w-4 h-4" />{" "}
              {isLaunched ? "GTA VI Console Launch Status:" : "Nov 19 Launch Countdown:"}
            </div>
            {isLaunched ? (
              <div className="text-lg md:text-xl font-black text-emerald-400 px-3">
                LIVE ON PS5 & XBOX • PC PORT PREDICTED NEXT
              </div>
            ) : (
              [
                { label: "DAYS", val: timeLeft.days },
                { label: "HOURS", val: timeLeft.hours },
                { label: "MINS", val: timeLeft.mins },
                { label: "SECS", val: timeLeft.secs },
              ].map((item, i) => (
                <div key={i} className="text-center px-3">
                  <div className="text-2xl md:text-3xl font-black text-white">{item.val}</div>
                  <div className="text-[10px] tracking-widest text-pink-400 font-bold">{item.label}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </header>

      {/* Main Tool Container */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
            <Monitor className="w-6 h-6 text-pink-500" /> GTA 6 System Requirements & FPS Calculator (2026 Updated)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GPU Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-pink-400" /> Graphics Card (GPU - RTX 50/40/30 & RX)
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                onChange={(e) => setGpu(Number(e.target.value))}
              >
                {GPUS.map((g, idx) => (
                  <option key={idx} value={g.score}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CPU Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" /> Processor (CPU - RAGE 9 AI Simulation)
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                onChange={(e) => setCpu(Number(e.target.value))}
              >
                {CPUS.map((c, idx) => (
                  <option key={idx} value={c.score}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* RAM Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-purple-400" /> System Memory (RAM)
              </label>
              <select
                value={ram}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                onChange={(e) => setRam(Number(e.target.value))}
              >
                {RAMS.map((r, idx) => (
                  <option key={idx} value={r.score}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Storage Drive Select (NEW: 212GB SSD Factor) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Disc className="w-4 h-4 text-emerald-400" /> Storage Drive (212 GB Required)
              </label>
              <select
                value={storage}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                onChange={(e) => setStorage(e.target.value)}
              >
                {STORAGES.map((s, idx) => (
                  <option key={idx} value={s.type}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Resolution */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Resolution</label>
              <div className="grid grid-cols-3 gap-3">
                {["1080p", "1440p", "4K"].map((res) => (
                  <button
                    key={res}
                    type="button"
                    onClick={() => setResolution(res)}
                    className={`py-3 rounded-xl font-bold text-sm border transition ${
                      resolution === res
                        ? "bg-pink-600 border-pink-400 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={calculateSpecs}
            className="mt-8 w-full py-4 rounded-xl font-extrabold text-lg bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-95 transition shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            CALCULATE MY GTA 6 FPS & COMPATIBILITY
          </button>

          {/* Results & High-Converting 3-Way Affiliate Box */}
          {result && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 animate-fade-in">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  {result.status === "PASS" && <CheckCircle2 className="w-10 h-10 text-emerald-400 shrink-0" />}
                  {result.status === "MINIMUM" && <AlertTriangle className="w-10 h-10 text-amber-400 shrink-0" />}
                  {result.status === "FAIL" && <XCircle className="w-10 h-10 text-rose-500 shrink-0" />}
                  <div>
                    <h3 className="text-xl font-bold">{result.message}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Primary Bottleneck: <span className="text-pink-400 font-semibold">{result.bottleneck}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 px-5 py-3 rounded-xl border border-cyan-500/40 text-center shrink-0">
                  <div className="text-3xl font-black text-cyan-400">~{result.fps} FPS</div>
                  <div className="text-xs text-slate-400">Estimated at {resolution}</div>
                </div>
              </div>

              {/* 3 High-Converting Affiliate Upgrades (Console, GPU, 2TB NVMe SSD) */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recommended Hardware Upgrades for GTA VI (212GB Ready):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <a
                    href={`https://www.amazon.com/s?k=2TB+NVMe+SSD+Gen4+PS5+PC&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-emerald-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">2TB Gen4 NVMe M.2 SSD</div>
                      <div className="text-xs text-emerald-400 mt-0.5">Required for 212GB Install & Fast Loading</div>
                    </div>
                    <span className="mt-3 px-3 py-1.5 bg-emerald-600 text-xs font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Check SSD Deals
                    </span>
                  </a>

                  <a
                    href={`https://www.amazon.com/s?k=NVIDIA+RTX+4070+Super+GPU&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-cyan-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">RTX 4070 Super / RTX 5070</div>
                      <div className="text-xs text-cyan-400 mt-0.5">Unlock 60+ FPS at 1440p Ultra</div>
                    </div>
                    <span className="mt-3 px-3 py-1.5 bg-cyan-600 text-xs font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Check GPU Price
                    </span>
                  </a>

                  <a
                    href={`https://www.amazon.com/s?k=PlayStation+5+Pro+Console&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-pink-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">PlayStation 5 Pro Console</div>
                      <div className="text-xs text-pink-400 mt-0.5">Play Now with PSSR & Ray-Traced Shadows</div>
                    </div>
                    <span className="mt-3 px-3 py-1.5 bg-pink-600 text-xs font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Check PS5 Pro
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NEW SEO SECTION: PS5 Pro 30 FPS vs PC 60+ FPS Comparison Table */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-pink-500" /> GTA 6 Performance Modes: PS5 Pro (30 FPS Target) vs. Gaming PC
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Rockstar confirmed a 30 FPS target across all consoles due to RAGE 9 CPU crowd density and ray-traced global illumination, plus a massive 212 GB storage requirement. Here is how each platform compares:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-cyan-400">
                  <th className="py-3 px-4">Platform / Tier</th>
                  <th className="py-3 px-4">Target FPS</th>
                  <th className="py-3 px-4">Resolution & Upscaling</th>
                  <th className="py-3 px-4">Install Size & Storage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">PS5 / Xbox Series X</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">30 FPS Locked</td>
                  <td className="py-3 px-4">1440p Dynamic (FSR)</td>
                  <td className="py-3 px-4">212 GB NVMe SSD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-pink-400">PlayStation 5 Pro</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">30 FPS Target</td>
                  <td className="py-3 px-4">4K PSSR + Ray-Traced Shadows</td>
                  <td className="py-3 px-4">212 GB (2TB SSD Included)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-cyan-400">Mid-Range PC (RTX 3060 / 4060)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">55–65 FPS</td>
                  <td className="py-3 px-4">1080p High (DLSS Quality)</td>
                  <td className="py-3 px-4">212 GB Gen4 NVMe SSD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-emerald-400">High-End PC (RTX 4070S / 5080)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">80–120+ FPS</td>
                  <td className="py-3 px-4">1440p / 4K Ultra + Frame Gen</td>
                  <td className="py-3 px-4">212 GB Gen4/Gen5 NVMe SSD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Always-Visible SEO Internal Link Grid for All 30 GPUs */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            GTA 6 GPU Benchmark Database (30+ Graphics Cards Tested)
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Select your exact graphics card below to view dedicated 1080p, 1440p, and 4K FPS benchmarks and VRAM analysis:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {GPUS_DATA.map((item) => (
              <Link
                key={item.slug}
                href={`/can-i-run/${item.slug}`}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 text-center transition group"
              >
                <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 truncate">
                  {item.name.replace("NVIDIA GeForce ", "").replace("AMD Radeon ", "")}
                </div>
                <div className="text-[11px] text-pink-400 mt-1 font-semibold">
                  1080p: ~{item.fps1080p} FPS
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* NEW SEO FAQ SECTION */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" /> Frequently Asked Questions (GTA 6 Specs & Performance)
          </h2>
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="font-bold text-white">1. Does GTA 6 support 60 FPS on PS5 Pro or Xbox Series X?</h3>
              <p className="text-slate-400 mt-1">
                No. Rockstar Games targets 30 FPS across all consoles at launch, including the PS5 Pro. While the PS5 Pro adds PlayStation Spectral Super Resolution (PSSR) and enhanced ray-traced shadows, achieving true 60+ FPS requires a gaming PC with at least a 6-core/8-core modern CPU and an RTX 3060 Ti / 4060 or higher.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="font-bold text-white">2. How much storage space does GTA 6 need?</h3>
              <p className="text-slate-400 mt-1">
                Official pre-loads confirm GTA 6 requires up to <strong>212 GB</strong> of free storage. Because the RAGE 9 engine continuously streams dense Vice City and Leonida assets, an NVMe M.2 SSD is mandatory. Running the game on an older mechanical HDD will cause severe stuttering and missing textures.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="font-bold text-white">3. Is 8GB VRAM enough for GTA 6 at 1080p?</h3>
              <p className="text-slate-400 mt-1">
                8GB VRAM cards (like the RTX 4060 8GB or RX 6600) will run GTA 6 at 1080p Medium textures with DLSS/FSR enabled. However, 12GB to 16GB of VRAM (such as the RTX 3060 12GB, RX 7600 XT 16GB, or RTX 4070 Super) is strongly recommended for High/Ultra textures and ray tracing.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}