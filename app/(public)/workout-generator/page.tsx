import { generateSEO } from "@/lib/seo";
import { WorkoutGeneratorClient } from "@/components/forms/WorkoutGeneratorClient";

export const metadata = generateSEO({
  title: "AI Workout Generator",
  description:
    "Generate a personalized workout plan with weekly split at AAMDAR Fitness Club. Export your plan as PDF.",
  path: "/workout-generator",
});

export default function WorkoutGeneratorPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            AI Powered
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Workout <span className="text-primary">Generator</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Enter your stats and goals. Get a personalized weekly training split.
          </p>
        </div>
        <WorkoutGeneratorClient />
      </div>
    </div>
  );
}
