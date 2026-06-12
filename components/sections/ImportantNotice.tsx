"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export function ImportantNotice() {
  return (
    <section className="relative z-10 -mt-8 px-4 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-gold/30 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
              <Info className="h-6 w-6 text-gold" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider text-gold sm:text-xl">
                Important Notice
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                Welcome to आमदार Fitness Club. All new members are requested to
                consult our trainers before starting any workout program. Proper
                guidance ensures better results, improved safety, and a
                personalized fitness journey.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
