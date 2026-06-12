"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell } from "lucide-react";
import { useEffect } from "react";
import { useGender } from "@/contexts/GenderContext";
import { ParticleBackground } from "@/components/animations/ParticleBackground";
import type { Gender } from "@/lib/gender-content";
import { MEDIA } from "@/lib/media-urls";

const CARDS: {
  gender: Gender;
  label: string;
  image: string;
}[] = [
  {
    gender: "male",
    label: "Male",
    image: MEDIA.genderMale,
  },
  {
    gender: "female",
    label: "Female",
    image: MEDIA.genderFemale,
  },
];

const PRELOAD_IMAGES = [MEDIA.genderMale, MEDIA.genderFemale];

export function GenderSelection() {
  const { setGender } = useGender();

  useEffect(() => {
    PRELOAD_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.06)_0%,_transparent_70%)]" />

      <motion.div
        className="relative z-10 mb-6 flex items-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20">
          <Dumbbell className="h-5 w-5 text-primary" />
        </div>
        <div className="text-left">
          <span className="text-lg font-black tracking-tight text-white">AAMDAR</span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.3em] text-primary">
            Fitness Club
          </span>
        </div>
      </motion.div>

      <motion.h1
        className="relative z-10 px-4 text-center text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        Who Are <span className="text-primary">You?</span>
      </motion.h1>

      <motion.p
        className="relative z-10 mt-4 text-center text-base text-text-secondary sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        Select to personalize your fitness experience
      </motion.p>

      <motion.div
        className="relative z-10 mt-10 grid w-full max-w-4xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:gap-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {CARDS.map((card, i) => (
          <motion.button
            key={card.gender}
            onClick={() => setGender(card.gender)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-primary/50"
            whileHover={{ scale: 1.03, y: -6 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/5" />

            <div className="relative h-56 overflow-hidden sm:h-72">
              <Image
                src={card.image}
                alt={card.label}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6 sm:p-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-wider text-white sm:text-4xl">
                  {card.label}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:shadow-neon">
                <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
