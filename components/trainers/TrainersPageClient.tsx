"use client";

import { useState, useCallback } from "react";
import { TRAINERS } from "@/lib/trainer-data";
import { TrainerCard } from "./TrainerCard";
import { TrainerModal } from "./TrainerModal";

export function TrainersPageClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTrainer = TRAINERS.find((t) => t.id === selectedId) ?? null;

  const openProfile = useCallback((id: string) => setSelectedId(id), []);
  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <header className="mb-14 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Elite Coaching Team
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Our <span className="text-primary">Trainers</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            Professional fitness coaches at Aamdar Fitness Club — expert guidance
            for every goal.
          </p>
        </header>

        <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 xl:grid-cols-2">
          {TRAINERS.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onViewProfile={() => openProfile(trainer.id)}
            />
          ))}
        </div>
      </div>

      {selectedTrainer && (
        <TrainerModal
          trainer={selectedTrainer}
          isOpen={selectedId !== null}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
