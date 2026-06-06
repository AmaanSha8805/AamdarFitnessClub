import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

interface PublicLayoutProps {
  children: React.ReactNode;
  showWhatsApp?: boolean;
}

export function PublicLayout({
  children,
  showWhatsApp = true,
}: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      {showWhatsApp && <WhatsAppButton floating />}
    </>
  );
}
