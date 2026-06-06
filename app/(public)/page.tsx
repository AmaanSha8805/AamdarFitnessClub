import { PremiumHome } from "@/components/sections/PremiumHome";
import { generateSEO, generateGymJsonLd } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Premium Gym in Parbhani",
  description:
    "Experience luxury fitness at AAMDAR Fitness Club. AI-powered training, premium equipment, expert coaches in Parbhani. Build strength. Dominate limits.",
  path: "/",
});

export default function HomePage() {
  const jsonLd = generateGymJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PremiumHome />
    </>
  );
}
