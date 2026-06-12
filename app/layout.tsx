import type { Metadata } from "next";
import { GenderProvider } from "@/contexts/GenderContext";
import { GYM } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aamdar Fitness Club | Premium Gym in Parbhani",
    template: "%s | Aamdar Fitness Club",
  },
  description:
    "Experience luxury fitness at Aamdar Fitness Club, Parbhani. Premium equipment, expert trainers, modern facilities. Transform your body. Build your strength.",
  keywords: [
    "Aamdar Fitness Club",
    "gym in Parbhani",
    "premium gym Parbhani",
    "fitness club Maharashtra",
    "personal training Parbhani",
  ],
  authors: [{ name: GYM.name }],
  creator: GYM.name,
  metadataBase: new URL(GYM.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: GYM.name,
    title: "Aamdar Fitness Club | Premium Gym in Parbhani",
    description:
      "Premium fitness club with expert trainers, modern equipment, and real results in Parbhani.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Aamdar Fitness Club Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aamdar Fitness Club | Premium Gym in Parbhani",
    description:
      "Premium fitness club with expert trainers, modern equipment, and real results.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/images/logo.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-black">
        <GenderProvider>{children}</GenderProvider>
      </body>
    </html>
  );
}
