"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Calendar, Shield, Target, Zap } from "lucide-react";
import type { TrainerProfile } from "@/lib/trainer-data";
import { cn } from "@/lib/utils";

function trainerImageClass(trainer: TrainerProfile) {
  return cn(
    trainer.imageFit === "contain"
      ? "object-contain object-center"
      : "object-cover object-top"
  );
}

interface TrainerModalProps {
  trainer: TrainerProfile;
  isOpen: boolean;
  onClose: () => void;
}

export function TrainerModal({ trainer, isOpen, onClose }: TrainerModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="trainer-modal-title"
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-background-card shadow-neon"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-primary"
              aria-label="Close profile"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Hero image - Large prominent display */}
            <div className="relative h-[28rem] sm:h-[36rem] lg:h-[42rem] bg-black">
              <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/20 to-transparent z-10" />
              <div className="absolute left-1/2 top-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-10" />
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                className={trainerImageClass(trainer)}
                style={{
                  filter: "contrast(1.12) brightness(1.06) saturate(1.1)",
                  objectPosition: trainer.imagePosition ?? "top",
                }}
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
                quality={90}
              />
            </div>

            <div className="relative -mt-24 px-6 pb-8 sm:px-8">
              {/* Portrait frame */}
              <div className="relative mx-auto -mt-28 mb-6 h-36 w-36 sm:h-44 sm:w-44">
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-primary/50 shadow-neon bg-black">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className={trainerImageClass(trainer)}
                    style={{
                      filter: "contrast(1.1) brightness(1.05)",
                      objectPosition: trainer.imagePosition ?? "top",
                    }}
                    sizes="176px"
                    quality={90}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {trainer.designation}
                </p>
                <h2
                  id="trainer-modal-title"
                  className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl"
                >
                  {trainer.name}
                </h2>
              </div>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Calendar, label: "Experience", value: trainer.experience },
                  { icon: Shield, label: "Certified", value: "Yes" },
                  { icon: Target, label: "Specialization", value: trainer.specialization.split(",")[0] },
                  { icon: Zap, label: "Focus", value: "Expert" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-xl border border-white/5 bg-black/50 p-4 text-center"
                    whileHover={{ scale: 1.05, borderColor: "rgba(229, 9, 20, 0.3)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <stat.icon className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Bio */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Professional Biography
                </h3>
                <div className="mt-4 space-y-4">
                  {trainer.bio.split("\n\n").map((para, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm leading-relaxed text-text-secondary"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* Specialization */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Specialization
                </h3>
                <div className="mt-4 rounded-xl border border-white/5 bg-black/40 p-4">
                  <p className="text-sm font-medium text-white">
                    {trainer.specialization}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Professional Highlights
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {trainer.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/40 px-4 py-3 text-sm text-text-secondary"
                    >
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-neon-sm" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Achievements
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trainer.achievements.map((a, i) => (
                    <motion.span
                      key={a}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
                    >
                      <Award className="h-3 w-3" />
                      {a}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Certification */}
              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  Certification
                </h3>
                <div className="mt-4 rounded-xl border border-white/5 bg-black/40 p-4">
                  <p className="text-sm font-semibold text-white">
                    {trainer.certification}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
