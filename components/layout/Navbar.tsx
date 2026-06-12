"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Dumbbell } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/portal") ||
    pathname.startsWith("/manager-dashboard") ||
    pathname.startsWith("/manager-login");

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-text-primary">AAMDAR</span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-primary">
              Fitness Club
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/portal">
            <Button variant="ghost" size="sm">
              Member Portal
            </Button>
          </Link>
          <Link href="/join">
            <Button size="sm">Join Now</Button>
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-text-secondary hover:bg-background-elevated lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background lg:hidden animate-fade-in">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/portal" onClick={() => setIsOpen(false)}>
                <Button variant="outline" fullWidth>
                  Member Portal
                </Button>
              </Link>
              <Link href="/join" onClick={() => setIsOpen(false)}>
                <Button fullWidth>Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
