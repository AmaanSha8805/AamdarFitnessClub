import Link from "next/link";
import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata = generateSEO({
  title: "Fitness Blog",
  description:
    "Expert fitness tips, nutrition advice, and training guides from AAMDAR Fitness Club, Parbhani.",
  path: "/blog",
});

const POSTS = [
  {
    slug: "beginner-strength-guide",
    title: "The Complete Beginner's Guide to Strength Training",
    excerpt:
      "Everything you need to know before picking up your first barbell at the gym.",
    category: "Training",
    date: "15/05/2026",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    readTime: "8 min",
  },
  {
    slug: "post-workout-nutrition",
    title: "What to Eat After Your Workout for Maximum Recovery",
    excerpt:
      "Science-backed nutrition strategies to fuel muscle growth and recovery.",
    category: "Nutrition",
    date: "10/05/2026",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    readTime: "6 min",
  },
  {
    slug: "morning-vs-evening-workouts",
    title: "Morning vs Evening Workouts: Which Is Better?",
    excerpt:
      "We break down the science behind workout timing and what works best for you.",
    category: "Lifestyle",
    date: "05/05/2026",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    readTime: "5 min",
  },
  {
    slug: "plateau-breaking-tips",
    title: "5 Proven Ways to Break Through a Training Plateau",
    excerpt:
      "Stuck at the same weight? These strategies will reignite your progress.",
    category: "Training",
    date: "01/05/2026",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    readTime: "7 min",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Insights
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Fitness <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Expert advice from AAMDAR&apos;s coaching team.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="glass-card-hover overflow-hidden">
                  <div className="relative h-52">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} read</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-white transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
