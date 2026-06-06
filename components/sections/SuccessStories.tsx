"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function SuccessStories() {
  const { content } = useGender();

  return (
    <section className="section-padding bg-black">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Transformations
          </span>
          <h2 className="section-title mt-4">
            SUCCESS <span className="text-primary">STORIES</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real members. Real results. See what&apos;s possible at AAMDAR.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {content.successStories.map((story, i) => (
            <ScrollReveal key={story.name} delay={i * 0.12}>
              <div className="glass-card-hover overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {story.duration}
                    </p>
                    <h3 className="text-xl font-bold text-white">{story.name}</h3>
                    <p className="text-sm text-success">{story.transformation}</p>
                  </div>
                </div>
                <div className="p-6">
                  <Quote className="mb-3 h-5 w-5 text-primary/50" />
                  <p className="text-sm italic leading-relaxed text-text-secondary">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
