CREATE TYPE "Role" AS ENUM ('MANAGER');
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE "MemberStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'PENDING');
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'INTERESTED', 'CONVERTED', 'REJECTED');
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'UPI', 'CARD', 'BANK_TRANSFER', 'OTHER');
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PENDING');
CREATE TYPE "ExpenseCategory" AS ENUM ('RENT', 'ELECTRICITY', 'SALARY', 'MAINTENANCE', 'MISCELLANEOUS');
CREATE TYPE "ReminderType" AS ENUM ('SEVEN_DAYS', 'THREE_DAYS', 'EXPIRY_DAY', 'PENDING_PAYMENT');
CREATE TYPE "ReminderChannel" AS ENUM ('WHATSAPP', 'EMAIL');

CREATE TABLE "Manager" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'MANAGER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MembershipPlan" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "duration" INTEGER NOT NULL,
  "price" DECIMAL(12,2) NOT NULL,
  "description" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MembershipPlan_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Member" (
  "id" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "mobileNumber" TEXT NOT NULL,
  "email" TEXT,
  "address" TEXT,
  "age" INTEGER,
  "gender" "Gender" NOT NULL,
  "photoUrl" TEXT,
  "planId" TEXT,
  "joiningDate" TIMESTAMP(3) NOT NULL,
  "expiryDate" TIMESTAMP(3) NOT NULL,
  "status" "MemberStatus" NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Payment" (
  "id" TEXT NOT NULL,
  "memberId" TEXT NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "method" "PaymentMethod" NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "notes" TEXT,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PAID',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Lead" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "goal" TEXT,
  "notes" TEXT,
  "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Trainer" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "photoUrl" TEXT,
  "experience" INTEGER NOT NULL,
  "specialization" TEXT NOT NULL,
  "certifications" TEXT,
  "contact" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Expense" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "category" "ExpenseCategory" NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReminderLog" (
  "id" TEXT NOT NULL,
  "memberId" TEXT NOT NULL,
  "type" "ReminderType" NOT NULL,
  "channel" "ReminderChannel" NOT NULL,
  "message" TEXT NOT NULL,
  "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReminderLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");
CREATE UNIQUE INDEX "MembershipPlan_name_key" ON "MembershipPlan"("name");
CREATE UNIQUE INDEX "Member_mobileNumber_key" ON "Member"("mobileNumber");
CREATE INDEX "Member_status_idx" ON "Member"("status");
CREATE INDEX "Member_expiryDate_idx" ON "Member"("expiryDate");
CREATE INDEX "Payment_date_idx" ON "Payment"("date");
CREATE INDEX "Payment_status_idx" ON "Payment"("status");
CREATE INDEX "Lead_status_idx" ON "Lead"("status");
CREATE INDEX "Expense_date_idx" ON "Expense"("date");
CREATE INDEX "Expense_category_idx" ON "Expense"("category");
CREATE INDEX "ReminderLog_type_idx" ON "ReminderLog"("type");
CREATE INDEX "ReminderLog_channel_idx" ON "ReminderLog"("channel");

ALTER TABLE "Member" ADD CONSTRAINT "Member_planId_fkey" FOREIGN KEY ("planId") REFERENCES "MembershipPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReminderLog" ADD CONSTRAINT "ReminderLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
