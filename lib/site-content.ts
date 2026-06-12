export const SITE_STATS = [
  { value: 200, suffix: "+", label: "Active Members" },
  { value: 25, suffix: "+", label: "Premium Equipment" },
  { value: 4, suffix: "", label: "Expert Trainers" },
  { value: 4.8, suffix: " ★", label: "Star Rating", decimals: 1 },
] as const;

export const ABOUT_GYM = {
  description:
    "Aamdar Fitness Club is a modern fitness facility dedicated to helping members achieve their health and fitness goals through expert guidance, advanced equipment, and a motivating training environment.",
  features: [
    "Modern Gym Infrastructure",
    "Professional Trainers",
    "Strength Training Area",
    "Cardio Equipment",
    "Personal Guidance",
    "Fitness Transformation Support",
    "Friendly Environment",
  ],
} as const;
