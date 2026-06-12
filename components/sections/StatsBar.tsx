"use client";

import { Users, Dumbbell, Award, Star } from "lucide-react";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { SITE_STATS } from "@/lib/site-content";

const ICONS = [Users, Dumbbell, Award, Star];

export function StatsBar() {
  return (
    <section id="stats" className="section-padding bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8">
        {SITE_STATS.map((stat, i) => {
          const Icon = ICONS[i];
          return (
            <div
              key={stat.label}
              className="glass-card flex flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-gold-glow-sm sm:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <div className="text-3xl font-black text-white sm:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
