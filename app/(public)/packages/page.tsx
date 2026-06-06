import { generateSEO } from "@/lib/seo";
import { MembershipPreview } from "@/components/sections/MembershipPreview";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata = generateSEO({
  title: "Membership Plans & Pricing",
  description:
    "Premium membership plans at AAMDAR Fitness Club, Parbhani. Monthly to annual packages with AI coaching included.",
  path: "/packages",
});

const ALL_PLANS = [
  {
    name: "Monthly",
    price: 1500,
    duration: "1 Month",
    inclusions: ["Gym Access", "Locker", "All Equipment", "AI Coach Access"],
    popular: false,
  },
  {
    name: "Quarterly",
    price: 4000,
    duration: "3 Months",
    inclusions: ["Everything in Monthly", "Diet Consultation", "Progress Tracking"],
    popular: false,
  },
  {
    name: "Half-Yearly",
    price: 7500,
    duration: "6 Months",
    inclusions: [
      "Everything in Quarterly",
      "Personal Diet Plan",
      "1 Free PT Session",
      "QR Equipment Guide",
    ],
    popular: true,
  },
  {
    name: "Annual",
    price: 12000,
    duration: "12 Months",
    inclusions: [
      "Everything in Half-Yearly",
      "3 Free PT Sessions",
      "Priority Support",
      "AI Workout Generator",
    ],
    popular: false,
  },
  {
    name: "Personal Training",
    price: 5000,
    duration: "Add-on / Month",
    inclusions: ["12 PT Sessions", "Custom Workout", "Nutrition Guidance"],
    popular: false,
  },
  {
    name: "Couple Plan",
    price: 7000,
    duration: "3 Months",
    inclusions: ["Gym Access for 2", "Couple Diet Plan", "Progress Tracking"],
    popular: false,
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Membership
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl">
            Plans & <span className="text-primary">Pricing</span>
          </h1>
        </div>
      </div>
      <MembershipPreview />

      <section className="section-padding bg-black">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-2xl font-black uppercase text-white">
            All <span className="text-primary">Plans</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`glass-card p-6 ${plan.popular ? "border-primary/50" : ""}`}
              >
                {plan.popular && (
                  <span className="mb-3 inline-block text-xs font-bold uppercase text-primary">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-black uppercase text-white">{plan.name}</h3>
                <p className="text-sm text-text-muted">{plan.duration}</p>
                <p className="mt-3 text-3xl font-black text-primary">
                  ₹{plan.price.toLocaleString("en-IN")}
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.inclusions.map((inc) => (
                    <li key={inc} className="text-sm text-text-secondary">
                      ✓ {inc}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <a href="/join" className="premium-btn text-center !py-3 !text-xs">
                    Join Now
                  </a>
                  <a
                    href={getWhatsAppUrl(`Hi! I'm interested in the ${plan.name} plan at AAMDAR Fitness Club.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-xs font-bold uppercase text-text-muted hover:text-primary"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
