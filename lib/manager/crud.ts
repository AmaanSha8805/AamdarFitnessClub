import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/manager/prisma";
import { getResourceData, ResourceName } from "@/lib/manager/data";
import { schemas } from "@/lib/manager/validation";
import { requireManager, routeError } from "@/app/api/manager/_shared";
import { z } from "zod";

type PrismaModel = {
  create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

const modelMap: Record<ResourceName, PrismaModel> = {
  members: prisma.member,
  plans: prisma.membershipPlan,
  payments: prisma.payment,
  leads: prisma.lead,
  trainers: prisma.trainer,
  expenses: prisma.expense,
  branches: prisma.branch,
  equipment: prisma.equipment,
  maintenance: prisma.equipmentMaintenance,
  lockers: prisma.locker,
  workouts: prisma.workoutPlan,
  exercises: prisma.exercise,
  "diet-plans": prisma.dietPlan,
  progress: prisma.progressEntry,
  notifications: prisma.notification,
  attendance: prisma.attendance,
  "trainer-attendance": prisma.trainerAttendance,
  "trainer-salaries": prisma.trainerSalary,
};

export function createResourceHandlers(resource: ResourceName) {
  const schema = schemas[resource];

  async function GET(request: NextRequest) {
    const auth = await requireManager(request);
    if (auth.error) return auth.error;
    return NextResponse.json({ rows: await getResourceData(resource) });
  }

  async function POST(request: NextRequest) {
    const auth = await requireManager(request);
    if (auth.error) return auth.error;

    try {
      const body = await request.json();
      const model = modelMap[resource];

      if (body.action === "delete") {
        await model.delete({ where: { id: body.id } });
        return NextResponse.json({ ok: true, rows: await getResourceData(resource) });
      }

      const data = schema.parse(body.data) as Record<string, unknown>;
      const payload = normalizePayload(resource, data);

      if (body.action === "update") {
        await model.update({ where: { id: body.id }, data: payload });
      } else {
        await model.create({ data: payload });
      }

      return NextResponse.json({ ok: true, rows: await getResourceData(resource) });
    } catch (error) {
      return routeError(error);
    }
  }

  return { GET, POST };
}

function normalizePayload(resource: ResourceName, data: Record<string, unknown>) {
  const nullableKeys: Partial<Record<ResourceName, string[]>> = {
    members: ["planId", "branchId", "trainerId", "email", "address", "photoUrl", "dateOfBirth", "fitnessGoal", "medicalNotes", "emergencyContactName", "emergencyContactPhone"],
    payments: ["notes", "receiptNumber"],
    trainers: ["photoUrl", "email", "certifications", "salary", "joinDate"],
    branches: ["address", "contactNumber"],
    equipment: ["brand", "serialNumber", "purchaseDate", "purchasePrice", "branchId"],
    maintenance: ["nextServiceDate", "cost", "notes"],
    lockers: ["branchId"],
    workouts: ["description", "trainerId"],
    exercises: ["muscleGroup", "description", "equipmentNeeded"],
    "diet-plans": ["description", "calories"],
    progress: ["weight", "chest", "waist", "hips", "bmi", "photoUrl", "goalProgress", "notes"],
    notifications: ["memberId", "trainerId", "channel", "sentAt", "scheduledFor"],
    attendance: ["branchId", "checkOut", "notes"],
    "trainer-attendance": ["checkIn", "checkOut", "notes"],
    "trainer-salaries": ["paidAt", "notes"],
    leads: ["email", "goal", "notes"],
    plans: ["description"],
    expenses: [],
  };

  const keys = nullableKeys[resource] || [];
  const payload = { ...data };
  for (const key of keys) {
    if (payload[key] === "" || payload[key] === undefined) {
      payload[key] = null;
    }
  }

  if (resource === "workouts" && typeof payload.exercises === "string") {
    try {
      payload.exercises = JSON.parse(payload.exercises as string);
    } catch {
      payload.exercises = [];
    }
  }

  if (resource === "diet-plans" && typeof payload.meals === "string") {
    try {
      payload.meals = JSON.parse(payload.meals as string);
    } catch {
      payload.meals = [];
    }
  }

  return payload;
}

export type SchemaKey = keyof typeof schemas;
