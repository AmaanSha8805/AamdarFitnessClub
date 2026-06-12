import { PremiumHome } from "@/components/sections/PremiumHome";
import { generateSEO, generateGymJsonLd } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Premium Gym in Parbhani",
  description:
    "आमदार Fitness Club — premium gym in Parbhani with expert trainers, modern equipment, and personalized fitness guidance. Transform your body. Build your strength.",
  path: "/",
  image: "/images/logo.png",
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
