"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/trainers", label: "Trainers" },
  { href: "/#gym-tour", label: "Gym Tour" },
  { href: "/#equipment", label: "Equipment" },
  { href: "/packages", label: "Membership Plans" },
  { href: "/contact", label: "Contact" },
];

export function PremiumNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/portal") ||
    pathname.startsWith("/manager-dashboard") ||
    pathname.startsWith("/manager-login");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (isAuthPage) return null;

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-black/90 backdrop-blur-2xl"
          : "bg-black/30 backdrop-blur-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo size="lg" className="shrink-0" />

        <div className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors xl:px-4 xl:text-xs",
                pathname === link.href
                  ? "text-gold"
                  : "text-text-secondary hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 lg:block">
          <Link href="/join" className="premium-btn !py-3 !px-6 !text-xs">
            Join Now
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-text-secondary transition-colors hover:text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
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
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-1 px-4 py-4">
              <div className="mb-4 flex justify-center sm:hidden">
                <BrandLogo size="lg" showText />
              </div>
              {NAV_LINKS.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors",
                    pathname === link.href
                      ? "text-gold"
                      : "text-text-secondary hover:text-white"
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
