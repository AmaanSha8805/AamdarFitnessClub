import { MetadataRoute } from "next";
import { GYM } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = GYM.siteUrl;
  const routes = [
    "",
    "/packages",
    "/join",
    "/ai-coach",
    "/workout-generator",
    "/equipment-guide",
    "/trainers",
    "/gallery",
    "/blog",
    "/contact",
    "/portal",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
