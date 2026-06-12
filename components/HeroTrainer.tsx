"use client";

import { memo, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGender } from "@/contexts/GenderContext";

const TRAINER_IMAGES = {
  male: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop",
  female: "https://images.unsplash.com/photo-1518310383802-640c2ed31132?w=800&q=80&auto=format&fit=crop",
} as const;

function HeroTrainerComponent() {
  const { gender, content } = useGender();

  const imageSrc = useMemo(
    () => (gender === "female" ? TRAINER_IMAGES.female : TRAINER_IMAGES.male),
    [gender]
  );

  useEffect(() => {
    const images = Object.values(TRAINER_IMAGES);
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <motion.div
      key={imageSrc}
      className="relative flex-1 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[52%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Red glow backdrop */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute right-[10%] top-[15%] h-[70%] w-[60%] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute right-[20%] bottom-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto h-[55vh] max-w-lg lg:mx-0 lg:h-full lg:max-w-none">
        <div className="relative h-full w-full overflow-hidden lg:rounded-none">
          <Image
            src={imageSrc}
            alt={content.heroImageAlt}
            fill
            priority
            quality={90}
            className="object-cover object-top lg:object-[center_top]"
            sizes="(max-width: 1024px) 90vw, 52vw"
            style={{
              filter: "contrast(1.05) brightness(1.02) saturate(1.05)",
            }}
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent lg:from-black/90 lg:via-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 lg:from-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent lg:hidden" />

          {/* Spotlight vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 60% 40%, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export const HeroTrainer = memo(HeroTrainerComponent);
