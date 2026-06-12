"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  href?: string;
}

const SIZES = {
  sm: { img: 44, text: "text-sm" },
  md: { img: 56, text: "text-base" },
  lg: { img: 72, text: "text-lg" },
};

export function BrandLogo({
  size = "md",
  showText = true,
  className,
  href = "/",
}: BrandLogoProps) {
  const dim = SIZES[size];

  const content = (
    <>
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-1 ring-gold/20 transition-all duration-300",
          "group-hover:ring-gold/50 group-hover:shadow-gold-glow-sm group-hover:scale-105"
        )}
        style={{ width: dim.img, height: dim.img }}
      >
        <Image
          src="/images/logo.png"
          alt="Aamdar Fitness Club logo"
          fill
          className="object-contain"
          sizes={`${dim.img}px`}
          priority
        />
      </div>
      {showText && (
        <div className="hidden min-w-0 sm:block">
          <span
            className={cn(
              "block font-black tracking-tight text-white",
              dim.text
            )}
          >
            आमदार
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">
            Fitness Club
          </span>
        </div>
      )}
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2.5 transition-opacity hover:opacity-95",
        className
      )}
      aria-label="Aamdar Fitness Club — Home"
    >
      {content}
    </Link>
  );
}
