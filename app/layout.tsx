import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GenderProvider } from "@/contexts/GenderContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AAMDAR Fitness Club | Premium Gym in Parbhani",
  description:
    "Experience luxury fitness at AAMDAR Fitness Club, Parbhani. AI-powered training, premium equipment, expert coaches. Transform your body today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-black">
        <GenderProvider>{children}</GenderProvider>
      </body>
    </html>
  );
}
