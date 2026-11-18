import { MetadataRoute } from "next";
import { GPUS_DATA } from "@/data/gpus";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.gta6specs.online";
  const lastUpdated = "2026-11-18";

  // Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Dynamic GPU Benchmark Pages (SEO Pages for all 30+ GPUs)
  const gpuPages: MetadataRoute.Sitemap = GPUS_DATA.map((gpu) => ({
    url: `${baseUrl}/can-i-run/${gpu.slug}`,
    lastModified: lastUpdated,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...gpuPages];
}