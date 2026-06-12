import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { GYM } from "@/lib/constants";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/trainers", label: "Trainers" },
  { href: "/#gym-tour", label: "Gym Tour" },
  { href: "/#equipment", label: "Equipment" },
  { href: "/packages", label: "Membership Plans" },
  { href: "/contact", label: "Contact" },
];

export function PremiumFooter() {
  return (
    <footer className="border-t border-white/5 bg-background-card">
      <div className="section-padding mx-auto max-w-7xl pb-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/25 sm:h-20 sm:w-20">
                <Image
                  src="/images/logo.png"
                  alt="Aamdar Fitness Club logo"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <div>
                <span className="text-lg font-black text-gold">आमदार</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                  Fitness Club
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Parbhani&apos;s premium fitness destination. Luxury training,
              modern equipment, and expert coaches dedicated to your
              transformation.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gold/80">
              Premium Fitness • Expert Trainers • Real Results
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={GYM.social.instagram}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-text-muted transition-all hover:border-gold hover:text-gold"
                  aria-label="Social media"
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
                    className="text-sm text-text-secondary transition-colors hover:text-gold"
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
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {GYM.address.full}
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${GYM.phone}`} className="hover:text-gold">
                  {GYM.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${GYM.email}`} className="hover:text-gold">
                  {GYM.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
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
                title="Aamdar Fitness Club Location"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {GYM.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Premium Gym in Parbhani | Luxury Fitness Experience
          </p>
        </div>
      </div>
    </footer>
  );
}
