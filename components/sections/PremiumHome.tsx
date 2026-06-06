"use client";

import { PremiumHero } from "./PremiumHero";
import { StatsBar } from "./StatsBar";
import { FeatureGrid } from "./FeatureGrid";
import { EquipmentSection } from "./EquipmentSection";
import { TrainerSpotlight } from "./TrainerSpotlight";
import { ProgramsSection } from "./ProgramsSection";
import { SuccessStories } from "./SuccessStories";
import { TestimonialsSection } from "./TestimonialsSection";
import { AIToolsSection } from "./AIToolsSection";
import { MembershipPreview } from "./MembershipPreview";
import { CTASection } from "./CTASection";

export function PremiumHome() {
  return (
    <>
      <PremiumHero />
      <StatsBar />
      <FeatureGrid />
      <EquipmentSection />
      <TrainerSpotlight />
      <ProgramsSection />
      <SuccessStories />
      <AIToolsSection />
      <TestimonialsSection />
      <MembershipPreview />
      <CTASection />
    </>
  );
}
