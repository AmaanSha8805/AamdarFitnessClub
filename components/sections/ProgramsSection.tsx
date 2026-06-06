"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useGender } from "@/contexts/GenderContext";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function ProgramsSection() {
  const { content } = useGender();

  return (
    <section className="section-padding bg-background-card">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Programs
            </span>
            <h2 className="section-title mt-4">
              FEATURED <span className="text-primary">PROGRAMS</span>
            </h2>
          </div>
          <Link
            href="/packages"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-primary"
          >
            View All Plans
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.programs.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.1}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold text-white">
                    {program.duration}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold uppercase tracking-wide text-white">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                    {program.description}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
