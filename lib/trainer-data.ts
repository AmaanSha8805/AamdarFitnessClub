import { MEDIA } from "@/lib/media-urls";

export interface TrainerProfile {
  id: string;
  name: string;
  designation: string;
  experience: string;
  certification: string;
  specialization: string;
  image: string;
  bio: string;
  highlights: string[];
  achievements: string[];
  imageFit?: "cover" | "contain";
  imagePosition?: string;
}

export const TRAINER_IMAGES = {
  shrikant: MEDIA.shrikant,
  gauri: MEDIA.gauri,
  rani: MEDIA.rani,
  sudhakar: MEDIA.sudhakar,
} as const;

const portraitDefaults = {
  imageFit: "cover" as const,
  imagePosition: "center top",
};

export const TRAINERS: TrainerProfile[] = [
  {
    id: "shrikant-kale",
    name: "SHRIKANT BALASAHEB KALE",
    designation: "Head Fitness Trainer",
    experience: "7+ Years",
    certification: "Certified Fitness Trainer",
    specialization: "Bodybuilding & Fitness Transformation",
    image: TRAINER_IMAGES.shrikant,
    ...portraitDefaults,
    bio: "With over 7 years of practical fitness coaching experience, Shrikant Balasaheb Kale is one of the core fitness professionals at Aamdar Fitness Club. As a National-Level Volleyball Player, he brings athletic discipline, advanced training techniques, and performance-focused coaching to every client.\n\nHis expertise lies in Bodybuilding, Strength Development, Muscle Gain, Fat Loss, and Overall Fitness Transformation. Through personalized guidance and scientifically structured workout plans, he helps members achieve sustainable fitness results while maintaining proper form and injury prevention.",
    highlights: [
      "National Volleyball Player",
      "7+ Years Experience",
      "Certified Fitness Trainer",
      "Bodybuilding Specialist",
      "Strength & Conditioning Expert",
      "Fitness Transformation Coach",
    ],
    achievements: [
      "National-Level Volleyball Player",
      "500+ Members Trained",
      "Bodybuilding Competition Prep Coach",
      "Strength & Conditioning Specialist",
      "Fitness Transformation Expert",
    ],
  },
  {
    id: "gauri-dharurkar",
    name: "GAURI RAJENDRA DHARURKAR",
    designation: "Senior Fitness Trainer & Certified Yoga Instructor",
    experience: "15+ Years",
    certification: "Certified Yoga Teacher",
    specialization: "Fat Loss, Healthy Weight Gain, Yoga & Wellness Coaching",
    image: TRAINER_IMAGES.gauri,
    ...portraitDefaults,
    bio: "Gauri Rajendra Dharurkar brings 15+ years of extensive experience in fitness training and yoga instruction. As a certified yoga teacher, she combines traditional yoga practices with modern fitness science to deliver holistic wellness solutions.\n\nHer expertise spans Fat Loss programs, Healthy Weight Gain strategies, Yoga & Wellness Coaching, and Mind-Body Fitness integration. She specializes in creating personalized programs that balance physical fitness with mental well-being.",
    highlights: [
      "15+ Years Experience",
      "Certified Yoga Teacher",
      "Fat Loss Specialist",
      "Weight Gain Expert",
      "Wellness Coach",
      "Mind-Body Fitness",
    ],
    achievements: [
      "Certified Yoga Teacher",
      "1000+ Members Trained",
      "Wellness Program Developer",
      "Yoga & Fitness Integration Expert",
      "Lifestyle Transformation Coach",
    ],
  },
  {
    id: "rani-nikalje",
    name: "RANI NIKALJE",
    designation: "Fitness Trainer & Body Transformation Coach",
    experience: "10+ Years",
    certification: "Certified Fitness Trainer",
    specialization: "Weight Loss & Weight Gain Programs",
    image: TRAINER_IMAGES.rani,
    ...portraitDefaults,
    bio: "Rani Nikalje is a dedicated fitness trainer and body transformation coach with over 10 years of experience. She creates personalized transformation programs that deliver real, lasting results through nutrition guidance and targeted exercise routines.",
    highlights: [
      "10+ Years Experience",
      "Body Transformation Expert",
      "Weight Loss Specialist",
      "Weight Gain Programs",
      "Nutrition Guidance",
      "Lifestyle Coach",
    ],
    achievements: [
      "Body Transformation Specialist",
      "750+ Successful Transformations",
      "Weight Loss Program Developer",
      "Weight Gain Expert",
      "Lifestyle Fitness Coach",
    ],
  },
  {
    id: "sudhakar-solanke",
    name: "SUDHAKAR MADHUKAR SOLANKE",
    designation: "Senior Fitness Trainer",
    experience: "10+ Years",
    certification: "Certified Fitness Trainer",
    specialization: "Weight Loss, Weight Gain & Fitness Coaching",
    image: TRAINER_IMAGES.sudhakar,
    ...portraitDefaults,
    bio: "Sudhakar Madhukar Solanke is a senior fitness trainer with a decade of experience in the fitness industry. His comprehensive approach covers physical transformation and performance enhancement through strength training, cardio, and flexibility work.",
    highlights: [
      "10+ Years Experience",
      "Senior Fitness Trainer",
      "Weight Loss Expert",
      "Weight Gain Specialist",
      "Fitness Coaching",
      "Performance Enhancement",
    ],
    achievements: [
      "Senior Fitness Trainer",
      "800+ Members Trained",
      "Weight Loss Program Expert",
      "Weight Gain Specialist",
      "Performance Coach",
    ],
  },
];

export const HEAD_TRAINER = TRAINERS[0];
