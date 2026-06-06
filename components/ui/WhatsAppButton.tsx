"use client";

import { getWhatsAppUrl } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  floating?: boolean;
  className?: string;
}

export function WhatsAppButton({
  message = "Hi! I'm interested in joining AAMDAR Fitness Club.",
  label,
  floating = false,
  className,
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(message);

  if (floating) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl animate-pulse-glow ${className || ""}`}
      >
        <MessageCircle className="h-7 w-7" fill="white" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#20BD5A] hover:scale-[1.02] active:scale-[0.98] ${className || ""}`}
    >
      <MessageCircle className="h-5 w-5" fill="white" />
      {label || "Chat on WhatsApp"}
    </a>
  );
}
