import type { Metadata } from "next";
import { GYM } from "@/lib/constants";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
}: SEOProps): Metadata {
  const url = `${GYM.siteUrl}${path}`;
  const fullTitle = path === "/" || path === ""
    ? `${GYM.name} | Best Gym in Parbhani`
    : `${title} | ${GYM.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "gym in Parbhani",
      "fitness club Parbhani",
      "AAMDAR Fitness",
      "best gym Parbhani",
      "gym membership Parbhani",
      "personal training Parbhani",
    ],
    authors: [{ name: GYM.name }],
    creator: GYM.name,
    metadataBase: new URL(GYM.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: GYM.name,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: GYM.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateGymJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: GYM.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: GYM.address.street,
      addressLocality: GYM.address.city,
      postalCode: GYM.address.postalCode,
      addressRegion: GYM.address.state,
      addressCountry: GYM.address.country,
    },
    telephone: GYM.phone,
    url: GYM.siteUrl,
    openingHours: GYM.openingHours,
  };
}
