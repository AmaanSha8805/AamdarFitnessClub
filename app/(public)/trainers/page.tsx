import Image from "next/image";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Expert Trainers",
  description:
    "Meet certified trainers at AAMDAR Fitness Club, Parbhani. Expert coaching for every fitness goal.",
  path: "/trainers",
});

const TRAINERS = [
  {
    name: "[PLACEHOLDER] Trainer Name 1",
    specialization: "Muscle Building & Strength",
    experience: "8 Years",
    certifications: ["ACE Certified", "Sports Nutrition"],
    bio: "Passionate about helping members achieve maximum strength and muscle growth through science-backed programming.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
  },
  {
    name: "[PLACEHOLDER] Trainer Name 2",
    specialization: "Weight Loss & Cardio",
    experience: "6 Years",
    certifications: ["ISSA Certified", "Nutrition Specialist"],
    bio: "Specializes in sustainable fat loss and metabolic conditioning for lasting transformation results.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  {
    name: "[PLACEHOLDER] Trainer Name 3",
    specialization: "Functional Fitness",
    experience: "5 Years",
    certifications: ["CrossFit L2", "First Aid"],
    bio: "Expert in functional movements and athletic performance for members of all fitness levels.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80",
  },
];

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Our Team
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Expert <span className="text-primary">Trainers</span>
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.name}
              className="glass-card-hover group overflow-hidden"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {trainer.specialization}
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">{trainer.name}</h2>
                <p className="text-sm text-text-muted">{trainer.experience} Experience</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {trainer.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-muted"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
