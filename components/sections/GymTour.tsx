"use client";

import { useState } from "react";
import Image from "next/image";
import type { FolderImage } from "@/lib/media-scan";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

interface GymTourProps {
  images: FolderImage[];
}

export function GymTour({ images }: GymTourProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <section id="gym-tour" className="section-padding bg-black">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title text-white">
            GYM <span className="text-gold">TOUR</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Gym photos will appear here automatically. Add images to{" "}
            <code className="text-gold">public/images/gym-tour</code>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="gym-tour" className="section-padding relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Inside Our Club
          </span>
          <h2 className="section-title mt-4 text-white">
            GYM <span className="text-gold">TOUR</span>
          </h2>
          <p className="section-subtitle">
            Take a look inside Aamdar Fitness Club and explore our premium
            training environment, modern equipment, and fitness facilities.
          </p>
        </ScrollReveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {images.map((img, i) => (
            <ScrollReveal key={img.src} delay={Math.min(i * 0.04, 0.35)}>
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                aria-label={`View ${img.name}`}
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={i % 3 === 0 ? 1000 : i % 3 === 1 ? 600 : 800}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={images.map((img) => ({
          src: img.src,
          alt: img.alt,
          name: img.name,
        }))}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
