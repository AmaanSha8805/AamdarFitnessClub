import { prisma } from "@/lib/manager/prisma";
import { serializeRecord, toDateInput, toMoney } from "@/lib/manager/format";
import { getReminderType, whatsappReminderLink } from "@/lib/manager/reminders";

export type ManagerRow = Record<string, unknown> & { id: string };

export type ResourceName =
  | "members"
  | "plans"
  | "payments"
  | "leads"
  | "trainers"
  | "expenses"
  | "branches"
  | "equipment"
  | "maintenance"
  | "lockers"
  | "workouts"
  | "exercises"
  | "diet-plans"
  | "progress"
  | "notifications"
  | "attendance"
  | "trainer-attendance"
  | "trainer-salaries";

const now = new Date();

function startOfDay(date = new Date()) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date = new Date()) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function startOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfYear(date = new Date()) {
  return new Date(date.getFullYear(), 0, 1);
}

export async function getGymSettings() {
  return prisma.gymSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { gymName: "AAMDAR Fitness Club" },
  });
}

export async function getDashboardData() {
  const monthStart = startOfMonth();
  const todayStart = startOfDay();
  const todayEnd = endOfDay();

  const [
    totalMembers,
    activeMembers,
    inactiveMembers,
    expiredMembers,
    pendingRenewals,
    totalLeads,
    todayRevenue,
    monthlyRevenue,
    totalRevenue,
    pendingPayments,
    newRegistrations,
    trainerCount,
    equipmentOperational,
    equipmentMaintenance,
    todayAttendance,
    totalLeads2,
    totalExpenses,
    recentMembers,
    recentPayments,
    recentRenewals,
    revenuePayments,
    membersForGrowth,
    attendanceByDay,
  ] = await Promise.all([
    prisma.member.count(),
    prisma.member.count({ where: { status: "ACTIVE" } }),
    prisma.member.count({ where: { status: "INACTIVE" } }),
    prisma.member.count({ where: { status: "EXPIRED" } }),
    prisma.member.count({
      where: {
        expiryDate: {
          gte: todayStart,
          lte: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59),
        },
      },
    }),
    prisma.lead.count(),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PAID", date: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PAID", date: { gte: monthStart } },
    }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "PAID" } }),
    prisma.payment.count({ where: { status: "PENDING" } }),
    prisma.member.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.trainer.count({ where: { active: true } }),
    prisma.equipment.count({ where: { status: "OPERATIONAL" } }),
    prisma.equipment.count({ where: { status: { in: ["MAINTENANCE", "OUT_OF_SERVICE"] } } }),
    prisma.attendance.count({ where: { checkIn: { gte: todayStart, lte: todayEnd } } }),
    prisma.lead.count(),
    prisma.expense.aggregate({ _sum: { amount: true }, where: { date: { gte: monthStart } } }),
    prisma.member.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { plan: true } }),
    prisma.payment.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { member: true } }),
    prisma.member.findMany({
      where: {
        expiryDate: {
          gte: todayStart,
          lte: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59),
        },
      },
      orderBy: { expiryDate: "asc" },
      take: 5,
      include: { plan: true },
    }),
    prisma.payment.findMany({
      where: { status: "PAID", date: { gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) } },
      select: { amount: true, date: true },
    }),
    prisma.member.findMany({
      where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) } },
      select: { createdAt: true },
    }),
    prisma.attendance.findMany({
      where: { checkIn: { gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) } },
      select: { checkIn: true },
    }),
  ]);

  const revenueGrowth = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const label = month.toLocaleString("en-IN", { month: "short" });
    const revenue = revenuePayments
      .filter((payment) => payment.date.getFullYear() === month.getFullYear() && payment.date.getMonth() === month.getMonth())
      .reduce((sum, payment) => sum + toMoney(payment.amount), 0);
    return { label, revenue };
  });

  const memberGrowth = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const label = month.toLocaleString("en-IN", { month: "short" });
    const members = membersForGrowth.filter(
      (member) => member.createdAt.getFullYear() === month.getFullYear() && member.createdAt.getMonth() === month.getMonth()
    ).length;
    return { label, members };
  });

  const attendanceGrowth = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const label = month.toLocaleString("en-IN", { month: "short" });
    const count = attendanceByDay.filter(
      (row) => row.checkIn.getFullYear() === month.getFullYear() && row.checkIn.getMonth() === month.getMonth()
    ).length;
    return { label, attendance: count };
  });

  return {
    stats: {
      totalMembers,
      activeMembers,
      inactiveMembers,
      expiredMembers,
      pendingRenewals,
      totalLeads: totalLeads2,
      todayRevenue: toMoney(todayRevenue._sum.amount),
      monthlyRevenue: toMoney(monthlyRevenue._sum.amount),
      totalRevenue: toMoney(totalRevenue._sum.amount),
      pendingPayments,
      newRegistrations,
      trainerCount,
      equipmentOperational,
      equipmentMaintenance,
      todayAttendance,
      monthlyExpenses: toMoney(totalExpenses._sum.amount),
      profit: toMoney(monthlyRevenue._sum.amount) - toMoney(totalExpenses._sum.amount),
    },
    revenueGrowth,
    memberGrowth,
    attendanceGrowth,
    recentActivity: [
      ...recentMembers.map((member) => ({
        type: "New Admission",
        title: member.fullName,
        detail: member.plan?.name || "No plan",
        date: toDateInput(member.createdAt),
      })),
      ...recentPayments.map((payment) => ({
        type: "Payment",
        title: payment.member.fullName,
        detail: `INR ${toMoney(payment.amount)}`,
        date: toDateInput(payment.date),
      })),
      ...recentRenewals.map((member) => ({
        type: "Renewal Due",
        title: member.fullName,
        detail: member.plan?.name || "No plan",
        date: toDateInput(member.expiryDate),
      })),
    ].slice(0, 10),
  };
}

export async function getManagerOptions() {
  const [plans, members, branches, trainers, equipment, workouts, dietPlans, lockers] = await Promise.all([
    prisma.membershipPlan.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.member.findMany({ orderBy: { fullName: "asc" }, select: { id: true, fullName: true, mobileNumber: true, memberCode: true } }),
    prisma.branch.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.trainer.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.equipment.findMany({ orderBy: { name: "asc" } }),
    prisma.workoutPlan.findMany({ orderBy: { name: "asc" } }),
    prisma.dietPlan.findMany({ orderBy: { name: "asc" } }),
    prisma.locker.findMany({ where: { status: "AVAILABLE" }, orderBy: { number: "asc" } }),
  ]);

  return {
    plans: plans.map((plan) => ({
      label: `${plan.name} - INR ${toMoney(plan.price)}`,
      value: plan.id,
      duration: plan.duration,
      price: toMoney(plan.price),
    })),
    members: members.map((member) => ({
      label: `${member.fullName} (${member.memberCode})`,
      value: member.id,
    })),
    branches: branches.map((branch) => ({ label: branch.name, value: branch.id })),
    trainers: trainers.map((trainer) => ({ label: trainer.name, value: trainer.id })),
    equipment: equipment.map((item) => ({ label: item.name, value: item.id })),
    workouts: workouts.map((plan) => ({ label: plan.name, value: plan.id })),
    dietPlans: dietPlans.map((plan) => ({ label: plan.name, value: plan.id })),
    lockers: lockers.map((locker) => ({ label: `Locker ${locker.number}`, value: locker.id })),
  };
}

export async function getMemberProfile(id: string) {
  const member = await prisma.member.findUnique({
    where: { id },
    include: {
      plan: true,
      branch: true,
      trainer: true,
      payments: { orderBy: { date: "desc" }, take: 10 },
      membershipHistory: { include: { plan: true }, orderBy: { createdAt: "desc" } },
      attendances: { orderBy: { checkIn: "desc" }, take: 10 },
      progressEntries: { orderBy: { date: "desc" }, take: 10 },
      workoutAssignments: { include: { workoutPlan: true }, where: { active: true } },
      dietAssignments: { include: { dietPlan: true }, where: { active: true } },
      lockerAssignments: { include: { locker: true }, where: { releasedAt: null } },
    },
  });
  if (!member) return null;
  return {
    ...serializeRecord(member),
    planName: member.plan?.name,
    branchName: member.branch?.name,
    trainerName: member.trainer?.name,
    payments: member.payments.map(serializeRecord),
    membershipHistory: member.membershipHistory.map((row) => ({
      ...serializeRecord(row),
      planName: row.plan?.name,
    })),
    attendances: member.attendances.map(serializeRecord),
    progressEntries: member.progressEntries.map(serializeRecord),
    workouts: member.workoutAssignments.map((row) => ({
      ...serializeRecord(row),
      planName: row.workoutPlan.name,
    })),
    diets: member.dietAssignments.map((row) => ({
      ...serializeRecord(row),
      planName: row.dietPlan.name,
    })),
    locker: member.lockerAssignments[0]
      ? { ...serializeRecord(member.lockerAssignments[0]), number: member.lockerAssignments[0].locker.number }
      : null,
  };
}

export async function getResourceData(resource: ResourceName): Promise<ManagerRow[]> {
  switch (resource) {
    case "members": {
      const rows = await prisma.member.findMany({
        include: { plan: true, branch: true, trainer: true },
        orderBy: { createdAt: "desc" },
      });
      return rows.map((row) => ({
        ...serializeRecord(row),
        planName: row.plan?.name || "No plan",
        branchName: row.branch?.name || "-",
        trainerName: row.trainer?.name || "-",
      }));
    }
    case "plans": {
      const rows = await prisma.membershipPlan.findMany({ orderBy: { createdAt: "desc" } });
      return rows.map(serializeRecord);
    }
    case "payments": {
      const rows = await prisma.payment.findMany({ include: { member: true }, orderBy: { date: "desc" } });
      return rows.map((row) => ({
        ...serializeRecord(row),
        memberName: row.member.fullName,
        memberCode: row.member.memberCode,
      }));
    }
    case "leads": {
      const rows = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
      return rows.map(serializeRecord);
    }
    case "trainers": {
      const rows = await prisma.trainer.findMany({
        include: { _count: { select: { members: true } } },
        orderBy: { createdAt: "desc" },
      });
      return rows.map((row) => ({
        ...serializeRecord(row),
        assignedMembers: row._count.members,
      }));
    }
    case "expenses": {
      const rows = await prisma.expense.findMany({ orderBy: { date: "desc" } });
      return rows.map(serializeRecord);
    }
    case "branches": {
      const rows = await prisma.branch.findMany({
        include: { _count: { select: { members: true, equipment: true, lockers: true } } },
        orderBy: { createdAt: "desc" },
      });
      return rows.map((row) => ({
        ...serializeRecord(row),
        memberCount: row._count.members,
        equipmentCount: row._count.equipment,
        lockerCount: row._count.lockers,
      }));
    }
    case "equipment": {
      const rows = await prisma.equipment.findMany({ include: { branch: true }, orderBy: { createdAt: "desc" } });
      return rows.map((row) => ({ ...serializeRecord(row), branchName: row.branch?.name || "-" }));
    }
    case "maintenance": {
      const rows = await prisma.equipmentMaintenance.findMany({
        include: { equipment: true },
        orderBy: { serviceDate: "desc" },
      });
      return rows.map((row) => ({ ...serializeRecord(row), equipmentName: row.equipment.name }));
    }
    case "lockers": {
      const rows = await prisma.locker.findMany({ include: { branch: true }, orderBy: { number: "asc" } });
      return rows.map((row) => ({ ...serializeRecord(row), branchName: row.branch?.name || "-" }));
    }
    case "workouts": {
      const rows = await prisma.workoutPlan.findMany({ include: { trainer: true }, orderBy: { createdAt: "desc" } });
      return rows.map((row) => ({
        ...serializeRecord(row),
        exercises: JSON.stringify(row.exercises),
        trainerName: row.trainer?.name || "-",
      }));
    }
    case "exercises": {
      const rows = await prisma.exercise.findMany({ orderBy: { name: "asc" } });
      return rows.map(serializeRecord);
    }
    case "diet-plans": {
      const rows = await prisma.dietPlan.findMany({ orderBy: { createdAt: "desc" } });
      return rows.map((row) => ({ ...serializeRecord(row), meals: JSON.stringify(row.meals) }));
    }
    case "progress": {
      const rows = await prisma.progressEntry.findMany({
        include: { member: true },
        orderBy: { date: "desc" },
      });
      return rows.map((row) => ({ ...serializeRecord(row), memberName: row.member.fullName }));
    }
    case "notifications": {
      const rows = await prisma.notification.findMany({
        include: { member: true, trainer: true },
        orderBy: { createdAt: "desc" },
      });
      return rows.map((row) => ({
        ...serializeRecord(row),
        memberName: row.member?.fullName || "-",
        trainerName: row.trainer?.name || "-",
      }));
    }
    case "attendance": {
      const rows = await prisma.attendance.findMany({
        include: { member: true, branch: true },
        orderBy: { checkIn: "desc" },
      });
      return rows.map((row) => ({
        ...serializeRecord(row),
        memberName: row.member.fullName,
        memberCode: row.member.memberCode,
        branchName: row.branch?.name || "-",
      }));
    }
    case "trainer-attendance": {
      const rows = await prisma.trainerAttendance.findMany({
        include: { trainer: true },
        orderBy: { date: "desc" },
      });
      return rows.map((row) => ({ ...serializeRecord(row), trainerName: row.trainer.name }));
    }
    case "trainer-salaries": {
      const rows = await prisma.trainerSalary.findMany({
        include: { trainer: true },
        orderBy: { month: "desc" },
      });
      return rows.map((row) => ({ ...serializeRecord(row), trainerName: row.trainer.name }));
    }
    default:
      return [];
  }
}

export async function getReminderData() {
  const members = await prisma.member.findMany({
    where: {
      OR: [
        {
          expiryDate: {
            gte: startOfDay(),
            lte: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59),
          },
        },
        { payments: { some: { status: "PENDING" } } },
      ],
    },
    include: { payments: true, plan: true },
    orderBy: { expiryDate: "asc" },
  });

  const birthdays = await prisma.member.findMany({
    where: {
      dateOfBirth: { not: null },
    },
    select: { id: true, fullName: true, mobileNumber: true, email: true, dateOfBirth: true, plan: true },
  });

  const birthdayReminders = birthdays
    .filter((member) => {
      if (!member.dateOfBirth) return false;
      const dob = new Date(member.dateOfBirth);
      return dob.getMonth() === now.getMonth() && dob.getDate() === now.getDate();
    })
    .map((member) => ({
      id: member.id,
      fullName: member.fullName,
      mobileNumber: member.mobileNumber,
      email: member.email,
      planName: member.plan?.name || "No plan",
      expiryDate: "-",
      type: "BIRTHDAY" as const,
      whatsappUrl: (() => {
        const digits = member.mobileNumber.replace(/\D/g, "");
        const phone = digits.length === 10 ? `91${digits}` : digits;
        const text = `Happy Birthday ${member.fullName}! Wishing you a strong and healthy year ahead from AAMDAR Fitness Club.`;
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      })(),
    }));

  const expiryReminders = members
    .map((member) => ({
      id: member.id,
      fullName: member.fullName,
      mobileNumber: member.mobileNumber,
      email: member.email,
      planName: member.plan?.name || "No plan",
      expiryDate: toDateInput(member.expiryDate),
      type: getReminderType(member),
      whatsappUrl: whatsappReminderLink(member),
    }))
    .filter((member) => member.type);

  return [...expiryReminders, ...birthdayReminders];
}

export async function getAttendanceAnalytics() {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const rows = await prisma.attendance.findMany({
    where: { checkIn: { gte: start } },
    select: { checkIn: true, type: true },
  });

  const byDay = Array.from({ length: now.getDate() }, (_, index) => {
    const day = index + 1;
    const label = String(day).padStart(2, "0");
    const count = rows.filter((row) => row.checkIn.getDate() === day).length;
    return { label, count };
  });

  const qrCount = rows.filter((row) => row.type === "QR_CODE").length;
  const manualCount = rows.filter((row) => row.type === "MANUAL").length;

  return { byDay, qrCount, manualCount, total: rows.length };
}

export async function getReportData(period: "daily" | "monthly" | "yearly") {
  const start = period === "daily" ? startOfDay() : period === "monthly" ? startOfMonth() : startOfYear();
  const [payments, expenses, newMembers, leads, attendances, trainers] = await Promise.all([
    prisma.payment.findMany({ where: { date: { gte: start } }, include: { member: true }, orderBy: { date: "desc" } }),
    prisma.expense.findMany({ where: { date: { gte: start } }, orderBy: { date: "desc" } }),
    prisma.member.findMany({ where: { createdAt: { gte: start } }, include: { plan: true }, orderBy: { createdAt: "desc" } }),
    prisma.lead.findMany({ where: { createdAt: { gte: start } }, orderBy: { createdAt: "desc" } }),
    prisma.attendance.findMany({
      where: { checkIn: { gte: start } },
      include: { member: true },
      orderBy: { checkIn: "desc" },
    }),
    prisma.trainerSalary.findMany({
      where: { month: { gte: start } },
      include: { trainer: true },
      orderBy: { month: "desc" },
    }),
  ]);

  const revenue = payments.filter((payment) => payment.status === "PAID").reduce((sum, payment) => sum + toMoney(payment.amount), 0);
  const expensesTotal = expenses.reduce((sum, expense) => sum + toMoney(expense.amount), 0);

  return {
    period,
    summary: {
      revenue,
      expenses: expensesTotal,
      profit: revenue - expensesTotal,
      payments: payments.length,
      newMembers: newMembers.length,
      leads: leads.length,
      attendances: attendances.length,
      trainerSalaries: trainers.reduce((sum, row) => sum + toMoney(row.amount), 0),
    },
    payments: payments.map((payment) => ({
      date: toDateInput(payment.date),
      member: payment.member.fullName,
      amount: toMoney(payment.amount),
      method: payment.method,
      status: payment.status,
      receiptNumber: payment.receiptNumber || "-",
    })),
    expenses: expenses.map((expense) => ({
      date: toDateInput(expense.date),
      title: expense.title,
      category: expense.category,
      amount: toMoney(expense.amount),
    })),
    members: newMembers.map((member) => ({
      date: toDateInput(member.createdAt),
      name: member.fullName,
      code: member.memberCode,
      plan: member.plan?.name || "-",
      status: member.status,
    })),
    attendances: attendances.map((row) => ({
      date: toDateInput(row.checkIn),
      member: row.member.fullName,
      type: row.type,
    })),
    trainers: trainers.map((row) => ({
      month: toDateInput(row.month),
      trainer: row.trainer.name,
      amount: toMoney(row.amount),
      status: row.status,
    })),
  };
}
