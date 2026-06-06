import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Dumbbell, Instagram, Facebook, Youtube } from "lucide-react";
import { GYM, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-card">
      <div className="mx-auto max-w-7xl section-padding pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Dumbbell className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-bold">AAMDAR</span>
                <span className="block text-[10px] font-medium uppercase tracking-widest text-primary">
                  Fitness Club
                </span>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Parbhani&apos;s premier fitness destination. Transform your body,
              transform your life.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={GYM.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background-elevated text-text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={GYM.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background-elevated text-text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={GYM.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background-elevated text-text-muted transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Join Now
                </Link>
              </li>
              <li>
                <Link
                  href="/portal"
                  className="text-sm text-text-secondary transition-colors hover:text-primary"
                >
                  Member Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {GYM.address.full}
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${GYM.phone}`} className="hover:text-primary transition-colors">
                  {GYM.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${GYM.email}`} className="hover:text-primary transition-colors">
                  {GYM.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p>Morning: {GYM.timings.morning}</p>
                  <p>Evening: {GYM.timings.evening}</p>
                  <p className="text-text-muted">{GYM.timings.days}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Find Us
            </h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                src={GYM.mapsEmbedUrl}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AAMDAR Fitness Club Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {GYM.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Best gym in Parbhani | Fitness club Parbhani | AAMDAR Fitness
          </p>
        </div>
      </div>
    </footer>
  );
}
