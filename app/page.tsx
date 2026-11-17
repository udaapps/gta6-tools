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
} from "lucide-react";
import Link from "next/link";
import { GPUS_DATA } from "@/data/gpus";

// Hardware Database with Performance Scores & Affiliate Search Queries
const GPUS = [
  { name: "Select your GPU...", score: 0 },
  { name: "NVIDIA GTX 1650 / 1060 (4GB-6GB)", score: 30 },
  { name: "NVIDIA RTX 2060 / AMD RX 6600", score: 55 },
  { name: "NVIDIA RTX 3060 / RTX 4060", score: 75 },
  { name: "NVIDIA RTX 3070 / RTX 4060 Ti / RX 7700 XT", score: 85 },
  { name: "NVIDIA RTX 4070 Super / RX 7800 XT", score: 95 },
  { name: "NVIDIA RTX 4080 / RTX 4090", score: 100 },
];

const CPUS = [
  { name: "Select your CPU...", score: 0 },
  { name: "Intel Core i3 / AMD Ryzen 3 (Older Gen)", score: 30 },
  { name: "Intel Core i5 (10th/11th) / Ryzen 5 3600", score: 60 },
  { name: "Intel Core i5 (12th/13th) / Ryzen 5 5600X", score: 80 },
  { name: "Intel Core i7 (13th/14th) / Ryzen 7 7700X", score: 95 },
  { name: "Intel Core i9 / Ryzen 7 7800X3D / Ryzen 9", score: 100 },
];

const RAMS = [
  { name: "8 GB RAM", score: 30 },
  { name: "16 GB RAM", score: 75 },
  { name: "32 GB or 64 GB RAM", score: 100 },
];

export default function GTA6ToolsHub() {
  const AMAZON_TAG = "yourtag-20";

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [gpu, setGpu] = useState(0);
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(75);
  const [resolution, setResolution] = useState("1080p");
  const [result, setResult] = useState<null | {
    status: "PASS" | "MINIMUM" | "FAIL";
    fps: number;
    message: string;
    bottleneck: string;
  }>(null);

  useEffect(() => {
    const targetDate = new Date("2026-11-27T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateSpecs = () => {
    if (gpu === 0 || cpu === 0) return;

    const resMultiplier = resolution === "1080p" ? 1 : resolution === "1440p" ? 0.78 : 0.52;
    const rawScore = (gpu * 0.55 + cpu * 0.3 + ram * 0.15) * resMultiplier;
    const estimatedFps = Math.round((rawScore / 100) * 95);

    let bottleneck = "None";
    if (gpu < 75) bottleneck = "GPU (Graphics Card)";
    else if (cpu < 75) bottleneck = "CPU (Processor)";
    else if (ram < 75) bottleneck = "RAM (16GB+ Recommended)";

    if (rawScore >= 72) {
      setResult({
        status: "PASS",
        fps: estimatedFps,
        message: "Your PC is Vice City Ready! You can run GTA VI on High/Ultra settings smoothly.",
        bottleneck,
      });
    } else if (rawScore >= 48) {
      setResult({
        status: "MINIMUM",
        fps: estimatedFps,
        message: "You meet the Minimum Predicted Requirements. Expect Medium-Low settings with DLSS/FSR.",
        bottleneck,
      });
    } else {
      setResult({
        status: "FAIL",
        fps: Math.max(15, estimatedFps),
        message: "Your system will struggle heavily with GTA VI's RAGE 9 Engine.",
        bottleneck,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500 selection:text-white">
      {/* Hero & Countdown Section */}
      <header className="relative overflow-hidden border-b border-pink-500/30 bg-gradient-to-b from-purple-950/60 via-slate-950 to-slate-950 py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-500/20 text-pink-400 border border-pink-500/40 mb-4">
            <Flame className="w-3.5 h-3.5" /> Unofficial Vice City Tools & Spec Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            CAN YOUR PC RUN GTA VI?
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
            Test your PC hardware against predicted RAGE 9 Engine requirements, estimate your FPS in Leonida, and compare PC upgrade costs vs. PS5 Pro.
          </p>

          {/* Countdown Box */}
          <div className="mt-8 inline-flex flex-wrap justify-center gap-4 bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 md:px-8 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium pr-2 border-r border-slate-800">
              <Clock className="w-4 h-4" /> Countdown Tracker
            </div>
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINS", val: timeLeft.mins },
              { label: "SECS", val: timeLeft.secs },
            ].map((item, i) => (
              <div key={i} className="text-center px-3">
                <div className="text-2xl md:text-3xl font-black text-white">{item.val}</div>
                <div className="text-[10px] tracking-widest text-pink-400 font-bold">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Tool Container */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-cyan-400">
            <Monitor className="w-6 h-6 text-pink-500" /> GTA 6 System Requirements & FPS Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GPU Select */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-pink-400" /> Graphics Card (GPU)
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
                <Cpu className="w-4 h-4 text-cyan-400" /> Processor (CPU)
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
          </div>

          <button
            onClick={calculateSpecs}
            className="mt-8 w-full py-4 rounded-xl font-extrabold text-lg bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-95 transition shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            CALCULATE MY GTA 6 FPS & COMPATIBILITY
          </button>

          {/* Results & Affiliate Conversion Box */}
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

              {/* High-Converting Affiliate Recommendations */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Recommended Upgrades to Run GTA VI Smoothly:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a
                    href={`https://www.amazon.com/s?k=PlayStation+5+Pro+Console&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-pink-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">PlayStation 5 Pro Console</div>
                      <div className="text-xs text-pink-400">Play Day-1 at 4K without PC waiting</div>
                    </div>
                    <span className="px-3 py-1.5 bg-pink-600 text-xs font-bold rounded-lg flex items-center gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Check Price
                    </span>
                  </a>

                  <a
                    href={`https://www.amazon.com/s?k=NVIDIA+RTX+4070+Super+GPU&tag=${AMAZON_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-cyan-500/30 transition"
                  >
                    <div>
                      <div className="font-bold text-white text-sm">NVIDIA RTX 4070 Super 12GB</div>
                      <div className="text-xs text-cyan-400">Recommended GPU for 1440p Ultra</div>
                    </div>
                    <span className="px-3 py-1.5 bg-cyan-600 text-xs font-bold rounded-lg flex items-center gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Check Price
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

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
      </main>
    </div>
  );
}