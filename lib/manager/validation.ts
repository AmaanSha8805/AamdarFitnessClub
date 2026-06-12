import { z } from "zod";

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const dateString = z.coerce.date();
const money = z.coerce.number().min(0);
const optionalMoney = z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional());

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const changeEmailSchema = z.object({
  currentPassword: z.string().min(8),
  newEmail: z.string().email(),
});

export const gymSettingsSchema = z.object({
  gymName: z.string().min(2),
  logoUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  address: z.preprocess(emptyToUndefined, z.string().optional()),
  contactNumber: z.preprocess(emptyToUndefined, z.string().optional()),
  email: z.preprocess(emptyToUndefined, z.string().email().optional()),
  openingTime: z.preprocess(emptyToUndefined, z.string().optional()),
  closingTime: z.preprocess(emptyToUndefined, z.string().optional()),
  facebookUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  instagramUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  youtubeUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  twitterUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  whatsappNumber: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const planSchema = z.object({
  name: z.string().min(2),
  planType: z.enum(["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY", "HALF_YEARLY", "ANNUAL", "CUSTOM"]),
  duration: z.coerce.number().int().min(1),
  price: money,
  description: z.preprocess(emptyToUndefined, z.string().optional()),
  active: z.coerce.boolean().default(true),
});

export const memberSchema = z.object({
  memberCode: z.preprocess(emptyToUndefined, z.string().optional()),
  fullName: z.string().min(2),
  mobileNumber: z.string().min(10),
  email: z.preprocess(emptyToUndefined, z.string().email().optional()),
  address: z.preprocess(emptyToUndefined, z.string().optional()),
  dateOfBirth: z.preprocess(emptyToUndefined, dateString.optional()),
  age: z.preprocess(emptyToUndefined, z.coerce.number().int().min(1).max(120).optional()),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  height: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  weight: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  fitnessGoal: z.preprocess(emptyToUndefined, z.string().optional()),
  medicalNotes: z.preprocess(emptyToUndefined, z.string().optional()),
  emergencyContactName: z.preprocess(emptyToUndefined, z.string().optional()),
  emergencyContactPhone: z.preprocess(emptyToUndefined, z.string().optional()),
  photoUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  planId: z.preprocess(emptyToUndefined, z.string().optional()),
  branchId: z.preprocess(emptyToUndefined, z.string().optional()),
  trainerId: z.preprocess(emptyToUndefined, z.string().optional()),
  joiningDate: dateString,
  expiryDate: dateString,
  status: z.enum(["ACTIVE", "INACTIVE", "EXPIRED", "PENDING"]),
});

export const paymentSchema = z.object({
  memberId: z.string().min(1),
  amount: money,
  method: z.enum(["CASH", "UPI", "CARD", "BANK_TRANSFER", "OTHER"]),
  date: dateString,
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
  status: z.enum(["PAID", "PENDING"]),
  receiptNumber: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.preprocess(emptyToUndefined, z.string().email().optional()),
  goal: z.preprocess(emptyToUndefined, z.string().optional()),
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
  status: z.enum(["NEW", "CONTACTED", "INTERESTED", "CONVERTED", "REJECTED"]),
});

export const trainerSchema = z.object({
  name: z.string().min(2),
  photoUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  email: z.preprocess(emptyToUndefined, z.string().email().optional()),
  experience: z.coerce.number().int().min(0),
  specialization: z.string().min(2),
  certifications: z.preprocess(emptyToUndefined, z.string().optional()),
  contact: z.string().min(10),
  salary: optionalMoney,
  joinDate: z.preprocess(emptyToUndefined, dateString.optional()),
  active: z.coerce.boolean().default(true),
});

export const expenseSchema = z.object({
  title: z.string().min(2),
  amount: money,
  category: z.enum(["RENT", "ELECTRICITY", "SALARY", "MAINTENANCE", "MISCELLANEOUS"]),
  date: dateString,
});

export const branchSchema = z.object({
  name: z.string().min(2),
  address: z.preprocess(emptyToUndefined, z.string().optional()),
  contactNumber: z.preprocess(emptyToUndefined, z.string().optional()),
  isActive: z.coerce.boolean().default(true),
});

export const equipmentSchema = z.object({
  name: z.string().min(2),
  brand: z.preprocess(emptyToUndefined, z.string().optional()),
  serialNumber: z.preprocess(emptyToUndefined, z.string().optional()),
  purchaseDate: z.preprocess(emptyToUndefined, dateString.optional()),
  purchasePrice: optionalMoney,
  status: z.enum(["OPERATIONAL", "MAINTENANCE", "OUT_OF_SERVICE"]),
  branchId: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const maintenanceSchema = z.object({
  equipmentId: z.string().min(1),
  serviceDate: dateString,
  nextServiceDate: z.preprocess(emptyToUndefined, dateString.optional()),
  cost: optionalMoney,
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
  status: z.enum(["OPERATIONAL", "MAINTENANCE", "OUT_OF_SERVICE"]),
});

export const lockerSchema = z.object({
  number: z.string().min(1),
  branchId: z.preprocess(emptyToUndefined, z.string().optional()),
  status: z.enum(["AVAILABLE", "OCCUPIED", "MAINTENANCE"]),
});

export const exerciseSchema = z.object({
  name: z.string().min(2),
  muscleGroup: z.preprocess(emptyToUndefined, z.string().optional()),
  description: z.preprocess(emptyToUndefined, z.string().optional()),
  equipmentNeeded: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const workoutSchema = z.object({
  name: z.string().min(2),
  description: z.preprocess(emptyToUndefined, z.string().optional()),
  exercises: z.union([z.string(), z.array(z.unknown())]).optional(),
  trainerId: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const dietPlanSchema = z.object({
  name: z.string().min(2),
  description: z.preprocess(emptyToUndefined, z.string().optional()),
  calories: z.preprocess(emptyToUndefined, z.coerce.number().int().min(0).optional()),
  meals: z.union([z.string(), z.array(z.unknown())]).optional(),
});

export const progressSchema = z.object({
  memberId: z.string().min(1),
  date: dateString,
  weight: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  chest: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  waist: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  hips: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  bmi: z.preprocess(emptyToUndefined, z.coerce.number().min(0).optional()),
  photoUrl: z.preprocess(emptyToUndefined, z.string().url().optional()),
  goalProgress: z.preprocess(emptyToUndefined, z.coerce.number().int().min(0).max(100).optional()),
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const notificationSchema = z.object({
  type: z.enum(["MEMBERSHIP_EXPIRY", "PAYMENT_DUE", "BIRTHDAY", "ANNOUNCEMENT", "TRAINER", "ATTENDANCE", "PROMOTIONAL"]),
  title: z.string().min(2),
  message: z.string().min(2),
  memberId: z.preprocess(emptyToUndefined, z.string().optional()),
  trainerId: z.preprocess(emptyToUndefined, z.string().optional()),
  channel: z.preprocess(emptyToUndefined, z.enum(["WHATSAPP", "EMAIL"]).optional()),
  sentAt: z.preprocess(emptyToUndefined, dateString.optional()),
  scheduledFor: z.preprocess(emptyToUndefined, dateString.optional()),
});

export const attendanceSchema = z.object({
  memberId: z.string().min(1),
  branchId: z.preprocess(emptyToUndefined, z.string().optional()),
  checkIn: dateString,
  checkOut: z.preprocess(emptyToUndefined, dateString.optional()),
  type: z.enum(["MANUAL", "QR_CODE"]).default("MANUAL"),
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const trainerAttendanceSchema = z.object({
  trainerId: z.string().min(1),
  date: dateString,
  checkIn: z.preprocess(emptyToUndefined, dateString.optional()),
  checkOut: z.preprocess(emptyToUndefined, dateString.optional()),
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const trainerSalarySchema = z.object({
  trainerId: z.string().min(1),
  amount: money,
  month: dateString,
  paidAt: z.preprocess(emptyToUndefined, dateString.optional()),
  status: z.enum(["PAID", "PENDING"]),
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const renewalSchema = z.object({
  memberId: z.string().min(1),
  planId: z.string().min(1),
  amount: money,
  method: z.enum(["CASH", "UPI", "CARD", "BANK_TRANSFER", "OTHER"]),
  date: dateString,
  notes: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const checkInSchema = z.object({
  memberCode: z.string().min(3),
  type: z.enum(["MANUAL", "QR_CODE"]).default("QR_CODE"),
  branchId: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const assignWorkoutSchema = z.object({
  memberId: z.string().min(1),
  workoutPlanId: z.string().min(1),
});

export const assignDietSchema = z.object({
  memberId: z.string().min(1),
  dietPlanId: z.string().min(1),
});

export const assignLockerSchema = z.object({
  lockerId: z.string().min(1),
  memberId: z.string().min(1),
});

export const schemas = {
  members: memberSchema,
  plans: planSchema,
  payments: paymentSchema,
  leads: leadSchema,
  trainers: trainerSchema,
  expenses: expenseSchema,
  branches: branchSchema,
  equipment: equipmentSchema,
  maintenance: maintenanceSchema,
  lockers: lockerSchema,
  workouts: workoutSchema,
  exercises: exerciseSchema,
  "diet-plans": dietPlanSchema,
  progress: progressSchema,
  notifications: notificationSchema,
  attendance: attendanceSchema,
  "trainer-attendance": trainerAttendanceSchema,
  "trainer-salaries": trainerSalarySchema,
};
