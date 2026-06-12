"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Award } from "lucide-react";
import type { TrainerProfile } from "@/lib/trainer-data";
import { MEDIA } from "@/lib/media-urls";
import { cn } from "@/lib/utils";

interface TrainerCardProps {
  trainer: TrainerProfile;
  onViewProfile: () => void;
}

function TrainerCardComponent({ trainer, onViewProfile }: TrainerCardProps) {
  const fallback =
    trainer.name.includes("GAURI") || trainer.name.includes("RANI")
      ? MEDIA.femaleTrainer
      : MEDIA.maleTrainer;
  const [imageSrc, setImageSrc] = useState(trainer.image);

  return (
    <button
      type="button"
      onClick={onViewProfile}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold-glow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
    >
      <div className="flex flex-1 flex-col items-center px-6 pb-4 pt-8">
        <div className="relative mb-5 h-44 w-44 shrink-0 overflow-hidden rounded-full border-2 border-gold/30 bg-black shadow-gold-glow-sm transition-all duration-300 group-hover:border-gold/60 group-hover:shadow-gold-glow sm:h-48 sm:w-48">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-gold/10 to-transparent" />
          <Image
            src={imageSrc}
            alt={`${trainer.name} — ${trainer.designation} at Aamdar Fitness Club`}
            fill
            className="object-cover object-top"
            style={{ objectPosition: trainer.imagePosition ?? "center top" }}
            sizes="(max-width: 640px) 176px, 192px"
            loading="lazy"
            quality={85}
            onError={() => setImageSrc(fallback)}
          />
        </div>

        <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-center text-[10px] font-bold uppercase tracking-widest text-gold">
          {trainer.designation}
        </span>
        <h3 className="mt-3 text-center text-base font-black uppercase leading-tight tracking-tight text-white sm:text-lg">
          {trainer.name}
        </h3>
        <p className="mt-2 text-center text-sm text-text-secondary line-clamp-2">
          {trainer.specialization}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <Award className="h-3.5 w-3.5 text-gold" />
          {trainer.experience}
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-4">
        <span className="inline-flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-gold transition-colors group-hover:text-white">
          View Profile
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}

export const TrainerCard = memo(TrainerCardComponent);
