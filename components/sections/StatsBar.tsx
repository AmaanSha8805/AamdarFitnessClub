"use client";

import {
  Users,
  Dumbbell,
  Star,
  Award,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SITE_STATS } from "@/lib/gender-content";

const ICONS = [Users, Award, Dumbbell, Star];

export function StatsBar() {
  return (
    <section className="relative border-y border-white/5 bg-background-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {SITE_STATS.map((stat, i) => {
          const Icon = ICONS[i];
          return (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl font-black text-white sm:text-4xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                  />
                </div>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
