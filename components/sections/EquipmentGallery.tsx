"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell } from "lucide-react";
import type { FolderImage } from "@/lib/media-scan";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface EquipmentGalleryProps {
  images: FolderImage[];
}

export function EquipmentGallery({ images }: EquipmentGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
        <Dumbbell className="mb-4 h-10 w-10 text-gold/50" />
        <p className="text-text-secondary">
          Equipment photos will appear here automatically. Add images to the{" "}
          <code className="text-gold">public/Equipment</code> folder.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, i) => (
          <ScrollReveal key={item.src} delay={Math.min(i * 0.05, 0.4)}>
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-2xl"
              aria-label={`View ${item.name}`}
            >
              <div className="glass-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold-glow-sm">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
                </div>
                <div className="border-t border-white/5 p-4">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white transition-colors group-hover:text-gold">
                    {item.name}
                  </h3>
                </div>
              </div>
            </button>
          </ScrollReveal>
        ))}
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
    </>
  );
}
