"use client";

import { GenderGate } from "@/components/gender/GenderGate";
import { PremiumLayout } from "@/components/layout/PremiumLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GenderGate>
      <PremiumLayout>{children}</PremiumLayout>
    </GenderGate>
  );
}
