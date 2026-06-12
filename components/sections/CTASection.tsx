"use client";

import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="section-padding bg-background-card">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Ready to <span className="text-primary">Transform?</span>
        </h2>
        <p className="mt-4 text-text-secondary">
          Join 200+ active members at Parbhani&apos;s premium fitness club.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </div>
    </section>
  );
}
