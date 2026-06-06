"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { getWhatsAppUrl } from "@/lib/utils";

export function PremiumHero() {
  const { content } = useGender();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row lg:items-center">
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 flex flex-1 flex-col justify-center px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-0 lg:pt-0"
        >
          <motion.span
            className="mb-6 inline-block w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Parbhani&apos;s Premium Fitness
          </motion.span>

          <motion.h1
            className="mega-type text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.1 }}
          >
            {content.headline}
            <br />
            <span className="text-primary">{content.headlineAccent}</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-lg text-text-secondary sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            {content.subheadline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/join" className="premium-btn">
              Join Now
            </Link>
            <Link href="/packages" className="premium-btn-outline">
              <Play className="h-4 w-4 fill-current" />
              Explore Programs
            </Link>
          </motion.div>

          <motion.a
            href={getWhatsAppUrl("Hi! I want to know more about AAMDAR Fitness Club.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-fit text-sm font-medium text-text-muted transition-colors hover:text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Or chat on WhatsApp →
          </motion.a>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          className="relative flex-1 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[55%]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative h-[50vh] lg:h-full">
            <Image
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent lg:from-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
          </div>

          <motion.div
            className="absolute -left-4 bottom-20 hidden h-32 w-32 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-xl lg:block"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-12 top-32 hidden h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl lg:block"
            animate={{ y: [0, 12, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
