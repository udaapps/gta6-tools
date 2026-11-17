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
  Laptop,
  Sparkles,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { GPUS_DATA } from "@/data/gpus";

// Updated Hardware Database with RTX 50-Series, Laptop GPUs & Ryzen 9800X3D
const GPUS = [
  { name: "Select your GPU...", score: 0 },
  { name: "Steam Deck OLED / ROG Ally X / Legion Go (Handheld APU)", score: 22 },
  { name: "NVIDIA GTX 1650 / 1060 / RTX 3050 Laptop (4GB-6GB)", score: 28 },
  { name: "NVIDIA RTX 2060 / RTX 4050 Laptop / RX 6600 (6GB-8GB)", score: 52 },
  { name: "NVIDIA RTX 3060 (12GB) / RTX 4060 (Desktop/Laptop) / RX 7600 XT", score: 74 },
  { name: "NVIDIA RTX 3070 / RTX 4060 Ti (16GB) / RX 7700 XT", score: 84 },
  { name: "NVIDIA RTX 4070 Super / RTX 5070 / RX 7800 XT (12GB-16GB)", score: 94 },
  { name: "NVIDIA RTX 4080 Super / RTX 5080 / RX 7900 XTX", score: 98 },
  { name: "NVIDIA RTX 4090 / RTX 5090 (24GB-32GB Flagship)", score: 100 },
];

const CPUS = [
  { name: "Select your CPU...", score: 0 },
  { name: "Intel Core i3 / Old Quad-Core / Handheld Zen 2-4 APU", score: 25 },
  { name: "Intel Core i5 (10th/11th) / Ryzen 5 3600 / 5500 (6-Core)", score: 58 },
  { name: "Intel Core i5 (12th/13th) / Ryzen 5 5600X / 7600X", score: 80 },
  { name: "Intel Core i7 (13th/14th) / Ryzen 7 7700X / 5800X3D (8-Core)", score: 94 },
  { name: "AMD Ryzen 7 7800X3D / 9800X3D / Intel Core i9-14900K", score: 100 },
];

const RAMS = [
  { name: "8 GB RAM (Critical Stutter Bottleneck)", score: 25 },
  { name: "16 GB DDR4 / DDR5 RAM (Minimum Floor)", score: 75 },
  { name: "32 GB or 64 GB DDR5 RAM (Recommended Sweet Spot)", score: 100 },
];

const STORAGES = [
  { name: "NVMe M.2 SSD (Gen 4 / Gen 5 DirectStorage) - 212GB+ Free", type: "NVME", penalty: 1 },
  { name: "SATA SSD (Standard 2.5\" SSD)", type: "SATA", penalty: 0.92 },
  { name: "Mechanical Hard Drive (HDD) - Unsupported", type: "HDD", penalty: 0.55 },
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
  const [upscaling, setUpscaling] = useState(true); // DLSS 4 / FSR 3.5 Toggle
  const [result, setResult] = useState<null | {
    status: "PASS" | "MINIMUM" | "FAIL";
    fps: number;
    nativeFps: number;
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

    const nativeFps = Math.max(12, Math.round((rawScore / 100) * 82));
    const upscaledFps = Math.round(nativeFps * 1.35); // +35% with DLSS 4 / FSR 3.5 Frame Gen
    const finalFps = upscaling ? upscaledFps : nativeFps;

    let bottleneck = "None (Balanced Build)";
    if (storage === "HDD") bottleneck = "HDD Storage (212GB NVMe SSD Required for RAGE 9 DirectStorage!)";
    else if (gpu < 74) bottleneck = "GPU VRAM & Ray-Tracing Cores (12GB+ VRAM Recommended)";
    else if (cpu < 75) bottleneck = "CPU Thread Bottleneck (8-Core/16-Thread Recommended for Vice City Crowds)";
    else if (ram < 75) bottleneck = "System RAM (16GB Minimum / 32GB DDR5 Ideal)";

    if (rawScore >= 70 && storage !== "HDD") {
      setResult({
        status: "PASS",
        fps: finalFps,
        nativeFps,
        message: "Your PC is Vice City Ready! Beats PS5 Pro's 30 FPS cap with smooth High/Ultra gameplay.",
        bottleneck,
      });
    } else if (rawScore >= 45 && storage !== "HDD") {
      setResult({
        status: "MINIMUM",
        fps: finalFps,
        nativeFps,
        message: "Meets Console-Grade Minimums. Enable DLSS/FSR Balanced Mode & Medium Textures.",
        bottleneck,
      });
    } else {
      setResult({
        status: "FAIL",
        fps: finalFps,
        nativeFps,
        message:
          storage === "HDD"
            ? "CRITICAL: GTA VI cannot stream Leonida assets from a Hard Drive (HDD). Upgrade to NVMe SSD!"
            : "Your hardware will struggle heavily with GTA VI's RAGE 9 Ray-Traced Engine.",
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
          text: "No. Rockstar Games targets 30 FPS across PS5, PS5 Pro, and Xbox Series X|S at launch due to heavy CPU simulation and global illumination ray tracing. PS5 Pro gains exclusive PSSR upscaling and ray-traced shadows, while 60+ FPS requires a gaming PC.",
        },
      },
      {
        "@type": "Question",
        name: "Can a Gaming Laptop or Steam Deck run GTA 6?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gaming laptops with an RTX 4060 (8GB), RTX 4070, or RTX 3070 Ti laptop GPU can run GTA 6 at 1080p 50-60 FPS using DLSS. Handhelds like the Steam Deck and ROG Ally X will struggle due to 16GB shared memory and heavy RAGE 9 ray-traced lighting.",
        },
      },
      {
        "@type": "Question",
        name: "Why is the RTX 3060 12GB better than RTX 4060 8GB for GTA 6 Textures?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While the RTX 4060 has a faster core and DLSS 3 Frame Generation, its 8GB VRAM buffer limits high-resolution textures at 1440p. The RTX 3060 12GB offers extra VRAM headroom to prevent texture pop-in across Vice City.",
        },
      },
      {
        "@type": "Question",
        name: "When is the GTA 6 PC release date after the November 19, 2026 console launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Following the November 19, 2026 PS5 and Xbox Series X|S launch, industry reports (GamesBeat) suggest the GTA 6 PC port is targeted for early to mid-2027.",
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
            <Flame className="w-3.5 h-3.5" /> Official Launch: November 19, 2026 • PC Port Reported for 2027
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CAN YOUR PC RUN GTA VI?
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
            Test your Desktop, Gaming Laptop, or Handheld against GTA 6&apos;s RAGE 9 Engine. Calculate 1080p/1440p/4K FPS with DLSS 4 &amp; FSR 3.5, and check VRAM bottlenecks.
          </p>

          {/* Countdown Box */}
          <div className="mt-8 inline-flex flex-wrap justify-center items-center gap-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 md:px-8 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium pr-2 border-r border-slate-800">
              <Clock className="w-4 h-4" />{" "}
              {isLaunched ? "GTA VI Console Launch Status:" : "Nov 19 Launch Countdown:"}
            </div>
            {isLaunched ? (
              <div className="text-lg md:text-xl font-black text-emerald-400 px-3">
                LIVE ON PS5 & XBOX • PC PORT TRACKER ACTIVE (2027 WINDOW)
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
            <Monitor className="w-6 h-6 text-pink-500" /> GTA 6 System Requirements &amp; DLSS/FSR FPS Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GPU Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-pink-400" /> Graphics Card (Desktop, Laptop or Handheld)
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
                <Cpu className="w-4 h-4 text-cyan-400" /> Processor (CPU - RAGE 9 Traffic &amp; AI Threads)
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

            {/* Storage Drive Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Disc className="w-4 h-4 text-emerald-400" /> Storage Drive (212 GB DirectStorage)
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
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Resolution</label>
              <div className="grid grid-cols-3 gap-2">
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

            {/* NEW: DLSS 4 / FSR 3.5 Upscaling & Frame Gen Toggle */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> AI Upscaling (DLSS 4 / FSR 3.5 + Frame Gen)
              </label>
              <button
                type="button"
                onClick={() => setUpscaling(!upscaling)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm border transition flex items-center justify-between ${
                  upscaling
                    ? "bg-cyan-950/60 border-cyan-400 text-cyan-300"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <span>{upscaling ? "ENABLED (+35% FPS Boost)" : "DISABLED (Native Resolution Only)"}</span>
                <span
                  className={`px-2 py-0.5 text-xs rounded ${
                    upscaling ? "bg-cyan-500 text-slate-950 font-black" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {upscaling ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={calculateSpecs}
            className="mt-8 w-full py-4 rounded-xl font-extrabold text-lg bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-95 transition shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            CALCULATE MY GTA 6 FPS &amp; BOTTLENECK
          </button>

          {/* Results & High-Converting 4-Way Affiliate Box */}
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
                  <div className="text-xs text-slate-400">
                    {upscaling ? `${resolution} with DLSS/FSR (Native: ~${result.nativeFps} FPS)` : `${resolution} Native`}
                  </div>
                </div>
              </div>

              {/* 4 High-Converting Affiliate Upgrades (SSD, GPU, Gaming Laptop, PS5 Pro) */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recommended Hardware Upgrades for GTA VI (212GB Ready):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <a
                    href={`https://www.amazon.com/s?k=2TB+NVMe+SSD+Gen4+PS5+PC&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-emerald-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">2TB Gen4 NVMe SSD</div>
                      <div className="text-[11px] text-emerald-400 mt-0.5">212GB DirectStorage Ready</div>
                    </div>
                    <span className="mt-3 px-2.5 py-1.5 bg-emerald-600 text-[11px] font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> SSD Deals
                    </span>
                  </a>

                  <a
                    href={`https://www.amazon.com/s?k=NVIDIA+RTX+4070+Super+GPU&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-cyan-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">RTX 4070 Super / 5070</div>
                      <div className="text-[11px] text-cyan-400 mt-0.5">1440p 60+ FPS Sweet Spot</div>
                    </div>
                    <span className="mt-3 px-2.5 py-1.5 bg-cyan-600 text-[11px] font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> GPU Price
                    </span>
                  </a>

                  <a
                    href={`https://www.amazon.com/s?k=RTX+4060+RTX+4070+Gaming+Laptop+16GB+RAM&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-purple-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">RTX 4060/4070 Laptop</div>
                      <div className="text-[11px] text-purple-400 mt-0.5">Best Portable GTA 6 Rig</div>
                    </div>
                    <span className="mt-3 px-2.5 py-1.5 bg-purple-600 text-[11px] font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> Laptop Deals
                    </span>
                  </a>

                  <a
                    href={`https://www.amazon.com/s?k=PlayStation+5+Pro+Console&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-pink-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">PlayStation 5 Pro</div>
                      <div className="text-[11px] text-pink-400 mt-0.5">Play Day-1 with 4K PSSR</div>
                    </div>
                    <span className="mt-3 px-2.5 py-1.5 bg-pink-600 text-[11px] font-bold rounded-lg inline-flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> Check PS5 Pro
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NEW HIGH-TRAFFIC SEO SECTION 1: VRAM Ladder (6GB vs 8GB vs 12GB vs 16GB) */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" /> GTA 6 VRAM Requirements Ladder: Is 8GB VRAM Enough?
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            RAGE 9 uses mandatory ray-traced global illumination and high-density Vice City texture streaming. Here is how much GPU VRAM you need to avoid texture pop-in and stuttering:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30">
              <div className="text-xs font-bold uppercase text-rose-400">6 GB VRAM</div>
              <div className="text-base font-extrabold text-white mt-1">GTX 1660S / RTX 2060</div>
              <p className="text-xs text-slate-400 mt-2">
                <strong>Entry Floor:</strong> Locked to 1080p Low Textures. Ray tracing must be set to minimum to prevent VRAM overflow stutter.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30">
              <div className="text-xs font-bold uppercase text-amber-400">8 GB VRAM</div>
              <div className="text-base font-extrabold text-white mt-1">RTX 4060 / RX 6600</div>
              <p className="text-xs text-slate-400 mt-2">
                <strong>1080p Medium-High:</strong> Most popular Steam tier. Runs 50–60 FPS at 1080p with DLSS Quality, but VRAM limits 1440p Ultra textures.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30">
              <div className="text-xs font-bold uppercase text-cyan-400">12 GB VRAM (Sweet Spot)</div>
              <div className="text-base font-extrabold text-white mt-1">RTX 3060 12GB / 4070S</div>
              <p className="text-xs text-slate-400 mt-2">
                <strong>1440p High + Ray Tracing:</strong> Ideal buffer for High/Ultra Leonida textures without frame-time spikes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div className="text-xs font-bold uppercase text-emerald-400">16 GB+ VRAM</div>
              <div className="text-base font-extrabold text-white mt-1">RTX 4080S / 5080 / 7900XT</div>
              <p className="text-xs text-slate-400 mt-2">
                <strong>4K Ultra Overdrive:</strong> Full ray-traced reflections, maximum crowd density, and zero VRAM bottlenecks.
              </p>
            </div>
          </div>
        </section>

        {/* NEW HIGH-TRAFFIC SEO SECTION 2: Gaming Laptops & Handhelds Compatibility */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-purple-400" /> Can Gaming Laptops, Steam Deck &amp; ROG Ally X Run GTA 6?
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Mobile GPUs operate at lower wattage (TGP) than desktop cards. Check how portable setups handle Vice City:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-purple-400">
                  <th className="py-3 px-4">Laptop / Handheld Device</th>
                  <th className="py-3 px-4">VRAM / RAM</th>
                  <th className="py-3 px-4">Predicted Settings &amp; Resolution</th>
                  <th className="py-3 px-4">Estimated FPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Steam Deck LCD / OLED</td>
                  <td className="py-3 px-4">16 GB Shared</td>
                  <td className="py-3 px-4">720p Low (FSR Ultra Performance)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">20–26 FPS (CPU Bound)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">ASUS ROG Ally X / Legion Go</td>
                  <td className="py-3 px-4">24 GB / 16 GB Shared</td>
                  <td className="py-3 px-4">900p Low-Medium (FSR 3.5 + AFMF)</td>
                  <td className="py-3 px-4 text-amber-400 font-bold">30–40 FPS</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-cyan-400">RTX 4060 Gaming Laptop (105W+)</td>
                  <td className="py-3 px-4">8 GB GDDR6 + 16GB RAM</td>
                  <td className="py-3 px-4">1080p Medium-High (DLSS + Frame Gen)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">55–68 FPS</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-emerald-400">RTX 4080 / 4090 Gaming Laptop</td>
                  <td className="py-3 px-4">12–16 GB GDDR6 + 32GB</td>
                  <td className="py-3 px-4">1440p High / Ultra (DLSS Quality)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">75–95+ FPS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PS5 Pro 30 FPS vs PC 60+ FPS Comparison Table */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-pink-500" /> GTA 6 Performance Modes: PS5 Pro (30 FPS Target) vs. Gaming PC
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Rockstar confirmed a 30 FPS target across all consoles due to RAGE 9 CPU crowd density and ray-traced global illumination, plus a massive 212 GB storage requirement:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-cyan-400">
                  <th className="py-3 px-4">Platform / Tier</th>
                  <th className="py-3 px-4">Target FPS</th>
                  <th className="py-3 px-4">Resolution &amp; Upscaling</th>
                  <th className="py-3 px-4">Install Size &amp; Storage</th>
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

        {/* Expanded SEO FAQ SECTION */}
        <section className="mt-12 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" /> Frequently Asked Questions (GTA 6 PC Specs &amp; 2027 Release)
          </h2>
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="font-bold text-white">1. Does GTA 6 support 60 FPS on PS5 Pro or Xbox Series X?</h3>
              <p className="text-slate-400 mt-1">
                No. Rockstar Games targets 30 FPS across all consoles at launch, including the PS5 Pro. While the PS5 Pro adds PlayStation Spectral Super Resolution (PSSR) and enhanced ray-traced shadows, achieving true 60+ FPS requires a gaming PC with at least a 6-core/8-core modern CPU and an RTX 3060 Ti / 4060 or higher.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="font-bold text-white">2. Why does the RTX 3060 (12GB) beat the RTX 4060 (8GB) in texture settings?</h3>
              <p className="text-slate-400 mt-1">
                While the RTX 4060 has faster clock speeds and DLSS Frame Generation, its 8GB VRAM buffer can fill up at 1440p or High/Ultra textures. The RTX 3060 12GB has 4GB of extra VRAM headroom, preventing texture swapping in dense Vice City areas.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="font-bold text-white">3. When is GTA 6 coming to PC?</h3>
              <p className="text-slate-400 mt-1">
                GTA 6 launches on PlayStation 5 and Xbox Series X|S on <strong>November 19, 2026</strong>. Industry reports (including GamesBeat sources) indicate Rockstar is targeting an early-to-mid <strong>2027 PC release window</strong>, faster than GTA V&apos;s 19-month wait.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}