require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.MANAGER_EMAIL || "manager@aamdarfitness.com";
  const password = process.env.MANAGER_SEED_PASSWORD || "ChangeMe@123";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.manager.upsert({
    where: { email },
    update: { passwordHash, role: "MANAGER" },
    create: {
      name: "Aamdar Manager",
      email,
      passwordHash,
      role: "MANAGER",
    },
  });

  await prisma.gymSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      gymName: "AAMDAR Fitness Club",
      address: "Ganpati Chowk, Aamdar Complex, Parbhani",
      contactNumber: "+91 98765 43210",
      email: "info@aamdarfitness.com",
      openingTime: "05:30",
      closingTime: "21:00",
      whatsappNumber: "+91 98765 43210",
    },
  });

  const branch = await prisma.branch.upsert({
    where: { id: "main-branch" },
    update: { name: "Main Branch - Parbhani", isActive: true },
    create: {
      id: "main-branch",
      name: "Main Branch - Parbhani",
      address: "Ganpati Chowk, Aamdar Complex, Parbhani",
      contactNumber: "+91 98765 43210",
      isActive: true,
    },
  });

  const plans = [
    ["Daily Pass", "DAILY", 1, 150, "Single day gym access."],
    ["Weekly Plan", "WEEKLY", 7, 800, "One week membership."],
    ["Monthly", "MONTHLY", 30, 1500, "One month gym access for regular members."],
    ["Quarterly", "QUARTERLY", 90, 4000, "Three month plan with progress tracking."],
    ["Half-Yearly", "HALF_YEARLY", 180, 7500, "Six month value plan for consistent training."],
    ["Yearly", "ANNUAL", 365, 12000, "Full year membership with best price."],
    ["Custom", "CUSTOM", 30, 0, "Flexible plan configured by manager."],
  ];

  for (const [name, planType, duration, price, description] of plans) {
    await prisma.membershipPlan.upsert({
      where: { name },
      update: { duration, price, description, active: true, planType },
      create: { name, planType, duration, price, description },
    });
  }

  const exercises = [
    ["Bench Press", "Chest", "Barbell chest press", "Bench, Barbell"],
    ["Squats", "Legs", "Compound lower body exercise", "Squat Rack"],
    ["Deadlift", "Back", "Posterior chain strength", "Barbell"],
    ["Lat Pulldown", "Back", "Vertical pulling movement", "Cable Machine"],
    ["Treadmill Run", "Cardio", "Cardiovascular endurance", "Treadmill"],
  ];

  for (const [name, muscleGroup, description, equipmentNeeded] of exercises) {
    const existing = await prisma.exercise.findFirst({ where: { name } });
    if (!existing) {
      await prisma.exercise.create({ data: { name, muscleGroup, description, equipmentNeeded } });
    }
  }

  const trainer = await prisma.trainer.upsert({
    where: { id: "seed-trainer-1" },
    update: {},
    create: {
      id: "seed-trainer-1",
      name: "Coach Rahul",
      specialization: "Strength & Conditioning",
      experience: 6,
      contact: "+91 90000 11111",
      certifications: "ACE Certified Personal Trainer",
      salary: 25000,
      joinDate: new Date(),
      active: true,
    },
  });

  for (const [name, brand, status] of [
    ["Treadmill Pro X", "FitRun", "OPERATIONAL"],
    ["Leg Press Machine", "IronGym", "OPERATIONAL"],
    ["Smith Machine", "PowerLift", "MAINTENANCE"],
  ]) {
    const existing = await prisma.equipment.findFirst({ where: { name, branchId: branch.id } });
    if (!existing) await prisma.equipment.create({ data: { name, brand, status, branchId: branch.id } });
  }

  for (const number of ["A-01", "A-02", "A-03"]) {
    const existing = await prisma.locker.findFirst({ where: { number, branchId: branch.id } });
    if (!existing) await prisma.locker.create({ data: { number, branchId: branch.id, status: "AVAILABLE" } });
  }

  console.log("Seed complete:", { email, branch: branch.name, trainer: trainer.name });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
