"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GYM } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export function ContactFormClient() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="space-y-6">
        {[
          { icon: MapPin, label: "Address", value: GYM.address.full },
          { icon: Phone, label: "Phone", value: GYM.phone, href: `tel:${GYM.phone}` },
          { icon: Mail, label: "Email", value: GYM.email, href: `mailto:${GYM.email}` },
          {
            icon: Clock,
            label: "Timings",
            value: `Morning: ${GYM.timings.morning}\nEvening: ${GYM.timings.evening}`,
          },
        ].map((item) => (
          <div key={item.label} className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="text-white hover:text-primary transition-colors">
                  {item.value}
                </a>
              ) : (
                <p className="whitespace-pre-line text-white">{item.value}</p>
              )}
            </div>
          </div>
        ))}

        <a
          href={getWhatsAppUrl("Hi! I'd like to know more about AAMDAR Fitness Club.")}
          target="_blank"
          rel="noopener noreferrer"
          className="premium-btn mt-4 inline-flex"
        >
          Chat on WhatsApp
        </a>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="glass-card space-y-5 p-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Input
          label="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+91 XXXXX XXXXX"
        />
        <Textarea
          label="Message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <Button type="submit" fullWidth isLoading={status === "loading"}>
          Send Message
        </Button>
        {status === "success" && (
          <p className="text-center text-sm text-success">
            Message sent! We&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">
            Failed to send. Please try WhatsApp instead.
          </p>
        )}
      </motion.form>

      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <iframe
            src={GYM.mapsEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="AAMDAR Fitness Club Location"
          />
        </div>
      </div>
    </div>
  );
}
