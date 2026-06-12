import bcrypt from "bcryptjs";
import { prisma } from "@/lib/manager/prisma";

export function getDefaultManagerCredentials() {
  return {
    email: (process.env.MANAGER_EMAIL || "manager@aamdarfitness.com").toLowerCase(),
    password: process.env.MANAGER_SEED_PASSWORD || "ChangeMe@123",
    name: "Aamdar Manager",
  };
}

/** Ensure a manager account exists (seed from env on first login / empty database). */
export async function ensureManagerAccount() {
  const defaults = getDefaultManagerCredentials();
  const passwordHash = await bcrypt.hash(defaults.password, 12);

  return prisma.manager.upsert({
    where: { email: defaults.email },
    update: {},
    create: {
      name: defaults.name,
      email: defaults.email,
      passwordHash,
      role: "MANAGER",
    },
  });
}
