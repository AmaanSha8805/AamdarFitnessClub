"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/utils";

const HERO_BG = "/images/gym-tour/gym-tour-08.png";

export function PremiumHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt="Premium training floor at Aamdar Fitness Club"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(212,175,55,0.08)_0%,transparent_55%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-0">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium Fitness • Expert Trainers • Modern Equipment • Real Results
          </motion.span>

          <motion.h1
            className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="block text-gold">आमदार</span>
            <span className="mt-1 block text-4xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
              Fitness Club
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-lg font-medium text-white/90 sm:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Transform Your Body. Build Your Strength. Unlock Your Potential.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link href="/join" className="premium-btn">
              Join Now
            </Link>
            <Link href="/#gym-tour" className="premium-btn-outline">
              Explore Gym Tour
            </Link>
          </motion.div>

          <motion.a
            href={getWhatsAppUrl(
              "Hi! I want to know more about Aamdar Fitness Club."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-medium text-text-muted transition-colors hover:text-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            Or chat on WhatsApp →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
