"use client";

import Link from "next/link";
import { Brain, Sparkles, QrCode, FileDown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const TOOLS = [
  {
    title: "AI Fitness Assistant",
    description: "Workout guidance, nutrition help, and membership support — 24/7.",
    href: "/ai-coach",
    icon: Brain,
    cta: "Start Chatting",
  },
  {
    title: "AI Workout Generator",
    description: "Get a personalized weekly split based on your stats and goals. Export as PDF.",
    href: "/workout-generator",
    icon: Sparkles,
    cta: "Generate Plan",
  },
  {
    title: "QR Equipment System",
    description: "Scan any machine for video tutorials, form tips, and safety guides.",
    href: "/equipment-guide",
    icon: QrCode,
    cta: "Browse Equipment",
  },
];

export function AIToolsSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.06)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            AI Technology
          </span>
          <h2 className="section-title mt-4">
            SMART <span className="text-primary">FITNESS</span> TOOLS
          </h2>
          <p className="section-subtitle mx-auto">
            Luxury fitness technology — not just a gym.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <ScrollReveal key={tool.title} delay={i * 0.1}>
              <Link href={tool.href} className="group block h-full">
                <div className="glass-card-hover flex h-full flex-col p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary group-hover:shadow-neon-sm">
                    <tool.icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-white">
                    {tool.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {tool.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                    {tool.cta}
                    <FileDown className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
