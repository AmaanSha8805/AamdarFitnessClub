import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import { getGymTourImages, getEquipmentImages } from "@/lib/media-scan";

export const metadata = generateSEO({
  title: "Gallery",
  description:
    "Explore Aamdar Fitness Club — premium gym floor, equipment, and training facilities in Parbhani.",
  path: "/gallery",
});

export default function GalleryPage() {
  const images = [...getGymTourImages(), ...getEquipmentImages()];

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Inside Aamdar
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            {images.length} photos from our premium training environment.
          </p>
        </div>

        {images.length === 0 ? (
          <p className="text-center text-text-secondary">
            Gallery images will appear automatically when added to{" "}
            <code className="text-gold">public/images/gym-tour</code> or{" "}
            <code className="text-gold">public/Equipment</code>.
          </p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((item) => (
              <div
                key={item.src}
                className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/5"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
