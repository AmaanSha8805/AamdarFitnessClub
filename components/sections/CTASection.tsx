"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.12)_0%,_transparent_70%)]" />
      <ScrollReveal className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          className="text-4xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          READY TO{" "}
          <span className="text-primary">TRANSFORM?</span>
        </motion.h2>
        <p className="mt-6 text-lg text-text-secondary">
          Join 5000+ members at Parbhani&apos;s most premium fitness club.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/join" className="premium-btn">
            Start Your Journey
          </Link>
          <a
            href={getWhatsAppUrl("Hi! I want to join AAMDAR Fitness Club.")}
            target="_blank"
            rel="noopener noreferrer"
            className="premium-btn-outline"
          >
            WhatsApp Us
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
