import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Dumbbell,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { GYM } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Programs" },
  { href: "/trainers", label: "Trainers" },
  { href: "/workout-generator", label: "AI Workout" },
  { href: "/equipment-guide", label: "Equipment" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function PremiumFooter() {
  return (
    <footer className="border-t border-white/5 bg-background-card">
      <div className="mx-auto max-w-7xl section-padding pb-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-base font-black text-white">AAMDAR</span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-primary">
                  Fitness Club
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Parbhani&apos;s premium fitness destination. Luxury training
              technology meets world-class coaching.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={GYM.social.instagram}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-muted transition-all hover:border-primary hover:text-primary"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {GYM.address.full}
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${GYM.phone}`}>{GYM.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${GYM.email}`}>{GYM.email}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p>Morning: {GYM.timings.morning}</p>
                  <p>Evening: {GYM.timings.evening}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Find Us
            </h3>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <iframe
                src={GYM.mapsEmbedUrl}
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AAMDAR Fitness Club Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {GYM.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Best gym in Parbhani | Premium Fitness Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
