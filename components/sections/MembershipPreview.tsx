"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { formatCurrency } from "@/lib/utils";

const PLANS = [
  {
    name: "Monthly",
    price: 1500,
    duration: "1 Month",
    features: ["Gym Access", "Locker", "AI Coach", "Morning & Evening"],
    popular: false,
  },
  {
    name: "Half-Yearly",
    price: 7500,
    duration: "6 Months",
    features: [
      "Everything in Monthly",
      "Diet Plan",
      "Progress Tracking",
      "1 Free PT Session",
    ],
    popular: true,
  },
  {
    name: "Annual",
    price: 12000,
    duration: "12 Months",
    features: [
      "Everything in Half-Yearly",
      "Personal Diet Plan",
      "Priority Support",
      "3 Free PT Sessions",
    ],
    popular: false,
  },
];

export function MembershipPreview() {
  return (
    <section className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Membership
          </span>
          <h2 className="section-title mt-4">
            CHOOSE YOUR <span className="text-primary">PLAN</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-primary bg-primary/5 shadow-neon-sm"
                    : "border-white/10 bg-black hover:border-primary/30"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-bold uppercase tracking-wider text-text-secondary">
                  {plan.duration}
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase text-white">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-black text-primary">
                    {formatCurrency(plan.price)}
                  </span>
                </div>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/join"
                  className={`mt-8 block rounded-full py-4 text-center text-sm font-bold uppercase tracking-wider transition-all ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-hover hover:shadow-neon"
                      : "border border-white/20 text-white hover:border-primary hover:text-primary"
                  }`}
                >
                  Join Now
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-10 text-center">
          <Link
            href="/packages"
            className="text-sm font-bold uppercase tracking-wider text-primary hover:underline"
          >
            View All Plans →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
