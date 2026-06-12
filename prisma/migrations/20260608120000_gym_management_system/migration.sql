-- Gym Management System expansion

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'ANNUAL', 'CUSTOM');
CREATE TYPE "EquipmentStatus" AS ENUM ('OPERATIONAL', 'MAINTENANCE', 'OUT_OF_SERVICE');
CREATE TYPE "LockerStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');
CREATE TYPE "NotificationType" AS ENUM ('MEMBERSHIP_EXPIRY', 'PAYMENT_DUE', 'BIRTHDAY', 'ANNOUNCEMENT', 'TRAINER', 'ATTENDANCE', 'PROMOTIONAL');
CREATE TYPE "AttendanceType" AS ENUM ('MANUAL', 'QR_CODE');
CREATE TYPE "MembershipAction" AS ENUM ('NEW', 'RENEWAL', 'UPGRADE', 'DOWNGRADE');

-- AlterEnum Role
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'ADMIN';
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'STAFF';

-- AlterEnum MemberStatus
ALTER TYPE "MemberStatus" ADD VALUE IF NOT EXISTS 'INACTIVE';

-- AlterEnum ReminderType
ALTER TYPE "ReminderType" ADD VALUE IF NOT EXISTS 'BIRTHDAY';
ALTER TYPE "ReminderType" ADD VALUE IF NOT EXISTS 'ATTENDANCE';
ALTER TYPE "ReminderType" ADD VALUE IF NOT EXISTS 'PROMOTIONAL';

-- CreateTable GymSettings
CREATE TABLE "GymSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "gymName" TEXT NOT NULL DEFAULT 'AAMDAR Fitness Club',
    "logoUrl" TEXT,
    "address" TEXT,
    "contactNumber" TEXT,
    "email" TEXT,
    "openingTime" TEXT DEFAULT '05:30',
    "closingTime" TEXT DEFAULT '21:00',
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "youtubeUrl" TEXT,
    "twitterUrl" TEXT,
    "whatsappNumber" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GymSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable Branch
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "contactNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- AlterTable MembershipPlan
ALTER TABLE "MembershipPlan" ADD COLUMN IF NOT EXISTS "planType" "PlanType" NOT NULL DEFAULT 'MONTHLY';

-- AlterTable Member
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "memberCode" TEXT;
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "dateOfBirth" TIMESTAMP(3);
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "height" DECIMAL(5,2);
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "weight" DECIMAL(5,2);
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "fitnessGoal" TEXT;
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "medicalNotes" TEXT;
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "emergencyContactName" TEXT;
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "emergencyContactPhone" TEXT;
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "branchId" TEXT;
ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "trainerId" TEXT;

UPDATE "Member"
SET "memberCode" = subquery.new_code
FROM (
  SELECT id, 'AAM-' || LPAD((row_number() OVER (ORDER BY "createdAt"))::text, 4, '0') AS new_code
  FROM "Member"
) AS subquery
WHERE "Member".id = subquery.id AND "Member"."memberCode" IS NULL;


ALTER TABLE "Member" ALTER COLUMN "memberCode" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "Member_memberCode_key" ON "Member"("memberCode");
CREATE INDEX IF NOT EXISTS "Member_memberCode_idx" ON "Member"("memberCode");

-- AlterTable Payment
ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "receiptNumber" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Payment_receiptNumber_key" ON "Payment"("receiptNumber");

-- AlterTable Trainer
ALTER TABLE "Trainer" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "Trainer" ADD COLUMN IF NOT EXISTS "salary" DECIMAL(12,2);
ALTER TABLE "Trainer" ADD COLUMN IF NOT EXISTS "joinDate" TIMESTAMP(3);
ALTER TABLE "Trainer" ADD COLUMN IF NOT EXISTS "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable MembershipHistory
CREATE TABLE "MembershipHistory" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "planId" TEXT,
    "action" "MembershipAction" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(12,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MembershipHistory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TrainerAttendance" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkIn" TIMESTAMP(3),
    "checkOut" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TrainerAttendance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TrainerSalary" (
    "id" TEXT NOT NULL,
    "trainerId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TrainerSalary_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "branchId" TEXT,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3),
    "type" "AttendanceType" NOT NULL DEFAULT 'MANUAL',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT,
    "description" TEXT,
    "equipmentNeeded" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkoutPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "exercises" JSONB NOT NULL DEFAULT '[]',
    "trainerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MemberWorkout" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "MemberWorkout_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WorkoutLog" (
    "id" TEXT NOT NULL,
    "memberWorkoutId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WorkoutLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DietPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "calories" INTEGER,
    "meals" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "DietPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MemberDiet" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "dietPlanId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "MemberDiet_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProgressEntry" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DECIMAL(5,2),
    "chest" DECIMAL(5,2),
    "waist" DECIMAL(5,2),
    "hips" DECIMAL(5,2),
    "bmi" DECIMAL(4,2),
    "photoUrl" TEXT,
    "goalProgress" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProgressEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Locker" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "branchId" TEXT,
    "status" "LockerStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Locker_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LockerAssignment" (
    "id" TEXT NOT NULL,
    "lockerId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releasedAt" TIMESTAMP(3),
    CONSTRAINT "LockerAssignment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "serialNumber" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "purchasePrice" DECIMAL(12,2),
    "status" "EquipmentStatus" NOT NULL DEFAULT 'OPERATIONAL',
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EquipmentMaintenance" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "nextServiceDate" TIMESTAMP(3),
    "cost" DECIMAL(12,2),
    "notes" TEXT,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'OPERATIONAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EquipmentMaintenance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "memberId" TEXT,
    "trainerId" TEXT,
    "channel" "ReminderChannel",
    "sentAt" TIMESTAMP(3),
    "scheduledFor" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- Foreign Keys
ALTER TABLE "Member" ADD CONSTRAINT "Member_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Member" ADD CONSTRAINT "Member_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MembershipHistory" ADD CONSTRAINT "MembershipHistory_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MembershipHistory" ADD CONSTRAINT "MembershipHistory_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MembershipPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "TrainerAttendance" ADD CONSTRAINT "TrainerAttendance_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TrainerSalary" ADD CONSTRAINT "TrainerSalary_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "MemberWorkout" ADD CONSTRAINT "MemberWorkout_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MemberWorkout" ADD CONSTRAINT "MemberWorkout_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "WorkoutLog" ADD CONSTRAINT "WorkoutLog_memberWorkoutId_fkey" FOREIGN KEY ("memberWorkoutId") REFERENCES "MemberWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MemberDiet" ADD CONSTRAINT "MemberDiet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MemberDiet" ADD CONSTRAINT "MemberDiet_dietPlanId_fkey" FOREIGN KEY ("dietPlanId") REFERENCES "DietPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgressEntry" ADD CONSTRAINT "ProgressEntry_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Locker" ADD CONSTRAINT "Locker_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LockerAssignment" ADD CONSTRAINT "LockerAssignment_lockerId_fkey" FOREIGN KEY ("lockerId") REFERENCES "Locker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LockerAssignment" ADD CONSTRAINT "LockerAssignment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "EquipmentMaintenance" ADD CONSTRAINT "EquipmentMaintenance_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Indexes
CREATE INDEX "MembershipHistory_memberId_idx" ON "MembershipHistory"("memberId");
CREATE INDEX "TrainerAttendance_trainerId_date_idx" ON "TrainerAttendance"("trainerId", "date");
CREATE INDEX "TrainerSalary_trainerId_idx" ON "TrainerSalary"("trainerId");
CREATE INDEX "Attendance_checkIn_idx" ON "Attendance"("checkIn");
CREATE INDEX "Attendance_memberId_idx" ON "Attendance"("memberId");
CREATE INDEX "MemberWorkout_memberId_idx" ON "MemberWorkout"("memberId");
CREATE INDEX "MemberDiet_memberId_idx" ON "MemberDiet"("memberId");
CREATE INDEX "ProgressEntry_memberId_idx" ON "ProgressEntry"("memberId");
CREATE INDEX "ProgressEntry_date_idx" ON "ProgressEntry"("date");
CREATE UNIQUE INDEX "Locker_number_branchId_key" ON "Locker"("number", "branchId");
CREATE INDEX "LockerAssignment_memberId_idx" ON "LockerAssignment"("memberId");
CREATE INDEX "LockerAssignment_lockerId_idx" ON "LockerAssignment"("lockerId");
CREATE INDEX "Equipment_status_idx" ON "Equipment"("status");
CREATE INDEX "EquipmentMaintenance_equipmentId_idx" ON "EquipmentMaintenance"("equipmentId");
CREATE INDEX "Notification_type_idx" ON "Notification"("type");
CREATE INDEX "Notification_scheduledFor_idx" ON "Notification"("scheduledFor");

-- Default gym settings
INSERT INTO "GymSettings" ("id", "gymName", "address", "contactNumber", "email", "updatedAt")
VALUES ('default', 'AAMDAR Fitness Club', 'Ganpati Chowk, Aamdar Complex, Parbhani', '+91 98765 43210', 'info@aamdarfitness.com', CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;
