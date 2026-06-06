"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import type { Gender } from "@/lib/gender-content";

const CARDS: {
  gender: Gender;
  label: string;
  tagline: string;
  image: string;
}[] = [
  {
    gender: "male",
    label: "MALE",
    tagline: "Build Strength. Build Confidence.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
  },
  {
    gender: "female",
    label: "FEMALE",
    tagline: "Build Strength. Build Confidence.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
];

export function GenderSelection() {
  const { setGender, skipPersonalization } = useGender();

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.08)_0%,_transparent_70%)]" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-4 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <span className="text-xl font-black tracking-tight text-white">
              AAMDAR
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Fitness Club
            </span>
          </div>
        </div>

        <h1 className="max-w-4xl text-3xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
          Welcome to{" "}
          <span className="text-primary">Aamdar Fitness Club</span>
        </h1>
        <p className="mt-4 text-lg text-text-secondary sm:text-xl">
          Choose your fitness journey.
        </p>
      </motion.div>

      <motion.div
        className="relative z-10 mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {CARDS.map((card, i) => (
          <motion.button
            key={card.gender}
            onClick={() => setGender(card.gender)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-neon"
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <div className="relative h-64 overflow-hidden sm:h-80">
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h2 className="text-3xl font-black uppercase tracking-wider text-white sm:text-4xl">
                {card.label}
              </h2>
              <p className="mt-2 text-sm text-text-secondary sm:text-base">
                {card.tagline}
              </p>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:shadow-neon">
                <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.button
        onClick={skipPersonalization}
        className="relative z-10 mt-10 text-sm text-text-muted underline-offset-4 transition-colors hover:text-text-secondary hover:underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Skip Personalization
      </motion.button>
    </motion.div>
  );
}
