"use client";

import { motion, type Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const getVariants = (direction: string): Variants => {
  const offsets = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
  };
  const offset = offsets[direction as keyof typeof offsets] || offsets.up;

  return {
    hidden: { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  };
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={getVariants(direction)}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
