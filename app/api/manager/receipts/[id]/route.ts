import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { prisma } from "@/lib/manager/prisma";
import { formatInr, toMoney } from "@/lib/manager/format";
import { getGymSettings } from "@/lib/manager/data";
import { requireManager } from "../../_shared";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireManager(request);
  if (auth.error) return auth.error;

  const { id } = await params;
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { member: { include: { plan: true } } },
  });

  if (!payment) {
    return NextResponse.json({ error: "Payment not found." }, { status: 404 });
  }

  const gym = await getGymSettings();
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(gym.gymName, 14, 18);
  doc.setFontSize(11);
  doc.text("Payment Receipt", 14, 28);
  doc.text(`Receipt: ${payment.receiptNumber || payment.id}`, 14, 38);
  doc.text(`Date: ${payment.date.toISOString().slice(0, 10)}`, 14, 46);
  doc.text(`Member: ${payment.member.fullName} (${payment.member.memberCode})`, 14, 54);
  doc.text(`Plan: ${payment.member.plan?.name || "N/A"}`, 14, 62);
  doc.text(`Amount: ${formatInr(toMoney(payment.amount))}`, 14, 70);
  doc.text(`Method: ${payment.method}`, 14, 78);
  doc.text(`Status: ${payment.status}`, 14, 86);
  if (payment.notes) doc.text(`Notes: ${payment.notes}`, 14, 94);
  if (gym.address) doc.text(gym.address, 14, 110);
  if (gym.contactNumber) doc.text(`Contact: ${gym.contactNumber}`, 14, 118);

  const pdf = Buffer.from(doc.output("arraybuffer"));
  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${payment.receiptNumber || payment.id}.pdf"`,
    },
  });
}
