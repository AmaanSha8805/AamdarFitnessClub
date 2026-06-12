import { MetadataRoute } from "next";
import { GYM } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/manager-dashboard", "/manager-login", "/api/"],
    },
    sitemap: `${GYM.siteUrl}/sitemap.xml`,
  };
}
