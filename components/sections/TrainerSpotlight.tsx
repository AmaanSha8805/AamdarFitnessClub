"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ArrowRight, Star } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function TrainerSpotlight() {
  const { content } = useGender();
  const trainer = content.featuredTrainer;

  return (
    <section className="section-padding relative overflow-hidden bg-background-card">
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Your Coach
              </span>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                MEET{" "}
                <span className="text-primary">{trainer.name.split(" ").pop()}</span>
              </h2>
              <p className="mt-2 text-lg font-semibold text-text-secondary">
                {trainer.specialization}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-text-muted">
                  {trainer.experienceYears}+ Years Experience
                </span>
              </div>

              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                {trainer.bio}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {trainer.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-medium text-text-secondary"
                  >
                    <Award className="h-3 w-3 text-primary" />
                    {cert}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/trainers" className="premium-btn !py-3 !text-xs">
                  View All Trainers
                </Link>
                <Link
                  href="/join"
                  className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-primary"
                >
                  Book a Session
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    Featured Trainer
                  </p>
                  <h3 className="text-2xl font-black uppercase text-white">
                    {trainer.name}
                  </h3>
                </div>
              </div>

              <motion.div
                className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl lg:block"
                animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 hidden h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl lg:block"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
