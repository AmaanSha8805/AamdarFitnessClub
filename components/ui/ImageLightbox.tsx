"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
  name?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = activeIndex !== null;
  const current = isOpen ? images[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }, [activeIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.name ?? current.alt}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close lightbox"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/60 p-2 text-white transition-colors hover:border-gold/40 hover:text-gold"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 z-10 rounded-full border border-white/10 bg-black/60 p-2 text-white transition-colors hover:border-gold/40 hover:text-gold"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-14 z-10 rounded-full border border-white/10 bg-black/60 p-2 text-white transition-colors hover:border-gold/40 hover:text-gold"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <motion.div
            className="relative z-[1] flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-gold/20 shadow-gold-glow">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority
              />
            </div>
            {(current.name || current.alt) && (
              <p
                className={cn(
                  "mt-4 text-center text-sm font-semibold uppercase tracking-wider text-gold"
                )}
              >
                {current.name ?? current.alt}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
