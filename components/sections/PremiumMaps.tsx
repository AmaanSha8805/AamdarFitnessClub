"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";

export function PremiumMaps() {
    return (
        <section className="relative overflow-hidden bg-black pb-0">


            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <ScrollReveal className="text-center md:text-left mb-12">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                        Visit Us
                    </span>
                    <h2 className="section-title mt-4">
                        FIND <span className="text-primary">AAMDAR</span>
                    </h2>
                </ScrollReveal>

                <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(229,9,20,0.1)] border border-white/10 group">

                    {/* Map Container */}
                    <div className="h-[500px] w-full bg-neutral-900 grayscale-[0.5] invert-[0.9] hue-rotate-[180deg] overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.62141517036!2d76.76449171738278!3d19.263884807490082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd0175b9fce3b87%3A0xe54ec05b10e5f242!2sParbhani%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709848520286!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="opacity-60 transition-opacity duration-700 group-hover:opacity-80"
                        />
                    </div>

                    <div
                        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 w-[90%] md:w-[400px] bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col gap-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase text-white">Location</h3>
                                <p className="mt-1 text-sm text-text-secondary">
                                    AAMDAR Fitness Club, Parbhani, Maharashtra 431401
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5">
                                <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase text-white">Hours</h3>
                                <p className="mt-1 text-sm text-text-secondary">
                                    Mon - Sat: 5:30 AM - 10:00 PM <br />
                                    Sun: 6:00 AM - 12:00 PM
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5">
                                <Phone className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase text-white">Contact</h3>
                                <p className="mt-1 text-sm text-text-secondary">
                                    +91 XXXXXXXXXX
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            <a
                                href={getWhatsAppUrl("Hi! I want to join Aamdar Fitness Club.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] hover:bg-[#1DA851] text-white px-4 py-3 font-bold transition-all uppercase tracking-wide"
                            >
                                Chat on WhatsApp
                            </a>
                            <a
                                href="https://maps.google.com/?q=AAMDAR+Fitness+Club+Parbhani"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary hover:bg-primary/90 text-white px-4 py-3 font-bold transition-all uppercase tracking-wide"
                            >
                                <Navigation className="h-5 w-5" />
                                Get Directions
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
