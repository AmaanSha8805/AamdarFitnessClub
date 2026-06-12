"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TRAINERS } from "@/lib/trainer-data";

export function TrainersPreview() {
  return (
    <section id="trainers" className="section-padding bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Our Team
            </span>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              Expert <span className="text-gold">Trainers</span>
            </h2>
            <p className="mt-3 max-w-lg text-text-secondary">
              Train with certified professionals dedicated to your transformation.
            </p>
          </div>
          <Link
            href="/trainers"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold hover:text-white"
          >
            View All Trainers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINERS.map((trainer) => (
            <Link
              key={trainer.id}
              href="/trainers"
              className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold-glow-sm"
            >
              <div className="relative mb-4 h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-gold/25 bg-black transition-all duration-300 group-hover:border-gold/50 sm:h-36 sm:w-36">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 128px, 144px"
                  loading="lazy"
                  quality={85}
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                {trainer.designation}
              </p>
              <p className="mt-1 text-xs font-bold uppercase text-white line-clamp-2 sm:text-sm">
                {trainer.name}
              </p>
              <p className="mt-2 text-xs text-text-secondary line-clamp-2">
                {trainer.specialization}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
