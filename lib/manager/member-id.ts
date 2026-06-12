import { prisma } from "@/lib/manager/prisma";

export async function generateMemberCode() {
  const last = await prisma.member.findFirst({
    orderBy: { memberCode: "desc" },
    select: { memberCode: true },
  });

  const lastNumber = last?.memberCode ? Number.parseInt(last.memberCode.replace(/\D/g, ""), 10) : 0;
  return `AAM-${String(lastNumber + 1).padStart(4, "0")}`;
}

export async function generateReceiptNumber() {
  const count = await prisma.payment.count();
  const year = new Date().getFullYear();
  return `RCP-${year}-${String(count + 1).padStart(5, "0")}`;
}
