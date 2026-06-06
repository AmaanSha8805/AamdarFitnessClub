import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const POSTS: Record<string, { title: string; content: string; date: string; category: string }> = {
  "beginner-strength-guide": {
    title: "The Complete Beginner's Guide to Strength Training",
    category: "Training",
    date: "15/05/2026",
    content: `Starting your strength training journey at AAMDAR Fitness Club is one of the best decisions you can make for your health and physique.

**Why Strength Training?**
Strength training builds muscle, burns fat, strengthens bones, and boosts confidence. Whether your goal is muscle gain, fat loss, or general fitness — resistance training is the foundation.

**Your First Week**
Focus on learning proper form for compound movements: squats, deadlifts, bench press, rows, and overhead press. Start with light weights and prioritize technique over ego lifting.

**Progressive Overload**
The key to continuous progress is gradually increasing the challenge — more weight, more reps, or more sets over time.

**Recovery Matters**
Muscles grow during rest, not during workouts. Aim for 7-8 hours of sleep and adequate protein intake (1.6-2.2g per kg of bodyweight).

Visit AAMDAR Fitness Club at Ganpati Chowk, Parbhani to get started with expert guidance from our certified trainers.`,
  },
  "post-workout-nutrition": {
    title: "What to Eat After Your Workout for Maximum Recovery",
    category: "Nutrition",
    date: "10/05/2026",
    content: `Post-workout nutrition is critical for recovery and muscle growth. Here's what the science says.

**The Anabolic Window**
While the "30-minute window" is somewhat exaggerated, consuming protein and carbs within 1-2 hours post-workout supports recovery.

**Ideal Post-Workout Meal**
- 25-40g protein (chicken, eggs, whey, paneer)
- 30-60g carbs (rice, oats, fruits)
- Hydration with water or electrolytes

**Indian-Friendly Options**
- Paneer bhurji with roti
- Dal chawal with curd
- Banana smoothie with whey protein
- Boiled eggs with sweet potato

Our AI Fitness Coach at AAMDAR can personalize nutrition advice based on your goals.`,
  },
  "morning-vs-evening-workouts": {
    title: "Morning vs Evening Workouts: Which Is Better?",
    category: "Lifestyle",
    date: "05/05/2026",
    content: `The best time to workout is the time you'll actually show up consistently.

**Morning Training (5:30 AM – 10:00 AM)**
Pros: Boosts metabolism, fewer crowds, sets a productive tone for the day.
Cons: Body may need longer warm-up, strength slightly lower.

**Evening Training (4:00 PM – 9:00 PM)**
Pros: Peak body temperature and strength, more energy from day's meals.
Cons: Can interfere with sleep if too late, gym may be busier.

**AAMDAR's Recommendation**
Both batches at AAMDAR Fitness Club are fully equipped and staffed. Choose based on your schedule and stick to it for at least 8 weeks.`,
  },
  "plateau-breaking-tips": {
    title: "5 Proven Ways to Break Through a Training Plateau",
    category: "Training",
    date: "01/05/2026",
    content: `Hit a wall in your training? These five strategies will get you moving again.

1. **Deload Week** — Reduce volume/intensity by 40% for one week, then return stronger.
2. **Change Rep Ranges** — Switch from 5×5 to 4×12 or try cluster sets.
3. **Fix Nutrition** — Track calories for 2 weeks. You may not be eating enough to grow.
4. **Prioritize Sleep** — Under 7 hours consistently will stall progress.
5. **Get a Coach** — Our trainers at AAMDAR can spot weaknesses and program around them.

Use our AI Workout Generator for a fresh program tailored to your current stats.`,
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-black pt-24">
      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase text-primary">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-text-muted">{post.date}</p>

        <div className="prose prose-invert mt-10 max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="mb-4 text-base leading-relaxed text-text-secondary"
              dangerouslySetInnerHTML={{
                __html: para
                  .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>")
                  .replace(/^(\d+\.|\-)\s/gm, ""),
              }}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
