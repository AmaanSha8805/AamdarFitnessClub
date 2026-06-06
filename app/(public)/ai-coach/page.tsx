import { generateSEO } from "@/lib/seo";
import { AICoachClient } from "@/components/forms/AICoachClient";

export const metadata = generateSEO({
  title: "AI Fitness Assistant",
  description:
    "Get 24/7 workout guidance, nutrition help, and fitness advice from AAMDAR Fitness Club's AI assistant.",
  path: "/ai-coach",
});

export default function AICoachPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-4xl px-4 pb-8 sm:px-6">
        <AICoachClient />
      </div>
    </div>
  );
}
