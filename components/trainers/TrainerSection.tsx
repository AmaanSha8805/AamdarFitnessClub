"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { TRAINERS } from "@/lib/trainer-data";
import { TrainerCard } from "./TrainerCard";
import { TrainerModal } from "./TrainerModal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function TrainerSection() {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const modalOpen = selectedTrainer !== null;

  const openModal = useCallback((trainerId: string) => {
    setSelectedTrainer(trainerId);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedTrainer(null);
  }, []);

  const selectedTrainerData = TRAINERS.find((t) => t.id === selectedTrainer);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="trainers" className="section-padding relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.1)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.05)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Elite Coaching Team
          </span>
          <h2 className="section-title mt-4">
            MEET OUR <span className="text-primary">EXPERT TRAINERS</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Train with Parbhani&apos;s most experienced fitness professionals.
          </p>
        </ScrollReveal>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TRAINERS.map((trainer) => (
            <motion.div key={trainer.id} variants={itemVariants}>
              <TrainerCard
                trainer={trainer}
                onViewProfile={() => openModal(trainer.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedTrainerData && (
        <TrainerModal
          trainer={selectedTrainerData}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
