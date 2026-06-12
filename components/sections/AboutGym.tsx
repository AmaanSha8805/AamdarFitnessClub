"use client";

import {
  Building2,
  Users,
  Dumbbell,
  HeartPulse,
  UserCheck,
  TrendingUp,
  Smile,
} from "lucide-react";
import { ABOUT_GYM } from "@/lib/site-content";

const FEATURE_ICONS = [
  Building2,
  Users,
  Dumbbell,
  HeartPulse,
  UserCheck,
  TrendingUp,
  Smile,
];

export function AboutGym() {
  return (
    <section id="about" className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            About Us
          </span>
          <h2 className="section-title mt-4">
            AAMDAR <span className="text-primary">FITNESS CLUB</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            {ABOUT_GYM.description}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ABOUT_GYM.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] || Dumbbell;
            return (
              <div
                key={feature}
                className="glass-card flex items-center gap-4 p-5 transition-colors hover:border-primary/25"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-white">{feature}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
