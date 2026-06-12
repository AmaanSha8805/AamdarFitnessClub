"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Play,
  Shield,
  AlertTriangle,
  Dumbbell,
  X,
  Scan,
} from "lucide-react";
import { EQUIPMENT_LIST, type EquipmentItem } from "@/lib/equipment-data";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

function EquipmentModal({
  item,
  onClose,
}: {
  item: EquipmentItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-background-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-primary"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-48 sm:h-64">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent" />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black uppercase text-white">
                {item.name}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.muscles.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-white/10 bg-black p-4">
              <QrCode className="h-16 w-16 text-primary" />
              <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Scan at Gym
              </p>
              <p className="text-xs font-mono text-primary">{item.qrCode}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <Play className="h-4 w-4 text-primary" />
              Video Tutorial
            </h3>
            <div className="mt-3 aspect-video overflow-hidden rounded-xl border border-white/10">
              <iframe
                src={item.videoUrl}
                title={`${item.name} tutorial`}
                className="h-full w-full"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-white">
                <Dumbbell className="h-4 w-4 text-primary" />
                Correct Form
              </h3>
              <ul className="mt-3 space-y-2">
                {item.correctForm.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-primary">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-white">
                <Shield className="h-4 w-4 text-primary" />
                Safety Instructions
              </h3>
              <ul className="mt-3 space-y-2">
                {item.safetyTips.map((tip) => (
                  <li key={tip} className="text-sm text-text-secondary">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-red-400">
              <AlertTriangle className="h-4 w-4" />
              Common Mistakes
            </h3>
            <ul className="mt-3 space-y-1.5">
              {item.commonMistakes.map((m) => (
                <li key={m} className="text-sm text-text-secondary">
                  ✕ {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EquipmentGuideClient() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<EquipmentItem | null>(null);
  const [scanMode, setScanMode] = useState(false);

  useEffect(() => {
    const eqId = searchParams.get("eq");
    if (eqId) {
      const item = EQUIPMENT_LIST.find((e) => e.id === eqId);
      if (item) setSelected(item);
    }
  }, [searchParams]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-text-secondary">
          Browse equipment or scan QR codes at the gym for instant guides.
        </p>
        <button
          onClick={() => setScanMode(!scanMode)}
          className="flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-white"
        >
          <Scan className="h-4 w-4" />
          {scanMode ? "Browse Mode" : "QR Scan Mode"}
        </button>
      </div>

      {scanMode ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card flex flex-col items-center p-12 text-center"
        >
          <div className="relative mb-6 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5">
            <QrCode className="h-24 w-24 text-primary/50" />
            <motion.div
              className="absolute left-4 right-4 h-0.5 bg-primary"
              animate={{ top: ["20%", "80%", "20%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h3 className="text-xl font-bold text-white">Point Camera at QR Code</h3>
          <p className="mt-2 max-w-sm text-sm text-text-secondary">
            Each machine at AAMDAR has a QR sticker. Scan it to load the full
            exercise guide instantly.
          </p>
          <p className="mt-6 text-xs text-text-muted">
            Or browse equipment below and tap any card
          </p>
        </motion.div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EQUIPMENT_LIST.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.08}>
            <motion.button
              onClick={() => setSelected(item)}
              className="group w-full overflow-hidden rounded-2xl border border-white/5 bg-black text-left transition-all hover:border-primary/40 hover:shadow-neon-sm"
              whileHover={{ y: -4 }}
            >
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 backdrop-blur-sm">
                  <QrCode className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold uppercase tracking-wide text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-2">
                  {item.summary}
                </p>
              </div>
            </motion.button>
          </ScrollReveal>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <EquipmentModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
