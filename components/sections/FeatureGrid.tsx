"use client";

import {
  Dumbbell,
  Users,
  Apple,
  Brain,
  QrCode,
  Target,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PREMIUM_FEATURES } from "@/lib/gender-content";

const ICON_MAP: Record<string, LucideIcon> = {
  Dumbbell,
  Users,
  Apple,
  Brain,
  QrCode,
  Target,
};

export function FeatureGrid() {
  return (
    <section className="section-padding bg-black">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Why AAMDAR
          </span>
          <h2 className="section-title mt-4">
            FITNESS <span className="text-primary">REIMAGINED</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PREMIUM_FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Dumbbell;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <div className="glass-card-hover group h-full p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
