import { PremiumNavbar } from "./PremiumNavbar";
import { PremiumFooter } from "./PremiumFooter";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function PremiumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PremiumNavbar />
      <main>{children}</main>
      <PremiumFooter />
      <WhatsAppButton floating />
    </>
  );
}
