import { PremiumHero } from "./PremiumHero";
import { ImportantNotice } from "./ImportantNotice";
import { StatsBar } from "./StatsBar";
import { AboutGym } from "./AboutGym";
import { GymTourSection } from "./GymTourSection";
import { EquipmentSection } from "./EquipmentSection";
import { TrainersPreview } from "./TrainersPreview";
import { MembershipPreview } from "./MembershipPreview";
import { CTASection } from "./CTASection";
import { PremiumMaps } from "./PremiumMaps";

export function PremiumHome() {
  return (
    <>
      <PremiumHero />
      <ImportantNotice />
      <StatsBar />
      <AboutGym />
      <GymTourSection />
      <EquipmentSection />
      <TrainersPreview />
      <MembershipPreview />
      <CTASection />
      <PremiumMaps />
    </>
  );
}
