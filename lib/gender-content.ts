import { MEDIA } from "@/lib/media-urls";

export type Gender = "male" | "female";

export interface Program {
  title: string;
  description: string;
  image: string;
  duration: string;
}

export interface SuccessStory {
  name: string;
  transformation: string;
  duration: string;
  quote: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface FeaturedTrainer {
  name: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  certifications: string[];
  image: string;
}

export interface GenderContent {
  heroImage: string;
  heroImageAlt: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  featuredTrainer: FeaturedTrainer;
  programs: Program[];
  successStories: SuccessStory[];
  testimonials: Testimonial[];
}

const MALE_HERO = MEDIA.maleTrainer;
const FEMALE_HERO = MEDIA.femaleTrainer;

export const GENDER_CONTENT: Record<Gender, GenderContent> = {
  male: {
    heroImage: MALE_HERO,
    heroImageAlt: "Professional muscular male athlete training",
    headline: "BUILD STRENGTH.",
    headlineAccent: "DOMINATE LIMITS.",
    subheadline:
      "Transform your body with elite training, modern equipment, and expert coaching.",
    featuredTrainer: {
      name: "SHRIKANT BALASAHEB KALE",
      specialization: "Bodybuilding & Strength Training",
      experienceYears: 7,
      bio: "National-Level Volleyball Player and Head Fitness Trainer with 7+ years of coaching. Specializes in muscle building, strength development, and fitness transformation.",
      certifications: ["Certified Fitness Trainer", "Bodybuilding Specialist", "Strength & Conditioning"],
      image: MEDIA.shrikant,
    },
    programs: [
      {
        title: "Muscle Building",
        description: "Hypertrophy-focused programs for maximum muscle growth.",
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80&fm=webp&auto=format",
        duration: "12 Weeks",
      },
      {
        title: "Strength Training",
        description: "Build raw power with compound lifts and progressive overload.",
        image:
          "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80&fm=webp&auto=format",
        duration: "8 Weeks",
      },
      {
        title: "Powerlifting",
        description: "Master the squat, bench, and deadlift with expert coaching.",
        image:
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&fm=webp&auto=format",
        duration: "16 Weeks",
      },
      {
        title: "Fat Loss",
        description: "Shred fat while preserving muscle with science-backed protocols.",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&fm=webp&auto=format",
        duration: "10 Weeks",
      },
    ],
    successStories: [
      {
        name: "Rahul Sharma",
        transformation: "Lost 18kg, gained lean muscle",
        duration: "6 Months",
        quote: "AAMDAR changed my life. The trainers pushed me beyond what I thought possible.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fm=webp&auto=format",
      },
      {
        name: "Amit Deshmukh",
        transformation: "Bench press 60kg → 120kg",
        duration: "8 Months",
        quote: "From skinny to strong. The powerlifting program here is world-class.",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fm=webp&auto=format",
      },
      {
        name: "Vikram Patil",
        transformation: "Body fat 28% → 12%",
        duration: "5 Months",
        quote: "The combination of training and nutrition guidance delivered real results.",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fm=webp&auto=format",
      },
    ],
    testimonials: [
      {
        name: "Rahul S.",
        role: "Member since 2023",
        content:
          "Best gym in Parbhani, hands down. The equipment rivals any metro city gym and the AI coach is a game-changer.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fm=webp&auto=format",
      },
      {
        name: "Amit K.",
        role: "Powerlifter",
        content:
          "The trainers here actually know what they're doing. My squat went from 80kg to 160kg in under a year.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fm=webp&auto=format",
      },
      {
        name: "Sandeep M.",
        role: "Member since 2024",
        content:
          "Premium experience at an affordable price. The QR equipment guides helped me train confidently from day one.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&fm=webp&auto=format",
      },
    ],
  },
  female: {
    heroImage: FEMALE_HERO,
    heroImageAlt: "Professional athletic female athlete training",
    headline: "STRONG.",
    headlineAccent: "CONFIDENT. UNSTOPPABLE.",
    subheadline:
      "Build strength, confidence, and a healthier lifestyle with expert guidance.",
    featuredTrainer: {
      name: "GAURI RAJENDRA DHARURKAR",
      specialization: "Women's Fitness & Body Transformation",
      experienceYears: 15,
      bio: "Senior Fitness Trainer and Certified Yoga Instructor guiding members through strength, toning, and confidence-building programs.",
      certifications: ["Certified Yoga Teacher", "Fitness Transformation Coach", "Wellness Coaching"],
      image: MEDIA.gauri,
    },
    programs: [
      {
        title: "Weight Loss",
        description: "Sustainable fat loss with strength-preserving workouts.",
        image:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fm=webp&auto=format",
        duration: "10 Weeks",
      },
      {
        title: "Toning",
        description: "Sculpt and define with targeted resistance training.",
        image:
          "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80&fm=webp&auto=format",
        duration: "8 Weeks",
      },
      {
        title: "Functional Fitness",
        description: "Move better, feel stronger with real-world movement patterns.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fm=webp&auto=format",
        duration: "6 Weeks",
      },
      {
        title: "Strength Training",
        description: "Build confidence and power with progressive strength work.",
        image:
          "https://images.unsplash.com/photo-1518310383802-640c2ed31132?w=600&q=80&fm=webp&auto=format",
        duration: "12 Weeks",
      },
    ],
    successStories: [
      {
        name: "Priya More",
        transformation: "Lost 15kg, gained confidence",
        duration: "5 Months",
        quote: "I never thought I could lift weights. Now I deadlift 80kg and feel unstoppable.",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&fm=webp&auto=format",
      },
      {
        name: "Sneha Kulkarni",
        transformation: "Post-pregnancy fitness journey",
        duration: "7 Months",
        quote: "The female trainers understood my goals perfectly. I feel stronger than ever.",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&fm=webp&auto=format",
      },
      {
        name: "Anjali Rao",
        transformation: "From sedentary to athlete",
        duration: "4 Months",
        quote: "The supportive community here made all the difference. Every session feels empowering.",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fm=webp&auto=format",
      },
    ],
    testimonials: [
      {
        name: "Priya M.",
        role: "Member since 2023",
        content:
          "Finally a gym that takes women's fitness seriously. No judgment, just results and support.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fm=webp&auto=format",
      },
      {
        name: "Sneha K.",
        role: "Functional Fitness",
        content:
          "The toning program transformed not just my body but my entire mindset. Highly recommend!",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&fm=webp&auto=format",
      },
      {
        name: "Anjali R.",
        role: "Member since 2024",
        content:
          "AI workout generator gave me a plan I could actually follow. Lost 12kg and kept it off.",
        rating: 5,
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&fm=webp&auto=format",
      },
    ],
  },
};

export const SITE_STATS = [
  { value: 5000, suffix: "+", label: "Members" },
  { value: 20, suffix: "+", label: "Expert Trainers" },
  { value: 50, suffix: "+", label: "Equipment" },
  { value: 4.9, suffix: "", label: "Rating", decimals: 1 },
] as const;

export const PREMIUM_FEATURES = [
  {
    title: "Modern Equipment",
    description: "World-class machines & free weights",
    icon: "Dumbbell",
  },
  {
    title: "Expert Trainers",
    description: "Certified fitness professionals",
    icon: "Users",
  },
  {
    title: "Nutrition Guidance",
    description: "Personalized diet & meal plans",
    icon: "Apple",
  },
  {
    title: "AI Fitness Coach",
    description: "24/7 intelligent workout support",
    icon: "Brain",
  },
  {
    title: "QR Equipment Guide",
    description: "Scan, learn & train the right way",
    icon: "QrCode",
  },
  {
    title: "Personalized Programs",
    description: "Custom plans for your goals",
    icon: "Target",
  },
] as const;
