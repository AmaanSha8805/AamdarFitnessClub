import { generateSEO } from "@/lib/seo";
import { TrainersPageClient } from "@/components/trainers/TrainersPageClient";

export const metadata = generateSEO({
  title: "Expert Trainers",
  description:
    "Meet the certified trainers at Aamdar Fitness Club, Parbhani — Shrikant Kale, Gauri Dharurkar, Rani Nikalje, and Sudhakar Solanke.",
  path: "/trainers",
});

export default function TrainersPage() {
  return <TrainersPageClient />;
}
