import { MetadataRoute } from "next";
import { GYM } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api/"],
    },
    sitemap: `${GYM.siteUrl}/sitemap.xml`,
  };
}
