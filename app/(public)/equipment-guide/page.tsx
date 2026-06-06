import { generateSEO } from "@/lib/seo";
import { EquipmentGuideClient } from "@/components/forms/EquipmentGuideClient";

export const metadata = generateSEO({
  title: "QR Equipment Guide",
  description:
    "Scan QR codes on gym equipment for video tutorials, form tips, and safety guides at AAMDAR Fitness Club, Parbhani.",
  path: "/equipment-guide",
});

export default function EquipmentGuidePage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Smart Training
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            QR Equipment <span className="text-primary">System</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Scan, learn, and train the right way — every machine, every time.
          </p>
        </div>
        <EquipmentGuideClient />
      </div>
    </div>
  );
}
