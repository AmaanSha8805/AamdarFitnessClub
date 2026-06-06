import { generateSEO } from "@/lib/seo";
import { ContactFormClient } from "@/components/forms/ContactFormClient";

export const metadata = generateSEO({
  title: "Contact Us",
  description:
    "Contact AAMDAR Fitness Club at Ganpati Chowk, Parbhani. Call, WhatsApp, or visit us.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Get in Touch
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Contact <span className="text-primary">Us</span>
          </h1>
        </div>
        <ContactFormClient />
      </div>
    </div>
  );
}
