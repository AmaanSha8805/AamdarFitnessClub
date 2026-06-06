"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGender } from "@/contexts/GenderContext";
import { GenderSelection } from "./GenderSelection";
import { Spinner } from "@/components/ui/Spinner";

export function GenderGate({ children }: { children: React.ReactNode }) {
  const { hasSelected, isLoading } = useGender();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Spinner size="lg" />
      </div>
    );
  }

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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
