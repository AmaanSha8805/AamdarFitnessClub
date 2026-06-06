"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function TestimonialsSection() {
  const { content } = useGender();

  return (
    <section className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Testimonials
          </span>
          <h2 className="section-title mt-4">
            WHAT MEMBERS <span className="text-primary">SAY</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {content.testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="glass-card h-full p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
