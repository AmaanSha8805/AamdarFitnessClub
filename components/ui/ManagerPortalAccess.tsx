"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ManagerPortalAccess() {
  const pathname = usePathname();

  const hidden =
    pathname.startsWith("/manager-login") ||
    pathname.startsWith("/manager-dashboard") ||
    pathname.startsWith("/portal");

  if (hidden) return null;

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-40 sm:bottom-28 sm:right-8"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/manager-login"
        className={cn(
          "group relative flex items-center gap-3 overflow-hidden rounded-2xl",
          "border border-gold/20 bg-black/70 px-4 py-3 backdrop-blur-xl",
          "shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(212,175,55,0.08)]",
          "transition-all duration-300 ease-out",
          "hover:border-gold/45 hover:bg-black/85 hover:shadow-gold-glow hover:-translate-y-0.5"
        )}
        aria-label="Manager Portal — Authorized Staff Access Only"
      >
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />

        <div
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            "border border-gold/25 bg-gold/10",
            "transition-all duration-300 group-hover:border-gold/50 group-hover:bg-gold/20 group-hover:shadow-gold-glow-sm"
          )}
        >
          <ShieldCheck className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
        </div>

        <div className="relative hidden min-w-0 pr-1 sm:block">
          <p className="text-sm font-bold tracking-wide text-white transition-colors group-hover:text-gold-light">
            Manager Portal
          </p>
          <p className="text-[10px] font-medium uppercase tracking-wider text-text-muted transition-colors group-hover:text-gold/70">
            Authorized Staff Access Only
          </p>
        </div>

      </Link>
    </motion.div>
  );
}
