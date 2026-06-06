"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, QrCode } from "lucide-react";
import { EQUIPMENT_LIST } from "@/lib/equipment-data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function EquipmentSection() {
  return (
    <section id="equipment" className="section-padding relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(229,9,20,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Our Facility
            </span>
            <h2 className="section-title mt-4">
              PREMIUM <span className="text-primary">EQUIPMENT</span>
            </h2>
            <p className="section-subtitle mt-4">
              {EQUIPMENT_LIST.length}+ world-class machines. Scan any QR code for instant video guides.
            </p>
          </div>
          <Link
            href="/equipment-guide"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-primary"
          >
            Full Equipment Guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {EQUIPMENT_LIST.map((eq) => (
            <motion.div key={eq.id} variants={item}>
              <Link href="/equipment-guide" className="group block h-full">
                <div className="glass-card-hover h-full overflow-hidden">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={eq.image}
                      alt={eq.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
                      <QrCode className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold uppercase tracking-wide text-white transition-colors group-hover:text-primary">
                      {eq.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-2">
                      {eq.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {eq.muscles.slice(0, 2).map((m) => (
                        <span
                          key={m}
                          className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
