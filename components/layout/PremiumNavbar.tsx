"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#equipment", label: "Equipment" },
  { href: "/packages", label: "Programs" },
  { href: "/trainers", label: "Trainers" },
  { href: "/packages", label: "Plans" },
  { href: "/contact", label: "Contact" },
];

export function PremiumNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/portal") || pathname.startsWith("/dashboard");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-white/5 bg-black/80 backdrop-blur-2xl"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 transition-colors group-hover:bg-primary/30">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-black tracking-tight text-white">
              AAMDAR
            </span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-primary">
              Fitness Club
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-text-secondary hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/join" className="premium-btn !py-3 !px-6 !text-xs">
            Join Now
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-text-secondary hover:text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="border-t border-white/5 bg-black/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider",
                    pathname === link.href
                      ? "text-primary"
                      : "text-text-secondary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/join"
                onClick={() => setIsOpen(false)}
                className="premium-btn mt-4 w-full"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
