"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { GenderSelection } from "./GenderSelection";

export function GenderGate({ children }: { children: React.ReactNode }) {
  const { hasSelected, resetGender } = useGender();

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasSelected ? (
          <GenderSelection key="gender-select" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <button
              onClick={resetGender}
              className="fixed left-4 top-20 z-[90] flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary/20 hover:shadow-neon-sm lg:top-24"
              aria-label="Back to Gender Selection"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Change</span>
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
