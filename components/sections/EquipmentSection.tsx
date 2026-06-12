import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEquipmentImages } from "@/lib/media-scan";
import { EquipmentGallery } from "./EquipmentGallery";

export function EquipmentSection() {
  const images = getEquipmentImages();

  return (
    <section id="equipment" className="section-padding bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Our Facility
            </span>
            <h2 className="section-title mt-4 text-white">
              PREMIUM <span className="text-gold">EQUIPMENT</span>
            </h2>
            <p className="mt-4 max-w-xl text-text-secondary">
              {images.length > 0
                ? `${images.length}+ professional machines and training stations for every fitness goal.`
                : "World-class machines for strength, cardio, and functional training."}
            </p>
          </div>
          <Link
            href="/equipment-guide"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-gold"
          >
            Equipment Guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <EquipmentGallery images={images} />
      </div>
    </section>
  );
}
