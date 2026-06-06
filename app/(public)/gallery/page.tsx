import Image from "next/image";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Gallery",
  description: "Explore AAMDAR Fitness Club — premium gym floor, equipment, and member transformations.",
  path: "/gallery",
});

const GALLERY = [
  { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", category: "Gym Floor", caption: "Main training floor" },
  { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80", category: "Equipment", caption: "Premium free weights" },
  { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80", category: "Gym Floor", caption: "Cardio zone" },
  { url: "https://images.unsplash.com/photo-1597452485669-b2090d94691a?w=800&q=80", category: "Equipment", caption: "Machine area" },
  { url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", category: "Members", caption: "Member training session" },
  { url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80", category: "Events", caption: "Fitness challenge event" },
  { url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80", category: "Members", caption: "Strength training" },
  { url: "https://images.unsplash.com/photo-1540497077202-7a8a399fb6be?w=800&q=80", category: "Gym Floor", caption: "Functional training zone" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Inside AAMDAR
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Gallery
          </h1>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/5"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.url}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform group-hover:translate-y-0">
                  <span className="text-xs font-bold uppercase text-primary">
                    {item.category}
                  </span>
                  <p className="text-sm text-white">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
