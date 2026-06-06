import { generateSEO } from "@/lib/seo";
import { AdmissionFormClient } from "@/components/forms/AdmissionFormClient";

export const metadata = generateSEO({
  title: "Join AAMDAR Fitness Club",
  description: "Start your premium fitness journey. Online admission for AAMDAR Fitness Club, Parbhani.",
  path: "/join",
});

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Membership
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
            Join <span className="text-primary">Now</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Fill the form below. Our team will contact you on WhatsApp to complete registration.
          </p>
        </div>
        <AdmissionFormClient />
      </div>
    </div>
  );
}
