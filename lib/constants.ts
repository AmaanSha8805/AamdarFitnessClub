export const GYM = {
  name: "AAMDAR Fitness Club",
  tagline: "Transform Your Body. Transform Your Life.",
  address: {
    street: "Ganpati Chowk, Aamdar Complex",
    city: "Parbhani",
    state: "Maharashtra",
    postalCode: "431401",
    country: "IN",
    full: "Ganpati Chowk, Aamdar Complex, Parbhani 431401, Maharashtra, India",
  },
  phone: process.env.NEXT_PUBLIC_GYM_PHONE || "+91 [PLACEHOLDER]",
  email: process.env.NEXT_PUBLIC_GYM_EMAIL || "[PLACEHOLDER]@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_GYM_WHATSAPP || "919XXXXXXXXX",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  timings: {
    morning: "5:30 AM – 10:00 AM",
    evening: "4:00 PM – 9:00 PM",
    days: "Monday – Saturday",
  },
  openingHours: ["Mo-Sa 05:30-10:00", "Mo-Sa 16:00-21:00"],
  social: {
    instagram: "[PLACEHOLDER]",
    facebook: "[PLACEHOLDER]",
    youtube: "[PLACEHOLDER]",
  },
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.5!2d76.772!3d19.261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE1JzM5LjYiTiA3NsKwNDYnMTkuMyJF!5e0!3m2!1sen!2sin!4v1",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/ai-coach", label: "AI Coach" },
  { href: "/equipment-guide", label: "Equipment" },
  { href: "/contact", label: "Contact" },
] as const;

export const DEFAULT_STATS = {
  members: 500,
  yearsActive: 5,
  equipmentCount: 50,
  trainerCount: 8,
} as const;

export const FEATURES = [
  {
    title: "AI Equipment Guide",
    description: "Snap a photo or browse our equipment library for instant AI-powered exercise guides.",
    icon: "Dumbbell",
  },
  {
    title: "WhatsApp Automation",
    description: "Get reminders, updates, and support directly on WhatsApp — no app needed.",
    icon: "MessageCircle",
  },
  {
    title: "Online Admission",
    description: "Join AAMDAR Fitness Club from your phone. Quick, paperless registration.",
    icon: "UserPlus",
  },
  {
    title: "Progress Tracker",
    description: "Log your weight and measurements weekly. Watch your transformation unfold.",
    icon: "TrendingUp",
  },
  {
    title: "Diet Plans",
    description: "Personalized nutrition guidance from our AI coach tailored to your goals.",
    icon: "Apple",
  },
  {
    title: "Online Payments",
    description: "Renew your membership securely with Razorpay. Quick and hassle-free.",
    icon: "CreditCard",
  },
] as const;

export const QUICK_PROMPTS = [
  "Create a weight loss plan for me",
  "What should I eat post-workout?",
  "Beginner workout for muscle gain",
  "How many calories should I eat?",
] as const;

export const GALLERY_CATEGORIES = [
  "All",
  "Gym Floor",
  "Equipment",
  "Members",
  "Events",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
